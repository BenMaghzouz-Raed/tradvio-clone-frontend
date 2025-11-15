/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import AnalysisForm from "./components/analysis-form";
import InfoCard from "@/components/info-card";
import { formatAmount, saveJsonToSessionStorage, loadJsonFromSessionStorage } from "@/lib/utils";
import { Signal } from "@/components/signal";
import AiInsights from "./components/ai-insights";
import AnalysisLoading from "./components/analysis-loading";
import Upload from "@/components/upload";
import { Button } from "@/components/ui/button";

export default function Analyser() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Confirm navigation while analysis is running
  // Browser/tab close guard
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!loading) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [loading]);
  // Back/forward guard in SPA history
  useEffect(() => {
    const onPopState = () => {
      if (loading) {
        const ok = window.confirm("An analysis is in progress. Leaving will cancel it. Are you sure you want to leave?");
        if (!ok) {
          // cancel by pushing back to current state
          history.go(1);
        }
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [loading]);

  // Lightweight client-side compression to reduce upload and inference time
  async function compressImage(file: File, maxSide = 1600, quality = 0.75): Promise<File> {
    const dataUrl: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = dataUrl;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    let { width, height } = img;
    const maxCurrent = Math.max(width, height);
    if (maxCurrent > maxSide) {
      const scale = maxSide / maxCurrent;
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    const blob: Blob = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b as Blob), "image/jpeg", quality)
    );

    return new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  }

  // load persisted analysis on mount
  useEffect(() => {
    try {
      const persisted = loadJsonFromSessionStorage("analysis_result");
      if (persisted) {
        setAnalysisResult(persisted);
      }
    } catch {}
  }, []);

  const handleSetResult = (res: any) => {
    setAnalysisResult(res);
    try {
      saveJsonToSessionStorage("analysis_result", res);
    } catch {}
  };

  const startNew = () => {
    setAnalysisResult(null);
    try {
      saveJsonToSessionStorage("analysis_result", null as any);
    } catch {}
  };

  return (
    <div
      className={
        "flex lg:flex-nowrap flex-wrap-reverse justify-between  gap-5 w-full"
      }
    >
      <div className="flex flex-col w-full">
        {/* Controls bar */}
        <div className="flex items-center justify-end mb-2 gap-2">
          {analysisResult && (
            <Button variant="outline" onClick={startNew} className="cursor-pointer">New Analysis</Button>
          )}
        </div>
        {loading && (
          <div className="gap-4">
            <AnalysisLoading />
          </div>
        )}
        {!loading && analysisResult === null && (
          <div className="flex items-start justify-center w-full">
            <Upload
              name="image"
              label="Upload Chart for AI Analysis"
              className="w-full max-w-[720px] h-72 mt-2"
              onChange={async (e) => {
                const file = e.target.files?.[0] || null;
                if (!file) {
                  setImageFile(null);
                  setPreviewUrl(null);
                  return;
                }
                try {
                  const compressed = await compressImage(file);
                  setImageFile(compressed);
                  setPreviewUrl(URL.createObjectURL(compressed));
                } catch {
                  // fallback to original if compression fails
                  setImageFile(file);
                  setPreviewUrl(URL.createObjectURL(file));
                }
              }}
            />
          </div>
        )}
        {!loading && analysisResult !== null && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <InfoCard
                className="col-span-2 lg:col-span-1 w-full"
                title="Chart Data"
                data={[
                  {
                    label: "Source",
                    value: analysisResult?.extraction?.metadata?.source || "—",
                  },
                  {
                    label: "Chart Type",
                    value: analysisResult?.extraction?.metadata?.chart_style || "—",
                  },
                  {
                    label: "Current Price",
                    value:
                      typeof analysisResult?.extraction?.metadata?.current_price === "number"
                        ? formatAmount(analysisResult.extraction.metadata.current_price)
                        : "—",
                  },
                  {
                    label: "Swing High",
                    value:
                      typeof analysisResult?.extraction?.chart_data?.approx_swing_high === "number"
                        ? formatAmount(analysisResult.extraction.chart_data.approx_swing_high)
                        : "—",
                  },
                  {
                    label: "Swing Low",
                    value:
                      typeof analysisResult?.extraction?.chart_data?.approx_swing_low === "number"
                        ? formatAmount(analysisResult.extraction.chart_data.approx_swing_low)
                        : "—",
                  },
                ]}
              />

              <InfoCard
                className="col-span-2 lg:col-span-1"
                title="Technical Analysis"
                data={[
                  {
                    label: "Support Level",
                    value:
                      analysisResult.ai_analysis.technical_analysis
                        .support_level,
                  },
                  {
                    label: "Resistance Level",
                    value: analysisResult?.ai_analysis?.technical_analysis?.resistance_level ?? "—",
                  },
                  {
                    label: "Price Range",
                    value:
                      Array.isArray(analysisResult?.ai_analysis?.technical_analysis?.price_range) && analysisResult.ai_analysis.technical_analysis.price_range.length >= 2
                        ? `${analysisResult.ai_analysis.technical_analysis.price_range[0]} .. ${analysisResult.ai_analysis.technical_analysis.price_range[1]}`
                        : "—",
                  },
                  {
                    label: "Key Zone",
                    value:
                      Array.isArray(analysisResult?.ai_analysis?.technical_analysis?.key_zone) && analysisResult.ai_analysis.technical_analysis.key_zone.length >= 2
                        ? `${analysisResult.ai_analysis.technical_analysis.key_zone[0]} .. ${analysisResult.ai_analysis.technical_analysis.key_zone[1]}`
                        : "—",
                  },
                  {
                    label: "Pattern Detected",
                    value:
                      analysisResult.ai_analysis.technical_analysis
                        .pattern_detected ?? "No Patern Detected",
                  },
                  {
                    label: "Signal Strength",
                    value:
                      analysisResult.ai_analysis.technical_analysis
                        .signal_strength,
                  },
                ]}
              />
              <InfoCard
                className="col-span-2 lg:col-span-1"
                title="Risk Management"
                data={[
                  {
                    label: "Risk Amount",
                    value: formatAmount(
                      analysisResult.ai_analysis.risk_management.risk_amount_usd
                    ),
                  },
                  {
                    label: "Entry Price",
                    value: formatAmount(
                      analysisResult.ai_analysis.risk_management.entry_price
                    ),
                  },
                  {
                    label: "Stop Loss",
                    value: formatAmount(
                      analysisResult.ai_analysis.risk_management.stop_loss
                    ),
                  },
                  {
                    label: "Take Profit",
                    value:
                      typeof analysisResult?.ai_analysis?.risk_management?.take_profit === "number"
                        ? formatAmount(analysisResult.ai_analysis.risk_management.take_profit)
                        : "—",
                  },
                  {
                    label: "Reward Risk Ratio",
                    value:
                      analysisResult.ai_analysis.risk_management.reward_risk_ratio?.toFixed(
                        2
                      ),
                  },
                  {
                    label: "Position Size",
                    value:
                      analysisResult.ai_analysis.risk_management.position_size?.toFixed(
                        2
                      ),
                  },
                ]}
              />
              <InfoCard
                className="col-span-2 lg:col-span-1"
                title="Analysis Result"
                data={[
                  {
                    label: "Direction",
                    value: analysisResult.ai_analysis.trend_direction,
                  },
                  {
                    label: "Market Sentiment",
                    value: analysisResult.ai_analysis.market_sentiment,
                  },
                  {
                    label: "Pattern",
                    value:
                      analysisResult.ai_analysis.technical_analysis
                        .pattern_detected ?? "No Pattern Detected",
                  },
                  {
                    label: "Volatility",
                    value: analysisResult.ai_analysis.volatility,
                  },
                  {
                    label: "Data Confidence",
                    value: `${analysisResult.ai_analysis.confidence_score}%`,
                  },
                ]}
              />
              <InfoCard
                className="col-span-2"
                title="Trade Suggestion"
                data={[
                  {
                    label: "Signal",
                    value:
                      analysisResult.ai_analysis.trade_suggestion.signal ==
                      "SELL" ? (
                        <Signal label="SELL" variant="error" />
                      ) : (
                        <Signal label="BUY" variant="success" />
                      ),
                  },
                  {
                    label: "Entry",
                    value:
                      analysisResult.ai_analysis.trade_suggestion
                        .entry_recommendation,
                  },
                  {
                    label: "Stop Loss",
                    value:
                      analysisResult.ai_analysis.trade_suggestion
                        .stop_loss_recommendation,
                  },
                  {
                    label: "Take Profit",
                    value:
                      analysisResult?.ai_analysis?.trade_suggestion?.take_profit_recommendation || "—",
                  },
                  {
                    label: "Confidence",
                    value:
                      analysisResult.ai_analysis.trade_suggestion.ai_confidence,
                  },
                ]}
              />
            </div>
            <AiInsights
              aiAnalysis={analysisResult.ai_analysis}
              final_recommendation={analysisResult.final_recommendation}
              per_strategy={analysisResult.per_strategy}
            />
          </>
        )}
      </div>
        <AnalysisForm
          className="md:sticky h-fit block"
          setAnalysisResult={handleSetResult}
          setLoading={setLoading}
          loading={loading}
          reAnalyse={analysisResult !== null}
          showUpload={false}
          imageFile={imageFile}
          previewUrl={previewUrl}
        />
    </div>
  );
}
