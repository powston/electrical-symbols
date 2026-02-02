import type { ConnectionProps } from "../../types";
import { DEFAULTS } from "../../types";
import { midpoint } from "../../utils";

const WIRE_STYLES: Record<string, { dasharray: string; widthMultiplier: number; defaultStroke: string }> = {
  ac:            { dasharray: "none",  widthMultiplier: 1,    defaultStroke: DEFAULTS.stroke },
  dc:            { dasharray: "6,3",   widthMultiplier: 1,    defaultStroke: DEFAULTS.stroke },
  earth:         { dasharray: "4,2",   widthMultiplier: 0.7,  defaultStroke: DEFAULTS.stroke },
  control:       { dasharray: "2,2",   widthMultiplier: 0.6,  defaultStroke: "#6366f1" },
  communication: { dasharray: "1,3",   widthMultiplier: 0.5,  defaultStroke: "#0ea5e9" },
};

export function Connection({
  from,
  to,
  waypoints = [],
  wireStyle = "ac",
  stroke,
  strokeWidth = DEFAULTS.strokeWidth,
  label,
  fontFamily = DEFAULTS.fontFamily,
  className,
  id,
}: ConnectionProps) {
  const style = WIRE_STYLES[wireStyle] ?? WIRE_STYLES.ac;
  const finalStroke = stroke ?? style.defaultStroke;
  const finalWidth = strokeWidth * style.widthMultiplier;
  const dash = style.dasharray === "none" ? undefined : style.dasharray;

  // Build point sequence: from → waypoints → to
  const points = [from, ...waypoints, to];
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  // Midpoint for label
  const mp = midpoint(from, to);

  return (
    <g className={className} id={id}>
      <path
        d={d}
        fill="none"
        stroke={finalStroke}
        strokeWidth={finalWidth}
        strokeDasharray={dash}
      />
      {label && (
        <text
          x={mp.x + 6}
          y={mp.y - 4}
          fontSize={7}
          fill={DEFAULTS.detailColor}
          fontFamily={fontFamily}
        >
          {label}
        </text>
      )}
    </g>
  );
}
