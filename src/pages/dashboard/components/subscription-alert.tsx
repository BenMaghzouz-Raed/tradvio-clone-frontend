import Warning from "@/components/icons/warning";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "react-router-dom";

export default function SubscriptionAlert({ daysLeft }: { daysLeft: number }) {
  return (
    <Alert className="bg-[#7F7F7F] text-white flex justify-center items-center max-w-3xl mx-auto px-6 py-4 rounded-md shadow-sm text-center">
      <div className="flex flex-wrap justify-center items-center gap-2">
        <AlertTitle className="font-medium flex items-center gap-2">
          <Warning /> Heads Up!
        </AlertTitle>
        <AlertDescription className="text-sm flex flex-wrap justify-center items-center gap-2 text-white">
          Your trial ends in
          <span className="font-bold bg-[#4F4F4F] text-white px-2 py-0.5 rounded">
            {daysLeft}
          </span>
          days.
          <span className="mx-2 border-l border-white/40 h-4" />
          <Link
            to="#"
            className="font-semibold underline underline-offset-2 text-white hover:opacity-80"
          >
            Upgrade Now
          </Link>
          <span>to use premium features.</span>
        </AlertDescription>
      </div>
    </Alert>
  );
}
