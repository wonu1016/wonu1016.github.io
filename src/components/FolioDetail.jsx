import { useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Sbtn from './Sbtn.jsx';
import Radar from './Radar.jsx';
import { FOLIO } from '../data.js';
import { reduce } from '../lib.js';

const rectStyle = (r, radius) => ({ top: r.top + 'px', left: r.left + 'px', width: r.width + 'px', height: r.height + 'px', borderRadius: radius + 'px' });

// 카드 위치에서 풀스크린으로 확대되는 상세 화면 (FLIP)
export default function FolioDetail({ source, onClosed }) {
  const ref = useRef(null);
  const closing = useRef(false);

  useLayoutEffect(() => {
    const el = ref.current, r = source.getBoundingClientRect();
    Object.assign(el.style, rectStyle(r, 24));
    const full = { top: '0px', left: '0px', width: innerWidth + 'px', height: innerHeight + 'px', borderRadius: '0px' };
    el.animate([rectStyle(r, 24), full], { duration: reduce ? 1 : 650, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' })
      .onfinish = () => { Object.assign(el.style, { top: 0, left: 0, width: '100%', height: '100%', borderRadius: 0 }); el.classList.add('ready'); };
  }, [source]);

  const close = () => {
    if (closing.current) return;
    closing.current = true;
    const el = ref.current;
    el.classList.remove('ready');
    const r = source.getBoundingClientRect();
    setTimeout(() => {
      el.animate([{ top: '0px', left: '0px', width: innerWidth + 'px', height: innerHeight + 'px', borderRadius: '0px' }, rectStyle(r, 24)],
        { duration: reduce ? 1 : 550, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' })
        .onfinish = onClosed;
    }, 200);
  };

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') close(); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  });

  const F = FOLIO;
  return createPortal(
    <div className="detail" ref={ref}>
      <div className="scroller">
        <Sbtn sm className="d-close" onClick={close}>닫기 ✕</Sbtn>
        <div className="d-hero"><Radar /><div className="wrap"><h2>Folio</h2><p>{F.summary}</p></div></div>
        <div className="wrap d-body">
          <div className="d-meta">{F.meta.map(([k, v]) => <div key={k}>{k}<b>{v}</b></div>)}</div>
          <div className="d-grid">
            <h6>개요</h6><p>{F.overview}</p>
            <h6>주요 기능</h6><ul>{F.features.map(t => <li key={t}>{t}</li>)}</ul>
            <h6>동작 흐름</h6><div className="flow">{F.flow.map(t => <span key={t}>{t}</span>)}</div>
            <h6>내가 한 일</h6><ul>{F.did.map(t => <li key={t}>{t}</li>)}</ul>
            <h6>트러블슈팅</h6>
            <div className="trouble">{F.trouble.map(([k, v]) => <div key={k}><b>{k}</b>{v}</div>)}</div>
            <h6>화면</h6>
            <div className="shots"><div>스크린샷 1</div><div>스크린샷 2</div><div>스크린샷 3</div></div>
            <h6>링크</h6>
            <div className="btns">{F.links.map(([t, h]) => <Sbtn key={h} href={h} target="_blank" rel="noopener">{t}</Sbtn>)}</div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
