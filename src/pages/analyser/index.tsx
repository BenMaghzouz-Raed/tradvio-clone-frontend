/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import AnalysisForm from "./components/analysis-form";
import InfoCard, { InfoCardLoader } from "@/components/info-card";
import { cn, formatAmount } from "@/lib/utils";
import { Signal } from "@/components/signal";

export default function Analyser() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-wrap gap-5 w-full",
        !loading && !analysisResult ? "justify-center" : "justify-between"
      )}
    >
      {loading && (
        <div className="flex flex-wrap gap-4">
          <InfoCardLoader />
          <InfoCardLoader />
          <InfoCardLoader />
          <InfoCardLoader />
        </div>
      )}
      {!loading && analysisResult !== null && (
        <>
          <div className="flex flex-wrap gap-2">
            <InfoCard
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
                    analysisResult.ai_analysis.risk_management
                      .reward_risk_ratio,
                },
                {
                  label: "Position Size",
                  value:
                    analysisResult.ai_analysis.risk_management.position_size,
                },
              ]}
            />
            <InfoCard
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
              ]}
            />
          </div>
          {/* TODO: add ai insights here */}
        </>
      )}
      <AnalysisForm
        setAnalysisResult={setAnalysisResult}
        setLoading={setLoading}
        loading={loading}
        reAnalyse={analysisResult !== null}
      />
    </div>
  );
}
