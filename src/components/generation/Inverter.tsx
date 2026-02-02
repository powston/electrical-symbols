import { useEffect } from "react";
import type { BaseSymbolProps, Port, SymbolMeta } from "../../types";
import { DEFAULTS } from "../../types";
import { resolvePorts, symbolTransform } from "../../utils";

const PORTS: Port[] = [
  { name: "ac", offset: { x: 0, y: -24 } },
  { name: "dc", offset: { x: 0, y: 24 } },
  { name: "dc1", offset: { x: -30, y: 24 } },
  { name: "dc2", offset: { x: 30, y: 24 } },
];

export const inverterMeta: SymbolMeta = {
  id: "inverter",
  name: "Inverter",
  category: "generation",
  ports: PORTS,
  bounds: { width: 110, height: 48 },
  description: "Grid-interactive inverter (string, hybrid, micro). DC ports on bottom, AC on top.",
};

export interface InverterProps extends BaseSymbolProps {
  /** Inverter make. */
  make?: string;
  /** Inverter model. */
  model?: string;
  /** Show the AC/DC markers. @default true */
  showAcDc?: boolean;
}

export function Inverter({
  x,
  y,
  scale = DEFAULTS.scale,
  rotation = DEFAULTS.rotation,
  label,
  rating,
  make,
  model,
  showAcDc = true,
  stroke = DEFAULTS.stroke,
  strokeWidth = DEFAULTS.strokeWidth,
  fontFamily = DEFAULTS.fontFamily,
  fontSize = DEFAULTS.fontSize,
  onPortsResolved,
  className,
  id,
}: InverterProps) {
  useEffect(() => {
    onPortsResolved?.(resolvePorts(PORTS, x, y, scale, rotation));
  }, [x, y, scale, rotation, onPortsResolved]);

  const hw = 55; // half-width
  const hh = 22; // half-height

  return (
    <g transform={symbolTransform({ x, y, scale, rotation })} className={className} id={id}>
      {/* Box */}
      <rect x={-hw} y={-hh} width={hw * 2} height={hh * 2} fill="#f1f5f9" stroke={stroke} strokeWidth={strokeWidth * 1.2} rx={3} />
      {/* Make */}
      {make && (
        <text x={0} y={-6} textAnchor="middle" fontSize={fontSize + 1} fontWeight="700" fill="#0f172a" fontFamily={fontFamily}>
          {make}
        </text>
      )}
      {/* Model */}
      {model && (
        <text x={0} y={6} textAnchor="middle" fontSize={fontSize} fontWeight="600" fill="#1e293b" fontFamily={fontFamily}>
          {model}
        </text>
      )}
      {/* Rating */}
      {rating && (
        <text x={0} y={17} textAnchor="middle" fontSize={fontSize - 1} fill={DEFAULTS.labelColor} fontFamily={fontFamily}>
          {rating}
        </text>
      )}
      {/* AC / DC markers */}
      {showAcDc && (
        <>
          <text x={0} y={-hh - 4} textAnchor="middle" fontSize={7} fill={DEFAULTS.detailColor} fontFamily={fontFamily}>AC</text>
          <text x={0} y={hh + 10} textAnchor="middle" fontSize={7} fill={DEFAULTS.detailColor} fontFamily={fontFamily}>DC</text>
        </>
      )}
      {/* AC lead out top */}
      <line x1={0} y1={-hh} x2={0} y2={-hh - 2} stroke={stroke} strokeWidth={strokeWidth} />
      {/* DC lead out bottom */}
      <line x1={0} y1={hh} x2={0} y2={hh + 2} stroke={stroke} strokeWidth={strokeWidth} />
    </g>
  );
}
