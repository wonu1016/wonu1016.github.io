import { useEffect, useRef, useState } from 'react';
import Sbtn from './Sbtn.jsx';
import Radar from './Radar.jsx';
import FolioDetail from './FolioDetail.jsx';
import { PROJECTS, FOLIO } from '../data.js';
import { impact, reduce } from '../lib.js';

const TW = 1800, TH = 1300; // 타일 크기: 이 범위를 넘어가면 반대편에서 다시 등장
const mod = (n, m) => ((n % m) + m) % m;

export default function Projects() {
  const stageRef = useRef(null), hintRef = useRef(null), folioRef = useRef(null);
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const openDetail = () => {
    if (openRef.current) return;
    openRef.current = true;
    impact(folioRef.current);
    setOpen(true);
  };
  const closed = () => { openRef.current = false; setOpen(false); };

  // 상세가 열려 있는 동안: 원래 카드는 숨기고 배경 스크롤 잠금
  useEffect(() => {
    folioRef.current.style.visibility = open ? 'hidden' : '';
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* ---------- 무한 드래그 캔버스 ---------- */
  useEffect(() => {
    const stage = stageRef.current;
    const items = [...stage.querySelectorAll('.item')].map(el => ({ el, x: +el.dataset.x, y: +el.dataset.y, w: 0, h: 0 }));
    let pan = { x: 0, y: 0 }, vel = { x: 0, y: 0 }, dragging = false, moved = 0, last = null, lastT = 0;
    let posK = 1, posKy = 1, cardK = 1, alive = true, raf = 0, hovCard = null;

    // 화면 크기에 맞춰 배치 간격(posK)과 카드 크기(cardK)를 줄여서 서브 프로젝트가 다 보이게
    function measure() {
      const sw = stage.clientWidth, sh = stage.clientHeight;
      const fit = Math.min((sw - 80) / 1200, (sh - 170) / 800);
      posK = posKy = cardK = Math.max(.5, Math.min(1.1, fit));
      if (sw < 700) { // 폰: 가로는 좁히고 세로 공간을 더 써서 카드가 화면 안에 모이게
        posK = Math.max(.24, (sw - 80) / 1200);
        cardK = Math.max(.5, Math.min(.62, sw / 640));
        posKy = Math.max(.5, Math.min(1, (sh - 170) / 800));
      }
      items.forEach(i => { i.w = i.el.offsetWidth; i.h = i.el.offsetHeight; });
    }
    function render() {
      const tilt = Math.max(-6, Math.min(6, vel.x * .35));
      const tw = TW * posK, th = TH * posKy;
      for (const i of items) {
        const sx = mod(i.x * posK + pan.x + tw / 2, tw) - tw / 2;
        const sy = mod(i.y * posKy + pan.y + th / 2, th) - th / 2;
        i.el.style.transform = `translate(${sx - i.w / 2}px, ${sy - i.h / 2}px) scale(${cardK}) rotate(${tilt * .5}deg)`;
      }
      stage.style.backgroundPosition = `${pan.x}px ${pan.y}px`;
    }
    function tick() {
      if (!alive) return;
      if (!dragging) {
        pan.x += vel.x; pan.y += vel.y; vel.x *= .94; vel.y *= .94;
        if (Math.abs(vel.x) < .02 && Math.abs(vel.y) < .02) vel.x = vel.y = 0;
      }
      render();
      raf = requestAnimationFrame(tick);
    }

    // 호버한 카드 강조 (드래그 중엔 해제)
    function setHover(card, e) {
      if (hovCard && hovCard !== card) { hovCard.classList.remove('hov'); hovCard.style.removeProperty('--rx'); hovCard.style.removeProperty('--ry'); }
      hovCard = card; stage.classList.toggle('has-hov', !!card);
      if (!card) return;
      card.classList.add('hov');
      const r = card.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.style.setProperty('--cx', (px * 100).toFixed(1) + '%'); card.style.setProperty('--cy', (py * 100).toFixed(1) + '%');
      if (!reduce) { card.style.setProperty('--ry', ((px - .5) * 12).toFixed(2) + 'deg'); card.style.setProperty('--rx', ((.5 - py) * 10).toFixed(2) + 'deg'); }
    }

    const onDown = e => {
      if (e.target.closest('button')) return;
      setHover(null);
      dragging = true; moved = 0; last = { x: e.clientX, y: e.clientY }; lastT = performance.now(); vel = { x: 0, y: 0 };
      stage.setPointerCapture(e.pointerId); stage.classList.add('dragging');
    };
    const onHover = e => { if (!dragging && e.pointerType === 'mouse') setHover(e.target.closest('.card'), e); };
    const onMove = e => {
      if (!dragging) return;
      const dx = e.clientX - last.x, dy = e.clientY - last.y, now = performance.now(), dt = Math.max(1, now - lastT);
      pan.x += dx; pan.y += dy; moved += Math.abs(dx) + Math.abs(dy);
      vel = { x: dx / dt * 16, y: dy / dt * 16 }; last = { x: e.clientX, y: e.clientY }; lastT = now;
      if (moved > 30 && hintRef.current) hintRef.current.style.opacity = 0;
    };
    const onUp = e => {
      if (!dragging) return;
      dragging = false; stage.classList.remove('dragging');
      if (performance.now() - lastT > 80) vel = { x: 0, y: 0 };
      if (moved < 6) { // 클릭으로 판정
        const hit = document.elementsFromPoint(e.clientX, e.clientY).find(el => el === folioRef.current);
        if (hit) openDetail();
      }
    };
    const onCancel = () => { dragging = false; stage.classList.remove('dragging'); };
    const onKey = e => {
      const k = { ArrowLeft: [1, 0], ArrowRight: [-1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
      if (k) { e.preventDefault(); vel.x += k[0] * 6; vel.y += k[1] * 6; }
    };
    const onCenter = () => {
      const from = { ...pan }, start = performance.now(); vel = { x: 0, y: 0 };
      const tx = Math.round(from.x / (TW * posK)) * TW * posK, ty = Math.round(from.y / (TH * posKy)) * TH * posKy;
      (function step(now) {
        if (!alive) return;
        const p = Math.min(1, (now - start) / 700), e = 1 - Math.pow(1 - p, 4);
        pan.x = from.x + (tx - from.x) * e; pan.y = from.y + (ty - from.y) * e;
        if (p < 1) requestAnimationFrame(step);
      })(start);
    };

    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onHover);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', () => setHover(null));
    stage.addEventListener('pointerup', onUp);
    stage.addEventListener('pointercancel', onCancel);
    stage.addEventListener('keydown', onKey);
    const center = stage.querySelector('#centerBtn');
    center.addEventListener('click', onCenter);
    addEventListener('resize', measure);
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { if (alive) { measure(); raf = requestAnimationFrame(tick); } });

    return () => {
      alive = false; cancelAnimationFrame(raf);
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('pointermove', onHover);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerup', onUp);
      stage.removeEventListener('pointercancel', onCancel);
      stage.removeEventListener('keydown', onKey);
      center.removeEventListener('click', onCenter);
      removeEventListener('resize', measure);
    };
  }, []);

  return (
    <section id="projects">
      <div className="wrap">
        <div className="eyebrow reveal">/projects</div>
        <h2 className="sec reveal d1">만든 것들</h2>
      </div>
      <div className="stage" ref={stageRef} tabIndex={0} aria-label="프로젝트 캔버스. 드래그하거나 방향키로 이동">
        {PROJECTS.map(p => (
          <div className="item" key={p.name} data-x={p.x} data-y={p.y}>
            {p.main ? (
              <article className="card feature" id="folioCard" ref={folioRef} role="button" tabIndex={0} aria-label="Folio 상세 보기"
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDetail(); } }}>
                <div className="thumb">
                  <div className="rep-tag">PORTFOLIO REPORT</div>
                  <div className="rep-bars"><i style={{ '--w': '82%' }} /><i style={{ '--w': '64%' }} /><i style={{ '--w': '73%' }} /></div>
                  <Radar /><span>Folio</span>
                </div>
                <div className="meta">
                  <div>
                    <h4>Folio</h4>
                    <p>{FOLIO.summary} · {FOLIO.period}</p>
                    <div className="tags">{FOLIO.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
                  </div>
                  <span className="open">자세히 →</span>
                </div>
              </article>
            ) : (
              <div className="card sub"><h5>{p.name}</h5><div className="tags">{p.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div></div>
            )}
          </div>
        ))}
        <div className="stage-ui">
          <span className="hint" ref={hintRef}>드래그해서 이동 · 끝없이 이어져요</span>
          <Sbtn sm id="centerBtn">가운데로</Sbtn>
        </div>
      </div>
      {open && <FolioDetail source={folioRef.current} onClosed={closed} />}
    </section>
  );
}
