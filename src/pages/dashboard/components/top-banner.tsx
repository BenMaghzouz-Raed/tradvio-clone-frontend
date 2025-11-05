import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

export default function TopBanner({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  const isMobile = useIsMobile();

  return (
    <Card className="overflow-hidden flex bg-black text-white rounded-lg flex-row p-0">
      <div className="flex flex-col justify-center space-y-6 p-4">
        <div className="space-y-4">
          <h2 className="xs:text-md sm:text-xl md:text-2xl lg:text-3xl font-bold">
            Good morning, {firstName} {lastName}!
          </h2>
          <p className="text[#E7E5E4] text-base sm:text-md lg:text-lg leading-relaxed">
            Stop guessing, start profiting. Upload your chart and let our custom
            AI instantly detect patterns, calculate risk, and generate a
            complete trade plan. Unlock smarter, data-driven decisions.
          </p>
        </div>
        <Button
          variant="secondary"
          className="bg-muted-foreground cursor-pointer text-white font-medium px-8 py-3 rounded-lg text-base w-fit"
        >
          Start Analyzing Chart
        </Button>
      </div>

      {!isMobile && (
        <div className="h-full min-h-[250px] min-w-5/12">
          <img
            src="/images/background_image.jpeg"
            alt="Trading Graph"
            className="inset-0 w-full h-full object-cover"
          />
        </div>
      )}
    </Card>
  );
}
