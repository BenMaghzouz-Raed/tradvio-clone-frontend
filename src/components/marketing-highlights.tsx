import React from "react";

interface MarketingHighlightProps {
  label: string;
  gradient?: string;
}

const MarketingHighlight: React.FC<MarketingHighlightProps> = ({
  label,
  gradient = "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.075) 100%)",
}) => {
  return (
    <span
      className="text-sm px-4 py-2 rounded-full"
      style={{
        background: gradient,
      }}
    >
      {label}
    </span>
  );
};

export default MarketingHighlight;