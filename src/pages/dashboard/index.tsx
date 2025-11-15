/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import StatsCard from "@/components/stats-card";
import TopBanner from "./components/top-banner";
import SubscriptionAlert from "./components/subscription-alert";
import DataTable from "@/components/data-table";
import { columns } from "./components/table-columns";
import { getTrades } from "@/services/domain/TradeService";
import { toastNotification } from "@/lib/toast";
import { formatPercent } from "@/lib/utils";
import { Activity, BarChart3, Target, TrendingUp } from "lucide-react";

function normalize(value: any): string {
  if (!value) return "";
  return String(value).toUpperCase();
}

export default function Dashboard() {
  const [daysLeft] = useState(7);
  const [loading, setLoading] = useState(true);
  const [trades, setTrades] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res: any = await getTrades({});
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
    fetchData();
  }, []);

  const stats = useMemo(() => {
    const total = trades.length || 0;
    const swing = trades.filter((t) => normalize(t.trade_type) === "SWING").length;
    const scalp = trades.filter((t) => normalize(t.trade_type) === "SCALP").length;
    const wins = trades.filter((t) => normalize(t.outcome) === "WIN").length;
    const losses = trades.filter((t) => normalize(t.outcome) === "LOSS").length;
    const winRate = total ? (wins / total) * 100 : 0;

    const grossProfit = trades
      .filter((t) => Number(t.profit_loss) > 0)
      .reduce((acc, t) => acc + Number(t.profit_loss || 0), 0);
    const grossLoss = trades
      .filter((t) => Number(t.profit_loss) < 0)
      .reduce((acc, t) => acc + Math.abs(Number(t.profit_loss || 0)), 0);
    const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? Infinity : 0;

    return { swing, scalp, winRate, profitFactor };
  }, [trades]);

  return (
    <div className="space-y-4">
      <TopBanner firstName="Youssef" lastName="Ghorbel" />

      <div className="flex flex-wrap justify-around gap-4">
        <StatsCard
          label="Swing Trades Analyzed"
          value={String(stats.swing)}
          icon={<BarChart3 className="h-5 w-5" />}
        />
        <StatsCard
          label="Scalp Trades Analyzed"
          value={String(stats.scalp)}
          icon={<Activity className="h-5 w-5" />}
        />
        <StatsCard
          label="Win Rate"
          value={formatPercent(stats.winRate, 0)}
          icon={<Target className="h-5 w-5" />}
          variant="success"
        />
        <StatsCard
          label="Profit Factor"
          value={Number.isFinite(stats.profitFactor) ? stats.profitFactor.toFixed(2) : "∞"}
          icon={<TrendingUp className="h-5 w-5" />}
          variant="success"
        />
      </div>

      <SubscriptionAlert daysLeft={daysLeft} />

      <div className="flex justify-between items-center mb-4 ">
        <h2 className="bg-[#F5F5F5] rounded-2xl  text-[#0A0A0A] p-2">Recent Trades</h2>
        <Button className="bg-[#7F7F7F] text-white hover:bg-gray-900 cursor-pointer">
          Record New Trade
        </Button>
      </div>

      <DataTable columns={columns} data={trades} loading={loading} />
    </div>
  );
}
