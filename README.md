# @powston/electrical-symbols

React SVG electrical schematic symbols for Australian single line diagrams.

Typed, composable components following IEC 60617 / AS 60617 conventions, designed for solar PV, battery storage, and embedded generation EWR submissions.

## Install

```bash
npm install @powston/electrical-symbols
```

Peer dependencies: `react >= 18`

## Quick Start

```tsx
import {
  SLDCanvas,
  GridConnection,
  EnergyMeter,
  MainSwitch,
  BusBar,
  CircuitBreaker,
  Isolator,
  Inverter,
  PVArray,
  BatteryBank,
  MENLink,
  Load,
  Connection,
  InfoBox,
} from "@powston/electrical-symbols";

function MySLD() {
  return (
    <SLDCanvas width={720} height={540} showGrid={false}>
      {/* Grid supply */}
      <GridConnection x={200} y={30} networkName="ENERGEX LV NETWORK" supplyDesc="1Ø 230V 50Hz" />

      {/* Meter */}
      <Connection from={{ x: 200, y: 42 }} to={{ x: 200, y: 56 }} />
      <EnergyMeter x={200} y={70} scheme="Net Energy" meterDesc="Import / Export" />

      {/* Main switch */}
      <Connection from={{ x: 200, y: 84 }} to={{ x: 200, y: 115 }} />
      <MainSwitch x={200} y={135} rating="63A" />
      <MENLink x={168} y={135} />

      {/* Bus */}
      <Connection from={{ x: 200, y: 155 }} to={{ x: 200, y: 195 }} />
      <BusBar from={{ x: 100, y: 195 }} to={{ x: 420, y: 195 }} label="MAIN SWITCHBOARD" />

      {/* Inverter branch */}
      <Connection from={{ x: 200, y: 195 }} to={{ x: 200, y: 240 }} />
      <Isolator x={200} y={250} label="AC Isolator" />
      <Connection from={{ x: 200, y: 264 }} to={{ x: 200, y: 286 }} />
      <Inverter x={200} y={310} make="Sungrow" model="SH10RS" rating="9.99 kW Single Phase" />

      {/* DC bus from inverter */}
      <Connection from={{ x: 200, y: 334 }} to={{ x: 200, y: 390 }} wireStyle="dc" />
      <Connection from={{ x: 120, y: 390 }} to={{ x: 280, y: 390 }} wireStyle="dc" />

      {/* PV array */}
      <Connection from={{ x: 120, y: 390 }} to={{ x: 120, y: 410 }} wireStyle="dc" />
      <Isolator x={120} y={420} dc />
      <Connection from={{ x: 120, y: 434 }} to={{ x: 120, y: 450 }} wireStyle="dc" />
      <PVArray x={120} y={468} capacity="20 kW" strings="4 MPPT" />

      {/* Battery */}
      <Connection from={{ x: 280, y: 390 }} to={{ x: 280, y: 410 }} wireStyle="dc" />
      <Isolator x={280} y={420} dc />
      <Connection from={{ x: 280, y: 434 }} to={{ x: 280, y: 450 }} wireStyle="dc" />
      <BatteryBank x={280} y={468} make="Sungrow" model="2× SBR224" capacity="44.8 kWh" coupling="DC Coupled" voltage="378-511V DC" />

      {/* Loads */}
      <Connection from={{ x: 380, y: 195 }} to={{ x: 380, y: 248 }} />
      <CircuitBreaker x={380} y={260} label="Load MCBs" />
      <Connection from={{ x: 380, y: 272 }} to={{ x: 380, y: 286 }} />
      <Load x={380} y={298} label="CONSUMER LOADS" />

      {/* Info boxes */}
      <InfoBox
        x={480} y={215}
        title="SYSTEM NOTES"
        lines={[
          "Export Limit: 5 kW (Partial)",
          "PQRM: Volt-VAR / Volt-Watt",
          "Metering: Net Energy",
        ]}
      />
      <InfoBox
        x={480} y={310}
        title="COMPLIANCE"
        lines={["AS/NZS 4777.1 & 4777.2", "AS/NZS 3000 | 5033 | 5139"]}
        fill="#f0fdf4"
        borderStroke="#16a34a"
        titleColor="#166534"
        textColor="#15803d"
      />
    </SLDCanvas>
  );
}
```

## Components

### Grid & Supply
| Component | Description |
|-----------|-------------|
| `GridConnection` | Distribution network supply point |
| `Transformer` | Two-winding transformer |

### Switching
| Component | Description |
|-----------|-------------|
| `CircuitBreaker` | MCB / MCCB |
| `Isolator` | AC or DC switch-disconnector |
| `MainSwitch` | Main supply switch |
| `Fuse` | Fuse element |

### Metering
| Component | Description |
|-----------|-------------|
| `EnergyMeter` | kWh meter (import/export) |
| `CTBlock` | Current transformer |

### Generation
| Component | Description |
|-----------|-------------|
| `Inverter` | Hybrid / string / micro inverter |
| `PVArray` | Photovoltaic array with sun rays |
| `BatteryBank` | Battery ESS with cell plates |

### Protection
| Component | Description |
|-----------|-------------|
| `RCD` | RCD / RCBO |
| `SurgeProtector` | SPD / varistor |
| `EarthSymbol` | Protective earth |
| `MENLink` | Multiple Earthed Neutral link |

### Wiring
| Component | Description |
|-----------|-------------|
| `Connection` | Wire between two points (AC/DC/earth/control styles) |
| `BusBar` | Heavy bus bar line with label |
| `Junction` | Connection node dot |
| `Load` | Generic consumer load (zigzag) |

### Accessories
| Component | Description |
|-----------|-------------|
| `DRMTerminal` | Demand response mode terminal |
| `InfoBox` | Annotation / notes box |

### Layout
| Component | Description |
|-----------|-------------|
| `SLDCanvas` | SVG canvas wrapper with optional dev grid |

## Port System

Every symbol exposes named **ports** — connection points at fixed offsets from its origin. Use ports to calculate wire start/end coordinates:

```tsx
import { resolvePorts, circuitBreakerMeta } from "@powston/electrical-symbols";

const ports = resolvePorts(circuitBreakerMeta.ports, 200, 300);
// → [{ name: "top", absX: 200, absY: 288 }, { name: "bottom", absX: 200, absY: 312 }]
```

Or use the `onPortsResolved` callback on any symbol:

```tsx
<CircuitBreaker
  x={200}
  y={300}
  rating="32A"
  onPortsResolved={(ports) => {
    // ports[0].absX, ports[0].absY, etc.
  }}
/>
```

## Wire Styles

The `Connection` component supports these `wireStyle` values:

| Style | Appearance | Use |
|-------|-----------|-----|
| `"ac"` | Solid line | AC circuits |
| `"dc"` | Long dash `6,3` | DC circuits |
| `"earth"` | Short dash `4,2` | Earth / protective |
| `"control"` | Fine dash, indigo | Control wiring |
| `"communication"` | Dotted, blue | Comms / data |

## Symbol Registry

All component metadata is available in `SYMBOL_REGISTRY` for building palettes, tooling, or documentation:

```tsx
import { SYMBOL_REGISTRY } from "@powston/electrical-symbols";

SYMBOL_REGISTRY.forEach((meta) => {
  console.log(meta.id, meta.category, meta.ports);
});
```

## Standards Reference

Symbols are based on:
- **IEC 60617** / **AS 60617** — Graphical symbols for diagrams
- **AS/NZS 3000** — Wiring Rules
- **AS/NZS 4777.1 & 4777.2** — Grid connection of energy systems via inverters
- **AS/NZS 5033** — Installation and safety requirements for PV arrays
- **AS/NZS 5139** — Electrical installations - Safety of battery systems

## License

MIT © Powston
