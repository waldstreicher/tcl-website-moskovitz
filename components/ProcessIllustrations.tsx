// Inline illustrations for the "How TuLi Works" steps.
// Shared geometry: a skin layer across the top and two rows of fat cells beneath it.

const SKIN = '#D9D4CC';
const CELL_STROKE = '#C4956A';
const CELL_FILL = '#FFFFFF';
const DARK = '#1A1A1A';
const GOLD = '#C4956A';
const FADED = '#D6D1C9';
const COLD = '#9CC4E4';

const ROW1 = [40, 68, 96, 124, 152, 180, 208];
const ROW2 = [54, 82, 110, 138, 166, 194];
const Y1 = 72;
const Y2 = 98;
const R = 13;

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

function Cells({ fill = CELL_FILL, stroke = CELL_STROKE }: { fill?: string; stroke?: string }) {
  return (
    <>
      {ROW1.map((x) => <circle key={`a${x}`} cx={x} cy={Y1} r={R} fill={fill} stroke={stroke} strokeWidth="1.5" />)}
      {ROW2.map((x) => <circle key={`b${x}`} cx={x} cy={Y2} r={R} fill={fill} stroke={stroke} strokeWidth="1.5" />)}
    </>
  );
}

// 01 — a tiny incision through the skin.
export function AccessIllustration({ className }: Props) {
  return (
    <Svg className={className} title="A tiny incision is made in the skin">
      <Skin gap />
      <Cells />
      {/* scalpel: gold handle + steel blade angled into the incision */}
      <line x1="178" y1="6" x2="138" y2="46" stroke={GOLD} strokeWidth="6" strokeLinecap="round" />
      <polygon points="140,40 128,52 124,44" fill="#B8B8B8" />
    </Svg>
  );
}

// 02 — the cannula infiltrates a cold solution around the fat cells.
export function InfiltrateIllustration({ className }: Props) {
  const cold = new Set([68, 96, 124, 152, 82, 110, 138]);
  return (
    <Svg className={className} title="A cold solution surrounds the fat cells">
      <defs>
        <radialGradient id="tuli-cold" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={COLD} stopOpacity="0.9" />
          <stop offset="100%" stopColor={COLD} stopOpacity="0" />
        </radialGradient>
      </defs>
      <Skin gap />
      <ellipse cx="112" cy="86" rx="78" ry="34" fill="url(#tuli-cold)" />
      {ROW1.map((x) => <circle key={`a${x}`} cx={x} cy={Y1} r={R} fill={cold.has(x) ? COLD : CELL_FILL} stroke={CELL_STROKE} strokeWidth="1.5" />)}
      {ROW2.map((x) => <circle key={`b${x}`} cx={x} cy={Y2} r={R} fill={cold.has(x) ? COLD : CELL_FILL} stroke={CELL_STROKE} strokeWidth="1.5" />)}
      {/* cannula: long steel shaft with a gold hub, entering through the incision */}
      <line x1="200" y1="4" x2="112" y2="84" stroke="#B8B8B8" strokeWidth="4" strokeLinecap="round" />
      <line x1="212" y1="-4" x2="196" y2="10" stroke={GOLD} strokeWidth="8" strokeLinecap="round" />
    </Svg>
  );
}

// 03 — ice crystals form inside most of the fat cells.
export function CrystallizeIllustration({ className }: Props) {
  const crystal = (x: number, y: number) => (
    <polygon key={`c${x}${y}`} points={`${x},${y - 5} ${x + 5},${y} ${x},${y + 5} ${x - 5},${y}`} fill="#FFFFFF" />
  );
  const skip1 = new Set([68, 180]);
  const skip2 = new Set([138]);
  return (
    <Svg className={className} title="Crystals form in most of the fat cells">
      <Skin />
      <Cells fill={DARK} stroke={DARK} />
      {ROW1.filter((x) => !skip1.has(x)).map((x) => crystal(x, Y1))}
      {ROW2.filter((x) => !skip2.has(x)).map((x) => crystal(x, Y2))}
    </Svg>
  );
}

// 04 — the body clears the treated cells; fewer fat cells remain.
export function ClearIllustration({ className }: Props) {
  const remain1 = new Set([68, 180]);
  const remain2 = new Set([138]);
  const cell = (x: number, y: number, keep: boolean) =>
    keep ? (
      <circle key={`k${x}${y}`} cx={x} cy={y} r={R} fill="#FFFFFF" stroke={GOLD} strokeWidth="2" />
    ) : (
      <circle key={`g${x}${y}`} cx={x} cy={y} r={R} fill="none" stroke={FADED} strokeWidth="1.5" strokeDasharray="3 3" />
    );
  return (
    <Svg className={className} title="Fewer fat cells remain">
      <Skin />
      {ROW1.map((x) => cell(x, Y1, remain1.has(x)))}
      {ROW2.map((x) => cell(x, Y2, remain2.has(x)))}
    </Svg>
  );
}
