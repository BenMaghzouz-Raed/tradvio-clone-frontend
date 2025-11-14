import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddUserForm from "./add-user-form";

export default function AddUserModal({
  onAdded,
}: {
  onAdded?: () => void;
}) {
  return (
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
          <AddUserForm onSuccess={onAdded} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
