/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn, formatDate } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Signal } from "./signal";
import { Download } from "lucide-react";
import { AnalysisType } from "@/types/analysis-type";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function AnalysisCard({
  analysis,
  className,
  exportCsv,
  exportPdf,
}: {
  analysis: AnalysisType;
  className?: string;
  exportCsv: () => void;
  exportPdf: () => void;
}) {
  return (
    <Card className={cn("p-3 flex flex-col gap-2", className)}>
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-[#171717] text-lg">
            {analysis.pattern ?? "No Pattern Detected"}
          </h2>
          <h3 className="text-gray font-[400 text-sm]">
            {analysis.created_at
              ? formatDate(new Date(analysis.created_at))
              : "-"}
          </h3>
        </div>
        <Button className="cursor-pointer" variant="outline">
          View full analytics
        </Button>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          {/* <div className="flex gap-2">
            {trade.tags?.map((tag) => (
              <Tag label={tag} variant="neutral" key={tag} />
            ))}
          </div> */}
          {analysis.direction && (
            <div className="flex gap-2 items-center">
              <Signal
                label={analysis.direction!}
                variant={analysis.direction === "LONG" ? "success" : "error"}
              />
              {/* <h2>{formatAmount(trade.value!)}</h2> */}
            </div>
          )}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="flex gap-2 cursor-pointer" variant="outline">
              <Download /> Export CSV/PDF
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-30 p-1">
            <Button
              variant="outline"
              className="cursor-pointer mb-1 w-full"
              onClick={() => exportCsv()}
            >
              CSV
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer w-full"
              onClick={() => exportPdf()}
            >
              PDF
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex justify-center w-full">
        <img
          className="w-5/6"
          src={
            analysis.chart_image_url
              ? analysis.chart_image_url
              : "/images/graph.png"
          }
          alt="trade graph"
        />
      </div>
    </Card>
  );
}
