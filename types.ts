import { type CSSProperties, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// Geometry
// ---------------------------------------------------------------------------

/** Absolute point on the SVG canvas. */
export interface Point {
  x: number;
  y: number;
}

/** Named connection point exposed by a symbol, offset from its origin. */
export interface Port {
  /** Unique name within the component (e.g. "top", "bottom", "ac", "dc1"). */
  name: string;
  /** Offset from the component's (x, y) origin. */
  offset: Point;
}

/** Resolved absolute position of a port after applying component position. */
export interface ResolvedPort extends Port {
  /** Absolute x on the SVG canvas. */
  absX: number;
  /** Absolute y on the SVG canvas. */
  absY: number;
}

// ---------------------------------------------------------------------------
// Base component props
// ---------------------------------------------------------------------------

/** Props shared by every electrical symbol component. */
export interface BaseSymbolProps {
  /** X position of the component origin on the SVG canvas. */
  x: number;
  /** Y position of the component origin on the SVG canvas. */
  y: number;
  /** Uniform scale factor. @default 1 */
  scale?: number;
  /** Rotation in degrees around the origin. @default 0 */
  rotation?: number;
  /** Primary label (rendered near the symbol). */
  label?: string;
  /** Secondary label, typically a rating like "32A" or "10 kW". */
  rating?: string;
  /** Additional text lines rendered below the rating. */
  details?: string[];
  /** SVG stroke colour override. @default "#1e293b" */
  stroke?: string;
  /** SVG stroke width override. @default 1.5 */
  strokeWidth?: number;
  /** Font family override. @default "'IBM Plex Mono', monospace" */
  fontFamily?: string;
  /** Label font size. @default 8 */
  fontSize?: number;
  /** Inline style applied to the outer <g> element. */
  style?: CSSProperties;
  /** Optional className on the outer <g>. */
  className?: string;
  /** Optional id on the outer <g>. */
  id?: string;
  /** Callback that receives resolved port positions after render. */
  onPortsResolved?: (ports: ResolvedPort[]) => void;
  children?: ReactNode;
}

// ---------------------------------------------------------------------------
// Connection / wiring
// ---------------------------------------------------------------------------

/** Wire routing style. */
export type WireStyle = "ac" | "dc" | "earth" | "control" | "communication";

/** Props for the Connection (wire) component. */
export interface ConnectionProps {
  /** Starting point. */
  from: Point;
  /** Ending point. */
  to: Point;
  /** Optional waypoints for routing the wire. */
  waypoints?: Point[];
  /** Visual style of the wire. @default "ac" */
  wireStyle?: WireStyle;
  /** Stroke colour override (otherwise derived from wireStyle). */
  stroke?: string;
  /** Stroke width override. @default 1.5 */
  strokeWidth?: number;
  /** Optional label placed at the midpoint. */
  label?: string;
  /** Font family. @default "'IBM Plex Mono', monospace" */
  fontFamily?: string;
  className?: string;
  id?: string;
}

// ---------------------------------------------------------------------------
// Bus bar
// ---------------------------------------------------------------------------

export interface BusBarProps {
  /** Start point. */
  from: Point;
  /** End point. */
  to: Point;
  /** Label rendered above the bar. */
  label?: string;
  /** Stroke colour. @default "#1e293b" */
  stroke?: string;
  /** Stroke width. @default 2.5 */
  strokeWidth?: number;
  fontFamily?: string;
  fontSize?: number;
  className?: string;
  id?: string;
}

// ---------------------------------------------------------------------------
// SLD Canvas
// ---------------------------------------------------------------------------

export interface SLDCanvasProps {
  /** Canvas width in SVG user units. @default 800 */
  width?: number;
  /** Canvas height in SVG user units. @default 600 */
  height?: number;
  /** CSS max-width applied to the <svg>. */
  maxWidth?: number | string;
  /** Background fill. @default "none" */
  background?: string;
  /** Show a faint grid for positioning during development. @default false */
  showGrid?: boolean;
  /** Grid spacing when showGrid is true. @default 20 */
  gridSpacing?: number;
  children?: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

// ---------------------------------------------------------------------------
// Symbol metadata (for registry / tooling)
// ---------------------------------------------------------------------------

export interface SymbolMeta {
  /** Machine-readable identifier, e.g. "circuit-breaker". */
  id: string;
  /** Human-readable name. */
  name: string;
  /** Category grouping. */
  category: "grid" | "switching" | "metering" | "generation" | "protection" | "wiring" | "accessories";
  /** Default port definitions (offsets from origin at scale=1). */
  ports: Port[];
  /** Approximate bounding box at scale=1. */
  bounds: { width: number; height: number };
  /** Short description. */
  description?: string;
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

export const DEFAULTS = {
  stroke: "#1e293b",
  strokeWidth: 1.5,
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 8,
  labelColor: "#475569",
  ratingColor: "#64748b",
  detailColor: "#94a3b8",
  scale: 1,
  rotation: 0,
} as const;
