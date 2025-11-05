import { formatDate } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Signal } from "./signal";
import Tag from "./tag";
import Download from "./icons/download";
import { ITrade } from "@/types/trade";

export default function TrandeCard({ trade }: { trade: ITrade }) {
  return (
    <Card className="p-3 flex flex-col gap-2 md:w-140">
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-[#171717] text-lg">
            Ascending Triangle - Daily
          </h2>
          <h3 className="text-gray font-[400 text-sm]">
            {formatDate(trade.date)}
          </h3>
        </div>
        <Button className="cursor-pointer" variant="outline">
          View full analytics
        </Button>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            {trade.tags.map((tag) => (
              <Tag label={tag} variant="neutral" key={tag} />
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <Signal
              label={trade.signal}
              variant={trade.signal === "BUY" ? "success" : "neutral"}
            />
            <h2>${trade.value}</h2>
          </div>
        </div>
        <Button className="flex gap-2 cursor-pointer" variant="outline">
          <Download /> Export CSV/PDF
        </Button>
      </div>

      <div className="flex justify-center w-full">
        <img className="w-5/6" src={trade.image} alt="trade graph" />
      </div>
    </Card>
  );
}
