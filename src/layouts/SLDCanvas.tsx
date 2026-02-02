import type { SLDCanvasProps } from "../types";

export function SLDCanvas({
  width = 800,
  height = 600,
  maxWidth,
  background = "none",
  showGrid = false,
  gridSpacing = 20,
  children,
  className,
  id,
  style,
}: SLDCanvasProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      style={{
        maxWidth: maxWidth ?? width,
        display: "block",
        margin: "0 auto",
        ...style,
      }}
      className={className}
      id={id}
    >
      {/* Background */}
      {background !== "none" && (
        <rect x={0} y={0} width={width} height={height} fill={background} />
      )}

      {/* Dev grid */}
      {showGrid && (
        <g opacity={0.15}>
          {Array.from({ length: Math.ceil(width / gridSpacing) + 1 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * gridSpacing}
              y1={0}
              x2={i * gridSpacing}
              y2={height}
              stroke="#94a3b8"
              strokeWidth={0.5}
            />
          ))}
          {Array.from({ length: Math.ceil(height / gridSpacing) + 1 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={i * gridSpacing}
              x2={width}
              y2={i * gridSpacing}
              stroke="#94a3b8"
              strokeWidth={0.5}
            />
          ))}
        </g>
      )}

      {children}
    </svg>
  );
}
