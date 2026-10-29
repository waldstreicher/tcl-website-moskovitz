// Inline illustrations for the "How TuLi Works" steps.
// Shared geometry: a skin layer across the top and two rows of fat cells beneath it.
// The incision sits in the skin gap centred on x=124; the scalpel and cannula aim at it.

const SKIN = '#D9D4CC';
const CELL_STROKE = '#C4956A';
const CELL_FILL = '#FFFFFF';
const GOLD = '#C4956A';
const STEEL = '#B8B8B8';
const FADED = '#D6D1C9';
const COLD = '#9CC4E4';

const ROW1 = [40, 68, 96, 124, 152, 180, 208];
const ROW2 = [54, 82, 110, 138, 166, 194];
const Y1 = 72;
const Y2 = 98;
const R = 13;
const INCISION_X = 124;
const SKIN_Y = 40; // vertical centre of the skin layer

// The three cells the cold solution does not reach.
const UNAFFECTED_1 = new Set([40, 208]);
const UNAFFECTED_2 = new Set([194]);

type Props = { className?: string };

function Svg({ children, className, title }: { children: React.ReactNode; className?: string; title: string }) {
  return (
    <svg viewBox="0 0 248 116" className={className} role="img" aria-label={title}>
      {children}
    </svg>
  );
}

function Skin({ gap = false }: { gap?: boolean }) {
  if (!gap) return <rect x="24" y="34" width="200" height="12" rx="2" fill={SKIN} />;
  return (
    <>
      <rect x="24" y="34" width="96" height="12" rx="2" fill={SKIN} />
      <rect x="128" y="34" width="96" height="12" rx="2" fill={SKIN} />
    </>
  );
}

function Cells({ fillFor }: { fillFor?: (x: number, row: 1 | 2) => string }) {
  const f = fillFor ?? (() => CELL_FILL);
  return (
    <>
      {ROW1.map((x) => <circle key={`a${x}`} cx={x} cy={Y1} r={R} fill={f(x, 1)} stroke={CELL_STROKE} strokeWidth="1.5" />)}
      {ROW2.map((x) => <circle key={`b${x}`} cx={x} cy={Y2} r={R} fill={f(x, 2)} stroke={CELL_STROKE} strokeWidth="1.5" />)}
    </>
  );
}

// 01 — a tiny incision through the skin. Scalpel: gold handle, short steel blade, tip at the incision.
export function AccessIllustration({ className }: Props) {
  return (
    <Svg className={className} title="A tiny incision is made in the skin">
      <Skin gap />
      <Cells />
      <g transform={`translate(${INCISION_X} ${SKIN_Y}) rotate(-45)`}>
        {/* blade: steel wedge whose point sits at the origin (the incision) */}
        <polygon points="0,0 14,-4 26,-4 26,4 14,4" fill={STEEL} />
        {/* handle: rounded gold bar running up the shaft */}
        <rect x="26" y="-4.5" width="50" height="9" rx="4.5" fill={GOLD} />
      </g>
    </Svg>
  );
}

// 02 — the cannula enters through the incision and infiltrates a cold solution around the fat cells.
export function InfiltrateIllustration({ className }: Props) {
  // Shaft passes through the incision: from the hub (upper right) to the tip among the cells.
  const tip = { x: 94, y: 60 };
  const hub = { x: 184, y: 0 };
  return (
    <Svg className={className} title="A cold solution surrounds the fat cells">
      <defs>
        <radialGradient id="tuli-cold" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={COLD} stopOpacity="1" />
          <stop offset="70%" stopColor={COLD} stopOpacity="0.9" />
          <stop offset="100%" stopColor={COLD} stopOpacity="0" />
        </radialGradient>
      </defs>
      <Skin gap />
      {/* the solution pools between and around the cells, not inside them */}
      <ellipse cx="112" cy="85" rx="84" ry="36" fill="url(#tuli-cold)" />
      <Cells />
      <line x1={hub.x} y1={hub.y} x2={tip.x} y2={tip.y} stroke={STEEL} strokeWidth="4" strokeLinecap="round" />
      <line x1={hub.x} y1={hub.y} x2={hub.x - 12} y2={hub.y + 8} stroke={GOLD} strokeWidth="8" strokeLinecap="round" />
    </Svg>
  );
}

// 03 — ice crystals form inside most of the fat cells (the frozen cells turn blue).
export function CrystallizeIllustration({ className }: Props) {
  const fillFor = (x: number, row: 1 | 2) =>
    (row === 1 ? UNAFFECTED_1 : UNAFFECTED_2).has(x) ? CELL_FILL : COLD;
  return (
    <Svg className={className} title="Crystals form in most of the fat cells">
      <Skin />
      <Cells fillFor={fillFor} />
    </Svg>
  );
}

// 04 — the body clears the treated cells; only the unaffected cells remain.
export function ClearIllustration({ className }: Props) {
  const cell = (x: number, y: number, keep: boolean) =>
    keep ? (
      <circle key={`k${x}${y}`} cx={x} cy={y} r={R} fill={CELL_FILL} stroke={GOLD} strokeWidth="2" />
    ) : (
      <circle key={`g${x}${y}`} cx={x} cy={y} r={R} fill="none" stroke={FADED} strokeWidth="1.5" strokeDasharray="3 3" />
    );
  return (
    <Svg className={className} title="Fewer fat cells remain">
      <Skin />
      {ROW1.map((x) => cell(x, Y1, UNAFFECTED_1.has(x)))}
      {ROW2.map((x) => cell(x, Y2, UNAFFECTED_2.has(x)))}
    </Svg>
  );
}
