import React from "react";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

export default function InfoCard({
  title,
  data,
  className = "",
}: {
  title: string;
  data: { label: string; value: React.ReactNode }[];
  className?: string;
}) {
  return (
    <Card className={cn("p-4", className)}>
      <h4 className="font-medium text-sm text-[#0A0A0A]">{title}</h4>
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <div
            className="flex items-start justify-between gap-4"
            key={item.label}
          >
            <h5 className="font-[400] text-[14px] text-[#B4B4B4]">
              {item.label}
            </h5>
            <h5 className="font-normal text-[14px] text-gray text-right">
              {item.value}
            </h5>
          </div>
        ))}
      </div>
    </Card>
  );
}

// TODO: add key to
export function InfoCardLoader({
  title,
  rows = 5,
  className = "",
}: {
  title?: string;
  rows?: number;
  className?: string;
}) {
  return (
    <Card className={cn("p-4", className)}>
      {title ? (
        <h4 className="font-medium text-sm text-[#0A0A0A]">{title}</h4>
      ) : (
        <Skeleton className="h-5 w-40 bg-loading-background" />
      )}

      <div className="flex flex-col gap-4">
        {Array.from({ length: rows }).map(() => (
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-1/5 bg-loading-background" />
            <Skeleton className="h-4 w-2/3 bg-loading-background" />
          </div>
        ))}
      </div>
    </Card>
  );
}
