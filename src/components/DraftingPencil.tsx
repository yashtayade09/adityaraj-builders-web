import React from 'react';

interface DraftingPencilProps {
  className?: string;
  isDrawing?: boolean;
}

export const DraftingPencil: React.FC<DraftingPencilProps> = ({
  className = '',
  isDrawing = false,
}) => {
  return (
    <div
      className={`pointer-events-none select-none filter drop-shadow-[4px_12px_18px_rgba(0,0,0,0.65)] ${className}`}
      style={{
        width: '42px',
        height: '240px',
        transformOrigin: '21px 240px',
      }}
    >
      <svg
        viewBox="0 0 60 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Metallic chrome gradient */}
          <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="25%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="75%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Pencil Hexagonal Body - Royal Navy/Graphite Blue */}
          <linearGradient id="pencilBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="20%" stopColor="#1e3a8a" />
            <stop offset="45%" stopColor="#2563eb" />
            <stop offset="55%" stopColor="#3b82f6" />
            <stop offset="75%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#091428" />
          </linearGradient>

          {/* Knurled Metal Grip pattern */}
          <pattern
            id="knurlPattern"
            width="4"
            height="4"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 4L4 0M0 0L4 4"
              stroke="#64748b"
              strokeWidth="0.6"
              strokeOpacity="0.75"
            />
          </pattern>

          {/* Graphite Lead Point Gradient */}
          <linearGradient id="graphiteTip" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="40%" stopColor="#3f3f46" />
            <stop offset="70%" stopColor="#52525b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>

          {/* Graphite Spark/Friction Shimmer */}
          <radialGradient id="pencilSparks" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Top Push Button / Lead Reservoir Cap */}
        <rect
          x="24"
          y="6"
          width="12"
          height="14"
          rx="1.5"
          fill="url(#chromeGrad)"
          stroke="#334155"
          strokeWidth="0.5"
        />
        {/* Cap ribbings */}
        <line x1="24" y1="10" x2="36" y2="10" stroke="#475569" strokeWidth="0.5" />
        <line x1="24" y1="13" x2="36" y2="13" stroke="#475569" strokeWidth="0.5" />

        {/* Metal pocket clip */}
        <path
          d="M 33 20 L 33 80 C 33 86 36 86 36 80 L 36 20 Z"
          fill="url(#chromeGrad)"
          stroke="#475569"
          strokeWidth="0.4"
          filter="drop-shadow(1px 2px 3px rgba(0,0,0,0.4))"
        />

        {/* Upper Collar */}
        <rect
          x="22"
          y="18"
          width="16"
          height="6"
          fill="url(#chromeGrad)"
        />

        {/* Main Hexagonal Pencil Barrel */}
        <polygon
          points="22,24 38,24 37,175 23,175"
          fill="url(#pencilBody)"
          stroke="#091428"
          strokeWidth="0.5"
        />

        {/* Hexagonal facet line highlight */}
        <line
          x1="29.5"
          y1="24"
          x2="29.5"
          y2="175"
          stroke="#93c5fd"
          strokeWidth="0.75"
          strokeOpacity="0.65"
        />
        <line
          x1="34"
          y1="24"
          x2="33.5"
          y2="175"
          stroke="#ffffff"
          strokeWidth="0.4"
          strokeOpacity="0.8"
        />

        {/* Gold Engraving on Pencil Body */}
        <g transform="rotate(90 30 100)">
          <text
            x="30"
            y="98"
            textAnchor="middle"
            fill="#facc15"
            fontSize="5.5"
            fontFamily="'Rajdhani', sans-serif"
            fontWeight="700"
            letterSpacing="1.2px"
            opacity="0.9"
          >
            ADITYARAJ &bull; 2H GRAPHITE CIVIL SPEC
          </text>
        </g>

        {/* Lower Transition Ring */}
        <rect
          x="23"
          y="175"
          width="14"
          height="5"
          fill="url(#chromeGrad)"
        />

        {/* Knurled Metal Ergonomic Grip */}
        <rect
          x="23.5"
          y="180"
          width="13"
          height="55"
          fill="url(#chromeGrad)"
        />
        <rect
          x="23.5"
          y="180"
          width="13"
          height="55"
          fill="url(#knurlPattern)"
        />

        {/* Steel Nose Cone (Chuck Collar) */}
        <polygon
          points="24,235 36,235 33,266 27,266"
          fill="url(#chromeGrad)"
          stroke="#475569"
          strokeWidth="0.5"
        />

        {/* Fine Lead Sleeve (Steel Pipe) */}
        <rect
          x="28.5"
          y="266"
          width="3"
          height="14"
          fill="url(#chromeGrad)"
        />

        {/* Exposed 2mm Graphite Drafting Lead Tip */}
        <polygon
          points="28.5,280 31.5,280 30,296"
          fill="url(#graphiteTip)"
          stroke="#09090b"
          strokeWidth="0.4"
        />

        {/* Realistic active contact spark / graphite dust illumination */}
        {isDrawing && (
          <g>
            <circle cx="30" cy="296" r="6" fill="url(#pencilSparks)" />
            <circle cx="30" cy="296" r="1.5" fill="#ffffff" />
          </g>
        )}
      </svg>
    </div>
  );
};
