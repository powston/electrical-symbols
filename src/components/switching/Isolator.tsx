import { useEffect } from "react";
import type { BaseSymbolProps, Port, SymbolMeta } from "../../types";
import { DEFAULTS } from "../../types";
import { resolvePorts, symbolTransform } from "../../utils";

const PORTS: Port[] = [
  { name: "top", offset: { x: 0, y: -12 } },
  { name: "bottom", offset: { x: 0, y: 14 } },
];

export const isolatorMeta: SymbolMeta = {
  id: "isolator",
  name: "Isolator",
  category: "switching",
  ports: PORTS,
  bounds: { width: 12, height: 26 },
  description: "Switch-disconnector / isolator (IEC 60617-S00260)",
};

export interface IsolatorProps extends BaseSymbolProps {
  /** Whether this is a DC isolator (renders a "DC" tag). @default false */
  dc?: boolean;
}

export function Isolator({
  x,
  y,
  scale = DEFAULTS.scale,
  rotation = DEFAULTS.rotation,
  label,
  rating,
  dc = false,
  stroke = DEFAULTS.stroke,
  strokeWidth = DEFAULTS.strokeWidth,
  fontFamily = DEFAULTS.fontFamily,
  fontSize = DEFAULTS.fontSize,
  onPortsResolved,
  className,
  id,
}: IsolatorProps) {
  useEffect(() => {
    onPortsResolved?.(resolvePorts(PORTS, x, y, scale, rotation));
  }, [x, y, scale, rotation, onPortsResolved]);

  return (
    <g transform={symbolTransform({ x, y, scale, rotation })} className={className} id={id}>
      {/* Top lead */}
      <line x1={0} y1={-12} x2={0} y2={-4} stroke={stroke} strokeWidth={strokeWidth} />
      {/* Blade (angled line = open position) */}
      <line x1={0} y1={-4} x2={6} y2={6} stroke={stroke} strokeWidth={strokeWidth} />
      {/* Fixed contact (small circle) */}
      <circle cx={0} cy={8} r={2} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      {/* Bottom lead */}
      <line x1={0} y1={10} x2={0} y2={14} stroke={stroke} strokeWidth={strokeWidth} />
      {/* Labels */}
      {(label || dc) && (
        <text x={12} y={2} fontSize={fontSize} fill={DEFAULTS.labelColor} fontFamily={fontFamily}>
          {label || (dc ? "DC Isolator" : "")}
        </text>
      )}
      {rating && (
        <text x={12} y={12} fontSize={fontSize - 1} fill={DEFAULTS.ratingColor} fontFamily={fontFamily}>
          {rating}
        </text>
      )}
    </g>
  );
}
