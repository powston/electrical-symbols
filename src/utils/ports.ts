import type { Port, ResolvedPort, Point, BaseSymbolProps } from "../types";
import { DEFAULTS } from "../types";

/**
 * Resolve port offsets to absolute canvas positions, accounting for
 * the component's (x, y), scale, and rotation.
 */
export function resolvePorts(
  ports: Port[],
  x: number,
  y: number,
  scale: number = DEFAULTS.scale,
  rotation: number = DEFAULTS.rotation
): ResolvedPort[] {
  const rad = (rotation * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return ports.map((port) => {
    const sx = port.offset.x * scale;
    const sy = port.offset.y * scale;
    // Rotate around origin then translate
    const rx = sx * cos - sy * sin;
    const ry = sx * sin + sy * cos;
    return {
      ...port,
      absX: x + rx,
      absY: y + ry,
    };
  });
}

/**
 * Helper to get a single resolved port by name.
 */
export function getPort(ports: ResolvedPort[], name: string): ResolvedPort | undefined {
  return ports.find((p) => p.name === name);
}

/**
 * Compute the midpoint between two points.
 */
export function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/**
 * Build the SVG transform string for a symbol's outer <g>.
 */
export function symbolTransform(props: Pick<BaseSymbolProps, "x" | "y" | "scale" | "rotation">): string {
  const { x, y, scale = DEFAULTS.scale, rotation = DEFAULTS.rotation } = props;
  const parts: string[] = [`translate(${x}, ${y})`];
  if (rotation !== 0) parts.push(`rotate(${rotation})`);
  if (scale !== 1) parts.push(`scale(${scale})`);
  return parts.join(" ");
}

/**
 * Standard label positioning helper.
 * Returns (dx, dy) offset from origin for a label placed to the right.
 */
export function labelOffset(position: "right" | "left" | "above" | "below" = "right", gap: number = 14): Point {
  switch (position) {
    case "right":
      return { x: gap, y: 0 };
    case "left":
      return { x: -gap, y: 0 };
    case "above":
      return { x: 0, y: -gap };
    case "below":
      return { x: 0, y: gap };
  }
}
