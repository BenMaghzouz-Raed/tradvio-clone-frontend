import Scalp from "@/components/icons/scalp";
import Swing from "@/components/icons/swing";
import TradeStep from "@/components/trade-step";
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
import { useState } from "react";

// TODO: add form and form fields, validation schema
export default function Analyser() {
  const [tradingType, setTradingType] = useState<"scalp" | "swing">("swing");

  return (
    <div className="flex flex-wrap gap-5 w-full 2xl:justify-between justify-center">
      <Card className="sm:p-8 p-3 gap-2 h-fit flex-grow">
        <h2 className="font-lg sm:text-md text-sm text-black">
          🎯 How It Works — Simple & Fast
        </h2>
        <div className="sm:px-6 px-2 py-2 flex flex-col gap-4">
          <TradeStep
            title="🛠️ Step 1 — Set Your Trade Parameters"
            description="Adjust your risk, reward, and trading style so the AI understands your strategy."
          />
          <TradeStep
            title="📊 Step 2 — Upload Your Chart"
            description=" Choose a clean chart with clear candlesticks and any indicators you’re using."
          />
          <TradeStep
            title="🤖 Step 3 — AI Pattern Recognition"
            description="Our AI scans your chart for key patterns, support/resistance zones, and trade setups"
          />
          <TradeStep
            title="🚀 Step 4 — Execute Smarter Trades"
            description="Review the insights and make confident, data-driven trading decisions."
          />
        </div>
      </Card>
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
            <Swing /> Swing Trading
          </Button>
          <Button
            className="flex-grow"
            disabled={tradingType === "scalp"}
            variant={tradingType === "swing" ? "outline" : "ghost"}
            onClick={() => setTradingType("scalp")}
          >
            <Scalp /> Scalp Trading
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
    </div>
  );
}
