import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// formats the date to Oct 31, 2025 • 12:00
export function formatDate(date: Date) {
  return `${date.toLocaleString("en-US", {
    month: "short",
  })} ${date.getDate()}, ${date.getFullYear()} • ${date.toLocaleTimeString(
    "en-GB",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  )}`;
}
