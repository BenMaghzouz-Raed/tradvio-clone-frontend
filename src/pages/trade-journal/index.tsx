/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import PaginationComponent from "@/components/pagination";
import StatsCard from "@/components/stats-card.tsx";
import DataTable from "@/components/data-table.tsx";
import { Button } from "@/components/ui/button.tsx";
import PageSizeSelector from "@/components/page-size-selector.tsx";
import { columns } from "./components/columns";
import { SlidersVertical } from "lucide-react";
import { getTrades } from "@/services/domain/TradeService";
import { toastNotification } from "@/lib/toast";

// TODO: add correct pagination to backend (must contain total pages or total)
const total = 20;

function TradeJournal() {
  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [trades, setTrades] = useState([]);

  const fetchData = async (conditions: any) => {
    try {
      setLoading(true);
      const res: any = await getTrades(conditions);
      setTrades(res.items);
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

  const totalPages = useMemo(() => Math.ceil(trades.length / total), [trades]);
  return (
    <div>
      <div className="flex flex-wrap justify-around gap-4 mb-4">
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
