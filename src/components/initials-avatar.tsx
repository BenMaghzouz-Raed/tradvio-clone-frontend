import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface InitialsAvatarProps {
  firstName: string;
  lastName: string;
  size?: number;
}

const lightColors = [
  "#FDE68A", // light yellow
  "#A7F3D0", // mint green
  "#BFDBFE", // light blue
  "#FBCFE8", // pink
  "#C7D2FE", // lavender
  "#FCA5A5", // peach
  "#FDBA74", // orange
  "#86EFAC", // soft green
  "#93C5FD", // sky blue
  "#F9A8D4", // soft pink
];

export default function InitialsAvatar({
  firstName,
  lastName,
  size = 32,
}: InitialsAvatarProps) {
  const initials =
    (firstName?.[0]?.toUpperCase() ?? "") +
    (lastName?.[0]?.toUpperCase() ?? "");

  const bgColor = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * lightColors.length);
    return lightColors[randomIndex];
  }, []);

  return (
    <div
      className="flex items-center justify-center rounded-full text-white font-semibold"
      style={{
        backgroundColor: bgColor,
        width: size,
        height: size,
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </div>
  );
}
