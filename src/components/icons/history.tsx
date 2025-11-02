import { cn } from "@/lib/utils";

export default function History({
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
        d="M5.33317 3.33325H3.99984C3.64622 3.33325 3.30708 3.47373 3.05703 3.72378C2.80698 3.97382 2.6665 4.31296 2.6665 4.66659V12.6666C2.6665 13.0202 2.80698 13.3593 3.05703 13.6094C3.30708 13.8594 3.64622 13.9999 3.99984 13.9999H7.79784"
        stroke="#FAFAFA"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 9.33325V11.9999H14.6667"
        stroke="#FAFAFA"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.0002 7.33325V4.66659C12.0002 4.31296 11.8597 3.97382 11.6096 3.72378C11.3596 3.47373 11.0205 3.33325 10.6668 3.33325H9.3335"
        stroke="#FAFAFA"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.3335 3.33333C5.3335 2.97971 5.47397 2.64057 5.72402 2.39052C5.97407 2.14048 6.31321 2 6.66683 2H8.00016C8.35378 2 8.69292 2.14048 8.94297 2.39052C9.19302 2.64057 9.3335 2.97971 9.3335 3.33333C9.3335 3.68696 9.19302 4.02609 8.94297 4.27614C8.69292 4.52619 8.35378 4.66667 8.00016 4.66667H6.66683C6.31321 4.66667 5.97407 4.52619 5.72402 4.27614C5.47397 4.02609 5.3335 3.68696 5.3335 3.33333Z"
        stroke="#FAFAFA"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.3335 11.9999C9.3335 12.7072 9.61445 13.3854 10.1145 13.8855C10.6146 14.3856 11.2929 14.6666 12.0002 14.6666C12.7074 14.6666 13.3857 14.3856 13.8858 13.8855C14.3859 13.3854 14.6668 12.7072 14.6668 11.9999C14.6668 11.2927 14.3859 10.6144 13.8858 10.1143C13.3857 9.6142 12.7074 9.33325 12.0002 9.33325C11.2929 9.33325 10.6146 9.6142 10.1145 10.1143C9.61445 10.6144 9.3335 11.2927 9.3335 11.9999Z"
        stroke="#FAFAFA"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.3335 7.33325H8.00016"
        stroke="#FAFAFA"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.3335 10H7.3335"
        stroke="#FAFAFA"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
