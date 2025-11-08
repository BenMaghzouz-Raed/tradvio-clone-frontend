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
import { BrainCog, Grid } from "lucide-react";
import { useState } from "react";

export default function AnalysisForm() {
  const [tradingType, setTradingType] = useState<"scalp" | "swing">("swing");

  return (
    <Card className="w-fit p-4 gap-2">
      <Upload
        name="image"
        label="Upload Chart Image"
        className="w-full h-50 mb-8"
      />
      <span className="text-gray sm:text-sm text-xs">Trading Type</span>
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
          <div>
            <span className="text-[#BDBDBD] sm:text-sm text-xs">
              Account Balance ($)
            </span>
            <Input name="accountBlanace" placeholder="200" type="number" />
          </div>
          <div>
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
          <div>
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
          <div>
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
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Time Frame</SelectLabel>
            <SelectItem value="apple">Daily</SelectItem>
            <SelectItem value="banana">Weekly</SelectItem>
            <SelectItem value="blueberry">Monthly</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button className="w-1/2 ml-auto bg-purple-500 mt-4">
        Analyze Chart
      </Button>
    </Card>
  );
}
