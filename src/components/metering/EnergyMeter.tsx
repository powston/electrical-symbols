import { useEffect } from "react";
import type { BaseSymbolProps, Port, SymbolMeta } from "../../types";
import { DEFAULTS } from "../../types";
import { resolvePorts, symbolTransform } from "../../utils";

const PORTS: Port[] = [
  { name: "top", offset: { x: 0, y: -14 } },
  { name: "bottom", offset: { x: 0, y: 14 } },
];

export const energyMeterMeta: SymbolMeta = {
  id: "energy-meter",
  name: "Energy Meter",
  category: "metering",
  ports: PORTS,
  bounds: { width: 28, height: 28 },
  description: "kWh energy meter (import/export)",
};

export interface EnergyMeterProps extends BaseSymbolProps {
  /** Meter text shown inside the circle. @default "kWh" */
  meterText?: string;
  /** Metering scheme description. */
  scheme?: string;
  /** Additional meter description. */
  meterDesc?: string;
}

export function EnergyMeter({
  x,
  y,
  scale = DEFAULTS.scale,
  rotation = DEFAULTS.rotation,
  label = "Energy Meter",
  rating,
  meterText = "kWh",
  scheme,
  meterDesc,
  stroke = DEFAULTS.stroke,
  strokeWidth = DEFAULTS.strokeWidth,
  fontFamily = DEFAULTS.fontFamily,
  fontSize = DEFAULTS.fontSize,
  onPortsResolved,
  className,
  id,
}: EnergyMeterProps) {
  useEffect(() => {
    onPortsResolved?.(resolvePorts(PORTS, x, y, scale, rotation));
  }, [x, y, scale, rotation, onPortsResolved]);

  return (
    <g transform={symbolTransform({ x, y, scale, rotation })} className={className} id={id}>
      {/* Top lead */}
      <line x1={0} y1={-14} x2={0} y2={-12} stroke={stroke} strokeWidth={strokeWidth} />
      {/* Meter circle */}
      <circle cx={0} cy={0} r={12} fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      {/* kWh text */}
      <text x={0} y={3} textAnchor="middle" fontSize={fontSize} fontWeight="600" fill="#0f172a" fontFamily={fontFamily}>
        {meterText}
      </text>
      {/* Bottom lead */}
      <line x1={0} y1={12} x2={0} y2={14} stroke={stroke} strokeWidth={strokeWidth} />
      {/* Labels to the right */}
      {label && (
        <text x={20} y={-4} fontSize={fontSize} fill={DEFAULTS.labelColor} fontFamily={fontFamily}>
          {label}
        </text>
      )}
      {scheme && (
        <text x={20} y={6} fontSize={fontSize - 1} fill={DEFAULTS.ratingColor} fontFamily={fontFamily}>
          {scheme}
        </text>
      )}
      {meterDesc && (
        <text x={20} y={16} fontSize={fontSize - 1} fill={DEFAULTS.ratingColor} fontFamily={fontFamily}>
          {meterDesc}
        </text>
      )}
    </g>
  );
}
