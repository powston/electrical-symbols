import type { BusBarProps } from "../../types";
import { DEFAULTS } from "../../types";

export function BusBar({
  from,
  to,
  label,
  stroke = DEFAULTS.stroke,
  strokeWidth = 2.5,
  fontFamily = DEFAULTS.fontFamily,
  fontSize = 9,
  className,
  id,
}: BusBarProps) {
  return (
    <g className={className} id={id}>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {label && (
        <text
          x={from.x}
          y={from.y - 8}
          fontSize={fontSize}
          fontWeight="700"
          fill="#0f172a"
          fontFamily={fontFamily}
        >
          {label}
        </text>
      )}
    </g>
  );
}
