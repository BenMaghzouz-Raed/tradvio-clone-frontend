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
    <div className="w-full lg:grid h-screen lg:grid-cols-5">
      <div className="hidden lg:block relative lg:col-span-3">
        <div
          className="absolute inset-0 bg-cover bg-center"
        />
        <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-80">
          <div className="text-center text-white p-12 max-w-3xl">
            <h1 className="text-7xl font-black mb-8 leading-tight tracking-tighter [text-shadow:_0_4px_8px_rgb(0_0_0_/_40%)]">
              {title}
            </h1>
            <div className="flex flex-wrap gap-4 justify-center">
              {highlights.map((highlight) => (
                <MarketingHighlight label={highlight} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center lg:col-span-2 bg-background">
        {children}
      </div>
    </div>
  );
}
