import Tag from "@/components/tag";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import { UserStatus, UserType } from "@/types/user-types";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical, EllipsisVerticalIcon } from "lucide-react";

export const columns: ColumnDef<UserType>[] = [
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
    accessorKey: "username",
    header: "User Name",
    cell: ({ row }) => {
      return (
        <>
          <div className="font-semibold text-sm">
            {row.getValue("username")}
          </div>
        </>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "subscriptionPlan",
    header: "Subbscription Plan",
    cell: ({ row }) => {
      return row.getValue("subscriptionPlan");
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<UserStatus>("status");
      return (
        <Tag
          label={status}
          variant={
            status === "active"
              ? "success"
              : status === "deleted"
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
    accessorKey: "email_verified",
    header: "Verified",
    cell: ({ row }) => {
      return (
        <Checkbox checked={row.getValue<boolean>("email_verified")} disabled />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.getValue("email"),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "last_login",
    header: "Last Login",
    cell: ({ row }) => formatDate(row.getValue("last_login")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "options",
    header: () => <EllipsisVerticalIcon size={20} />,
    cell: () => <EllipsisVertical size={20} />,
    enableSorting: false,
    enableHiding: false,
  },
];
