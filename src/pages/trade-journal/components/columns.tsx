import { ITrade, TradeOutcome } from "@/types/trade";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { formatAmount, formatDate } from "../../../lib/utils";
import Tag from "@/components/tag";
import { EllipsisVertical } from "lucide-react";

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
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      return <Tag label={row.getValue("source")} variant="success" />;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "profit_loss",
    header: "P&L",
    cell: ({ row }) => {
      const pnl = row.getValue("profit_loss") as number;
      return pnl ? (
        <Tag
          label={pnl > 0 ? `+${formatAmount(pnl)}` : `${formatAmount(pnl)}`}
          variant={pnl > 0 ? "success" : pnl < 0 ? "error" : "neutral"}
        />
      ) : (
        "NC"
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
      return outcome ? (
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
      ) : (
        "NC"
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "profit_percent",
    header: "Profit Percent",
    cell: ({ row }) => {
      return row.getValue("profit_percent") ?? "NC";
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "trade_type",
    header: "Trade Type",
    cell: ({ row }) =>
      row.getValue("trade_type") ? (
        <Tag label={row.getValue("trade_type")} variant="neutral" />
      ) : (
        "NC"
      ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) =>
      row.getValue("symbol") ? (
        <Tag label={row.getValue("symbol")} variant="neutral" />
      ) : (
        "NC"
      ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "entry_price",
    header: "Entry Price",
    cell: ({ row }) =>
      row.getValue("entry_price")
        ? formatAmount(row.getValue("entry_price"))
        : "NC",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "exit_price",
    header: "Exit Price",
    cell: ({ row }) =>
      row.getValue("exit_price")
        ? formatAmount(row.getValue("exit_price"))
        : "NC",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "trade_date",
    header: "Trade Date",
    cell: ({ row }) =>
      row.getValue("trade_date")
        ? formatDate(new Date(row.getValue("trade_date")))
        : "NC",
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "options",
    header: () => <EllipsisVertical />,
    cell: () => <EllipsisVertical />,
    enableSorting: false,
    enableHiding: false,
  },
];
