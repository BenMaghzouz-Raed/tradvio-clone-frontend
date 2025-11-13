import DataTable from "@/components/data-table";
import { columns } from "./columns";
import { IUser } from "@/types/user-types";
import { Button } from "@/components/ui/button";
import { SlidersVertical, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import AddUserForm from "./add-user-form";

export default function ManageUsers({ data }: { data: IUser[] }) {
  return (
    <div>
      <div className="flex justify-end mb-4 mt-2 space-x-4">
        <Button variant="outline" className="cursor-pointer">
          <SlidersVertical className="mr-2 h-4 w-4" />
          Filter
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-lg">
            <DialogHeader className="space-y-1">
              <DialogTitle>Add a New User</DialogTitle>
              <DialogDescription className="text-sm text-gray-500 block">
                Enter information to add a user
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <AddUserForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable columns={columns} data={data} loading />
    </div>
  );
}
