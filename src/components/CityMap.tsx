import { useRef } from 'react'
import { useInView } from 'framer-motion'

// SVG viewport 560×480 — Dublin geography reference:
//   coast/bay runs along right edge (x≈490–540)
//   M50 horseshoe open toward bay on east
//   River Liffey crosses E–W through centre (~y 244)
//   Airport sits north-centre (~360, 44)

type Anchor   = 'start' | 'middle' | 'end'
type Baseline = 'auto'  | 'middle' | 'hanging'

const STOPS: { x:number; y:number; name:string; lx:number; ly:number; ta:Anchor; bl:Baseline }[] = [
  { x: 110, y: 148, name: 'Blanchardstown', lx: -9,  ly:  0,  ta: 'end',    bl: 'middle'  },
  { x: 318, y: 112, name: 'Drumcondra',     lx:  0,  ly: -13, ta: 'middle', bl: 'auto'    },
  { x: 440, y: 148, name: 'Clontarf',       lx:  9,  ly:  0,  ta: 'start',  bl: 'middle'  },
  { x: 432, y: 230, name: 'Ballsbridge',    lx:  9,  ly:  0,  ta: 'start',  bl: 'middle'  },
  { x: 452, y: 338, name: 'Dun Laoghaire',  lx:  9,  ly:  0,  ta: 'start',  bl: 'middle'  },
  { x: 358, y: 348, name: 'Dundrum',        lx:  0,  ly:  12, ta: 'middle', bl: 'hanging' },
  { x: 182, y: 368, name: 'Tallaght',       lx:  0,  ly:  12, ta: 'middle', bl: 'hanging' },
  { x:  80, y: 238, name: 'Lucan',          lx: -9,  ly:  0,  ta: 'end',    bl: 'middle'  },
]

// Smooth closed service route (clockwise from Blanchardstown)
const ROUTE = [
  'M110,148',
  'C195,108 268,105 318,112',
  'C368,120 410,132 440,148',
  'C464,165 452,200 432,230',
  'C448,278 458,310 452,338',
  'C448,344 408,346 358,348',
  'C296,352 238,362 182,368',
  'C125,374 74,314 80,238',
  'C82,178 92,160 110,148 Z',
].join(' ')

// M50 ring — horseshoe from north, around west + south, open east toward bay
const M50 = [
  'M372,40',
  'C342,35 306,34 274,37',
  'C240,41 212,54 190,75',
  'C166,97 152,127 146,159',
  'C140,192 142,226 152,257',
  'C163,291 183,318 209,340',
  'C237,364 269,377 303,381',
  'C337,385 371,377 399,359',
  'C424,343 442,317 452,287',
  'C460,259 458,227 452,196',
].join(' ')

// River Liffey (west → east through city, drains into bay)
const LIFFEY = 'M48,252 C115,247 182,243 242,241 C296,239 344,240 390,243 C424,245 458,250 492,256'

// Dublin Bay coastline (east edge)
const COAST = 'M496,54 C514,72 523,99 527,126 C531,155 529,183 523,210 C517,236 509,260 505,284 C501,310 501,335 504,360 C508,385 514,410 520,434'

// Major arterials radiating from city centre
const ROADS = [
  'M265,242 C215,240 162,237 110,234 C78,232 46,230 14,228',        // N4 west → Lucan
  'M268,234 C238,213 205,190 168,168 C138,150 104,132 66,114',      // N3 northwest
  'M354,226 C358,190 362,155 365,120 C368,90 370,62 372,40',        // M1/N1 north → Airport
  'M338,226 C337,190 335,155 333,120 C331,88 330,62 328,38',        // N2 north
  'M262,252 C234,272 206,294 176,316 C148,336 116,358 82,378',      // N7 southwest → Tallaght
  'M400,258 C414,286 424,316 428,346 C432,375 430,404 424,432',     // N11 south → Dun Laoghaire
  'M295,234 C295,215 296,195 298,175 C300,155 304,135 310,115',     // R132 north inner
]

const PATH_LEN = 1130
const TRAIL    = 58
const CAR_DUR  = '22s'

export default function CityMap() {
  const ref    = useRef<SVGSVGElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-60px' })

  return (
    <div
      className="relative rounded-2xl border border-border overflow-hidden"
      style={{ background: '#0B1410', aspectRatio: '560/480' }}
    >
      <svg ref={ref} viewBox="0 0 560 480" className="w-full h-full">
        <defs>
          {/* Filters */}
          <filter id="cm-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="cm-glow-sm" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.8" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="cm-car" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          {/* Headlight warm glow */}
          <radialGradient id="cm-hl" cx="50%" cy="10%" r="90%">
            <stop offset="0%"   stopColor="#fffbe0" stopOpacity="0.82"/>
            <stop offset="100%" stopColor="#fffbe0" stopOpacity="0"/>
          </radialGradient>

          {/* City centre ambient glow */}
          <radialGradient id="cm-city" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#1FA37A" stopOpacity="0.055"/>
            <stop offset="100%" stopColor="#1FA37A" stopOpacity="0"/>
          </radialGradient>

          {/* Land mask (clips grid to land only) */}
          <clipPath id="cm-land-clip">
            <rect width="490" height="480"/>
          </clipPath>

          {/* Route path for animateMotion */}
          <path id="cm-route" d={ROUTE}/>
        </defs>

        {/* ── Dublin Bay (sea fill) ── */}
        <path d={`${COAST} L560,434 L560,54 Z`} fill="#0A1C18"/>

        {/* Coast edge line */}
        <path d={COAST} fill="none" stroke="#1FA37A" strokeWidth="0.8" strokeOpacity="0.28"/>

        {/* North Bull Island */}
        <ellipse cx="508" cy="168" rx="7" ry="20" fill="#0D2018"
          stroke="#1FA37A" strokeWidth="0.5" strokeOpacity="0.22"
          transform="rotate(14,508,168)"/>
        <text x="518" y="166" fill="#1FA37A" fontSize="6"
          fontFamily="Hanken Grotesk,sans-serif" opacity="0.38"
          transform="rotate(14,518,166)">Bull Is.</text>

        {/* "Dublin Bay" rotated label */}
        <text x="536" y="294" textAnchor="middle" fill="#1FA37A" fontSize="7.5"
          fontFamily="Hanken Grotesk,sans-serif" fontWeight="500" opacity="0.32"
          transform="rotate(90,536,294)">Dublin Bay</text>

        {/* ── Land grid (very subtle) ── */}
        <g opacity="0.032" stroke="#54C39A" strokeWidth="0.5" clipPath="url(#cm-land-clip)">
          {[...Array(12)].map((_,i) => <line key={`h${i}`} x1="0" y1={i*44} x2="490" y2={i*44}/>)}
          {[...Array(12)].map((_,i) => <line key={`v${i}`} x1={i*44} y1="0"  x2={i*44} y2="480"/>)}
        </g>

        {/* ── City-centre ambient glow ── */}
        <ellipse cx="285" cy="242" rx="200" ry="158" fill="url(#cm-city)"/>

        {/* ── M50 ring road ── */}
        {/* glow layer */}
        <path d={M50} fill="none" stroke="#1FA37A" strokeWidth="4"   strokeOpacity="0.18"
          strokeLinecap="round" filter="url(#cm-glow-sm)"/>
        {/* bright centre line */}
        <path d={M50} fill="none" stroke="#54C39A" strokeWidth="1.4" strokeOpacity="0.55"
          strokeLinecap="round"/>

        {/* M50 badge */}
        <g transform="translate(148,196)">
          <rect x="-11" y="-7.5" width="22" height="15" rx="3" fill="#1FA37A" opacity="0.88"/>
          <text textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="7.5"
            fontFamily="Archivo,sans-serif" fontWeight="800" letterSpacing="0.04em">M50</text>
        </g>

        {/* ── Major arterial roads ── */}
        {ROADS.map((d,i) => (
          <path key={i} d={d} fill="none" stroke="#252528" strokeWidth="2" strokeLinecap="round"/>
        ))}

        {/* Road number badges */}
        {[
          { x: 365, y: 132, label: 'M1',  bg: '#275a22' },
          { x: 162, y: 237, label: 'N4',  bg: '#1e3a8a' },
          { x: 185, y: 312, label: 'N7',  bg: '#1e3a8a' },
          { x: 418, y: 322, label: 'N11', bg: '#1e3a8a', w: 24 },
        ].map(({ x, y, label, bg, w = 20 }) => (
          <g key={label} transform={`translate(${x},${y})`}>
            <rect x={-w/2} y="-6" width={w} height="12" rx="2.5" fill={bg} opacity="0.82"/>
            <text textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="6.5"
              fontFamily="Archivo,sans-serif" fontWeight="800">{label}</text>
          </g>
        ))}

        {/* ── River Liffey ── */}
        <path d={LIFFEY} fill="none" stroke="#0E3D2C" strokeWidth="4"   strokeLinecap="round"/>
        <path d={LIFFEY} fill="none" stroke="#1FA37A" strokeWidth="1.2" strokeOpacity="0.2"
          strokeLinecap="round"/>

        {/* ── Dublin Airport ── */}
        <g opacity="0.52" transform="translate(348,44)">
          <rect x="-10" y="-2" width="20" height="4" rx="1" fill="#2a2a30"/>
          <rect x="-2" y="-10" width="4" height="20" rx="1" fill="#2a2a30"/>
          <circle cx="0" cy="0" r="8" fill="none" stroke="#54C39A"
            strokeWidth="0.7" strokeOpacity="0.5"/>
          <text x="13" y="1" dominantBaseline="middle" fill="#9A9AA0"
            fontSize="7" fontFamily="Hanken Grotesk,sans-serif">Airport</text>
        </g>

        {/* ── Dashed service route ── */}
        <path d={ROUTE} fill="none" stroke="#1FA37A" strokeWidth="1.5"
          strokeOpacity="0.12" strokeDasharray="5 6"/>

        {/* ── Animated glowing trail ── */}
        {inView && (
          <path d={ROUTE} fill="none" stroke="#54C39A" strokeWidth="3"
            strokeLinecap="round" filter="url(#cm-glow-sm)"
            strokeDasharray={`${TRAIL} ${PATH_LEN - TRAIL}`}
            strokeDashoffset={TRAIL}
          >
            <animate attributeName="stroke-dashoffset"
              from={TRAIL} to={TRAIL - PATH_LEN}
              dur={CAR_DUR} repeatCount="indefinite" calcMode="linear"/>
          </path>
        )}

        {/* ── Service stop pins ── */}
        {STOPS.map((s,i) => (
          <g key={s.name}>
            {/* Pulse ring */}
            <circle cx={s.x} cy={s.y} r="5" fill="none" stroke="#1FA37A" strokeWidth="0.75">
              <animate attributeName="r" values="5;14;5"
                dur={`${2.5+i*0.28}s`} repeatCount="indefinite" begin={`${i*0.36}s`}/>
              <animate attributeName="stroke-opacity" values="0.55;0;0.55"
                dur={`${2.5+i*0.28}s`} repeatCount="indefinite" begin={`${i*0.36}s`}/>
            </circle>
            {/* Pin dot */}
            <circle cx={s.x} cy={s.y} r="4" fill="#1FA37A" filter="url(#cm-glow-sm)">
              <animate attributeName="r" values="3.5;5;3.5"
                dur={`${2+i*0.22}s`} repeatCount="indefinite" begin={`${i*0.36}s`}/>
            </circle>
            {/* Label */}
            <text x={s.x+s.lx} y={s.y+s.ly}
              textAnchor={s.ta} dominantBaseline={s.bl}
              fill="#9A9AA0" fontSize="8.5"
              fontFamily="'Hanken Grotesk',sans-serif"
              fontWeight="500" letterSpacing="0.015em"
            >{s.name}</text>
          </g>
        ))}

        {/* ── "DUBLIN" ghost watermark ── */}
        <text x="285" y="242" textAnchor="middle" dominantBaseline="middle"
          fill="#1FA37A" fontSize="10"
          fontFamily="Archivo,sans-serif" fontWeight="900"
          letterSpacing="0.24em" opacity="0.07">DUBLIN</text>

        {/* ── Animated car ── */}
        {inView && (
          <g filter="url(#cm-car)">
            {/* Headlight cone */}
            <ellipse cx="0" cy="-22" rx="8" ry="15" fill="url(#cm-hl)" opacity="0.62">
              <animateMotion dur={CAR_DUR} repeatCount="indefinite" rotate="auto">
                <mpath href="#cm-route"/>
              </animateMotion>
            </ellipse>

            {/* Car body */}
            <g>
              <animateMotion dur={CAR_DUR} repeatCount="indefinite" rotate="auto">
                <mpath href="#cm-route"/>
              </animateMotion>
              {/* Body */}
              <rect x="-6" y="-12" width="12" height="24" rx="3.5" fill="#1FA37A"/>
              {/* Front cabin */}
              <rect x="-4.5" y="-10" width="9" height="7" rx="1.5" fill="#0A0A0B" opacity="0.78"/>
              {/* Rear cabin */}
              <rect x="-4.5" y="-0.5" width="9" height="5.5" rx="1.5" fill="#0A0A0B" opacity="0.68"/>
              {/* Wheels */}
              <rect x="-8.5" y="-10"  width="2.8" height="5.5" rx="1.4" fill="#0C2018"/>
              <rect x=" 5.7" y="-10"  width="2.8" height="5.5" rx="1.4" fill="#0C2018"/>
              <rect x="-8.5" y=" 4.5" width="2.8" height="5.5" rx="1.4" fill="#0C2018"/>
              <rect x=" 5.7" y=" 4.5" width="2.8" height="5.5" rx="1.4" fill="#0C2018"/>
              {/* Headlights */}
              <rect x="-5.5" y="-13" width="3"  height="1.8" rx="0.5" fill="#fffbe0" opacity="0.95"/>
              <rect x=" 2.5" y="-13" width="3"  height="1.8" rx="0.5" fill="#fffbe0" opacity="0.95"/>
              {/* Centre stripe */}
              <line x1="0" y1="-12" x2="0" y2="12" stroke="#16775A" strokeWidth="0.5" opacity="0.35"/>
            </g>
          </g>
        )}
      </svg>
    </div>
  )
}
