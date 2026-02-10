// Inline SVG illustrations for image selection & UI
// Includes: survey image options, hero, section breaks

export const SVG = {
  // ── Hero illustration for home page ──
  'hero': `
    <svg width="240" height="200" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hg1" cx="50%" cy="45%">
          <stop offset="0%" stop-color="#F0EEFF"/>
          <stop offset="100%" stop-color="#F8F7FF" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="hleaf1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#6C63FF" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#4ECDC4" stop-opacity="0.2"/>
        </linearGradient>
      </defs>
      <!-- Soft glow -->
      <ellipse cx="120" cy="100" rx="110" ry="90" fill="url(#hg1)"/>
      <!-- Terrarium jar -->
      <ellipse cx="120" cy="158" rx="52" ry="8" fill="#E0DCF0" opacity="0.4"/>
      <path d="M78 60 Q78 45 96 40 L144 40 Q162 45 162 60 L162 140 Q162 158 120 160 Q78 158 78 140Z" fill="white" fill-opacity="0.6" stroke="#D4CCF0" stroke-width="2"/>
      <path d="M96 40 Q96 32 120 30 Q144 32 144 40" stroke="#D4CCF0" stroke-width="2" fill="none"/>
      <ellipse cx="120" cy="40" rx="24" ry="4" fill="#D4CCF0" opacity="0.3"/>
      <!-- Plant inside jar -->
      <path d="M120 145 L120 100" stroke="#4ECDC4" stroke-width="3" stroke-linecap="round"/>
      <path d="M120 100 Q100 85 108 70" stroke="#4ECDC4" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M120 110 Q140 95 135 78" stroke="#4ECDC4" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M120 120 Q105 108 95 95" stroke="#66D9C2" stroke-width="2" stroke-linecap="round" fill="none"/>
      <!-- Leaves -->
      <ellipse cx="105" cy="68" rx="12" ry="8" fill="#4ECDC4" opacity="0.6" transform="rotate(-30 105 68)"/>
      <ellipse cx="138" cy="75" rx="13" ry="7" fill="#66D9C2" opacity="0.5" transform="rotate(25 138 75)"/>
      <ellipse cx="92" cy="92" rx="10" ry="6" fill="#4ECDC4" opacity="0.4" transform="rotate(-45 92 92)"/>
      <!-- Tiny flower -->
      <circle cx="108" cy="65" r="4" fill="#FF6B9D" opacity="0.6"/>
      <circle cx="108" cy="65" r="2" fill="#FFB8C6"/>
      <!-- Small character peeking from behind jar -->
      <circle cx="170" cy="128" r="18" fill="#FFE8D6"/>
      <circle cx="164" cy="125" r="2.5" fill="#2D2B3D"/>
      <circle cx="176" cy="125" r="2.5" fill="#2D2B3D"/>
      <circle cx="165.5" cy="124" r="1" fill="white"/>
      <circle cx="177.5" cy="124" r="1" fill="white"/>
      <path d="M166 132 Q170 136 174 132" stroke="#2D2B3D" stroke-width="1.8" stroke-linecap="round" fill="none"/>
      <ellipse cx="160" cy="131" rx="4" ry="2.5" fill="#FFB8C6" opacity="0.4"/>
      <ellipse cx="180" cy="131" rx="4" ry="2.5" fill="#FFB8C6" opacity="0.4"/>
      <!-- Character body -->
      <ellipse cx="170" cy="152" rx="14" ry="10" fill="#C4B5FF"/>
      <ellipse cx="155" cy="145" rx="5" ry="8" fill="#C4B5FF" transform="rotate(-10 155 145)"/>
      <!-- Floating particles -->
      <circle cx="55" cy="50" r="3" fill="#FFD93D" opacity="0.4"/>
      <circle cx="185" cy="55" r="2.5" fill="#FF6B9D" opacity="0.3"/>
      <circle cx="45" cy="90" r="2" fill="#6C63FF" opacity="0.25"/>
      <circle cx="195" cy="90" r="1.5" fill="#4ECDC4" opacity="0.3"/>
      <circle cx="70" cy="35" r="1.5" fill="#4ECDC4" opacity="0.3"/>
      <!-- Stars -->
      <path d="M60 25 L61.5 29 L66 29 L62.5 31.5 L63.5 36 L60 33 L56.5 36 L57.5 31.5 L54 29 L58.5 29Z" fill="#FFD93D" opacity="0.5" transform="scale(0.6) translate(30, 10)"/>
      <path d="M60 25 L61.5 29 L66 29 L62.5 31.5 L63.5 36 L60 33 L56.5 36 L57.5 31.5 L54 29 L58.5 29Z" fill="#6C63FF" opacity="0.3" transform="scale(0.5) translate(340, 40)"/>
    </svg>`,

  // ── Section break illustrations ──
  'section-mood': `
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="36" fill="#F0EEFF" opacity="0.5"/>
      <!-- Magnifying glass looking at heart -->
      <circle cx="35" cy="35" r="18" fill="white" stroke="#6C63FF" stroke-width="2.5"/>
      <line x1="48" y1="48" x2="60" y2="60" stroke="#6C63FF" stroke-width="3" stroke-linecap="round"/>
      <!-- Heart inside magnifying glass -->
      <path d="M35 28 C35 24 29 22 29 26 C29 30 35 35 35 35 C35 35 41 30 41 26 C41 22 35 24 35 28Z" fill="#FF6B9D" opacity="0.7"/>
      <!-- Sparkle -->
      <circle cx="58" cy="18" r="2.5" fill="#FFD93D" opacity="0.6"/>
      <circle cx="18" cy="58" r="2" fill="#4ECDC4" opacity="0.4"/>
    </svg>`,

  'section-deep': `
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="36" fill="#FFF0F5" opacity="0.5"/>
      <!-- Ocean wave layers (depth metaphor) -->
      <path d="M10 45 Q20 38 30 45 Q40 52 50 45 Q60 38 70 45 L70 65 Q60 72 50 65 Q40 58 30 65 Q20 72 10 65Z" fill="#6C63FF" opacity="0.12"/>
      <path d="M10 52 Q20 45 30 52 Q40 59 50 52 Q60 45 70 52 L70 70 Q60 75 50 70 Q40 65 30 70 Q20 75 10 70Z" fill="#6C63FF" opacity="0.2"/>
      <!-- Diving character -->
      <circle cx="40" cy="30" r="10" fill="#FFE0CC"/>
      <path d="M36 28 Q38 31 40 28" stroke="#2D2B3D" stroke-width="1.2" stroke-linecap="round" fill="none"/>
      <path d="M40 28 Q42 31 44 28" stroke="#2D2B3D" stroke-width="1.2" stroke-linecap="round" fill="none"/>
      <path d="M37 34 Q40 37 43 34" stroke="#2D2B3D" stroke-width="1.2" stroke-linecap="round" fill="none"/>
      <!-- Bubbles -->
      <circle cx="50" cy="22" r="2.5" fill="#A8D8EA" opacity="0.5"/>
      <circle cx="55" cy="16" r="1.8" fill="#A8D8EA" opacity="0.4"/>
      <circle cx="48" cy="14" r="1.2" fill="#A8D8EA" opacity="0.3"/>
    </svg>`,

  'section-feedback': `
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="36" fill="#E8FFF5" opacity="0.5"/>
      <!-- Envelope with heart -->
      <rect x="16" y="28" width="48" height="32" rx="6" fill="white" stroke="#4ECDC4" stroke-width="2"/>
      <path d="M16 32 L40 48 L64 32" stroke="#4ECDC4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- Heart coming out -->
      <path d="M40 18 C40 14 34 12 34 16 C34 20 40 26 40 26 C40 26 46 20 46 16 C46 12 40 14 40 18Z" fill="#FF6B9D" opacity="0.7"/>
      <!-- Sparkles -->
      <circle cx="22" cy="20" r="2" fill="#FFD93D" opacity="0.5"/>
      <circle cx="60" cy="22" r="1.5" fill="#6C63FF" opacity="0.4"/>
      <path d="M56 16 L57 13 L58 16 L61 17 L58 18 L57 21 L56 18 L53 17Z" fill="#FFD93D" opacity="0.5"/>
    </svg>`,
  // ── Set 1: Character Affinity ──

  'char-2d': `
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 2D Cute Character - round, pastel, simple expression -->
      <circle cx="60" cy="58" r="38" fill="#E8DEFF"/>
      <circle cx="60" cy="55" r="32" fill="#F5F0FF"/>
      <!-- Face -->
      <circle cx="60" cy="52" r="26" fill="#FFE0CC"/>
      <!-- Eyes -->
      <circle cx="50" cy="48" r="3.5" fill="#2D2B3D"/>
      <circle cx="70" cy="48" r="3.5" fill="#2D2B3D"/>
      <circle cx="51.5" cy="47" r="1.2" fill="white"/>
      <circle cx="71.5" cy="47" r="1.2" fill="white"/>
      <!-- Blush -->
      <ellipse cx="44" cy="55" rx="5" ry="3" fill="#FFB8C6" opacity="0.5"/>
      <ellipse cx="76" cy="55" rx="5" ry="3" fill="#FFB8C6" opacity="0.5"/>
      <!-- Smile -->
      <path d="M54 58 Q60 64 66 58" stroke="#2D2B3D" stroke-width="2" stroke-linecap="round" fill="none"/>
      <!-- Body -->
      <ellipse cx="60" cy="88" rx="20" ry="14" fill="#C4B5FF"/>
      <!-- Arms -->
      <ellipse cx="38" cy="82" rx="6" ry="10" fill="#C4B5FF" transform="rotate(-15 38 82)"/>
      <ellipse cx="82" cy="82" rx="6" ry="10" fill="#C4B5FF" transform="rotate(15 82 82)"/>
      <!-- Heart -->
      <path d="M56 34 C56 30 50 28 50 32 C50 36 56 40 56 40 C56 40 62 36 62 32 C62 28 56 30 56 34Z" fill="#FF6B9D" opacity="0.7" transform="translate(8,-2) scale(0.6)"/>
    </svg>`,

  'char-3d': `
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 3D-style Avatar - subtle gradients, soft form -->
      <defs>
        <radialGradient id="face3d" cx="45%" cy="40%">
          <stop offset="0%" stop-color="#FFD4B8"/>
          <stop offset="100%" stop-color="#E8B896"/>
        </radialGradient>
        <radialGradient id="hair3d" cx="50%" cy="30%">
          <stop offset="0%" stop-color="#8B7355"/>
          <stop offset="100%" stop-color="#6B5340"/>
        </radialGradient>
        <linearGradient id="body3d" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#A8D8EA"/>
          <stop offset="100%" stop-color="#82C0D8"/>
        </linearGradient>
      </defs>
      <!-- Shadow -->
      <ellipse cx="60" cy="110" rx="28" ry="5" fill="#E0DCF0" opacity="0.5"/>
      <!-- Body -->
      <path d="M35 95 Q35 78 60 75 Q85 78 85 95 L85 105 Q85 112 60 112 Q35 112 35 105Z" fill="url(#body3d)"/>
      <!-- Neck -->
      <rect x="53" y="70" width="14" height="10" rx="4" fill="url(#face3d)"/>
      <!-- Head -->
      <ellipse cx="60" cy="45" rx="24" ry="28" fill="url(#face3d)"/>
      <!-- Hair -->
      <path d="M36 42 Q36 18 60 15 Q84 18 84 42 Q84 32 72 28 Q60 24 48 28 Q36 32 36 42Z" fill="url(#hair3d)"/>
      <path d="M36 42 Q34 35 38 30" stroke="url(#hair3d)" stroke-width="8" stroke-linecap="round"/>
      <path d="M84 42 Q86 35 82 30" stroke="url(#hair3d)" stroke-width="8" stroke-linecap="round"/>
      <!-- Eyes -->
      <ellipse cx="49" cy="45" rx="3" ry="3.5" fill="#3D3530"/>
      <ellipse cx="71" cy="45" rx="3" ry="3.5" fill="#3D3530"/>
      <circle cx="50.5" cy="43.5" r="1.3" fill="white" opacity="0.8"/>
      <circle cx="72.5" cy="43.5" r="1.3" fill="white" opacity="0.8"/>
      <!-- Eyebrows -->
      <path d="M44 38 Q49 35 54 37" stroke="#6B5340" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <path d="M66 37 Q71 35 76 38" stroke="#6B5340" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <!-- Nose -->
      <path d="M59 50 Q60 53 61 50" stroke="#D4A080" stroke-width="1.2" stroke-linecap="round" fill="none"/>
      <!-- Smile -->
      <path d="M52 57 Q60 62 68 57" stroke="#C08060" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    </svg>`,

  'char-minimal': `
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Minimal UI - text-centric, clean design -->
      <!-- Phone frame -->
      <rect x="30" y="15" width="60" height="90" rx="10" fill="white" stroke="#E0DCF0" stroke-width="2"/>
      <!-- Status bar -->
      <rect x="45" y="20" width="30" height="3" rx="1.5" fill="#E0DCF0"/>
      <!-- Text lines -->
      <rect x="38" y="35" width="44" height="4" rx="2" fill="#6C63FF" opacity="0.2"/>
      <rect x="38" y="44" width="36" height="3" rx="1.5" fill="#E0DCF0"/>
      <rect x="38" y="51" width="40" height="3" rx="1.5" fill="#E0DCF0"/>
      <!-- Divider -->
      <line x1="38" y1="60" x2="82" y2="60" stroke="#F0EEF5" stroke-width="1"/>
      <!-- Metric blocks -->
      <rect x="38" y="65" width="18" height="14" rx="4" fill="#F5F0FF"/>
      <rect x="60" y="65" width="18" height="14" rx="4" fill="#F5F0FF"/>
      <rect x="42" y="69" width="10" height="3" rx="1" fill="#6C63FF" opacity="0.4"/>
      <rect x="64" y="69" width="10" height="3" rx="1" fill="#6C63FF" opacity="0.4"/>
      <rect x="44" y="74" width="6" height="2" rx="1" fill="#D0CCE0"/>
      <rect x="66" y="74" width="6" height="2" rx="1" fill="#D0CCE0"/>
      <!-- Button -->
      <rect x="38" y="85" width="44" height="10" rx="5" fill="#6C63FF" opacity="0.15"/>
      <rect x="50" y="89" width="20" height="2" rx="1" fill="#6C63FF" opacity="0.5"/>
    </svg>`,

  // ── Set 2: Interaction Style ──

  'talk-bubble': `
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Character with speech bubble -->
      <!-- Small character -->
      <circle cx="35" cy="85" r="16" fill="#E8DEFF"/>
      <circle cx="35" cy="80" r="13" fill="#FFE0CC"/>
      <!-- Eyes -->
      <circle cx="30" cy="78" r="2" fill="#2D2B3D"/>
      <circle cx="40" cy="78" r="2" fill="#2D2B3D"/>
      <!-- Smile -->
      <path d="M31 83 Q35 87 39 83" stroke="#2D2B3D" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <!-- Body -->
      <ellipse cx="35" cy="102" rx="12" ry="8" fill="#C4B5FF"/>
      <!-- Speech bubble -->
      <rect x="52" y="25" width="58" height="42" rx="14" fill="white" stroke="#E0DCF0" stroke-width="2"/>
      <path d="M58 67 L52 75 L66 65" fill="white" stroke="#E0DCF0" stroke-width="2"/>
      <path d="M59 65 L53 73 L65 64" fill="white"/>
      <!-- Bubble text -->
      <text x="68" y="42" font-family="sans-serif" font-size="10" fill="#6C63FF" font-weight="600">
        오늘은
      </text>
      <text x="63" y="56" font-family="sans-serif" font-size="10" fill="#6C63FF" font-weight="600">
        어땠어?
      </text>
      <!-- Heart particles -->
      <circle cx="92" cy="22" r="3" fill="#FF6B9D" opacity="0.3"/>
      <circle cx="100" cy="30" r="2" fill="#FF6B9D" opacity="0.2"/>
    </svg>`,

  'talk-checklist': `
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Checklist UI - functional, no emotion -->
      <!-- Card background -->
      <rect x="18" y="18" width="84" height="84" rx="14" fill="white" stroke="#E0DCF0" stroke-width="2"/>
      <!-- Title -->
      <rect x="30" y="28" width="40" height="5" rx="2.5" fill="#2D2B3D" opacity="0.7"/>
      <!-- Checklist items -->
      <!-- Item 1 - checked -->
      <rect x="30" y="42" width="14" height="14" rx="4" fill="#6C63FF" opacity="0.15"/>
      <path d="M34 49 L37 52 L41 46" stroke="#6C63FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="50" y="46" width="36" height="4" rx="2" fill="#E0DCF0"/>
      <!-- Item 2 - checked -->
      <rect x="30" y="62" width="14" height="14" rx="4" fill="#6C63FF" opacity="0.15"/>
      <path d="M34 69 L37 72 L41 66" stroke="#6C63FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="50" y="66" width="30" height="4" rx="2" fill="#E0DCF0"/>
      <!-- Item 3 - unchecked -->
      <rect x="30" y="82" width="14" height="14" rx="4" fill="none" stroke="#E0DCF0" stroke-width="2"/>
      <rect x="50" y="86" width="34" height="4" rx="2" fill="#E0DCF0"/>
    </svg>`,

  'talk-reward': `
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Reward/Coin notification -->
      <!-- Central coin -->
      <circle cx="60" cy="55" r="28" fill="#FFD93D"/>
      <circle cx="60" cy="55" r="23" fill="#FFE566" stroke="#F0C420" stroke-width="1.5"/>
      <!-- Star on coin -->
      <path d="M60 38 L63 48 L74 48 L65 54 L68 64 L60 58 L52 64 L55 54 L46 48 L57 48Z" fill="#F0C420"/>
      <!-- Sparkles -->
      <circle cx="28" cy="35" r="3" fill="#FFD93D" opacity="0.6"/>
      <circle cx="92" cy="35" r="2.5" fill="#FFD93D" opacity="0.5"/>
      <circle cx="25" cy="70" r="2" fill="#FFD93D" opacity="0.4"/>
      <circle cx="95" cy="65" r="3" fill="#FFD93D" opacity="0.5"/>
      <!-- Points text -->
      <rect x="35" y="90" width="50" height="16" rx="8" fill="#FFF3D0" stroke="#FFD93D" stroke-width="1.5"/>
      <text x="60" y="101" font-family="sans-serif" font-size="9" fill="#B8860B" font-weight="700" text-anchor="middle">
        +100P
      </text>
      <!-- Floating particles -->
      <path d="M38 25 L40 20 L42 25 L40 22Z" fill="#6C63FF" opacity="0.3"/>
      <path d="M85 22 L87 17 L89 22 L87 19Z" fill="#FF6B9D" opacity="0.3"/>
    </svg>`,

  // ── Set 3: Relationship Distance ──

  'rel-companion': `
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 1:1 Companion - person + small character -->
      <!-- Person silhouette -->
      <circle cx="50" cy="42" r="16" fill="#FFE0CC"/>
      <!-- Person eyes -->
      <circle cx="45" cy="40" r="2" fill="#2D2B3D"/>
      <circle cx="55" cy="40" r="2" fill="#2D2B3D"/>
      <path d="M46 47 Q50 51 54 47" stroke="#2D2B3D" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <!-- Person body -->
      <path d="M30 75 Q30 60 50 58 Q70 60 70 75 L70 100 Q70 105 50 105 Q30 105 30 100Z" fill="#A8D8EA"/>
      <!-- Small companion character -->
      <circle cx="88" cy="72" r="14" fill="#E8DEFF"/>
      <circle cx="88" cy="68" r="11" fill="#F5F0FF"/>
      <!-- Companion face -->
      <circle cx="84" cy="66" r="2" fill="#2D2B3D"/>
      <circle cx="92" cy="66" r="2" fill="#2D2B3D"/>
      <path d="M85 72 Q88 75 91 72" stroke="#2D2B3D" stroke-width="1.2" stroke-linecap="round" fill="none"/>
      <!-- Companion body -->
      <ellipse cx="88" cy="88" rx="10" ry="7" fill="#C4B5FF"/>
      <!-- Connection line (gentle) -->
      <path d="M68 70 Q78 65 80 68" stroke="#C4B5FF" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.5"/>
    </svg>`,

  'rel-group': `
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Small group - anonymous, loose connection -->
      <!-- Person 1 (center) -->
      <circle cx="60" cy="45" r="12" fill="#FFE0CC"/>
      <circle cx="56" cy="43" r="1.8" fill="#2D2B3D"/>
      <circle cx="64" cy="43" r="1.8" fill="#2D2B3D"/>
      <path d="M57 49 Q60 52 63 49" stroke="#2D2B3D" stroke-width="1.2" stroke-linecap="round" fill="none"/>
      <ellipse cx="60" cy="68" rx="14" ry="10" fill="#A8D8EA"/>
      <!-- Person 2 (left) -->
      <circle cx="28" cy="60" r="10" fill="#FFE0CC" opacity="0.7"/>
      <circle cx="25" cy="58" r="1.5" fill="#2D2B3D" opacity="0.7"/>
      <circle cx="31" cy="58" r="1.5" fill="#2D2B3D" opacity="0.7"/>
      <ellipse cx="28" cy="78" rx="11" ry="8" fill="#E8DEFF" opacity="0.7"/>
      <!-- Person 3 (right) -->
      <circle cx="92" cy="60" r="10" fill="#FFE0CC" opacity="0.7"/>
      <circle cx="89" cy="58" r="1.5" fill="#2D2B3D" opacity="0.7"/>
      <circle cx="95" cy="58" r="1.5" fill="#2D2B3D" opacity="0.7"/>
      <ellipse cx="92" cy="78" rx="11" ry="8" fill="#C4FFE0" opacity="0.7"/>
      <!-- Loose connection lines -->
      <path d="M42 65 Q50 58 55 62" stroke="#C4B5FF" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.4"/>
      <path d="M78 65 Q70 58 65 62" stroke="#C4B5FF" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.4"/>
      <!-- Dots (anonymity indicator) -->
      <circle cx="28" cy="95" r="2" fill="#C4B5FF" opacity="0.3"/>
      <circle cx="60" cy="90" r="2" fill="#C4B5FF" opacity="0.3"/>
      <circle cx="92" cy="95" r="2" fill="#C4B5FF" opacity="0.3"/>
    </svg>`,

  'rel-alone': `
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Alone - peaceful solitude, meditation-like -->
      <!-- Soft glow background -->
      <circle cx="60" cy="60" r="45" fill="#F5F0FF" opacity="0.5"/>
      <circle cx="60" cy="60" r="32" fill="#EDE9FF" opacity="0.5"/>
      <!-- Person sitting -->
      <circle cx="60" cy="42" r="14" fill="#FFE0CC"/>
      <!-- Closed eyes (peaceful) -->
      <path d="M52 40 Q55 43 58 40" stroke="#2D2B3D" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <path d="M62 40 Q65 43 68 40" stroke="#2D2B3D" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <!-- Gentle smile -->
      <path d="M55 48 Q60 52 65 48" stroke="#2D2B3D" stroke-width="1.3" stroke-linecap="round" fill="none"/>
      <!-- Body (seated/relaxed) -->
      <path d="M40 65 Q40 55 60 53 Q80 55 80 65 L80 80 Q80 88 60 88 Q40 88 40 80Z" fill="#D4CCF0"/>
      <!-- Legs (cross-legged) -->
      <ellipse cx="48" cy="90" rx="14" ry="6" fill="#D4CCF0" transform="rotate(-10 48 90)"/>
      <ellipse cx="72" cy="90" rx="14" ry="6" fill="#D4CCF0" transform="rotate(10 72 90)"/>
      <!-- Subtle sparkles (inner peace) -->
      <circle cx="35" cy="30" r="1.5" fill="#6C63FF" opacity="0.2"/>
      <circle cx="88" cy="35" r="1.5" fill="#6C63FF" opacity="0.2"/>
      <circle cx="30" cy="65" r="1" fill="#6C63FF" opacity="0.15"/>
      <circle cx="90" cy="60" r="1" fill="#6C63FF" opacity="0.15"/>
    </svg>`
};

export function getSvg(type) {
  return SVG[type] || '';
}
