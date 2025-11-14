"use client";

import { useEffect, useMemo, useState } from "react";
import DataTable from "@/components/data-table";
import { getColumns } from "./columns";
import type { IUser } from "@/types/user-types";
import { Button } from "@/components/ui/button";
import { SlidersVertical, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddUserForm from "./add-user-form";
import {
  listUsers,
  deleteUser as apiDeleteUser,
  updateUser as apiUpdateUser,
} from "@/services/domain/AdminUsersService";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toastNotification } from "@/lib/toast";

export default function ManageUsers() {
  const [data, setData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<IUser | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const rows = await listUsers();
      setData(rows);
    } catch (err: any) {
      toastNotification({
        message: err?.message || "Failed to load users",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleDelete = async (user: IUser) => {
    if (!confirm(`Delete user ${user.username}?`)) return;
    try {
      await apiDeleteUser(user.user_id);
      toastNotification({ message: "User deleted", type: "success" });
      await load();
    } catch (err: any) {
      toastNotification({
        message: err?.message || "Delete failed",
        type: "error",
      });
    }
  };

  const columns = useMemo(
    () =>
      getColumns({
        onEdit: (u) => setEditUser(u),
        onDelete: (u) => void handleDelete(u),
      }),
    []
  );

  // --- Edit form local state ---
  const [efirst, setEFirst] = useState<string>("");
  const [elast, setELast] = useState<string>("");
  const [euser, setEUser] = useState<string>("");
  const [eemail, setEEmail] = useState<string>("");
  const [etz, setETz] = useState<string>("UTC");
  const [erole, setERole] = useState<"admin" | "user">("user");
  const [estatus, setEStatus] = useState<"active" | "suspended" | "deleted">("active");
  const [epass, setEPass] = useState<string>(""); // optional

  useEffect(() => {
    if (editUser) {
      setEFirst(editUser.first_name || "");
      setELast(editUser.last_name || "");
      setEUser(editUser.username || "");
      setEEmail(editUser.email || "");
      setETz(editUser.timezone || "UTC");
      setERole((editUser.role as "admin" | "user") || "user");
      setEStatus((editUser.status as "active" | "suspended" | "deleted") || "active");
      setEPass(""); // do not prefill password
    }
  }, [editUser]);

  const submitEdit = async () => {
    if (!editUser) return;
    try {
      await apiUpdateUser(editUser.user_id, {
        firstName: efirst,
        lastName: elast,
        username: euser,
        email: eemail,
        timezone: etz,
        role: erole,
        status: estatus,
        password: epass || undefined,
      });
      toastNotification({ message: "User updated", type: "success" });
      setEditUser(null);
      await load();
    } catch (err: any) {
      toastNotification({
        message: err?.message || "Update failed",
        type: "error",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4 mt-2 space-x-4">
        <Button variant="outline" className="cursor-pointer">
          <SlidersVertical className="mr-2 h-4 w-4" />
          Filter
        </Button>

        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>

        <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add a New User</DialogTitle>
            </DialogHeader>

            <div className="py-4">
              <AddUserForm
                onSuccess={() => {
                  setAddOpen(false);
                  void load();
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable columns={columns} data={data} loading={loading} />

      {/* Edit user dialog */}
      <Dialog open={!!editUser} onOpenChange={(v) => !v && setEditUser(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1">
                <Label htmlFor="efirst">First name</Label>
                <Input id="efirst" value={efirst} onChange={(e) => setEFirst(e.target.value)} />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="elast">Last name</Label>
                <Input id="elast" value={elast} onChange={(e) => setELast(e.target.value)} />
              </div>
            </div>

            <div className="grid gap-1">
              <Label htmlFor="euser">Username</Label>
              <Input id="euser" value={euser} onChange={(e) => setEUser(e.target.value)} />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="eemail">Email</Label>
              <Input id="eemail" type="email" value={eemail} onChange={(e) => setEEmail(e.target.value)} />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="etz">Timezone</Label>
              <Input id="etz" value={etz} onChange={(e) => setETz(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1">
                <Label>Role</Label>
                <Select value={erole} onValueChange={(v) => setERole(v as "admin" | "user")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-1">
                <Label>Status</Label>
                <Select value={estatus} onValueChange={(v) => setEStatus(v as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="deleted">Deleted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-1">
              <Label htmlFor="epass">New Password (optional)</Label>
              <Input id="epass" type="password" value={epass} onChange={(e) => setEPass(e.target.value)} />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => setEditUser(null)}
              >
                Cancel
              </Button>
              <Button className="cursor-pointer" onClick={submitEdit}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
