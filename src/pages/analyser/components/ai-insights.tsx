/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import { cn, formatAmount } from "@/lib/utils";

function Chip({ children, variant = "neutral" }: { children: React.ReactNode; variant?: "neutral"|"success"|"warning"|"error" }) {
  const base = "px-2 py-0.5 rounded-md text-xs font-medium";
  const map = {
    neutral: "bg-accent text-foreground/80",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    error: "bg-red-100 text-red-700",
  } as const;
  return <span className={cn(base, map[variant])}>{children}</span>;
}

export default function AiInsights({
  aiAnalysis,
  final_recommendation,
  per_strategy = [],
}: {
  aiAnalysis: any;
  final_recommendation: any;
  per_strategy?: any[];
}) {
  const rm = aiAnalysis?.risk_management || {};
  const ts = aiAnalysis?.trade_suggestion || {};

  return (
    <div className="mt-4 grid grid-cols-1 gap-4">
      {/* Summary + badges */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Chip variant="success">{aiAnalysis?.trend_direction}</Chip>
          <Chip>{aiAnalysis?.volatility} volatility</Chip>
          <Chip>Confidence {aiAnalysis?.confidence_score}%</Chip>
          {aiAnalysis?.risk_label && <Chip variant="warning">{aiAnalysis.risk_label}</Chip>}
        </div>
        <p className="text-sm text-gray-600 mb-2">{aiAnalysis?.trend_summary}</p>
        {aiAnalysis?.key_factors?.length ? (
          <div className="flex flex-wrap gap-2">
            {aiAnalysis.key_factors.map((k: string) => (
              <Chip key={k}>{k}</Chip>
            ))}
          </div>
        ) : null}
      </Card>

      {/* Trade Plan */}
      <Card className="p-4">
        <h4 className="font-medium text-sm mb-3">Trade Plan</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Signal</span>
            <Chip variant={ts.signal === "BUY" ? "success" : ts.signal === "SELL" ? "error" : "neutral"}>{ts.signal}</Chip>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Confidence</span>
            <span className="text-sm">{ts.ai_confidence ?? aiAnalysis?.confidence_score}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Entry</span>
            <span className="text-sm">{rm.entry_price ? formatAmount(rm.entry_price) : "—"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Stop Loss</span>
            <span className="text-sm">{rm.stop_loss ? formatAmount(rm.stop_loss) : "—"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Take Profit</span>
            <span className="text-sm">{rm.take_profit ? formatAmount(rm.take_profit) : "—"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">R:R</span>
            <span className="text-sm">{rm.reward_risk_ratio?.toFixed ? rm.reward_risk_ratio.toFixed(2) : rm.reward_risk_ratio ?? "—"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Risk ($)</span>
            <span className="text-sm">{rm.risk_amount_usd ? formatAmount(rm.risk_amount_usd) : "—"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Position Size</span>
            <span className="text-sm">{rm.position_size ? Number(rm.position_size).toFixed(2) : "—"}</span>
          </div>
        </div>
        {final_recommendation?.summary && (
          <p className="mt-3 text-sm text-gray-600">{final_recommendation.summary}</p>
        )}
      </Card>

      {/* Per-Strategy Insights */}
      {per_strategy?.length ? (
        <Card className="p-4">
          <h4 className="font-medium text-sm mb-3">Strategy Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {per_strategy.map((s: any, idx: number) => (
              <div key={idx} className="rounded-md border p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{s.name}</span>
                  {typeof s.confidence_percent === "number" && (
                    <Chip>{s.confidence_percent}%</Chip>
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-2">{s.explanation}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Chip variant={s.bias === "bullish" ? "success" : s.bias === "bearish" ? "error" : "neutral"}>{s.bias}</Chip>
                  {Array.isArray(s.entry_zone) && s.entry_zone.length === 2 && (
                    <Chip>
                      Entry {formatAmount(s.entry_zone[0])} – {formatAmount(s.entry_zone[1])}
                    </Chip>
                  )}
                  {Array.isArray(s.take_profits) && s.take_profits.length > 0 && (
                    <Chip>TPs {s.take_profits.map((tp: number) => formatAmount(tp)).join(", ")}</Chip>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {/* Free-text reasoning */}
      {Array.isArray(aiAnalysis?.ai_insights) && aiAnalysis.ai_insights.length > 0 && (
        <Card className="p-4">
          <h4 className="font-medium text-sm mb-3">AI Reasoning & Insights</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            {aiAnalysis.ai_insights.map((insight: string, i: number) => (
              <li key={i}>{insight}</li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
