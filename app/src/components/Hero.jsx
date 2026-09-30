import { useEffect, useState } from 'react';
import ElectricLogo from './ElectricLogo.jsx';
import { TYPED_WORDS } from '../data.js';
import { reduce } from '../lib.js';

const ELECTRIC = {
  dark: { color: '#e3eeff', glowColor: '#4d8dff' },
  light: { color: '#1d4ed8', glowColor: '#3b82f6' }
};

// PORT / FOLIO 를 투명 PNG 로 만들어 ElectricLogo 의 src 로 사용
function wordImage() {
  const c = document.createElement('canvas'); c.width = 1400; c.height = 1100;
  const g = c.getContext('2d');
  g.font = '900 440px Pretendard, "Noto Sans KR", "Arial Black", system-ui, sans-serif';
  g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = g.strokeStyle = '#000';
  g.lineJoin = 'round'; g.lineWidth = 10;
  [['PORT', 300], ['FOLIO', 780]].forEach(([t, y]) => { g.fillText(t, 700, y); g.strokeText(t, 700, y); });
  // 한 번 흐리게 → 안쪽 모서리까지 둥글어져서 꺾이는 곳만 밝아지는 현상 완화
  const r = document.createElement('canvas'); r.width = c.width; r.height = c.height;
  const rg = r.getContext('2d'); rg.filter = 'blur(12px)'; rg.drawImage(c, 0, 0);
  const img = rg.getImageData(0, 0, r.width, r.height), d = img.data;
  for (let i = 3; i < d.length; i += 4) d[i] = d[i] > 128 ? 255 : 0;
  rg.putImageData(img, 0, 0);
  return r.toDataURL('image/png');
}

// 입력 → 멈춤 → 지우기 → 다음 문구 (React Bits Text Type 방식)
function Typed({ words }) {
  const [text, setText] = useState(reduce ? words[0] : '');
  useEffect(() => {
    if (reduce) return;
    let w = 0, i = 0, del = false, t;
    const step = () => {
      const word = words[w];
      i += del ? -1 : 1;
      setText(word.slice(0, i));
      let wait = del ? 45 : 110 + Math.random() * 60;
      if (!del && i === word.length) { del = true; wait = w === 0 ? 2600 : 1600; }
      else if (del && i === 0) { del = false; w = (w + 1) % words.length; wait = 400; }
      t = setTimeout(step, wait);
    };
    t = setTimeout(step, 700);
    return () => clearTimeout(t);
  }, [words]);
  return <><span aria-label={words[0]}>{text}</span><span className="caret" aria-hidden="true">|</span></>;
}

export default function Hero({ theme }) {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    let alive = true;
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => alive && setSrc(wordImage()));
    return () => { alive = false; };
  }, []);

  return (
    <section id="hero">
      <div id="electric">
        {src && <ElectricLogo src={src} scale={0.9} strands={3} bend={0.25} crackle={0.9} arcs={1} speed={1.6}
          intensity={1} glow={0.5} thickness={1.5} flicker={0.3} fill={0} interactive
          cursorIntensity={0.75} cursorRadius={100} theme={theme} {...ELECTRIC[theme]} />}
      </div>
      <div className="hero-copy">
        <h1>안녕하세요<br /><span className="typed-line"><Typed words={TYPED_WORDS} /></span>개발자 양원우입니다</h1>
        <p>경북소프트웨어마이스터고 · Backend Developer</p>
      </div>
      <div className="scroll-hint">SCROLL<i /></div>
    </section>
  );
}
