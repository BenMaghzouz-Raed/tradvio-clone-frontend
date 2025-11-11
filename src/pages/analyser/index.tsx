/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import AnalysisForm from "./components/analysis-form";
import InfoCard, { InfoCardLoader } from "@/components/info-card";
import { formatAmount } from "@/lib/utils";
import { Signal } from "@/components/signal";
import AiInsights from "./components/ai-insights";

export default function Analyser() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className={"flex justify-between  gap-5 w-full"}>
      <div className="flex flex-col w-full">
        {loading && (
          <div className="gap-4">
            <div className="grid grid-cols-2 gap-4">
              <InfoCardLoader
                className="lg:col-span-1 sm:col-span-2 w-full"
                title="Chart Data"
              />

              <InfoCardLoader
                className="lg:col-span-1 sm:col-span-2"
                title="Technical Analysis"
              />
              <InfoCardLoader
                className="lg:col-span-1 sm:col-span-2"
                title="Risk Management"
              />
              <InfoCardLoader
                className="lg:col-span-1 sm:col-span-2"
                title="Analysis Result"
              />
              <InfoCardLoader className="col-span-2" title="Trade Suggestion" />
            </div>
            {/* TODO: add ai insights here */}
            <InfoCardLoader className="col-span-2 mt-4" title="Ai Insights" />
          </div>
        )}
        {!loading && analysisResult !== null && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <InfoCard
                className="lg:col-span-1 sm:col-span-2 w-full"
                title="Chart Data"
                data={[
                  {
                    label: "Source",
                    value: analysisResult.extraction.metadata.source,
                  },
                  {
                    label: "Chart Type",
                    value: analysisResult.extraction.metadata.chart_style,
                  },
                  {
                    label: "Current Price",
                    value: formatAmount(
                      analysisResult.extraction.metadata.current_price
                    ),
                  },
                  {
                    label: "Swing High",
                    value: formatAmount(
                      analysisResult.extraction.chart_data.approx_swing_high
                    ),
                  },
                  {
                    label: "swing low",
                    value: formatAmount(
                      analysisResult.extraction.chart_data.approx_swing_low
                    ),
                  },
                ]}
              />

              <InfoCard
                className="lg:col-span-1 sm:col-span-2"
                title="Technical Analysis"
                data={[
                  {
                    label: "Support Level",
                    value:
                      analysisResult.ai_analysis.technical_analysis
                        .support_level,
                  },
                  {
                    label: "Resistence Level",
                    value:
                      analysisResult.ai_analysis.technical_analysis
                        .resistence_level,
                  },
                  {
                    label: "Price Range",
                    value: `${analysisResult.ai_analysis.technical_analysis.price_range[0]} .. ${analysisResult.ai_analysis.technical_analysis.price_range[1]}`,
                  },
                  {
                    label: "Key Zone",
                    value: `${analysisResult.ai_analysis.technical_analysis.key_zone[0]} .. ${analysisResult.ai_analysis.technical_analysis.key_zone[1]}`,
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
                className="lg:col-span-1 sm:col-span-2"
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
                    value: formatAmount(
                      analysisResult.ai_analysis.risk_management.take_profit
                    ),
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
                className="lg:col-span-1 sm:col-span-2"
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
                      analysisResult.ai_analysis.trade_suggestion
                        .tape_profit_recommendation,
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
            />
          </>
        )}
      </div>
      <AnalysisForm
        className="sticky h-fit"
        setAnalysisResult={setAnalysisResult}
        setLoading={setLoading}
        loading={loading}
        reAnalyse={analysisResult !== null}
      />
    </div>
  );
}
