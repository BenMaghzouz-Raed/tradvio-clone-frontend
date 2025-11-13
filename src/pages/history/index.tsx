/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import StatsCard from "@/components/stats-card";
import { SlidersVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaginationComponent from "@/components/pagination";
import trades from "@/seeds/trades";
import { Card } from "@/components/ui/card";
import AnalysisCard from "@/components/analysis-card";
import { getAnalyses } from "@/services/domain/AnalysisService";
import { toastNotification } from "@/lib/toast";
import { Spinner } from "@/components/ui/spinner";
import { AnalysisType } from "@/types/analysis-type";

export default function History() {
  const [analyses, setAnalises] = useState<AnalysisType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalTrades = trades.length;
  const wonTrades = trades.filter((t) => t.outcome === "Win").length;
  const lostTrades = trades.filter((t) => t.outcome === "Loss").length;
  const winRate = totalTrades ? Math.round((wonTrades / totalTrades) * 100) : 0;
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
      setAnalises(res.items);
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

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap justify-around gap-4">
        <StatsCard label="Total Trades" value={String(totalTrades)} />
        <StatsCard label="Won Trades" value={String(wonTrades)} />
        <StatsCard label="Lost Trades" value={String(lostTrades)} />
        <StatsCard label="Win Rate" value={`${winRate}%`} />
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
