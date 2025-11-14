import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

export default function AnalysisLoading() {
  return (
    <div className="w-full">
      {/* Center hero loader */}
      <Card className="relative overflow-hidden p-8 flex flex-col items-center justify-center h-[360px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_60%)]" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="size-14 rounded-full bg-purple-100 text-purple-600 grid place-items-center shadow-inner animate-pulse">
            <Spinner className="size-6 text-purple-600" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">Analyzing your chart…</h3>
            <p className="text-sm text-gray-500">We’re extracting data points and running the AI models.</p>
          </div>
          {/* Subtle progress shimmer */}
          <div className="w-72 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-1/3 bg-gradient-to-r from-purple-400/70 via-purple-500 to-purple-400/70 animate-[progress_1.6s_ease-in-out_infinite] rounded-full" />
          </div>
        </div>
      </Card>

      {/* Anticipated result skeletons */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card className="p-4 col-span-2 lg:col-span-1">
          <Skeleton className="h-5 w-32 mb-4" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between mb-3 last:mb-0">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </Card>
        <Card className="p-4 col-span-2 lg:col-span-1">
          <Skeleton className="h-5 w-32 mb-4" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between mb-3 last:mb-0">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </Card>
        <Card className="p-4 col-span-2 lg:col-span-1">
          <Skeleton className="h-5 w-32 mb-4" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between mb-3 last:mb-0">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </Card>
        <Card className="p-4 col-span-2 lg:col-span-1">
          <Skeleton className="h-5 w-32 mb-4" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between mb-3 last:mb-0">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </Card>
        <Card className="p-4 col-span-2">
          <Skeleton className="h-5 w-40 mb-4" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between mb-3 last:mb-0">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-48" />
            </div>
          ))}
        </Card>
      </div>

      {/* progress keyframes */}
      <style>{`
        @keyframes progress {
          0% { transform: translateX(-66%); }
          50% { transform: translateX(33%); }
          100% { transform: translateX(133%); }
        }
      `}</style>
    </div>
  );
}
