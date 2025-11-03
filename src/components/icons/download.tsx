import { cn } from "@/lib/utils";

export default function Download({
  className,
  ...props
}: React.HTMLAttributes<SVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "icon icon-tabler icons-tabler-outline icon-tabler-brand-github",
        className
      )}
      {...props}
    >
      <path
        d="M2.66675 10.6667V11.3334C2.66675 11.8638 2.87746 12.3726 3.25253 12.7476C3.62761 13.1227 4.13632 13.3334 4.66675 13.3334H11.3334C11.8638 13.3334 12.3726 13.1227 12.7476 12.7476C13.1227 12.3726 13.3334 11.8638 13.3334 11.3334V10.6667M10.6667 8.00008L8.00008 10.6667M8.00008 10.6667L5.33341 8.00008M8.00008 10.6667V2.66675"
        stroke="#171717"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
