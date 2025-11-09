import DataTable from "@/components/data-table";
import { columns } from "./columns";
import { IUser } from "@/types/user-types";
import { Button } from "@/components/ui/button";
import { SlidersVertical } from "lucide-react";

export default function ManageUsers({ data }: { data: IUser[] }) {
  return (
    <div>
      <div className="flex justify-end mb-4 mt-2">
        <Button variant="outline" className="cursor-pointer">
          Filter <SlidersVertical />
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
