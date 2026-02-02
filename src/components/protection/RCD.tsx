import { useEffect } from "react";
import type { BaseSymbolProps, Port, SymbolMeta } from "../../types";
import { DEFAULTS } from "../../types";
import { resolvePorts, symbolTransform } from "../../utils";

const PORTS: Port[] = [
  { name: "top", offset: { x: 0, y: -14 } },
  { name: "bottom", offset: { x: 0, y: 14 } },
];

export const rcdMeta: SymbolMeta = {
  id: "rcd",
  name: "RCD / RCBO",
  category: "protection",
  ports: PORTS,
  bounds: { width: 20, height: 28 },
  description: "Residual current device / residual current breaker with overcurrent",
};

export interface RCDProps extends BaseSymbolProps {
  /** Whether it includes overcurrent (RCBO) vs pure RCD. @default false */
  withOvercurrent?: boolean;
}

export function RCD({
  x,
  y,
  scale = DEFAULTS.scale,
  rotation = DEFAULTS.rotation,
  label,
  rating,
  withOvercurrent = false,
  stroke = DEFAULTS.stroke,
  strokeWidth = DEFAULTS.strokeWidth,
  fontFamily = DEFAULTS.fontFamily,
  fontSize = DEFAULTS.fontSize,
  onPortsResolved,
  className,
  id,
}: RCDProps) {
  useEffect(() => {
    onPortsResolved?.(resolvePorts(PORTS, x, y, scale, rotation));
  }, [x, y, scale, rotation, onPortsResolved]);

  return (
    <g transform={symbolTransform({ x, y, scale, rotation })} className={className} id={id}>
      <line x1={0} y1={-14} x2={0} y2={-6} stroke={stroke} strokeWidth={strokeWidth} />
      {/* Breaker box */}
      <rect x={-6} y={-6} width={12} height={12} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <line x1={-4} y1={0} x2={4} y2={0} stroke={stroke} strokeWidth={strokeWidth} />
      <line x1={0} y1={6} x2={0} y2={14} stroke={stroke} strokeWidth={strokeWidth} />
      {/* RCD test button (small circle) */}
      <circle cx={8} cy={-3} r={2.5} fill="none" stroke={stroke} strokeWidth={strokeWidth * 0.7} />
      <text x={8} y={-1.5} textAnchor="middle" fontSize={4} fill={stroke} fontFamily={fontFamily}>T</text>
      {/* RCBO overcurrent indicator */}
      {withOvercurrent && (
        <path d="M-6,-6 L6,6" stroke={stroke} strokeWidth={strokeWidth * 0.5} strokeDasharray="2,2" />
      )}
      {label && (
        <text x={16} y={-1} fontSize={fontSize} fill={DEFAULTS.labelColor} fontFamily={fontFamily}>
          {label || (withOvercurrent ? "RCBO" : "RCD")}
        </text>
      )}
      {rating && (
        <text x={16} y={9} fontSize={fontSize - 1} fill={DEFAULTS.ratingColor} fontFamily={fontFamily}>
          {rating}
        </text>
      )}
    </g>
  );
}
