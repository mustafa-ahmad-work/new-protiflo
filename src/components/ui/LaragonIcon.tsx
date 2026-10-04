import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export default function LaragonIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="128" height="128" rx="28" fill="#0E86D4" fillOpacity="0.15" />
      {/* Laragon stylized elephant icon */}
      <path
        d="M32 44C32 35.1634 39.1634 28 48 28H76C87.0457 28 96 36.9543 96 48C96 59.0457 87.0457 68 76 68H70V92C70 96.4183 66.4183 100 62 100H54C49.5817 100 46 96.4183 46 92V72C46 67.5817 42.4183 64 38 64H32V44Z"
        fill="#0E86D4"
      />
      <circle cx="58" cy="44" r="6" fill="#FFFFFF" />
      <path
        d="M82 68C88.6274 68 94 73.3726 94 80V92C94 96.4183 90.4183 100 86 100H78C73.5817 100 70 96.4183 70 92V68H82Z"
        fill="#38BDF8"
      />
    </svg>
  );
}
