import { cn, formatDate, formatAmount, formatPercent } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Signal } from "./signal";
import { Download } from "lucide-react";
import { AnalysisType } from "@/types/analysis-type";

export default function AnalysisCard({
  analysis,
  onView,
  className,
}: {
  analysis: AnalysisType;
  onView?: () => void;
  className?: string;
}) {
  const confidenceText =
    analysis.confidence_score != null
      ? formatPercent(Number(analysis.confidence_score), 0)
      : "-";

  return (
    <Card className={cn("p-4 flex flex-col gap-3", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-md border px-2 py-0.5 bg-accent/40">{analysis.symbol || "-"}</span>
            <span className="rounded-md border px-2 py-0.5 bg-accent/40">{analysis.timeframe || "-"}</span>
            {analysis.market_trend ? (
              <span className="rounded-md border px-2 py-0.5 bg-accent/40">{analysis.market_trend}</span>
            ) : null}
            <span className="opacity-70">{analysis.created_at ? formatDate(new Date(analysis.created_at)) : "-"}</span>
          </div>
          <h2 className="font-semibold text-[#171717] text-base truncate">
            {analysis.pattern ?? "No Pattern Detected"}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button className="cursor-pointer" variant="outline" onClick={onView}>
            View details
          </Button>
          <Button className="flex gap-2 cursor-pointer" variant="outline">
            <Download /> Export
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {analysis.direction && (
            <Signal
              label={analysis.direction!}
              variant={analysis.direction === "LONG" ? "success" : "error"}
            />
          )}
          <span className="text-xs text-muted-foreground">Confidence: {confidenceText}</span>
          {analysis.suggested_risk_reward != null && (
            <span className="text-xs text-muted-foreground">R/R: {Number(analysis.suggested_risk_reward).toFixed(2)}</span>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">Entry</span>
          <span className="font-medium">
            {analysis.suggested_entry_price != null
              ? formatAmount(Number(analysis.suggested_entry_price))
              : "-"}
          </span>
          <span className="text-muted-foreground">SL</span>
          <span className="font-medium">
            {analysis.suggested_stop_loss != null
              ? formatAmount(Number(analysis.suggested_stop_loss))
              : "-"}
          </span>
          <span className="text-muted-foreground">TP</span>
          <span className="font-medium">
            {analysis.suggested_take_profit != null
              ? formatAmount(Number(analysis.suggested_take_profit))
              : "-"}
          </span>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <img
          className="w-full sm:w-5/6 rounded-md border"
          src={
            analysis.chart_image_url
              ? analysis.chart_image_url
              : "/images/graph.png"
          }
          alt="trade graph"
        />
      </div>
    </Card>
  );
}
