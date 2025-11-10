import { useState } from "react";
import StatsCard from "@/components/stats-card";
import TradeCard from "@/components/trade-card";
import DataTable from "@/components/data-table";
import { ITrade } from "@/types/trade";
import { ColumnDef } from "@tanstack/react-table";
import { SlidersVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaginationComponent from "@/components/pagination";
import { mockTrades } from "@/seeds/trades";

const groupedTrades = mockTrades.reduce<ITrade[][]>((acc, trade, index) => {
  if (index % 2 === 0) acc.push([trade]);
  else acc[acc.length - 1].push(trade);
  return acc;
}, []);

const columns: ColumnDef<ITrade[]>[] = [
  {
    accessorKey: "row",
    header: () => null,
    cell: ({ row }) => {
      const trades = row.original;
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-4">
          {trades.map((trade) => (
            <TradeCard key={trade.id} trade={trade} />
          ))}
        </div>
      );
    },
  },
];

export default function History() {
  const [trades] = useState<ITrade[]>(mockTrades);
  const [currentPage, setCurrentPage] = useState(1);
  const tradesPerPage = 4;
  const totalPages = Math.ceil(trades.length / tradesPerPage);

  const totalTrades = trades.length;
  const wonTrades = trades.filter((t) => t.outcome === "Win").length;
  const lostTrades = trades.filter((t) => t.outcome === "Loss").length;
  const winRate = totalTrades ? Math.round((wonTrades / totalTrades) * 100) : 0;

  const paginatedTrades = groupedTrades.slice(
    (currentPage - 1) * tradesPerPage,
    currentPage * tradesPerPage
  );

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
        <DataTable columns={columns} data={paginatedTrades} />
      </div>

      <div className="flex justify-end mt-4">
        <div className="inline-block">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
