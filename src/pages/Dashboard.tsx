import InfoCard, { InfoCardLoader } from "@/components/info-card";
import StatsCard, { StatsCardLoader } from "@/components/StatsCard";
import Tag from "@/components/tag";
import Upload from "@/components/upload";

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
    </>
  );
}
