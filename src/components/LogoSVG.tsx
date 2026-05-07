interface LogoSVGProps {
  className?: string;
  inverted?: boolean;
}

export function LogoSVG({ className = '', inverted = false }: LogoSVGProps) {
  const primary = inverted ? '#ffffff' : '#2d4a1e';
  const secondary = inverted ? 'rgba(255,255,255,0.6)' : '#5a7a3e';
  const bg = inverted ? 'rgba(255,255,255,0.15)' : '#e8f0e0';
  const pad = inverted ? '#a8c880' : '#c8dbb0';

  return (
    <svg
      className={className}
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Manada Haus"
    >
      <circle cx="160" cy="160" r="155" fill={bg} />
      {/* Main paw */}
      <ellipse cx="160" cy="185" rx="62" ry="70" fill={primary} />
      {/* Toes */}
      <ellipse cx="108" cy="128" rx="24" ry="30" fill={primary} />
      <ellipse cx="152" cy="112" rx="24" ry="30" fill={primary} />
      <ellipse cx="196" cy="112" rx="24" ry="30" fill={primary} />
      <ellipse cx="214" cy="131" rx="22" ry="28" fill={primary} />
      {/* Pads */}
      <ellipse cx="160" cy="186" rx="42" ry="48" fill={pad} />
      <ellipse cx="135" cy="166" rx="14" ry="16" fill={pad} />
      <ellipse cx="183" cy="166" rx="14" ry="16" fill={pad} />
      <ellipse cx="159" cy="148" rx="12" ry="13" fill={pad} />
      {/* Text */}
      <text
        x="160"
        y="294"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="24"
        fontWeight="700"
        fill={primary}
        letterSpacing="3"
      >
        MANADA
      </text>
      <text
        x="160"
        y="312"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="13"
        fill={secondary}
        letterSpacing="7"
      >
        HAUS
      </text>
    </svg>
  );
}
