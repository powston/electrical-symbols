import { useEffect } from "react";
import type { BaseSymbolProps, Port, SymbolMeta } from "../../types";
import { DEFAULTS } from "../../types";
import { resolvePorts, symbolTransform } from "../../utils";

const PORTS: Port[] = [
  { name: "top", offset: { x: 0, y: -12 } },
  { name: "bottom", offset: { x: 0, y: 12 } },
];

export const fuseMeta: SymbolMeta = {
  id: "fuse",
  name: "Fuse",
  category: "switching",
  ports: PORTS,
  bounds: { width: 12, height: 24 },
  description: "Fuse element (IEC 60617-S00152)",
};

export interface FuseProps extends BaseSymbolProps {}

export function Fuse({
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
}: FuseProps) {
  useEffect(() => {
    onPortsResolved?.(resolvePorts(PORTS, x, y, scale, rotation));
  }, [x, y, scale, rotation, onPortsResolved]);

  return (
    <g transform={symbolTransform({ x, y, scale, rotation })} className={className} id={id}>
      <line x1={0} y1={-12} x2={0} y2={-6} stroke={stroke} strokeWidth={strokeWidth} />
      <rect x={-4} y={-6} width={8} height={12} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <line x1={0} y1={-6} x2={0} y2={6} stroke={stroke} strokeWidth={strokeWidth * 0.6} />
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
