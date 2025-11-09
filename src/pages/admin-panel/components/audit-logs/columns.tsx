import Tag from "@/components/tag";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDate, truncate } from "@/lib/utils";
import { ILog, LogAction } from "@/types/log-type";
import { IUser } from "@/types/user-types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ILog>[] = [
  {
    accessorKey: "user",
    header: "Logs",
    cell: ({ row }) => {
      return (
        <>
          <div className="font-semibold text-sm">
            {row.getValue<IUser>("user")?.username}
          </div>
          <div className="text-xs text-gray-400">
            {row.getValue<IUser>("user")?.email}
          </div>
        </>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "action",
    header: "Event Type",
    cell: ({ row }) => {
      const action = row.getValue<LogAction>("action");
      return (
        <Tag
          label={action}
          variant={
            action === "POST"
              ? "success"
              : action === "DELETE"
              ? "error"
              : "warning"
          }
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "values",
    header: "Description",
    cell: ({ row }) => {
      const value = JSON.stringify(row.getValue<JSON>("values"));
      return value.length > 30 ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <p>{truncate(value, 30)}</p>
          </TooltipTrigger>
          <TooltipContent className="">
            <p>{value}</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <>value</>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "entity_type",
    header: "Entity",
    cell: ({ row }) => {
      return <p>{row.getValue("entity_type")}</p>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "entity_id",
    header: "Entity ID",
    cell: ({ row }) => row.getValue("entity_id"),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "created_at",
    header: "created at",
    cell: ({ row }) => formatDate(row.getValue("created_at")),
    enableSorting: false,
    enableHiding: false,
  },
];
