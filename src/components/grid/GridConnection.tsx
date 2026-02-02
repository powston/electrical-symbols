import { useEffect } from "react";
import type { BaseSymbolProps, Port, SymbolMeta } from "../../types";
import { DEFAULTS } from "../../types";
import { resolvePorts, symbolTransform } from "../../utils";

const PORTS: Port[] = [
  { name: "bottom", offset: { x: 0, y: 12 } },
];

export const gridConnectionMeta: SymbolMeta = {
  id: "grid-connection",
  name: "Grid Connection Point",
  category: "grid",
  ports: PORTS,
  bounds: { width: 180, height: 24 },
  description: "Distribution network supply point (Energex / Ergon / SAPN etc.)",
};

export interface GridConnectionProps extends BaseSymbolProps {
  /** Network name, e.g. "ENERGEX LV NETWORK". */
  networkName?: string;
  /** Supply description, e.g. "1Ø 230V 50Hz". */
  supplyDesc?: string;
}

export function GridConnection({
  x,
  y,
  scale = DEFAULTS.scale,
  rotation = DEFAULTS.rotation,
  networkName = "LV NETWORK",
  supplyDesc,
  stroke = DEFAULTS.stroke,
  strokeWidth = DEFAULTS.strokeWidth,
  fontFamily = DEFAULTS.fontFamily,
  onPortsResolved,
  className,
  id,
}: GridConnectionProps) {
  useEffect(() => {
    onPortsResolved?.(resolvePorts(PORTS, x, y, scale, rotation));
  }, [x, y, scale, rotation, onPortsResolved]);

  return (
    <g transform={symbolTransform({ x, y, scale, rotation })} className={className} id={id}>
      {/* Supply bars */}
      <line x1={-12} y1={0} x2={12} y2={0} stroke={stroke} strokeWidth={strokeWidth * 1.8} />
      <line x1={-8} y1={-5} x2={8} y2={-5} stroke={stroke} strokeWidth={strokeWidth * 1.2} />
      <line x1={-4} y1={-9} x2={4} y2={-9} stroke={stroke} strokeWidth={strokeWidth * 0.8} />
      {/* Stem down */}
      <line x1={0} y1={0} x2={0} y2={12} stroke={stroke} strokeWidth={strokeWidth} />
      {/* Labels */}
      <text x={0} y={-16} textAnchor="middle" fontSize={9} fontWeight="700" fill="#0f172a" fontFamily={fontFamily}>
        {networkName}
      </text>
      {supplyDesc && (
        <text x={0} y={-26} textAnchor="middle" fontSize={7} fill={DEFAULTS.ratingColor} fontFamily={fontFamily}>
          {supplyDesc}
        </text>
      )}
    </g>
  );
}
