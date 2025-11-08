import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleAlert, CircleCheck, TriangleAlert } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "New project assigned",
    description: "You have been assigned to the Material XD Version project",
    time: "2 min ago",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Task completed",
    description: "Fix Platform Errors task has been completed successfully",
    time: "1 hour ago",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "Budget alert",
    description: "Project budget has exceeded 80% of allocated funds",
    time: "3 hours ago",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 4,
    title: "New team member",
    description: "Sophie B. has joined your team",
    time: "1 day ago",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 5,
    title: "Server maintenance",
    description: "Scheduled maintenance will occur tonight from 2–4 AM",
    time: "2 days ago",
    color: "bg-red-100 text-red-600",
  },
];

export default function Notifications() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg text-neutral-800">
          Recent Notifications
        </CardTitle>
        <Button
          variant="ghost"
          className="bg-[#E7E5E4] text-sm text-[#44403C] hover:text-black cursor-pointer"
        >
          Mark all as read
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <ul className="divide-y divide-neutral-100">
          {notifications.map((notif) => {
            const isNew = notif.title.toLowerCase().includes("new");
            const isCompleted = notif.title
              .toLowerCase()
              .includes("task completed");
            const isBudgetAlert = notif.title
              .toLowerCase()
              .includes("budget alert");

            return (
              <li
                key={notif.id}
                className="flex justify-between items-start p-4"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${notif.color}`}
                  >
                    {isCompleted ? (
                      <CircleCheck className="w-4 h-4" />
                    ) : isBudgetAlert ? (
                      <TriangleAlert className="w-4 h-4" />
                    ) : isNew ? (
                      <CircleAlert className="w-4 h-4 text-blue-600" />
                    ) : (
                      "•"
                    )}
                  </span>
                  <div>
                    <p className="font-medium text-neutral-800">
                      {notif.title}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {notif.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <time className="text-xs text-neutral-400 whitespace-nowrap">
                    {notif.time}
                  </time>
                  <div className="w-2 h-2  rounded-full bg-[#3B82F6]" />
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
