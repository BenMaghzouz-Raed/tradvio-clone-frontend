import { ReactNode } from "react";
import MarketingHighlight from "./marketing-highlights";

export function AuthLayout({
  title,
  highlights,
  children,
}: {
  title: string;
  highlights: string[];
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen text-white">
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-[url('/images/background_image.jpeg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 p-8 rounded-2xl max-w-lg">
          <h1 className="text-5xl font-bold mb-6 leading-tight">{title}</h1>

          <div className="flex flex-wrap gap-2">
            {highlights.map((highlight) => (
              <MarketingHighlight label={highlight} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-black">
        {children}
      </div>
    </div>
  );
}
