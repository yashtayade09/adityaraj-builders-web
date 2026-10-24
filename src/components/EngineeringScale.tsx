import React from 'react';

interface EngineeringScaleProps {
  className?: string;
  width?: number;
  highlightProgress?: number; // 0 to 1 as pencil glides
}

export const EngineeringScale: React.FC<EngineeringScaleProps> = ({
  className = '',
  width = 900,
  highlightProgress = 0,
}) => {
  // Generate realistic millimeter and centimeter graduations
  const totalCm = 30;
  const cmWidth = width / totalCm;

  return (
    <div
      className={`relative select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] ${className}`}
      style={{ width }}
    >
      <svg
        viewBox={`0 0 ${width} 56`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          {/* Metallic brushed gradient for scale body */}
          <linearGradient id="scaleBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="8%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#e2e8f0" />
            <stop offset="70%" stopColor="#cbd5e1" />
            <stop offset="90%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Beveled edge sheen */}
          <linearGradient id="bevelEdgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Color-coded center identification stripe (Architectural Standard) */}
          <linearGradient id="stripeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          {/* Active pencil contact highlight */}
          <radialGradient
            id="contactGlow"
            cx={`${Math.max(2, Math.min(98, highlightProgress * 100))}%`}
            cy="100%"
            r="80px"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Shadow under bottom edge */}
        <path
          d={`M 0 54 L ${width} 54 L ${width} 56 L 0 56 Z`}
          fill="rgba(0, 0, 0, 0.45)"
        />

        {/* Main Triangular / Beveled Scale Body */}
        <polygon
          points={`0,4 ${width},4 ${width},52 0,52`}
          fill="url(#scaleBodyGrad)"
          stroke="#64748b"
          strokeWidth="0.75"
        />

        {/* Top subtle highlight */}
        <line
          x1="0"
          y1="5"
          x2={width}
          y2="5"
          stroke="#ffffff"
          strokeWidth="1"
          strokeOpacity="0.9"
        />

        {/* Color stripe for scale identification (1:100 / Metric Civil) */}
        <rect
          x="10"
          y="18"
          width={width - 20}
          height="4.5"
          rx="1"
          fill="url(#stripeGrad)"
          opacity="0.85"
        />

        {/* Professional laser engraving branding */}
        <text
          x={width / 2}
          y="14"
          textAnchor="middle"
          fill="#1e293b"
          fontSize="8.5"
          fontFamily="'Rajdhani', sans-serif"
          fontWeight="700"
          letterSpacing="2.5px"
        >
          ADITYARAJ BUILDERS &bull; CIVIL DRAFTING SCALE 1:100 &bull; IS 456 COMPLIANT
        </text>

        <text
          x="24"
          y="14"
          fill="#0369a1"
          fontSize="7.5"
          fontFamily="'Rajdhani', sans-serif"
          fontWeight="700"
        >
          METRIC [mm]
        </text>

        <text
          x={width - 24}
          y="14"
          textAnchor="end"
          fill="#475569"
          fontSize="7"
          fontFamily="'Rajdhani', sans-serif"
          fontWeight="600"
        >
          REF. STD 01-A
        </text>

        {/* Bottom Bevel edge (where the pencil rests and draws) */}
        <polygon
          points={`0,42 ${width},42 ${width},52 0,52`}
          fill="url(#bevelEdgeGrad)"
          opacity="0.75"
        />
        <line
          x1="0"
          y1="52"
          x2={width}
          y2="52"
          stroke="#0f172a"
          strokeWidth="1.2"
        />

        {/* Dynamic glow tracking the pencil tip */}
        {highlightProgress > 0 && (
          <rect
            x="0"
            y="42"
            width={width}
            height="10"
            fill="url(#contactGlow)"
          />
        )}

        {/* Millimeter, Half-Centimeter, and Centimeter Tick Marks */}
        {Array.from({ length: totalCm * 10 + 1 }).map((_, idx) => {
          const x = (idx / (totalCm * 10)) * (width - 40) + 20;
          const isCm = idx % 10 === 0;
          const isHalfCm = idx % 5 === 0 && !isCm;

          const tickHeight = isCm ? 14 : isHalfCm ? 9 : 5;
          const yStart = 52 - tickHeight;

          return (
            <g key={`tick-${idx}`}>
              <line
                x1={x}
                y1={yStart}
                x2={x}
                y2="52"
                stroke={isCm ? '#0f172a' : isHalfCm ? '#334155' : '#64748b'}
                strokeWidth={isCm ? 1.1 : isHalfCm ? 0.75 : 0.5}
              />
              {isCm && (
                <text
                  x={x}
                  y={yStart - 3}
                  textAnchor="middle"
                  fill="#0f172a"
                  fontSize="7.5"
                  fontFamily="'Rajdhani', sans-serif"
                  fontWeight="700"
                >
                  {idx / 10}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
