interface TradeStepProps {
  title: string;
  description: string;
}

export default function TradeStep({ title, description }: TradeStepProps) {
  return (
    <div>
      <h3 className="text-black sm:text-md text-sm font-md">{title}</h3>
      <p className="text-[#5B5B5B] pl-1 sm:text-sm text-xs">{description}</p>
    </div>
  );
}
