interface MarketingHighlightProps {
  label: string;
}

export default function MarketingHighlight({ label }: MarketingHighlightProps) {
  return (
    <span className="text-sm px-4 py-2 rounded-full bg-gradient-to-b from-white/30 to-white/10">
      {label}
    </span>
  );
}
