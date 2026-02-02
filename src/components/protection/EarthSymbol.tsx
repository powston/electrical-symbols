import { useEffect } from "react";
import type { BaseSymbolProps, Port, SymbolMeta } from "../../types";
import { DEFAULTS } from "../../types";
import { resolvePorts, symbolTransform } from "../../utils";

const PORTS: Port[] = [
  { name: "top", offset: { x: 0, y: -2 } },
];

export const earthSymbolMeta: SymbolMeta = {
  id: "earth-symbol",
  name: "Earth",
  category: "protection",
  ports: PORTS,
  bounds: { width: 16, height: 18 },
  description: "Protective earth / ground symbol (IEC 60617-S00090)",
};

export interface EarthSymbolProps extends BaseSymbolProps {}

export function EarthSymbol({
  x,
  y,
  scale = DEFAULTS.scale,
  rotation = DEFAULTS.rotation,
  label,
  stroke = DEFAULTS.stroke,
  strokeWidth = DEFAULTS.strokeWidth,
  fontFamily = DEFAULTS.fontFamily,
  fontSize = DEFAULTS.fontSize,
  onPortsResolved,
  className,
  id,
}: EarthSymbolProps) {
  useEffect(() => {
    onPortsResolved?.(resolvePorts(PORTS, x, y, scale, rotation));
  }, [x, y, scale, rotation, onPortsResolved]);

  return (
    <g transform={symbolTransform({ x, y, scale, rotation })} className={className} id={id}>
      {/* Stem */}
      <line x1={0} y1={-2} x2={0} y2={4} stroke={stroke} strokeWidth={strokeWidth} />
      {/* Three horizontal bars, decreasing width */}
      <line x1={-8} y1={4} x2={8} y2={4} stroke={stroke} strokeWidth={strokeWidth} />
      <line x1={-5} y1={8} x2={5} y2={8} stroke={stroke} strokeWidth={strokeWidth} />
      <line x1={-2} y1={12} x2={2} y2={12} stroke={stroke} strokeWidth={strokeWidth} />
      {label && (
        <text x={0} y={22} textAnchor="middle" fontSize={fontSize - 1} fill={DEFAULTS.ratingColor} fontFamily={fontFamily}>
          {label}
        </text>
      )}
    </g>
  );
}
