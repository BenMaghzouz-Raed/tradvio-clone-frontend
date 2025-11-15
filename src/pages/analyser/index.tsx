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
import TradeModal from "@/pages/trade-journal/components/trade-modal";
import { AddTradeFormValues } from "@/validation/trade-validation";

export default function Analyser() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [tradeInitialValues, setTradeInitialValues] = useState<Partial<AddTradeFormValues> | null>(null);

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

  // load persisted analysis and image on mount
  useEffect(() => {
    try {
      const persisted = loadJsonFromSessionStorage("analysis_result");
      if (persisted) {
        setAnalysisResult(persisted);
      }
    } catch {}
    try {
      const savedImg = loadJsonFromSessionStorage("analysis_image");
      if (savedImg?.dataUrl && savedImg?.name && savedImg?.type) {
        fetch(savedImg.dataUrl)
          .then((r) => r.blob())
          .then((blob) => {
            const file = new File([blob], savedImg.name as string, { type: savedImg.type as string });
            setImageFile(file);
            setPreviewUrl(savedImg.dataUrl as string);
          })
          .catch(() => {});
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

  const openAddToJournal = () => {
    if (!analysisResult) return;
    try {
      const ai = analysisResult.ai_analysis || {};
      const rm = ai.risk_management || {};
      const ts = ai.trade_suggestion || {};
      const symbol = (analysisResult.user_inputs && analysisResult.user_inputs.symbol) || "";
      const entry = typeof rm.entry_price === "number" ? rm.entry_price : undefined;
      // prefer take_profit; allow user to edit in modal
      const exit = typeof rm.take_profit === "number" ? rm.take_profit : undefined;
      const side = ts.signal === "SELL" ? "SHORT" : ts.signal === "BUY" ? "LONG" : undefined;
      let profit_loss: number | undefined = undefined;
      if (typeof entry === "number" && typeof exit === "number" && side) {
        profit_loss = side === "LONG" ? exit - entry : entry - exit;
      }
      const initial: Partial<AddTradeFormValues> = {
        symbol,
        trade_type: side,
        entry_price: entry,
        exit_price: exit,
        profit_loss,
        outcome: "NOT_TAKEN",
        trade_date: new Date(),
      } as any;
      setTradeInitialValues(initial);
      setTradeModalOpen(true);
    } catch {
      setTradeInitialValues({ outcome: "NOT_TAKEN" } as any);
      setTradeModalOpen(true);
    }
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
                  try { saveJsonToSessionStorage("analysis_image", null as any); } catch {}
                  return;
                }
                try {
                  const compressed = await compressImage(file);
                  setImageFile(compressed);
                  const dataUrl: string = await new Promise((resolve, reject) => {
                    const fr = new FileReader();
                    fr.onload = () => resolve(fr.result as string);
                    fr.onerror = reject;
                    fr.readAsDataURL(compressed);
                  });
                  setPreviewUrl(dataUrl);
                  try {
                    saveJsonToSessionStorage("analysis_image", { name: compressed.name, type: compressed.type, dataUrl });
                  } catch {}
                } catch {
                  // fallback to original if compression fails
                  setImageFile(file);
                  const dataUrl: string = await new Promise((resolve, reject) => {
                    const fr = new FileReader();
                    fr.onload = () => resolve(fr.result as string);
                    fr.onerror = reject;
                    fr.readAsDataURL(file);
                  });
                  setPreviewUrl(dataUrl);
                  try {
                    saveJsonToSessionStorage("analysis_image", { name: file.name, type: file.type, dataUrl });
                  } catch {}
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
                      analysisResult?.ai_analysis?.technical_analysis
                        ?.support_level,
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
                      analysisResult?.ai_analysis?.technical_analysis
                        ?.pattern_detected ?? "No Patern Detected",
                  },
                  {
                    label: "Signal Strength",
                    value:
                      analysisResult?.ai_analysis?.technical_analysis
                        ?.signal_strength,
                  },
                ]}
              />
              <InfoCard
                className="col-span-2 lg:col-span-1"
                title="Risk Management"
                data={[
                  {
                    label: "Risk Amount",
                    value:
                      typeof analysisResult?.ai_analysis?.risk_management?.risk_amount_usd === "number"
                        ? formatAmount(analysisResult.ai_analysis.risk_management.risk_amount_usd)
                        : "—",
                  },
                  {
                    label: "Entry Price",
                    value:
                      typeof analysisResult?.ai_analysis?.risk_management?.entry_price === "number"
                        ? formatAmount(analysisResult.ai_analysis.risk_management.entry_price)
                        : "—",
                  },
                  {
                    label: "Stop Loss",
                    value:
                      typeof analysisResult?.ai_analysis?.risk_management?.stop_loss === "number"
                        ? formatAmount(analysisResult.ai_analysis.risk_management.stop_loss)
                        : "—",
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
                      typeof analysisResult?.ai_analysis?.risk_management?.reward_risk_ratio === "number"
                        ? analysisResult.ai_analysis.risk_management.reward_risk_ratio.toFixed(2)
                        : "—",
                  },
                  {
                    label: "Position Size",
                    value:
                      typeof analysisResult?.ai_analysis?.risk_management?.position_size === "number"
                        ? analysisResult.ai_analysis.risk_management.position_size.toFixed(2)
                        : "—",
                  },
                ]}
              />
              <InfoCard
                className="col-span-2 lg:col-span-1"
                title="Analysis Result"
                data={[
                  {
                    label: "Direction",
                    value: analysisResult?.ai_analysis?.trend_direction ?? "—",
                  },
                  {
                    label: "Market Sentiment",
                    value: analysisResult?.ai_analysis?.market_sentiment ?? "—",
                  },
                  {
                    label: "Pattern",
                    value:
                      analysisResult?.ai_analysis?.technical_analysis?.pattern_detected ?? "No Pattern Detected",
                  },
                  {
                    label: "Volatility",
                    value: analysisResult?.ai_analysis?.volatility ?? "—",
                  },
                  {
                    label: "Data Confidence",
                    value:
                      typeof analysisResult?.ai_analysis?.confidence_score === "number"
                        ? `${analysisResult.ai_analysis.confidence_score}%`
                        : "—",
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
                      (analysisResult?.ai_analysis?.trade_suggestion?.signal || "").toUpperCase() === "SELL"
                        ? (<Signal label="SELL" variant="error" />)
                        : (analysisResult?.ai_analysis?.trade_suggestion?.signal || "").toUpperCase() === "BUY"
                        ? (<Signal label="BUY" variant="success" />)
                        : "—",
                  },
                  {
                    label: "Entry",
                    value:
                      analysisResult?.ai_analysis?.trade_suggestion?.entry_recommendation || "—",
                  },
                  {
                    label: "Stop Loss",
                    value:
                      analysisResult?.ai_analysis?.trade_suggestion?.stop_loss_recommendation || "—",
                  },
                  {
                    label: "Take Profit",
                    value:
                      analysisResult?.ai_analysis?.trade_suggestion?.take_profit_recommendation || "—",
                  },
                  {
                    label: "Confidence",
                    value:
                      typeof analysisResult?.ai_analysis?.trade_suggestion?.ai_confidence === "number"
                        ? analysisResult.ai_analysis.trade_suggestion.ai_confidence
                        : "—",
                  },
                ]}
              />
            </div>
            {analysisResult?.ai_analysis ? (
              <AiInsights
                aiAnalysis={analysisResult.ai_analysis}
                final_recommendation={analysisResult?.final_recommendation}
                per_strategy={analysisResult?.per_strategy}
              />
            ) : null}
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
          onAddToJournal={openAddToJournal}
        />

        {/* Trade Modal to record AI analysis as a trade */}
        <TradeModal
          open={tradeModalOpen}
          setOpen={setTradeModalOpen}
          onSuccess={() => {
            setTradeModalOpen(false);
          }}
          onError={(e) => {
            console.error(e);
          }}
          initialValues={tradeInitialValues || undefined}
        >
          <span />
        </TradeModal>
    </div>
  );
}
