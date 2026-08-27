import React from "react";

const paths = {
  dumbbell: (
    <>
      <path d="M6.5 8.5 15.5 17.5" />
      <path d="m8.5 6.5 2 2M13.5 11.5l2 2" />
      <path d="m4 7 3-3 3 3-3 3-3-3ZM14 17l3-3 3 3-3 3-3-3Z" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </>
  ),
  activity: <path d="M3 12h4l2-6 4 12 2-6h6" />,
  trophy: (
    <>
      <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
      <path d="M8 6H5a3 3 0 0 0 3 3M16 6h3a3 3 0 0 1-3 3" />
      <path d="M12 12v4M9 20h6M10 16h4" />
    </>
  ),
  trend: (
    <>
      <path d="M4 17 9 12l3 3 7-8" />
      <path d="M15 7h4v4" />
      <circle cx="4" cy="17" r="1" />
      <circle cx="9" cy="12" r="1" />
      <circle cx="12" cy="15" r="1" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.6v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6.3v-2.6h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5h2.6v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2v2.6h-.2a1.7 1.7 0 0 0-1.5 1Z" />
    </>
  ),
  logout: (
    <>
      <path d="M10 5H5v14h5" />
      <path d="M14 8l4 4-4 4M9 12h9" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12 4 4L19 6" />,
  flame: <path d="M12 21c4 0 7-2.7 7-6.7 0-3-1.8-5.2-4.2-7.5.1 2.2-.8 3.7-2 4.7.2-3.8-1.9-6.1-4.4-8.5.1 3.6-3.4 5.8-3.4 10.7C5 18.3 8.1 21 12 21Z" />,
  scale: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 8h8M12 8v2M9 12h6" />
    </>
  ),
  droplet: <path d="M12 3s6 6.1 6 11a6 6 0 0 1-12 0c0-4.9 6-11 6-11Z" />,
  bmi: (
    <>
      <path d="M4 12h4l2-5 4 10 2-5h4" />
    </>
  ),
  run: (
    <>
      <circle cx="13" cy="5" r="2" />
      <path d="m11 8-2 4 3 2 2 5M10 12l-4 2M14 10l3 2" />
    </>
  ),
  stretch: (
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 8v6M7 11h10M9 20l3-6 3 6M6 20h12" />
    </>
  ),
  flag: <path d="M6 21V4h11l-2 4 2 4H6" />,
  water: (
    <>
      <path d="M8 4h8l1 16H7L8 4Z" />
      <path d="M9 4h6M10 8h4M10 12h4M10 16h4" />
    </>
  ),
  weight: (
    <>
      <path d="M7 4h10l2 16H5L7 4Z" />
      <path d="M9 8h6M12 8v2" />
    </>
  ),
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 12h2M14 12h2M8 16h2M14 16h2" />
    </>
  ),
};

function Icon({ name, size = 20, strokeWidth = 1.8, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.activity}
    </svg>
  );
}

export default Icon;
