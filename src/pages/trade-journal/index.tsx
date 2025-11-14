/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import PaginationComponent from "@/components/pagination";
import StatsCard from "@/components/stats-card.tsx";
import DataTable from "@/components/data-table.tsx";
import { Button } from "@/components/ui/button.tsx";
import PageSizeSelector from "@/components/page-size-selector.tsx";
import { columns } from "./components/columns";
import { getTrades } from "@/services/domain/TradeService";
import { toastNotification } from "@/lib/toast";
import Filter from "./components/filter";
import { ITradeFilter } from "@/types/trade";
import TradeModal from "./components/trade-modal";
import { formatAmount, formatPercent } from "@/lib/utils";
import { PiggyBank, Target, ThumbsUp, ThumbsDown } from "lucide-react";

// TODO: add correct pagination to backend (must contain total pages or total)
// TODO: define symbol values
const total = 20;

function normalize(value: any): string {
  if (!value) return "";
  return String(value).toUpperCase();
}

function TradeJournal() {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ITradeFilter>({ symbol: "All" });
  const [trades, setTrades] = useState<any[]>([]);

  const fetchData = async (conditions: ITradeFilter) => {
    try {
      // clean up filters
      const cleanConditions = Object.fromEntries(
        Object.entries(conditions).filter(
          (entry) => !!entry[1] && entry[1] !== "All"
        )
      );
      setLoading(true);
      const res: any = await getTrades(cleanConditions);
      setTrades(res.items || []);
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
    fetchData(filters);
  }, [filters]);

  const stats = useMemo(() => {
    const pnl = trades.reduce((acc, t) => acc + Number(t.profit_loss || 0), 0);
    const wins = trades.filter((t) => normalize(t.outcome) === "WIN");
    const losses = trades.filter((t) => normalize(t.outcome) === "LOSS");
    const total = trades.length || 0;
    const winRate = total ? (wins.length / total) * 100 : 0;
    const avgWin = wins.length
      ? wins.reduce((acc, t) => acc + Number(t.profit_loss || 0), 0) / wins.length
      : 0;
    const avgLossAbs = losses.length
      ? Math.abs(
          losses.reduce((acc, t) => acc + Number(t.profit_loss || 0), 0) / losses.length
        )
      : 0;

    return { pnl, winRate, avgWin, avgLossAbs };
  }, [trades]);

  const totalPages = useMemo(() => Math.ceil(trades.length / total), [trades]);
  return (
    <div>
      <div className="flex flex-wrap justify-around gap-4 mb-4">
        <StatsCard label="Total P&L" value={formatAmount(stats.pnl)} icon={<PiggyBank className="h-5 w-5" />} />
        <StatsCard label="Win Rate" value={formatPercent(stats.winRate, 0)} icon={<Target className="h-5 w-5" />} variant="success" />
        <StatsCard label="Avg. Win" value={formatAmount(stats.avgWin)} icon={<ThumbsUp className="h-5 w-5" />} />
        <StatsCard label="Avg. Loss" value={formatAmount(stats.avgLossAbs)} icon={<ThumbsDown className="h-5 w-5" />} variant="error" />
      </div>

      <div className="flex justify-end mb-4 gap-2">
        <Filter setFilters={setFilters} filters={filters} />

        <TradeModal
          open={recordModalOpen}
          setOpen={setRecordModalOpen}
          onSuccess={() => {
            toastNotification({
              type: "success",
              message: "Trade succesfully recorded",
            });
            setRecordModalOpen(false);
            fetchData(filters);
          }}
          onError={(err) => {
            toastNotification({
              type: "error",
              message: err.message,
            });
            setRecordModalOpen(false);
          }}
        >
          <Button
            className="bg-black text-white cursor-pointer hover:bg-gray-800"
            onClick={() => setRecordModalOpen(true)}
          >
            Record New Trade
          </Button>
        </TradeModal>
      </div>

      <DataTable columns={columns} data={trades} loading={loading} />

      <div className="flex items-center justify-between pt-2">
        <span className="text-muted-foreground text-sm w-fit">
          0 of 68 row(s) selected.
        </span>
        <div className="flex items-center">
          <PageSizeSelector
            onChange={setItemsPerPage}
            options={[10, 20, 30]}
            value={itemsPerPage}
          />
          <PaginationComponent
            className="w-fit m-0"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default TradeJournal;
