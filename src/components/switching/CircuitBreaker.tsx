import { useEffect } from "react";
import type { BaseSymbolProps, Port, SymbolMeta } from "../../types";
import { DEFAULTS } from "../../types";
import { resolvePorts, symbolTransform } from "../../utils";

const PORTS: Port[] = [
  { name: "top", offset: { x: 0, y: -12 } },
  { name: "bottom", offset: { x: 0, y: 12 } },
];

export const circuitBreakerMeta: SymbolMeta = {
  id: "circuit-breaker",
  name: "Circuit Breaker",
  category: "switching",
  ports: PORTS,
  bounds: { width: 12, height: 24 },
  description: "MCB or MCCB (IEC 60617-S00295)",
};

export interface CircuitBreakerProps extends BaseSymbolProps {}

export function CircuitBreaker({
  x,
  y,
  scale = DEFAULTS.scale,
  rotation = DEFAULTS.rotation,
  label,
  rating,
  stroke = DEFAULTS.stroke,
  strokeWidth = DEFAULTS.strokeWidth,
  fontFamily = DEFAULTS.fontFamily,
  fontSize = DEFAULTS.fontSize,
  onPortsResolved,
  className,
  id,
}: CircuitBreakerProps) {
  useEffect(() => {
    onPortsResolved?.(resolvePorts(PORTS, x, y, scale, rotation));
  }, [x, y, scale, rotation, onPortsResolved]);

  return (
    <g transform={symbolTransform({ x, y, scale, rotation })} className={className} id={id}>
      {/* Top lead-in */}
      <line x1={0} y1={-12} x2={0} y2={-6} stroke={stroke} strokeWidth={strokeWidth} />
      {/* Breaker body — square with cross */}
      <rect x={-6} y={-6} width={12} height={12} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <line x1={-4} y1={0} x2={4} y2={0} stroke={stroke} strokeWidth={strokeWidth} />
      {/* Bottom lead-out */}
      <line x1={0} y1={6} x2={0} y2={12} stroke={stroke} strokeWidth={strokeWidth} />
      {/* Labels to the right */}
      {label && (
        <text x={14} y={-1} fontSize={fontSize} fill={DEFAULTS.labelColor} fontFamily={fontFamily}>
          {label}
        </text>
      )}
      {rating && (
        <text x={14} y={9} fontSize={fontSize - 1} fill={DEFAULTS.ratingColor} fontFamily={fontFamily}>
          {rating}
        </text>
      )}
    </g>
  );
}
