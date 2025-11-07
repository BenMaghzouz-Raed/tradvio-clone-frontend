import TradeStep from "@/components/trade-step";
import { Card } from "@/components/ui/card";

export default function HowItWorks() {
  return (
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
  );
}
