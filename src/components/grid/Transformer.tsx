import { useEffect } from "react";
import type { BaseSymbolProps, Port, SymbolMeta } from "../../types";
import { DEFAULTS } from "../../types";
import { resolvePorts, symbolTransform } from "../../utils";

const PORTS: Port[] = [
  { name: "top", offset: { x: 0, y: -18 } },
  { name: "bottom", offset: { x: 0, y: 18 } },
];

export const transformerMeta: SymbolMeta = {
  id: "transformer",
  name: "Transformer",
  category: "grid",
  ports: PORTS,
  bounds: { width: 28, height: 36 },
  description: "Two-winding transformer (IEC 60617)",
};

export interface TransformerProps extends BaseSymbolProps {}

export function Transformer({
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
}: TransformerProps) {
  useEffect(() => {
    onPortsResolved?.(resolvePorts(PORTS, x, y, scale, rotation));
  }, [x, y, scale, rotation, onPortsResolved]);

  return (
    <g transform={symbolTransform({ x, y, scale, rotation })} className={className} id={id}>
      {/* Primary winding */}
      <line x1={0} y1={-18} x2={0} y2={-8} stroke={stroke} strokeWidth={strokeWidth} />
      <circle cx={0} cy={-4} r={8} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      {/* Secondary winding */}
      <circle cx={0} cy={4} r={8} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <line x1={0} y1={8} x2={0} y2={18} stroke={stroke} strokeWidth={strokeWidth} />
      {/* Labels */}
      {label && (
        <text x={16} y={-2} fontSize={fontSize} fill={DEFAULTS.labelColor} fontFamily={fontFamily}>
          {label}
        </text>
      )}
      {rating && (
        <text x={16} y={8} fontSize={fontSize - 1} fill={DEFAULTS.ratingColor} fontFamily={fontFamily}>
          {rating}
        </text>
      )}
    </g>
  );
}
