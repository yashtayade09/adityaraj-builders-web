import React from 'react';

interface DraftingCompassProps {
  radius?: number; // Distance in px from needle anchor to pencil tip (e.g. 140px)
  rotationAngle?: number; // 0 to 360 deg
  isDrawing?: boolean;
  openAmount?: number; // 0 = legs closed, 1 = fully opened to `radius`
  className?: string;
}

export const DraftingCompass: React.FC<DraftingCompassProps> = ({
  radius = 160,
  rotationAngle = 0,
  isDrawing = true,
  openAmount = 1,
  className = '',
}) => {
  // Both legs are 266px long (needle tip / pencil tip are drawn at y=266 below
  // the hinge). Work out the hinge height and leg angle so that the needle tip
  // lands exactly on (0,0) and the pencil tip exactly on (radius,0).
  const LEG = 266;
  // The legs open from nearly closed to the full radius (openAmount 0 -> 1).
  const openR = Math.max(26, radius * Math.min(1, Math.max(0, openAmount)));
  const halfSpan = openR / 2;
  const legAngleRad = Math.asin(Math.min(0.95, halfSpan / LEG));
  const legAngleDeg = (legAngleRad * 180) / Math.PI;
  const compassHeight = LEG * Math.cos(legAngleRad);
  // SVG drawing area (user units == pixels) - sized for the fully opened compass
  // so the picture never jumps while the legs are opening.
  const fullAngle = Math.asin(Math.min(0.95, radius / 2 / LEG));
  const vbX = -radius * 0.4;
  const vbY = -(LEG * Math.cos(fullAngle) + 70);
  const vbW = radius * 1.5;
  const vbH = LEG * Math.cos(fullAngle) + 90;

  return (
    <div
      className={`pointer-events-none select-none filter drop-shadow-[8px_16px_28px_rgba(0,0,0,0.7)] ${className}`}
      style={{
        transform: `rotate(${rotationAngle}deg)`,
        transformOrigin: '0px 0px', // Anchored exactly at the needle point
      }}
    >
      <svg
        viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
        width={vbW}
        height={vbH}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        style={{
          position: 'absolute',
          // 1:1 scale, placed so the needle point (0,0) sits exactly on this
          // component's origin. (Before, width/height were 100% of a 0px box,
          // so the compass was invisible.)
          left: vbX,
          top: vbY,
          width: vbW,
          height: vbH,
        }}
      >
        <defs>
          {/* Satin Chrome Stainless Steel for Compass Arms */}
          <linearGradient id="compassSteel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="25%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="75%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Brass Knurled Thumbscrew Spindle */}
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#854d0e" />
            <stop offset="35%" stopColor="#eab308" />
            <stop offset="65%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>

          {/* Dark Needle Point */}
          <linearGradient id="needleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Graphite Lead Tip */}
          <linearGradient id="pencilLead" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="60%" stopColor="#52525b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>

          {/* Contact glow on pencil arc */}
          <radialGradient id="compassLeadGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#0284c7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* HINGE HEAD CENTER is at (halfSpan, -compassHeight) */}
        <g transform={`translate(${halfSpan}, -${compassHeight})`}>
          {/* TOP KNURLED HANDLE (Draftsman's finger spindle) */}
          <rect
            x="-4.5"
            y="-52"
            width="9"
            height="34"
            rx="1.5"
            fill="url(#compassSteel)"
            stroke="#1e293b"
            strokeWidth="0.5"
          />
          {/* Handle knurling lines */}
          {[-46, -42, -38, -34, -30, -26, -22].map((y) => (
            <line key={y} x1="-4.5" y1={y} x2="4.5" y2={y} stroke="#334155" strokeWidth="0.75" />
          ))}

          {/* Handle base ring */}
          <rect
            x="-6"
            y="-18"
            width="12"
            height="5"
            rx="1"
            fill="url(#brassGrad)"
          />

          {/* MAIN CHROME PIVOT FORK & DISC */}
          <circle cx="0" cy="0" r="14" fill="url(#compassSteel)" stroke="#334155" strokeWidth="0.75" />
          <circle cx="0" cy="0" r="6" fill="url(#brassGrad)" stroke="#1e293b" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="2" fill="#0f172a" />

          {/* CENTRAL QUICK-ADJUST THREADED SPINDLE & BRASS THUMBWHEEL */}
          <g transform="translate(0, 85)">
            {/* Threaded steel rod passing through both legs */}
            <rect
              x={-halfSpan * 1.1}
              y="-2"
              width={halfSpan * 2.2}
              height="4"
              rx="1"
              fill="url(#compassSteel)"
              stroke="#334155"
              strokeWidth="0.4"
            />
            {/* Brass center knurled thumbwheel */}
            <rect
              x="-8"
              y="-10"
              width="16"
              height="20"
              rx="2"
              fill="url(#brassGrad)"
              stroke="#713f12"
              strokeWidth="0.5"
            />
            {/* Wheel ridges */}
            {[-6, -3, 0, 3, 6].map((x) => (
              <line key={x} x1={x} y1="-10" x2={x} y2="10" stroke="#713f12" strokeWidth="0.6" />
            ))}
          </g>

          {/* LEFT LEG: NEEDLE ANCHOR ARM (aims towards (0, 0)) */}
          <g transform={`rotate(${legAngleDeg})`}>
            {/* Upper arm shank */}
            <polygon
              points="-7,0 7,0 4.5,180 -4.5,180"
              fill="url(#compassSteel)"
              stroke="#1e293b"
              strokeWidth="0.5"
            />
            {/* Lower arm reduction */}
            <polygon
              points="-4.5,180 4.5,180 2.5,235 -2.5,235"
              fill="url(#compassSteel)"
              stroke="#1e293b"
              strokeWidth="0.4"
            />
            {/* Needle chuck collar with brass tightening screw */}
            <rect
              x="-4"
              y="235"
              width="8"
              height="10"
              rx="1"
              fill="url(#brassGrad)"
            />
            {/* Hardened steel needle pin pointing right into (0, 0) */}
            <polygon
              points="-1.2,245 1.2,245 0,266"
              fill="url(#needleGrad)"
              stroke="#0f172a"
              strokeWidth="0.4"
            />
          </g>

          {/* RIGHT LEG: DRAFTING PENCIL LEAD ARM (aims towards (radius, 0)) */}
          <g transform={`rotate(${-legAngleDeg})`}>
            {/* Upper arm shank */}
            <polygon
              points="-7,0 7,0 4.5,175 -4.5,175"
              fill="url(#compassSteel)"
              stroke="#1e293b"
              strokeWidth="0.5"
            />
            {/* Precision knee hinge joint */}
            <circle cx="0" cy="175" r="5" fill="url(#brassGrad)" stroke="#1e293b" strokeWidth="0.5" />
            <circle cx="0" cy="175" r="1.5" fill="#0f172a" />

            {/* Pencil lead clamp barrel */}
            <rect
              x="-4.5"
              y="180"
              width="9"
              height="55"
              rx="1"
              fill="url(#compassSteel)"
              stroke="#334155"
              strokeWidth="0.4"
            />
            {/* Brass thumb clamp screw on side */}
            <rect
              x="4.5"
              y="200"
              width="6"
              height="7"
              rx="1"
              fill="url(#brassGrad)"
            />

            {/* 2mm Graphite Pencil Lead */}
            <rect
              x="-1.5"
              y="235"
              width="3"
              height="20"
              fill="url(#pencilLead)"
            />
            {/* Sharpened graphite point hitting paper at (radius, 0) */}
            <polygon
              points="-1.5,255 1.5,255 0,266"
              fill="url(#pencilLead)"
              stroke="#09090b"
              strokeWidth="0.3"
            />
          </g>
        </g>

        {/* Center Anchor Pin Indicator at (0, 0) */}
        <circle cx="0" cy="0" r="3" fill="#38bdf8" fillOpacity="0.4" />
        <circle cx="0" cy="0" r="1" fill="#f8fafc" />
        {/* Tiny crosshair at needle pivot */}
        <line x1="-7" y1="0" x2="7" y2="0" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.6" />
        <line x1="0" y1="-7" x2="0" y2="7" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.6" />

        {/* Active Pencil Lead drawing contact spark at (radius, 0) */}
        {isDrawing && openAmount >= 1 && (
          <g transform={`translate(${radius}, 0)`}>
            <circle cx="0" cy="0" r="8" fill="url(#compassLeadGlow)" />
            <circle cx="0" cy="0" r="2" fill="#ffffff" />
          </g>
        )}
      </svg>
    </div>
  );
};
