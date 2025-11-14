import Tag from "@/components/tag";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { UserStatus, IUser } from "@/types/user-types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit3, Trash2 } from "lucide-react";

export type ColumnActions = {
  onEdit: (user: IUser) => void;
  onDelete: (user: IUser) => void;
};

export const getColumns = (actions: ColumnActions): ColumnDef<IUser>[] => [
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
      return row.getValue("subscriptionPlan") as string | undefined;
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
    cell: ({ row }) => row.getValue("email") as string,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "last_login",
    header: "Last Login",
    cell: ({ row }) => {
      const v = row.getValue("last_login") as string | Date | null | undefined;
      return v ? formatDate(new Date(v)) : "-";
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original as IUser;
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2 cursor-pointer"
            onClick={() => actions.onEdit(user)}
            title="Edit"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="h-8 px-2 cursor-pointer"
            onClick={() => actions.onDelete(user)}
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
