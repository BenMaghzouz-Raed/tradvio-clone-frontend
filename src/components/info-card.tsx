import React from "react";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function InfoCard({
  title,
  data,
}: {
  title: string;
  data: { label: string; value: React.ReactNode }[];
}) {
  return (
    <Card className="p-8 w-64 md:w-80 lg:w-124">
      <h4 className="font-medium text-sm text-[#0A0A0A]">{title}</h4>
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <div className="flex justify-between items-center" key={item.label}>
            <h5 className="font-[400] text-[14px] text-[#B4B4B4]">
              {item.label}
            </h5>
            <h5 className="font-normal text-[14px] text-gray">{item.value}</h5>
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
}: {
  title?: string;
  rows?: number;
}) {
  return (
    <Card className="p-8 w-64 md:w-80 lg:w-124">
      {title ? (
        <h4 className="font-medium text-sm text-[#0A0A0A]">{title}</h4>
      ) : (
        <Skeleton className="h-10 w-40 bg-loading-background" />
      )}

      <div className="flex flex-col gap-4">
        {Array.from({ length: rows }).map(() => (
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-32 bg-loading-background" />
            <Skeleton className="h-8 w-32 bg-loading-background" />
          </div>
        ))}
      </div>
    </Card>
  );
}
