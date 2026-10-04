import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export default function FilamentIcon({ size = 24, className = "", ...props }: IconProps) {
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
      <defs>
        <linearGradient id="filament-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA63D" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="filament-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      {/* Filament distinct folded ribbon geometry */}
      <path
        d="M28 20C28 15.5817 31.5817 12 36 12H92C96.4183 12 100 15.5817 100 20V44C100 48.4183 96.4183 52 92 52H52L28 20Z"
        fill="url(#filament-grad-1)"
      />
      <path
        d="M28 52H76C80.4183 52 84 55.5817 84 60V80C84 84.4183 80.4183 88 76 88H48L28 52Z"
        fill="url(#filament-grad-2)"
      />
      <path
        d="M28 20V108C28 112.418 31.5817 116 36 116H48V52L28 20Z"
        fill="#EA580C"
      />
    </svg>
  );
}
