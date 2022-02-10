interface OurHutLogoIconProps {
  className?: string;
}

export const OurHutLogoIcon: React.FC<OurHutLogoIconProps> = ({
  className = "h-6 w-6",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 11.64 11.64"
    className={className}
  >
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <circle cx="5.82" cy="5.82" r="5.82" />
      </g>
    </g>
  </svg>
);
