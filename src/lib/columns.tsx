import { ITrade, TradeOutcome } from "@/types/trade";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { formatAmount, formatDate } from "./utils";
import Tag from "@/components/tag";
import Options from "@/components/icons/options";

export const columns: ColumnDef<ITrade>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <>
          <div className="font-semibold text-sm">{row.getValue("title")}</div>
          <div className="text-xs text-gray-400">
            {formatDate(row.original.date)}
          </div>
        </>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "pnl",
    header: "P&L",
    cell: ({ row }) => {
      const pnl = row.getValue("pnl") as number;
      return (
        <Tag
          label={pnl > 0 ? `+${formatAmount(pnl)}` : `${formatAmount(pnl)}`}
          variant={pnl > 0 ? "success" : pnl < 0 ? "error" : "neutral"}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "outcome",
    header: "Outcome",
    cell: ({ row }) => {
      const outcome = row.getValue("outcome") as TradeOutcome;
      return (
        <Tag
          label={outcome}
          variant={
            outcome === "Win"
              ? "success"
              : outcome === "Loss"
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
    accessorKey: "tradeType",
    header: "Trade Type",
    cell: ({ row }) => (
      <Tag label={row.getValue("tradeType")} variant="neutral" />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "entry",
    header: "Entry Price",
    cell: ({ row }) => formatAmount(row.getValue("entry")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "exit",
    header: "Exit Price",
    cell: ({ row }) => formatAmount(row.getValue("exit")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "options",
    header: () => <Options stroke="#000000" />,
    cell: () => <Options stroke="#000000" />,
    enableSorting: false,
    enableHiding: false,
  },
];
