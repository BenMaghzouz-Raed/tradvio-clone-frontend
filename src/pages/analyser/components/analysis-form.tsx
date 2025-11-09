import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Upload from "@/components/upload";
import { cn } from "@/lib/utils";
import { TradeType } from "@/types/trade";
import { BrainCog, Grid } from "lucide-react";
import { useState } from "react";

const TRADE_TYPE_TIME_FRAMES_MAP: Record<
  TradeType,
  { label: string; value: string }[]
> = {
  swing: [
    { label: "1-Hour", value: "1-h" },
    { label: "4-Hour", value: "4-h" },
    { label: "Daily", value: "d" },
    { label: "Weekly", value: "w" },
  ],
  scalp: [
    { label: "1-Min", value: "1-m" },
    { label: "2-Min", value: "2-m" },
    { label: "5-Min", value: "5-m" },
  ],
};

export default function AnalysisForm({
  className = "",
}: {
  className?: string;
}) {
  const [tradingType, setTradingType] = useState<TradeType>("swing");

  return (
    <Card className={cn("w-fit p-4 gap-2", className)}>
      <Upload
        name="image"
        label="Upload Chart Image"
        className="w-full h-50 mb-8"
      />
      <span className="text-gray sm:text-sm text-xs">
        Trading Type ({tradingType === "scalp" ? "Scalp" : "Swing"})
      </span>
      <div className="flex justify-between gap-2">
        <Button
          className="flex-grow"
          disabled={tradingType === "swing"}
          variant={tradingType === "swing" ? "ghost" : "outline"}
          onClick={() => setTradingType("swing")}
        >
          <Grid /> Swing Trading
        </Button>
        <Button
          className="flex-grow"
          disabled={tradingType === "scalp"}
          variant={tradingType === "swing" ? "outline" : "ghost"}
          onClick={() => setTradingType("scalp")}
        >
          <BrainCog /> Scalp Trading
        </Button>
      </div>
      <span className="text-gray sm:text-sm text-xs">Risk Parameters</span>
      <div className="flex flex-col">
        <div className="flex justify-between gap-2">
          <div className="flex-grow">
            <span className="text-[#BDBDBD] sm:text-sm text-xs">
              Account Balance ($)
            </span>
            <Input name="accountBlanace" placeholder="200" type="number" />
          </div>
          <div className="flex-grow">
            <span className="text-[#BDBDBD] sm:text-sm text-xs">
              Risk Per Trade (%)
            </span>
            <Input
              name="takeProfit"
              prefix="$"
              placeholder="200"
              type="number"
            />
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex-grow">
            <span className="text-[#BDBDBD] sm:text-sm text-xs">
              Stop Loss (Points)
            </span>
            <Input
              name="takeProfit"
              prefix="$"
              placeholder="200"
              type="number"
            />
          </div>
          <div className="flex-grow">
            <span className="text-[#BDBDBD] sm:text-sm text-xs">
              Take Profit (Points)
            </span>
            <Input
              name="takeProfit"
              prefix="$"
              placeholder="200"
              type="number"
            />
          </div>
        </div>
      </div>
      <span className="text-gray sm:text-sm text-xs">Chart Timeframe</span>
      <Select>
        <SelectTrigger className="w-full ">
          <SelectValue placeholder="Select a Time Frame" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Time Frame</SelectLabel>
            {TRADE_TYPE_TIME_FRAMES_MAP[tradingType].map((timeFrame) => (
              <SelectItem value={timeFrame.value}>{timeFrame.label}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex gap-2">
        <Button className="flex-grow" variant="outline">
          Analyze Chart
        </Button>
        <Button className="flex-grow bg-purple-500">Analyze Chart</Button>
      </div>
    </Card>
  );
}
