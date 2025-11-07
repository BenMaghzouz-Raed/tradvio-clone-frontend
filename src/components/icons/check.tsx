import { cn } from "@/lib/utils";
import { IconParams } from "@/types/param-types";

export default function Check({
  className,
  fill = "none",
  ...props
}: IconParams) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block", className)}
      {...props}
    >
      <circle cx="20" cy="20" r="20" fill="#DCFCE7" />
      <path
        d="M17.5 20L19.1667 21.6667L22.5 18.3333M27.5 20C27.5 20.9849 27.306 21.9602 26.9291 22.8701C26.5522 23.7801 25.9997 24.6069 25.3033 25.3033C24.6069 25.9997 23.7801 26.5522 22.8701 26.9291C21.9602 27.306 20.9849 27.5 20 27.5C19.0151 27.5 18.0398 27.306 17.1299 26.9291C16.2199 26.5522 15.3931 25.9997 14.6967 25.3033C14.0003 24.6069 13.4478 23.7801 13.0709 22.8701C12.694 21.9602 12.5 20.9849 12.5 20C12.5 18.0109 13.2902 16.1032 14.6967 14.6967C16.1032 13.2902 18.0109 12.5 20 12.5C21.9891 12.5 23.8968 13.2902 25.3033 14.6967C26.7098 16.1032 27.5 18.0109 27.5 20Z"
        stroke="#16A34A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
