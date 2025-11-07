import { IconParams } from "@/types/param-types";

export default function BudgetWarning({
  className,

  ...props
}: IconParams) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="20" cy="20" r="20" fill="#FEF9C3" />
      <path
        d="M20 17.5V19.1667M20 22.5H20.0083M14.2267 25.8334H25.7733C27.0567 25.8334 27.8583 24.4442 27.2167 23.3334L21.4433 13.3334C20.8017 12.2225 19.1983 12.2225 18.5567 13.3334L12.7833 23.3334C12.1417 24.4442 12.9433 25.8334 14.2267 25.8334Z"
        stroke="#CA8A04"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
