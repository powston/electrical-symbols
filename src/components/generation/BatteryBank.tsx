import { useEffect } from "react";
import type { BaseSymbolProps, Port, SymbolMeta } from "../../types";
import { DEFAULTS } from "../../types";
import { resolvePorts, symbolTransform } from "../../utils";

const PORTS: Port[] = [
  { name: "top", offset: { x: 0, y: -18 } },
];

export const batteryBankMeta: SymbolMeta = {
  id: "battery-bank",
  name: "Battery Bank",
  category: "generation",
  ports: PORTS,
  bounds: { width: 48, height: 36 },
  description: "Battery energy storage system (BESS) with cell plates",
};

export interface BatteryBankProps extends BaseSymbolProps {
  /** Battery make. */
  make?: string;
  /** Battery model. */
  model?: string;
  /** Total capacity, e.g. "44.8 kWh". */
  capacity?: string;
  /** Voltage range, e.g. "378-511V DC". */
  voltage?: string;
  /** Coupling type, e.g. "DC Coupled". */
  coupling?: string;
}

export function BatteryBank({
  x,
  y,
  scale = DEFAULTS.scale,
  rotation = DEFAULTS.rotation,
  label = "BATTERY ESS",
  make,
  model,
  capacity,
  voltage,
  coupling,
  stroke = DEFAULTS.stroke,
  strokeWidth = DEFAULTS.strokeWidth,
  fontFamily = DEFAULTS.fontFamily,
  fontSize = DEFAULTS.fontSize,
  onPortsResolved,
  className,
  id,
}: BatteryBankProps) {
  useEffect(() => {
    onPortsResolved?.(resolvePorts(PORTS, x, y, scale, rotation));
  }, [x, y, scale, rotation, onPortsResolved]);

  return (
    <g transform={symbolTransform({ x, y, scale, rotation })} className={className} id={id}>
      {/* Top lead */}
      <line x1={0} y1={-18} x2={0} y2={-16} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray="6,3" />
      {/* Outer box */}
      <rect x={-24} y={-16} width={48} height={32} fill="none" stroke={stroke} strokeWidth={strokeWidth} rx={2} />
      {/* Battery plates (2 cells) */}
      <line x1={-8} y1={-8} x2={-8} y2={8} stroke={stroke} strokeWidth={strokeWidth * 1.8} />
      <line x1={-2} y1={-4} x2={-2} y2={4} stroke={stroke} strokeWidth={strokeWidth * 0.8} />
      <line x1={4} y1={-8} x2={4} y2={8} stroke={stroke} strokeWidth={strokeWidth * 1.8} />
      <line x1={10} y1={-4} x2={10} y2={4} stroke={stroke} strokeWidth={strokeWidth * 0.8} />
      {/* Polarity */}
      <text x={16} y={-4} fontSize={fontSize} fill="#0f172a" fontFamily={fontFamily}>+</text>
      <text x={16} y={8} fontSize={fontSize} fill="#0f172a" fontFamily={fontFamily}>−</text>
      {/* Labels below */}
      <text x={0} y={28} textAnchor="middle" fontSize={fontSize} fontWeight="600" fill={DEFAULTS.labelColor} fontFamily={fontFamily}>
        {label}
      </text>
      {make && model && (
        <text x={0} y={38} textAnchor="middle" fontSize={fontSize - 1} fill={DEFAULTS.ratingColor} fontFamily={fontFamily}>
          {make} {model}
        </text>
      )}
      {capacity && coupling && (
        <text x={0} y={48} textAnchor="middle" fontSize={fontSize - 1} fill={DEFAULTS.ratingColor} fontFamily={fontFamily}>
          {capacity} ({coupling})
        </text>
      )}
      {voltage && (
        <text x={0} y={58} textAnchor="middle" fontSize={fontSize - 1} fill={DEFAULTS.ratingColor} fontFamily={fontFamily}>
          {voltage}
        </text>
      )}
    </g>
  );
}
