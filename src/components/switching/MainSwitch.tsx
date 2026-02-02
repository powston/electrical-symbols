import { useEffect } from "react";
import type { BaseSymbolProps, Port, SymbolMeta } from "../../types";
import { DEFAULTS } from "../../types";
import { resolvePorts, symbolTransform } from "../../utils";

const PORTS: Port[] = [
  { name: "top", offset: { x: 0, y: -20 } },
  { name: "bottom", offset: { x: 0, y: 20 } },
];

export const mainSwitchMeta: SymbolMeta = {
  id: "main-switch",
  name: "Main Switch",
  category: "switching",
  ports: PORTS,
  bounds: { width: 40, height: 40 },
  description: "Main switch / supply disconnector",
};

export interface MainSwitchProps extends BaseSymbolProps {}

export function MainSwitch({
  x,
  y,
  scale = DEFAULTS.scale,
  rotation = DEFAULTS.rotation,
  label = "MAIN",
  rating,
  stroke = DEFAULTS.stroke,
  strokeWidth = DEFAULTS.strokeWidth,
  fontFamily = DEFAULTS.fontFamily,
  fontSize = DEFAULTS.fontSize,
  onPortsResolved,
  className,
  id,
}: MainSwitchProps) {
  useEffect(() => {
    onPortsResolved?.(resolvePorts(PORTS, x, y, scale, rotation));
  }, [x, y, scale, rotation, onPortsResolved]);

  return (
    <g transform={symbolTransform({ x, y, scale, rotation })} className={className} id={id}>
      {/* Top lead */}
      <line x1={0} y1={-20} x2={0} y2={-15} stroke={stroke} strokeWidth={strokeWidth} />
      {/* Box */}
      <rect x={-20} y={-15} width={40} height={30} fill="none" stroke={stroke} strokeWidth={strokeWidth} rx={2} />
      {/* Label inside */}
      <text x={0} y={-2} textAnchor="middle" fontSize={fontSize} fontWeight="600" fill="#0f172a" fontFamily={fontFamily}>
        {label}
      </text>
      {rating && (
        <text x={0} y={10} textAnchor="middle" fontSize={fontSize - 1} fill="#0f172a" fontFamily={fontFamily}>
          {rating}
        </text>
      )}
      {/* Bottom lead */}
      <line x1={0} y1={15} x2={0} y2={20} stroke={stroke} strokeWidth={strokeWidth} />
    </g>
  );
}
