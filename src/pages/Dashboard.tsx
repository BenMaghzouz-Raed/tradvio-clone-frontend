import InfoCard, { InfoCardLoader } from "@/components/info-card";
import { Signal } from "@/components/signal";
import StatsCard, { StatsCardLoader } from "@/components/stats-card";
import Status from "@/components/status";
import Tag from "@/components/tag";
import TrandeCard from "@/components/trade-card";
import Upload from "@/components/upload";
import { TRADES } from "@/seeds/trade";

const infoCardData = [
  { label: "Direction:", value: "Long" },
  { label: "Market Trend:", value: <Tag label="Bullish" variant="success" /> },
  { label: "Pattern:", value: "Ascending Triangle" },
  { label: "volatility:", value: "Medium" },
  { label: "Data Confidence:", value: "97%" },
  {
    label: "Stop Loss:",
    value: (
      <h3 className="font-bold text-sm font-600 text-[#1C1917]">$29.00</h3>
    ),
  },
];

export default function Dashboard() {
  return (
    <>
      <div className="flex gap-4 flex-wrap mb-8">
        <StatsCard label="total tips" value="$178,5" />
        <StatsCard label="total tips" value="$178,5" />
        <StatsCard label="total tips" value="$178,5" />
        <StatsCard label="total tips" value="$178,5" />
        <StatsCardLoader />
      </div>
      <Upload name="image" label="image label" />
      <Tag label="Win" variant="success" />
      <Tag label="Loss" variant="error" />
      <Tag label="Not Taken" variant="warning" />
      <Tag label="Long" variant="neutural" />
      <InfoCard title="Analysis Results" data={infoCardData} />
      <InfoCardLoader title="Analysis Results" />
      <InfoCardLoader />

      <Status label="Active" variant="success" />
      <Status label="inActive" variant="error" />
      <Status label="wating" variant="warning" />
      <Status label="none" variant="neutural" />

      <Signal label="Active" variant="success" />
      <Signal label="inActive" variant="error" />
      <Signal label="wating" variant="warning" />
      <Signal label="none" variant="neutural" />

      <div className="flex flex-wrap gap-3">
        {TRADES.map((trade) => (
          <TrandeCard key={trade.id} trade={trade} />
        ))}
      </div>
    </>
  );
}
