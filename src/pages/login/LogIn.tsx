import MarketingHighlight from "@/components/marketing-highlights";
import { useAuth } from "@/hooks/use-auth";
import Form from "./components/form";

export default function LogIn() {
  useAuth();

  return (
    <div className="flex min-h-screen text-white">
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-[url('/images/background_image.jpeg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 p-8 rounded-2xl max-w-lg">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Navigate the <br /> Markets with <br /> Confidence
          </h1>

          <div className="flex flex-wrap gap-2">
            <MarketingHighlight label="AI-Powered Trade Plans" />
            <MarketingHighlight label="Integrated Risk Management" />
            <MarketingHighlight label="Next-Gen Trade Journal" />
            <MarketingHighlight label="Customer Support" />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-black">
        <Form />
      </div>
    </div>
  );
}
