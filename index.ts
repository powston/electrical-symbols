// Types
export type {
  Point,
  Port,
  ResolvedPort,
  BaseSymbolProps,
  ConnectionProps,
  BusBarProps,
  SLDCanvasProps,
  SymbolMeta,
  WireStyle,
} from "./types";
export { DEFAULTS } from "./types";

// Utilities
export { resolvePorts, getPort, midpoint, symbolTransform, labelOffset } from "./utils";

// Layout
export { SLDCanvas } from "./layouts";

// Components
export {
  // Grid
  GridConnection,
  gridConnectionMeta,
  Transformer,
  transformerMeta,
  // Switching
  CircuitBreaker,
  circuitBreakerMeta,
  Isolator,
  isolatorMeta,
  MainSwitch,
  mainSwitchMeta,
  Fuse,
  fuseMeta,
  // Metering
  EnergyMeter,
  energyMeterMeta,
  CTBlock,
  ctBlockMeta,
  // Generation
  Inverter,
  inverterMeta,
  PVArray,
  pvArrayMeta,
  BatteryBank,
  batteryBankMeta,
  // Protection
  RCD,
  rcdMeta,
  SurgeProtector,
  surgeProtectorMeta,
  EarthSymbol,
  earthSymbolMeta,
  MENLink,
  menLinkMeta,
  // Wiring
  Connection,
  BusBar,
  Junction,
  junctionMeta,
  Load,
  loadMeta,
  // Accessories
  DRMTerminal,
  drmTerminalMeta,
  InfoBox,
} from "./components";

// Re-export component prop types
export type {
  GridConnectionProps,
  TransformerProps,
  CircuitBreakerProps,
  IsolatorProps,
  MainSwitchProps,
  FuseProps,
  EnergyMeterProps,
  CTBlockProps,
  InverterProps,
  PVArrayProps,
  BatteryBankProps,
  RCDProps,
  SurgeProtectorProps,
  EarthSymbolProps,
  MENLinkProps,
  JunctionProps,
  LoadProps,
  DRMTerminalProps,
  InfoBoxProps,
} from "./components";

// Symbol registry (all metadata for tooling / palettes)
import {
  gridConnectionMeta,
  transformerMeta,
  circuitBreakerMeta,
  isolatorMeta,
  mainSwitchMeta,
  fuseMeta,
  energyMeterMeta,
  ctBlockMeta,
  inverterMeta,
  pvArrayMeta,
  batteryBankMeta,
  rcdMeta,
  surgeProtectorMeta,
  earthSymbolMeta,
  menLinkMeta,
  junctionMeta,
  loadMeta,
  drmTerminalMeta,
} from "./components";

export const SYMBOL_REGISTRY = [
  gridConnectionMeta,
  transformerMeta,
  circuitBreakerMeta,
  isolatorMeta,
  mainSwitchMeta,
  fuseMeta,
  energyMeterMeta,
  ctBlockMeta,
  inverterMeta,
  pvArrayMeta,
  batteryBankMeta,
  rcdMeta,
  surgeProtectorMeta,
  earthSymbolMeta,
  menLinkMeta,
  junctionMeta,
  loadMeta,
  drmTerminalMeta,
] as const;
