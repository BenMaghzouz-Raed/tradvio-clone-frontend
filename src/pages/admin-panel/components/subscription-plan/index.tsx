/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toastNotification } from "@/lib/toast";
import {
  activateSubscriptionPlan,
  disactivateSubscriptionPlan,
  getSubscriptionPlans,
} from "@/services/domain/SubscriptionPlanService";
import { ISubscriptionPlan } from "@/types/subscription-plan-type";
import { getColumns } from "./columns";
import AddPlanModal from "./add-plan-modal";

export default function ManageSubscriptionPlans() {
  const [data, setData] = useState<ISubscriptionPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addOpen, setAddOpen] = useState<boolean>(false);

  const activatePlan = async (plan: ISubscriptionPlan) => {
    try {
      await activateSubscriptionPlan(plan.plan_id);
      toastNotification({
        type: "success",
        message: "Plan Activated Succesfully",
      });
    } catch (err: any) {
      toastNotification({
        type: "error",
        message: err.message,
      });
    }
  };

  const disactivatePlan = async (plan: ISubscriptionPlan) => {
    try {
      await disactivateSubscriptionPlan(plan.plan_id);
      toastNotification({
        type: "success",
        message: "Plan Disactivated Succesfully",
      });
    } catch (err: any) {
      toastNotification({
        type: "error",
        message: err.message,
      });
    }
  };

  const load = async () => {
    setLoading(true);
    try {
      const rows = await getSubscriptionPlans();
      setData(rows.data);
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

  return (
    <div>
      <div className="flex justify-end mb-4 mt-2 space-x-4">
        <AddPlanModal open={addOpen} setOpen={setAddOpen}>
          <Button variant="outline" className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Add Plan
          </Button>
        </AddPlanModal>
      </div>

      <DataTable
        columns={getColumns({
          activate: activatePlan,
          disactivate: disactivatePlan,
        })}
        data={data}
        loading={loading}
      />
    </div>
  );
}
