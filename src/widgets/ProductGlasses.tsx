import { type ReactNode } from 'react'

export function ProductGlasses() {
  return (
    <svg className="glasses" viewBox="0 0 760 420" role="img" aria-label="Representação conceitual dos óculos inteligentes BlueSight">
      <defs>
        <linearGradient id="frame" x1="0" x2="1"><stop stopColor="#050c12"/><stop offset=".5" stopColor="#1a2934"/><stop offset="1" stopColor="#02070b"/></linearGradient>
        <linearGradient id="lens" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#31d9ea" stopOpacity=".7"/><stop offset=".45" stopColor="#086287" stopOpacity=".55"/><stop offset="1" stopColor="#021525" stopOpacity=".95"/></linearGradient>
        <filter id="shadow"><feDropShadow dx="0" dy="20" stdDeviation="20" floodOpacity=".55"/></filter>
      </defs>
      <g filter="url(#shadow)">
        <path d="M45 130C155 47 605 47 715 130l-26 189c-5 36-36 61-73 61H485c-25 0-48-13-61-35l-44-73-44 73c-13 22-36 35-61 35H144c-37 0-68-25-73-61L45 130Z" fill="url(#frame)" stroke="#2d414e" strokeWidth="10"/>
        <path d="M84 145c70-36 175-49 268-34l-22 177c-4 30-29 52-59 52H153c-31 0-57-23-60-54L84 145Z" fill="url(#lens)" stroke="#13cde0" strokeWidth="4"/>
        <path d="M676 145c-70-36-175-49-268-34l22 177c4 30 29 52 59 52h118c31 0 57-23 60-54l9-141Z" fill="url(#lens)" stroke="#13cde0" strokeWidth="4"/>
        <path d="M331 103h98l-9 67c-24-16-56-16-80 0l-9-67Z" fill="#091219"/>
        <rect x="311" y="47" width="138" height="64" rx="24" fill="#101d25" stroke="#263c47" strokeWidth="5"/>
        <circle cx="380" cy="79" r="15" fill="#031722" stroke="#00c2e8" strokeWidth="4"/>
        <circle cx="420" cy="79" r="5" fill="#48d6e8"/>
      </g>
      <path d="M125 185c45-28 102-39 157-33" fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth="9" strokeLinecap="round"/>
      <path d="M478 152c55-6 112 5 157 33" fill="none" stroke="#fff" strokeOpacity=".2" strokeWidth="9" strokeLinecap="round"/>
    </svg>
  )