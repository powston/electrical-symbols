import type { BaseSymbolProps, Port, SymbolMeta } from "../../types";
import { DEFAULTS } from "../../types";

export const junctionMeta: SymbolMeta = {
  id: "junction",
  name: "Junction",
  category: "wiring",
  ports: [
    { name: "center", offset: { x: 0, y: 0 } },
  ],
  bounds: { width: 6, height: 6 },
  description: "Wire junction / connection node",
};

export interface JunctionProps {
  x: number;
  y: number;
  /** Radius of the dot. @default 2.5 */
  r?: number;
  fill?: string;
  className?: string;
  id?: string;
}

export function Junction({
  x,
  y,
  r = 2.5,
  fill = DEFAULTS.stroke,
  className,
  id,
}: JunctionProps) {
  return <circle cx={x} cy={y} r={r} fill={fill} className={className} id={id} />;
}
