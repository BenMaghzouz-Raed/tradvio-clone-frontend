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

export function formatAmount(amount: number) {
  return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function truncate(value: string, threshold: number) {
  const length = value.length;
  return `${length > threshold ? value.slice(0, threshold) + "..." : value}`;
}

export const saveJsonToSessionStorage = (name: string, value: object) => {
  sessionStorage.setItem(name, JSON.stringify(value));
};

export const loadJsonFromSessionStorage = (name: string) => {
  const asString = sessionStorage.getItem(name);
  if (!asString) {
    throw Error(`no item named ${name} found`);
  }
  return JSON.parse(asString);
};
