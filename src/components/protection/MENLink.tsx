import { useEffect } from "react";
import type { BaseSymbolProps, Port, SymbolMeta } from "../../types";
import { DEFAULTS } from "../../types";
import { resolvePorts, symbolTransform } from "../../utils";

const PORTS: Port[] = [
  { name: "right", offset: { x: 12, y: 0 } },
];

export const menLinkMeta: SymbolMeta = {
  id: "men-link",
  name: "MEN Link",
  category: "protection",
  ports: PORTS,
  bounds: { width: 40, height: 24 },
  description: "Multiple Earthed Neutral link connection to earth",
};

export interface MENLinkProps extends BaseSymbolProps {}

export function MENLink({
  x,
  y,
  scale = DEFAULTS.scale,
  rotation = DEFAULTS.rotation,
  label = "MEN",
  stroke = DEFAULTS.stroke,
  strokeWidth = DEFAULTS.strokeWidth,
  fontFamily = DEFAULTS.fontFamily,
  fontSize = DEFAULTS.fontSize,
  onPortsResolved,
  className,
  id,
}: MENLinkProps) {
  useEffect(() => {
    onPortsResolved?.(resolvePorts(PORTS, x, y, scale, rotation));
  }, [x, y, scale, rotation, onPortsResolved]);

  return (
    <g transform={symbolTransform({ x, y, scale, rotation })} className={className} id={id}>
      {/* Connecting wire (dashed = earth) */}
      <line x1={12} y1={0} x2={2} y2={0} stroke={stroke} strokeWidth={strokeWidth * 0.7} strokeDasharray="4,2" />
      {/* Earth bars */}
      <line x1={0} y1={0} x2={0} y2={4} stroke={stroke} strokeWidth={strokeWidth} />
      <line x1={-8} y1={4} x2={8} y2={4} stroke={stroke} strokeWidth={strokeWidth} />
      <line x1={-5} y1={8} x2={5} y2={8} stroke={stroke} strokeWidth={strokeWidth} />
      <line x1={-2} y1={12} x2={2} y2={12} stroke={stroke} strokeWidth={strokeWidth} />
      {/* Label */}
      <text x={0} y={-8} textAnchor="middle" fontSize={fontSize - 1} fill={DEFAULTS.ratingColor} fontFamily={fontFamily}>
        {label}
      </text>
    </g>
  );
}
