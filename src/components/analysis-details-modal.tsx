import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import InfoCard, { InfoCardLoader } from "@/components/info-card";
import { AnalysisDetails } from "@/types/analysis-type";
import { getAnalysisById } from "@/services/domain/AnalysisService";
import { formatAmount, formatDate, formatPercent } from "@/lib/utils";

export default function AnalysisDetailsModal({
  analysisId,
  open,
  onOpenChange,
}: {
  analysisId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalysisDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!open || !analysisId) return;
      setLoading(true);
      setError(null);
      try {
        const res = await getAnalysisById(analysisId);
        if (!cancelled) setData(res);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load analysis");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [open, analysisId]);

  const overview = useMemo(() => {
    if (!data) return [] as { label: string; value: React.ReactNode }[];
    return [
      { label: "Symbol", value: data.symbol || "-" },
      { label: "Timeframe", value: data.timeframe || "-" },
      { label: "Created", value: data.created_at ? formatDate(new Date(data.created_at)) : "-" },
      { label: "Status", value: data.status },
      { label: "Trend", value: data.market_trend || "-" },
      { label: "Pattern", value: data.pattern || "-" },
    ];
  }, [data]);

  const signal = useMemo(() => {
    if (!data) return [] as { label: string; value: React.ReactNode }[];
    return [
      { label: "Direction", value: data.direction || "-" },
      { label: "Confidence", value: data.confidence_score != null ? formatPercent(Number(data.confidence_score), 1) : "-" },
    ];
  }, [data]);

  const suggestion = useMemo(() => {
    if (!data) return [] as { label: string; value: React.ReactNode }[];
    const fmt = (n?: number | null) => (n == null ? "-" : formatAmount(Number(n)));
    return [
      { label: "Entry", value: fmt(data.suggested_entry_price as any) },
      { label: "Stop Loss", value: fmt(data.suggested_stop_loss as any) },
      { label: "Take Profit", value: fmt(data.suggested_take_profit as any) },
      { label: "R/R", value: data.suggested_risk_reward != null ? Number(data.suggested_risk_reward).toFixed(2) : "-" },
      { label: "Pos. Size", value: data.suggested_position_size != null ? Number(data.suggested_position_size).toFixed(4) : "-" },
    ];
  }, [data]);

  const insights = useMemo(() => {
    const arr = (data?.insights_json as any[]) || [];
    return arr.slice(0, 8).map((it, idx) => ({ label: `Insight ${idx + 1}`, value: typeof it === "string" ? it : JSON.stringify(it) }));
  }, [data]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[95vw] sm:w-[90vw] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Analysis Details</DialogTitle>
        </DialogHeader>

        {error ? (
          <div className="text-destructive">{error}</div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCardLoader title="Overview" />
            <InfoCardLoader title="Signal & Confidence" />
            <InfoCardLoader title="Trade Suggestion" />
            <InfoCardLoader title="AI Insights" rows={6} />
          </div>
        ) : data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard title="Overview" data={overview} />
            <InfoCard title="Signal & Confidence" data={signal} />
            <InfoCard title="Trade Suggestion" data={suggestion} />
            <InfoCard title="AI Insights" data={insights.length ? insights : [{ label: "Insights", value: "No insights available" }]} />
            <div className="md:col-span-2">
              {data.chart_image_url ? (
                <img src={data.chart_image_url} alt="Chart" className="w-full rounded-md border" />
              ) : null}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-10">
            <Spinner />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
