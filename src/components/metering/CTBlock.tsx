import { useEffect } from "react";
import type { BaseSymbolProps, Port, SymbolMeta } from "../../types";
import { DEFAULTS } from "../../types";
import { resolvePorts, symbolTransform } from "../../utils";

const PORTS: Port[] = [
  { name: "top", offset: { x: 0, y: -10 } },
  { name: "bottom", offset: { x: 0, y: 10 } },
];

export const ctBlockMeta: SymbolMeta = {
  id: "ct-block",
  name: "Current Transformer",
  category: "metering",
  ports: PORTS,
  bounds: { width: 20, height: 20 },
  description: "Current transformer (CT) for metering or export limiting",
};

export interface CTBlockProps extends BaseSymbolProps {
  /** Number of CTs. @default 1 */
  count?: number;
}

export function CTBlock({
  x,
  y,
  scale = DEFAULTS.scale,
  rotation = DEFAULTS.rotation,
  label = "CT",
  rating,
  count = 1,
  stroke = DEFAULTS.stroke,
  strokeWidth = DEFAULTS.strokeWidth,
  fontFamily = DEFAULTS.fontFamily,
  fontSize = DEFAULTS.fontSize,
  onPortsResolved,
  className,
  id,
}: CTBlockProps) {
  useEffect(() => {
    onPortsResolved?.(resolvePorts(PORTS, x, y, scale, rotation));
  }, [x, y, scale, rotation, onPortsResolved]);

  return (
    <g transform={symbolTransform({ x, y, scale, rotation })} className={className} id={id}>
      {/* Through conductor */}
      <line x1={0} y1={-10} x2={0} y2={10} stroke={stroke} strokeWidth={strokeWidth} />
      {/* CT ring(s) */}
      {Array.from({ length: count }).map((_, i) => (
        <circle
          key={i}
          cx={0}
          cy={-4 + i * 8}
          r={6}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      ))}
      {/* Dot convention */}
      <circle cx={-4} cy={-4} r={1.2} fill={stroke} />
      {label && (
        <text x={14} y={0} fontSize={fontSize} fill={DEFAULTS.labelColor} fontFamily={fontFamily}>
          {label}
        </text>
      )}
      {rating && (
        <text x={14} y={10} fontSize={fontSize - 1} fill={DEFAULTS.ratingColor} fontFamily={fontFamily}>
          {rating}
        </text>
      )}
    </g>
  );
}
