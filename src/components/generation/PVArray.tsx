import { useEffect } from "react";
import type { BaseSymbolProps, Port, SymbolMeta } from "../../types";
import { DEFAULTS } from "../../types";
import { resolvePorts, symbolTransform } from "../../utils";

const PORTS: Port[] = [
  { name: "top", offset: { x: 0, y: -18 } },
];

export const pvArrayMeta: SymbolMeta = {
  id: "pv-array",
  name: "PV Array",
  category: "generation",
  ports: PORTS,
  bounds: { width: 48, height: 36 },
  description: "Photovoltaic array / module symbol with sun rays",
};

export interface PVArrayProps extends BaseSymbolProps {
  /** Total PV capacity string, e.g. "20 kW". */
  capacity?: string;
  /** MPPT / string description, e.g. "4 MPPT". */
  strings?: string;
  /** Module description, e.g. "36× LONGi 555W". */
  modules?: string;
}

export function PVArray({
  x,
  y,
  scale = DEFAULTS.scale,
  rotation = DEFAULTS.rotation,
  label = "PV ARRAY",
  capacity,
  strings,
  modules,
  stroke = DEFAULTS.stroke,
  strokeWidth = DEFAULTS.strokeWidth,
  fontFamily = DEFAULTS.fontFamily,
  fontSize = DEFAULTS.fontSize,
  onPortsResolved,
  className,
  id,
}: PVArrayProps) {
  useEffect(() => {
    onPortsResolved?.(resolvePorts(PORTS, x, y, scale, rotation));
  }, [x, y, scale, rotation, onPortsResolved]);

  return (
    <g transform={symbolTransform({ x, y, scale, rotation })} className={className} id={id}>
      {/* Top lead */}
      <line x1={0} y1={-18} x2={0} y2={-16} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray="6,3" />
      {/* Panel box */}
      <rect x={-24} y={-16} width={48} height={32} fill="none" stroke={stroke} strokeWidth={strokeWidth} rx={2} />
      {/* Cell lines */}
      <line x1={-10} y1={-6} x2={10} y2={-6} stroke={stroke} strokeWidth={strokeWidth * 0.7} />
      <line x1={-10} y1={4} x2={10} y2={4} stroke={stroke} strokeWidth={strokeWidth * 0.7} />
      {/* Polarity */}
      <text x={-18} y={-4} fontSize={fontSize} fill="#0f172a" fontFamily={fontFamily}>+</text>
      <text x={-18} y={10} fontSize={fontSize} fill="#0f172a" fontFamily={fontFamily}>−</text>
      {/* Sun rays */}
      <line x1={30} y1={-14} x2={38} y2={-20} stroke="#f59e0b" strokeWidth={1.2} />
      <line x1={30} y1={-6} x2={38} y2={-6} stroke="#f59e0b" strokeWidth={1.2} />
      <line x1={30} y1={2} x2={38} y2={8} stroke="#f59e0b" strokeWidth={1.2} />
      {/* Labels below */}
      <text x={0} y={28} textAnchor="middle" fontSize={fontSize} fontWeight="600" fill={DEFAULTS.labelColor} fontFamily={fontFamily}>
        {label}
      </text>
      {capacity && (
        <text x={0} y={38} textAnchor="middle" fontSize={fontSize - 1} fill={DEFAULTS.ratingColor} fontFamily={fontFamily}>
          {capacity}
        </text>
      )}
      {strings && (
        <text x={0} y={48} textAnchor="middle" fontSize={fontSize - 1} fill={DEFAULTS.ratingColor} fontFamily={fontFamily}>
          {strings}
        </text>
      )}
      {modules && (
        <text x={0} y={58} textAnchor="middle" fontSize={fontSize - 1} fill={DEFAULTS.ratingColor} fontFamily={fontFamily}>
          {modules}
        </text>
      )}
    </g>
  );
}
