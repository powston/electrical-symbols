import { useEffect } from "react";
import type { BaseSymbolProps, Port, SymbolMeta } from "../../types";
import { DEFAULTS } from "../../types";
import { resolvePorts, symbolTransform } from "../../utils";

const PORTS: Port[] = [
  { name: "top", offset: { x: 0, y: -12 } },
  { name: "bottom", offset: { x: 0, y: 12 } },
];

export const surgeProtectorMeta: SymbolMeta = {
  id: "surge-protector",
  name: "Surge Protector",
  category: "protection",
  ports: PORTS,
  bounds: { width: 16, height: 24 },
  description: "Surge protective device (SPD) / varistor",
};

export interface SurgeProtectorProps extends BaseSymbolProps {}

export function SurgeProtector({
  x,
  y,
  scale = DEFAULTS.scale,
  rotation = DEFAULTS.rotation,
  label = "SPD",
  rating,
  stroke = DEFAULTS.stroke,
  strokeWidth = DEFAULTS.strokeWidth,
  fontFamily = DEFAULTS.fontFamily,
  fontSize = DEFAULTS.fontSize,
  onPortsResolved,
  className,
  id,
}: SurgeProtectorProps) {
  useEffect(() => {
    onPortsResolved?.(resolvePorts(PORTS, x, y, scale, rotation));
  }, [x, y, scale, rotation, onPortsResolved]);

  return (
    <g transform={symbolTransform({ x, y, scale, rotation })} className={className} id={id}>
      <line x1={0} y1={-12} x2={0} y2={-6} stroke={stroke} strokeWidth={strokeWidth} />
      {/* Varistor box */}
      <rect x={-6} y={-6} width={12} height={12} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      {/* Lightning bolt */}
      <polyline
        points="0,-4 -2,0 2,0 0,4"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth * 0.8}
      />
      <line x1={0} y1={6} x2={0} y2={12} stroke={stroke} strokeWidth={strokeWidth} />
      {label && (
        <text x={12} y={-1} fontSize={fontSize} fill={DEFAULTS.labelColor} fontFamily={fontFamily}>
          {label}
        </text>
      )}
      {rating && (
        <text x={12} y={9} fontSize={fontSize - 1} fill={DEFAULTS.ratingColor} fontFamily={fontFamily}>
          {rating}
        </text>
      )}
    </g>
  );
}
