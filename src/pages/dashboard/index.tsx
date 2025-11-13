/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import StatsCard from "@/components/stats-card";
import TopBanner from "./components/top-banner";
import SubscriptionAlert from "./components/subscription-alert";
import DataTable from "@/components/data-table";
import { columns } from "./components/table-columns";
import { getTrades } from "@/services/domain/TradeService";
import { toastNotification } from "@/lib/toast";

export default function Dashboard() {
  const [daysLeft] = useState(7);
  const [loading, setLoading] = useState(true);
  const [trades, setTrades] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res: any = await getTrades({});
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
    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      <TopBanner firstName="Youssef" lastName="Ghorbel" />

      <div className="flex flex-wrap justify-around gap-4">
        <StatsCard label="Swing Trades Analyzed" value="2" />
        <StatsCard label="Scalp Trades Analyzed" value="8" />
        <StatsCard label="Win Rate" value="50%" />
        <StatsCard label="Profit Factor" value="9.1" />
      </div>

      <SubscriptionAlert daysLeft={daysLeft} />

      <div className="flex justify-between items-center mb-4 ">
        <h2 className="bg-[#F5F5F5] rounded-2xl  text-[#0A0A0A] p-2">
          Recent Trades
        </h2>
        <Button className="bg-[#7F7F7F] text-white hover:bg-gray-900 cursor-pointer">
          Record New Trade
        </Button>
      </div>

      <DataTable columns={columns} data={trades} loading={loading} />
    </div>
  );
}
