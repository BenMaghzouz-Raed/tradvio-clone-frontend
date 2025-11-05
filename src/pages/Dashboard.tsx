import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Tag from "@/components/tag";
import Warning from "@/components/icons/warning";
import { dashboard_trades } from "../seeds/trade";
import { useIsMobile } from "@/hooks/use-mobile";
import StatsCard from "@/components/stats-card";
import { formatDate } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [daysLeft] = useState(7);
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden shadow-sm border-0 ">
        <div className="bg-black text-white rounded-lg flex overflow-hidden">
          <div className="flex flex-col justify-center space-y-6 p-4">
            <div className="space-y-4">
              <h2 className="xs:text-md sm:text-xl md:text-2xl lg:text-3xl font-bold">
                Good morning, Youssef Ghorbel!
              </h2>
              <p className="text[#E7E5E4] text-base sm:text-md lg:text-lg leading-relaxed">
                Stop guessing, start profiting. Upload your chart and let our
                custom AI instantly detect patterns, calculate risk, and
                generate a complete trade plan. Unlock smarter, data-driven
                decisions.
              </p>
            </div>
            <Button
              variant="secondary"
              className="bg-[var(--color-muted-foreground)] cursor-pointer text-white font-medium px-8 py-3 rounded-lg text-base w-fit"
            >
              Start Analyzing Chart
            </Button>
          </div>

          {!isMobile && (
            <div className="h-[250px] min-w-5/12">
              <img
                src="/images/background_image.jpeg"
                alt="Trading Graph"
                className="inset-0 w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </Card>

      {/* ====== Stats Row ====== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard label="Swing Trades Analyzed" value="2" />
        <StatsCard label="Scalp Trades Analyzed" value="8" />
        <StatsCard label="Win Rate" value="50%" />
        <StatsCard label="Profit Factor" value="9.1" />
      </div>

      {/* ====== Alert Banner ====== */}
      <Alert className="bg-[#7F7F7F] text-white flex justify-center items-center max-w-3xl mx-auto px-6 py-4 rounded-md shadow-sm text-center">
        <div className="flex flex-wrap justify-center items-center gap-2">
          <AlertTitle className="font-medium flex items-center gap-2">
            <Warning /> Heads Up!
          </AlertTitle>
          <AlertDescription className="text-sm flex flex-wrap justify-center items-center gap-2 text-white">
            Your trial ends in
            <span className="font-bold bg-[#4F4F4F] text-white px-2 py-0.5 rounded">
              {daysLeft}
            </span>
            days.
            <span className="mx-2 border-l border-white/40 h-4" />
            <Link
              to="#"
              className="font-semibold underline underline-offset-2 text-white hover:opacity-80"
            >
              Upgrade Now
            </Link>
            <span>to use premium features.</span>
          </AlertDescription>
        </div>
      </Alert>

      <div className="flex justify-between items-center mb-4 ">
        <h2 className="bg-[#F5F5F5] rounded-2xl  text-[#0A0A0A] p-2">
          Recent Trades
        </h2>
        <Button className="bg-[#7F7F7F] text-white hover:bg-gray-900">
          Record New Trade
        </Button>
      </div>

      <Table>
        <TableHeader className="bg-[#F5F5F5] p-0">
          <TableRow className="text-[#0A0A0A] font-medium">
            <TableHead>Title</TableHead>
            <TableHead>P&amp;L</TableHead>
            <TableHead>Outcome</TableHead>
            <TableHead>Trade Type</TableHead>
            <TableHead>Entry Price</TableHead>
            <TableHead>Exit Price</TableHead>
            <TableHead className="w-8 text-center">•••</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* ✅ Use dashboard_trades instead of trades */}
          {dashboard_trades.map((trade, i) => (
            <TableRow
              key={i}
              className="hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              {/* Title */}
              <TableCell className="py-3">
                <div>
                  <p className="font-semibold text-sm text-[#0A0A0A]">
                    {trade.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(trade.date)}
                  </p>
                </div>
              </TableCell>

              {/* P&L */}
              <TableCell>
                <Tag
                  label={trade.pnl}
                  variant={
                    trade.pnl.startsWith("+")
                      ? "success"
                      : trade.pnl.startsWith("-")
                      ? "error"
                      : "neutral"
                  }
                />
              </TableCell>

              {/* Outcome */}
              <TableCell>
                <Tag
                  label={trade.outcome}
                  variant={
                    trade.outcome === "Win"
                      ? "success"
                      : trade.outcome === "Loss"
                      ? "error"
                      : "warning"
                  }
                />
              </TableCell>

              <TableCell>
                <Tag label={trade.type} variant="neutral" />
              </TableCell>

              <TableCell className="text-[#0A0A0A]">{trade.entry}</TableCell>
              <TableCell className="text-[#0A0A0A]">{trade.exit}</TableCell>

              <TableCell className="text-center text-gray-400 cursor-pointer hover:text-gray-600">
                ⋯
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
