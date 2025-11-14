/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import StatsCard from "@/components/stats-card";
import { SlidersVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaginationComponent from "@/components/pagination";
import { Card } from "@/components/ui/card";
import AnalysisCard from "@/components/analysis-card";
import { getAnalyses } from "@/services/domain/AnalysisService";
import { toastNotification } from "@/lib/toast";
import { Spinner } from "@/components/ui/spinner";
import { AnalysisType } from "@/types/analysis-type";
import { BarChart3, CheckCircle2, Clock3, XCircle } from "lucide-react";

export default function History() {
  const [analyses, setAnalises] = useState<AnalysisType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchData = async (params: {
    limit?: number;
    offset?: number;
    date_from?: Date;
    date_to?: Date;
  }) => {
    try {
      setLoading(true);
      const res: any = await getAnalyses(params);
      setAnalises(res.items || []);
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
    fetchData({});
  }, []);

  const stats = useMemo(() => {
    const total = analyses.length;
    const completed = analyses.filter((a) => a.status === "COMPLETED").length;
    const failed = analyses.filter((a) => a.status === "FAILED").length;
    const pending = analyses.filter((a) => a.status === "PENDING").length;
    const avgConfidence = total
      ? (
          analyses.reduce((acc, a) => acc + (Number(a.confidence_score || 0) || 0), 0) /
          total
        ).toFixed(1)
      : "0.0";
    return { total, completed, failed, pending, avgConfidence };
  }, [analyses]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap justify-around gap-4">
        <StatsCard label="Total Analyses" value={String(stats.total)} icon={<BarChart3 className="h-5 w-5" />} />
        <StatsCard label="Completed" value={String(stats.completed)} icon={<CheckCircle2 className="h-5 w-5" />} variant="success" />
        <StatsCard label="Failed" value={String(stats.failed)} icon={<XCircle className="h-5 w-5" />} variant="error" />
        <StatsCard label="Pending" value={String(stats.pending)} icon={<Clock3 className="h-5 w-5" />} variant="warning" />
      </div>

      <div className="flex justify-end mb-4 gap-2">
        <Button variant="outline" className="hover:bg-gray-100 cursor-pointer">
          Filter
          <SlidersVertical className="w-5 h-5" />
        </Button>
      </div>

      <div className="rounded-md border border-gray-200 overflow-hidden">
        <Card>
          {loading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-10 py-4">
              {analyses.map((analysis) => (
                <AnalysisCard key={analysis.analysis_id} analysis={analysis} />
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="flex justify-end mt-4">
        <div className="inline-block">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={5}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
