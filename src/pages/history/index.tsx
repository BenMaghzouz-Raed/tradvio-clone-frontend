/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import StatsCard from "@/components/stats-card";
import { SlidersVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaginationComponent from "@/components/pagination";
import { Card } from "@/components/ui/card";
import AnalysisCard from "@/components/analysis-card";
import AnalysisDetailsModal from "@/components/analysis-details-modal";
import { getAnalyses } from "@/services/domain/AnalysisService";
import { toastNotification } from "@/lib/toast";
import { Spinner } from "@/components/ui/spinner";
import { AnalysisType } from "@/types/analysis-type";
import { BarChart3, CheckCircle2, Clock3, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function History() {
  const [analyses, setAnalyses] = useState<AnalysisType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Modal
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Filters
  const [status, setStatus] = useState<"ALL" | "COMPLETED" | "PENDING" | "FAILED">("COMPLETED");
  const [symbol, setSymbol] = useState("");
  const [direction, setDirection] = useState<"ALL" | "LONG" | "SHORT">("ALL");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const pageSize = 12;

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const offset = (page - 1) * pageSize;
      const res: any = await getAnalyses({
        limit: pageSize,
        offset,
        status: status === "ALL" ? undefined : status,
        date_from: dateFrom || undefined,
        date_to: dateTo || undefined,
      });
      setAnalyses(res.items || []);
    } catch (err: any) {
      toastNotification({
        type: "error",
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, status, dateFrom, dateTo]);

  const filtered = useMemo(() => {
    return analyses
      .filter((a) => (symbol ? a.symbol?.toLowerCase().includes(symbol.toLowerCase()) : true))
      .filter((a) => (direction === "ALL" ? true : a.direction === direction));
  }, [analyses, symbol, direction]);

  const stats = useMemo(() => {
    const total = filtered.length;
    const completed = filtered.filter((a) => a.status === "COMPLETED").length;
    const failed = filtered.filter((a) => a.status === "FAILED").length;
    const pending = filtered.filter((a) => a.status === "PENDING").length;
    const avgConfidence = total
      ? (
          filtered.reduce((acc, a) => acc + (Number(a.confidence_score || 0) || 0), 0) / total
        ).toFixed(1)
      : "0.0";
    return { total, completed, failed, pending, avgConfidence };
  }, [filtered]);

  const totalPages = useMemo(() => {
    // We don't have total count; infer if there might be a next page
    const maybeHasNext = analyses.length === pageSize;
    return maybeHasNext ? currentPage + 1 : currentPage;
  }, [analyses.length, currentPage]);

  const openDetails = (id: string) => {
    setSelectedAnalysisId(id);
    setDetailsOpen(true);
  };

  const resetFilters = () => {
    setStatus("COMPLETED");
    setSymbol("");
    setDirection("ALL");
    setDateFrom("");
    setDateTo("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatsCard label="Total Analyses" value={String(stats.total)} icon={<BarChart3 className="h-5 w-5" />} />
        <StatsCard label="Completed" value={String(stats.completed)} icon={<CheckCircle2 className="h-5 w-5" />} variant="success" />
        <StatsCard label="Failed" value={String(stats.failed)} icon={<XCircle className="h-5 w-5" />} variant="error" />
        <StatsCard label="Pending" value={String(stats.pending)} icon={<Clock3 className="h-5 w-5" />} variant="warning" />
      </div>

      {/* Filters */}
      <Card className="p-3 sm:p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">Status</label>
            <Select value={status} onValueChange={(v) => setStatus(v as any)}>
              <SelectTrigger className="min-w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">Direction</label>
            <Select value={direction} onValueChange={(v) => setDirection(v as any)}>
              <SelectTrigger className="min-w-36">
                <SelectValue placeholder="Direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="LONG">Long</SelectItem>
                <SelectItem value="SHORT">Short</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">Symbol</label>
            <Input placeholder="e.g. AAPL" value={symbol} onChange={(e) => setSymbol(e.target.value)} className="w-36" />
          </div>

          <div className="flex items-end gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">From</label>
              <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">To</label>
              <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
          </div>

          <div className="ml-auto flex gap-2">
            <Button variant="secondary" onClick={resetFilters} className="cursor-pointer">
              Reset
            </Button>
            <Button variant="outline" className="cursor-pointer" onClick={() => fetchData(1)}>
              Filter <SlidersVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* List */}
      <div className="rounded-md border border-gray-200 overflow-hidden">
        <Card>
          {loading ? (
            <div className="py-10 flex justify-center"><Spinner /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-3 sm:px-6 py-4">
              {filtered.map((analysis) => (
                <AnalysisCard key={analysis.analysis_id} analysis={analysis} onView={() => openDetails(analysis.analysis_id)} />
              ))}
              {!filtered.length ? (
                <div className="col-span-full text-center text-muted-foreground py-8">No analyses found.</div>
              ) : null}
            </div>
          )}
        </Card>
      </div>

      <div className="flex justify-end mt-2 sm:mt-4">
        <div className="inline-block">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </div>
      </div>

      <AnalysisDetailsModal
        analysisId={selectedAnalysisId}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}
