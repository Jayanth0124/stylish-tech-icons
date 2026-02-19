import { themes } from '../themes';

export function generateStackSvg(skills, iconPaths, themeName = 'royal') {
  const theme = themes[themeName] || themes.royal;
  
  // 📏 PERFECTED PADDINGS (Gives the icons beautiful breathing room)
  const cols = 8; 
  const itemWidth = 68;  
  const itemHeight = 85; 
  const gapX = 14;       // Increased gap slightly to prevent horizontal crowding
  const gapY = 18;       
  const graphWidth = 740; // Widened to create perfect 30px padding inside the border
  const startY = 110;     // Shifted down to clear the header area

  const rows = Math.ceil(skills.length / cols);
  // Calculates exact height so the bottom padding perfectly matches the side paddings
  const graphHeight = startY + (rows * itemHeight) + ((rows > 0 ? rows - 1 : 0) * gapY) + 50; 

  // 🛡️ UNTOUCHED ICON CONTAINERS
  const generateGrid = () => {
    return skills.map((skill, index) => {
      const slug = skill.trim().toLowerCase();
      const path = iconPaths[slug];
      
      const row = Math.floor(index / cols);
      const col = index % cols;
      
      const itemsInThisRow = row === rows - 1 ? (skills.length % cols || cols) : cols;
      const rowWidth = (itemsInThisRow * itemWidth) + ((itemsInThisRow - 1) * gapX);
      const startX = (graphWidth - rowWidth) / 2;
      
      const x = startX + (col * (itemWidth + gapX));
      const y = startY + (row * (itemHeight + gapY));

      const formattedName = skill.charAt(0).toUpperCase() + skill.slice(1).replace('dotjs', '.js');
      const delay = (index * 0.1).toFixed(2);

      return `
        <g transform="translate(${x}, ${y})">
          <rect width="${itemWidth}" height="${itemHeight}" rx="8" fill="url(#glass-grad)" stroke="${theme.accent}" stroke-opacity="0.3" stroke-width="0.5"/>
          <line x1="10" y1="0" x2="${itemWidth - 10}" y2="0" stroke="${theme.accent}" stroke-width="1.5" opacity="0.9"/>
          <ellipse cx="${itemWidth/2}" cy="${itemHeight}" rx="${itemWidth/2 - 15}" ry="3" fill="#000000" opacity="0.4"/>
          <g style="animation: levitate 3s ease-in-out infinite ${delay}s;">
               ${path ? `
                <g transform="translate(19, 16) scale(1.2)">
                  <path d="${path}" fill="${theme.textMain}"/>
                </g>
              ` : `
                <circle cx="${itemWidth/2}" cy="32" r="10" fill="none" stroke="${theme.textMain}" stroke-width="1" stroke-dasharray="2 3" opacity="0.8"/>
              `}
          </g>
          <text x="${itemWidth/2}" y="70" text-anchor="middle" class="mono-text" font-size="8" letter-spacing="1" opacity="0.9">${formattedName.substring(0, 10)}</text>
        </g>
      `;
    }).join('');
  };

  return `
    <svg width="${graphWidth}" height="${graphHeight}" viewBox="0 0 ${graphWidth} ${graphHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="inner-glow-clip">
          <rect x="20" y="20" width="${graphWidth - 40}" height="${graphHeight - 40}" rx="12" />
        </clipPath>

        <clipPath id="card-clip">
          <rect width="${graphWidth}" height="${graphHeight}" rx="18" />
        </clipPath>

        <radialGradient id="bg-grad" cx="50%" cy="0%" r="140%">
          <stop offset="0%" stop-color="${theme.bgStart}"/>
          <stop offset="100%" stop-color="${theme.bgEnd}"/>
        </radialGradient>
        
        <linearGradient id="glass-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.08"/>
          <stop offset="100%" stop-color="${theme.glass}" stop-opacity="0.3"/>
        </linearGradient>

        <linearGradient id="edge-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0"/>
          <stop offset="50%" stop-color="${theme.accent}" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0"/>
        </linearGradient>

        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        <pattern id="dot-matrix" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="${theme.accent}" opacity="0.08"/>
        </pattern>
      </defs>

      <style>
        .serif-text { font-family: "Georgia", "Times New Roman", serif; fill: ${theme.textMain}; }
        .accent-text { font-family: "Georgia", "Times New Roman", serif; fill: ${theme.accent}; }
        .mono-text { font-family: "Courier New", monospace; fill: ${theme.textMuted}; }

        @keyframes levitate {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-4px); } 
          100% { transform: translateY(0px); }
        }

        @keyframes border-travel {
          0% { stroke-dashoffset: 3000; }
          100% { stroke-dashoffset: 0; }
        }
      </style>

      <rect width="${graphWidth}" height="${graphHeight}" rx="18" fill="${theme.bgStart}" stroke="${theme.accent}" stroke-opacity="0.15" stroke-width="1" />
      
      <g clip-path="url(#card-clip)">
        <rect width="${graphWidth}" height="${graphHeight}" fill="url(#bg-grad)" />
        <rect width="${graphWidth}" height="${graphHeight}" fill="url(#dot-matrix)" />
      </g>

      <rect x="20" y="20" width="${graphWidth - 40}" height="${graphHeight - 40}" rx="12" fill="none" stroke="${theme.accent}" stroke-width="0.5" stroke-opacity="0.3" />
      
      <g clip-path="url(#inner-glow-clip)">
        <rect x="20" y="20" width="${graphWidth - 40}" height="${graphHeight - 40}" rx="12" fill="none" stroke="${theme.accent}" stroke-width="2" stroke-linecap="round" stroke-dasharray="120 3000" filter="url(#glow)" style="animation: border-travel 8s linear infinite;" />
        
        <ellipse cx="${graphWidth/2}" cy="20" rx="350" ry="50" fill="${theme.accent}" filter="url(#glow)" opacity="0.12"/>
      </g>

      <path d="M 100 20 L ${graphWidth - 100} 20" stroke="url(#edge-highlight)" stroke-width="1.5" opacity="0.8"/>

      <circle cx="${graphWidth/2 - 120}" cy="42" r="8" fill="${theme.accent}" opacity="0.15"/>
      <circle cx="${graphWidth/2 - 120}" cy="42" r="2.5" fill="${theme.accent}"/>
      <circle cx="${graphWidth/2 + 120}" cy="42" r="8" fill="${theme.accent}" opacity="0.15"/>
      <circle cx="${graphWidth/2 + 120}" cy="42" r="2.5" fill="${theme.accent}"/>
      
      <text x="${graphWidth/2}" y="45" text-anchor="middle" class="accent-text" font-size="9" letter-spacing="6">SYSTEM ARCHITECTURE</text>
      <text x="${graphWidth/2}" y="76" text-anchor="middle" class="serif-text" font-size="26">The Arsenal</text>

      ${generateGrid()}
    </svg>
  `;
}