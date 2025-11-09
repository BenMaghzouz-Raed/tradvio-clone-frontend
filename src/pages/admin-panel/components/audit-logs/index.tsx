import DataTable from "@/components/data-table";
import { ILog } from "@/types/log-type";
import { useState } from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Download, SlidersVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const periods = ["Week", "Month", "Year"];

export default function AuditLogs({ data }: { data: ILog[] }) {
  const [period, setPeriod] = useState("Week");

  return (
    <div>
      <div className="mb-4 mt-2 flex justify-between">
        <Card className="flex-row gap-0 p-1 rounded-sm">
          {periods.map((item) => (
            <Button
              disabled={period === item}
              variant={period === item ? "outline" : "ghost"}
              onClick={() => setPeriod(item)}
              className={cn("rounded-sm", item !== period && "cursor-pointer")}
            >
              {item}
            </Button>
          ))}
        </Card>
        <div className="flex gap-2">
          <Button variant="outline" className="cursor-pointer">
            Filter <SlidersVertical />
          </Button>
          <Button variant="outline" className="cursor-pointer">
            Export <Download />
          </Button>
        </div>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
