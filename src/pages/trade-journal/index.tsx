import { useState } from "react";
import PaginationComponent from "@/components/pagination";
import tradesData from "@/seeds/trades.ts";
import StatsCard from "@/components/stats-card.tsx";
import DataTable from "@/components/data-table.tsx";
import { Button } from "@/components/ui/button.tsx";
import PageSizeSelector from "@/components/page-size-selector.tsx";
import { columns } from "./components/columns";
import { useAuth } from "@/hooks/use-auth";
import { SlidersVertical } from "lucide-react";

function TradeJournal() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(tradesData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = tradesData.slice(startIndex, startIndex + rowsPerPage);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useAuth();

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard label="Total P&L" value="$178.11" />
        <StatsCard label="Win Rate" value="50%" />
        <StatsCard label="Avg. Win" value="$200.00" />
        <StatsCard label="Avg. Loss" value="$21.89" />
      </div>

      <div className="flex justify-end mb-4 gap-2">
        <Button variant="outline" className=" hover:bg-gray-100 cursor-pointer">
          Filter
          <SlidersVertical className="w-5 h-5" />
        </Button>

        <Button className="bg-black text-white cursor-pointer hover:bg-gray-800">
          Record New Trade
        </Button>
      </div>

      <DataTable columns={columns} data={currentRows} />

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
