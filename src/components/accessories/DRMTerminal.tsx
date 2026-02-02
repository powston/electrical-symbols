import { useEffect } from "react";
import type { BaseSymbolProps, Port, SymbolMeta } from "../../types";
import { DEFAULTS } from "../../types";
import { resolvePorts, symbolTransform } from "../../utils";

const PORTS: Port[] = [
  { name: "left", offset: { x: -14, y: 0 } },
];

export const drmTerminalMeta: SymbolMeta = {
  id: "drm-terminal",
  name: "DRM Terminal",
  category: "accessories",
  ports: PORTS,
  bounds: { width: 28, height: 20 },
  description: "Demand Response Mode terminal block (AS/NZS 4777.2 DRM0-DRM8)",
};

export interface DRMTerminalProps extends BaseSymbolProps {
  /** DRM modes supported, e.g. "DRM0-DRM8". */
  modes?: string;
}

export function DRMTerminal({
  x,
  y,
  scale = DEFAULTS.scale,
  rotation = DEFAULTS.rotation,
  label = "DRM",
  modes,
  stroke = DEFAULTS.stroke,
  strokeWidth = DEFAULTS.strokeWidth,
  fontFamily = DEFAULTS.fontFamily,
  fontSize = DEFAULTS.fontSize,
  onPortsResolved,
  className,
  id,
}: DRMTerminalProps) {
  useEffect(() => {
    onPortsResolved?.(resolvePorts(PORTS, x, y, scale, rotation));
  }, [x, y, scale, rotation, onPortsResolved]);

  return (
    <g transform={symbolTransform({ x, y, scale, rotation })} className={className} id={id}>
      {/* Connection wire */}
      <line x1={-14} y1={0} x2={-8} y2={0} stroke={stroke} strokeWidth={strokeWidth * 0.6} strokeDasharray="2,2" />
      {/* Terminal block */}
      <rect x={-8} y={-8} width={16} height={16} fill="none" stroke={stroke} strokeWidth={strokeWidth} rx={1} />
      <text x={0} y={3} textAnchor="middle" fontSize={6} fontWeight="600" fill="#0f172a" fontFamily={fontFamily}>
        {label}
      </text>
      {modes && (
        <text x={14} y={3} fontSize={fontSize - 2} fill={DEFAULTS.ratingColor} fontFamily={fontFamily}>
          {modes}
        </text>
      )}
    </g>
  );
}
