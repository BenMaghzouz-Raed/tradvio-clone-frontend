import { cn } from "@/lib/utils";

export default function Dashboard({
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
        d="M6.6665 8.66659C6.6665 9.02021 6.80698 9.35935 7.05703 9.60939C7.30708 9.85944 7.64622 9.99992 7.99984 9.99992C8.35346 9.99992 8.6926 9.85944 8.94265 9.60939C9.19269 9.35935 9.33317 9.02021 9.33317 8.66659C9.33317 8.31296 9.19269 7.97383 8.94265 7.72378C8.6926 7.47373 8.35346 7.33325 7.99984 7.33325C7.64622 7.33325 7.30708 7.47373 7.05703 7.72378C6.80698 7.97383 6.6665 8.31296 6.6665 8.66659Z"
        stroke="#FAFAFA"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.9668 7.69992L10.3335 6.33325"
        stroke="#FAFAFA"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.26667 13.3333C3.2921 12.5587 2.58261 11.5001 2.23652 10.3042C1.89043 9.10841 1.92488 7.83453 2.3351 6.65915C2.74531 5.48376 3.51098 4.46508 4.52599 3.74427C5.541 3.02347 6.75509 2.63623 8 2.63623C9.24491 2.63623 10.459 3.02347 11.474 3.74427C12.489 4.46508 13.2547 5.48376 13.6649 6.65915C14.0751 7.83453 14.1096 9.10841 13.7635 10.3042C13.4174 11.5001 12.7079 12.5587 11.7333 13.3333H4.26667Z"
        stroke="#FAFAFA"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
