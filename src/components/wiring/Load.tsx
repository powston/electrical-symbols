import { useEffect } from "react";
import type { BaseSymbolProps, Port, SymbolMeta } from "../../types";
import { DEFAULTS } from "../../types";
import { resolvePorts, symbolTransform } from "../../utils";

const PORTS: Port[] = [
  { name: "top", offset: { x: 0, y: -12 } },
];

export const loadMeta: SymbolMeta = {
  id: "load",
  name: "Consumer Load",
  category: "wiring",
  ports: PORTS,
  bounds: { width: 10, height: 36 },
  description: "Generic consumer load (impedance zigzag symbol)",
};

export interface LoadProps extends BaseSymbolProps {}

export function Load({
  x,
  y,
  scale = DEFAULTS.scale,
  rotation = DEFAULTS.rotation,
  label = "LOAD",
  stroke = DEFAULTS.stroke,
  strokeWidth = DEFAULTS.strokeWidth,
  fontFamily = DEFAULTS.fontFamily,
  fontSize = DEFAULTS.fontSize,
  onPortsResolved,
  className,
  id,
}: LoadProps) {
  useEffect(() => {
    onPortsResolved?.(resolvePorts(PORTS, x, y, scale, rotation));
  }, [x, y, scale, rotation, onPortsResolved]);

  return (
    <g transform={symbolTransform({ x, y, scale, rotation })} className={className} id={id}>
      <line x1={0} y1={-12} x2={0} y2={-6} stroke={stroke} strokeWidth={strokeWidth} />
      {/* Zigzag impedance */}
      <polyline
        points="0,-6 -5,0 5,6 -5,12 5,18 0,24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {label && (
        <text x={0} y={38} textAnchor="middle" fontSize={fontSize} fontWeight="600" fill={DEFAULTS.labelColor} fontFamily={fontFamily}>
          {label}
        </text>
      )}
    </g>
  );
}
