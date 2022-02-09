interface UpArrowIconProps {
  className?: string;
  onClick?: VoidFunction;
}

export const UpArrowIcon: React.FC<UpArrowIconProps> = ({
  className = "h-6 w-6",
  onClick,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={onClick}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 10l7-7m0 0l7 7m-7-7v18"
    />
  </svg>
);
