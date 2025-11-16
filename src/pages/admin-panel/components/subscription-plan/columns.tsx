import Tag from "@/components/tag";
import { Checkbox } from "@/components/ui/checkbox";
import { formatAmount, formatDate } from "@/lib/utils";
import { Feature, ISubscriptionPlan } from "@/types/subscription-plan-type";
import { ColumnDef } from "@tanstack/react-table";

export const FEATURES_LABELS_MAP: Record<Feature, string> = {
  analyse_charts: "Analyse Charts",
  get_analysis_history: "View Analysis History",
  get_trade_recommedations: "Get Trade Recommendations",
};

export type ColumnActions = {
  activate: (user: ISubscriptionPlan) => void;
  disactivate: (user: ISubscriptionPlan) => void;
};

export const getColumns = (
  actions: ColumnActions
): ColumnDef<ISubscriptionPlan>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <>
          <div className="font-semibold text-sm">{row.getValue("name")}</div>
        </>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return row.getValue("description") as string | undefined;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => formatAmount(Number.parseFloat(row.getValue("price"))),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "billing_interval",
    header: "Billing Interval",
    cell: ({ row }) => (
      <Tag label={row.getValue("billing_interval")} variant="neutral" />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "features",
    header: "Available Features",
    cell: ({ row }) => (
      <ul>
        {Object.entries(row.getValue("features")!)
          .filter((entry) => entry[1])
          .map((entry) => (
            <li>{FEATURES_LABELS_MAP[entry[0] as Feature]}</li>
          ))}
      </ul>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "is_active",
    header: "Is Active",
    cell: ({ row }) => {
      return (
        <Checkbox
          className="cursor-pointer"
          defaultChecked={row.getValue<boolean>("is_active")}
          onCheckedChange={(e) => {
            if (e) {
              actions.activate(row.original);
            } else {
              actions.disactivate(row.original);
            }
          }}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "created_at",
    header: "Creation date",
    cell: ({ row }) =>
      row.getValue("created_at")
        ? formatDate(new Date(row.getValue("created_at")))
        : "-",
    enableSorting: false,
    enableHiding: false,
  },
];
