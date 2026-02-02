import type { CSSProperties, ReactNode } from "react";
import { DEFAULTS } from "../../types";

export interface InfoBoxProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  title?: string;
  lines?: string[];
  /** Background fill. @default "#fefce8" */
  fill?: string;
  /** Border stroke. @default "#ca8a04" */
  borderStroke?: string;
  fontFamily?: string;
  fontSize?: number;
  titleColor?: string;
  textColor?: string;
  className?: string;
  id?: string;
  children?: ReactNode;
}

export function InfoBox({
  x,
  y,
  width = 190,
  height,
  title,
  lines = [],
  fill = "#fefce8",
  borderStroke = "#ca8a04",
  fontFamily = DEFAULTS.fontFamily,
  fontSize = 7,
  titleColor = "#854d0e",
  textColor = "#713f12",
  className,
  id,
}: InfoBoxProps) {
  const lineHeight = 12;
  const titleHeight = title ? 16 : 0;
  const padding = 10;
  const computedHeight = height ?? (titleHeight + lines.length * lineHeight + padding * 2);

  return (
    <g className={className} id={id}>
      <rect
        x={x}
        y={y}
        width={width}
        height={computedHeight}
        fill={fill}
        stroke={borderStroke}
        strokeWidth={0.8}
        rx={3}
        strokeDasharray="4,2"
      />
      {title && (
        <text
          x={x + padding}
          y={y + padding + 6}
          fontSize={fontSize + 1}
          fontWeight="700"
          fill={titleColor}
          fontFamily={fontFamily}
        >
          {title}
        </text>
      )}
      {lines.map((line, i) => (
        <text
          key={i}
          x={x + padding}
          y={y + titleHeight + padding + 6 + i * lineHeight}
          fontSize={fontSize}
          fill={textColor}
          fontFamily={fontFamily}
        >
          {line}
        </text>
      ))}
    </g>
  );
}
