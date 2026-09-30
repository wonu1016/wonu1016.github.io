import { Fragment, useState } from 'react';
import { CAREER } from '../data.js';

const Chev = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
);

export default function Career() {
  const all = CAREER.flatMap(g => g.items);
  const [openNo, setOpenNo] = useState(new Set([all.length])); // 맨 위 기록만 펼쳐 둠
  const toggle = no => setOpenNo(prev => { const n = new Set(prev); n.has(no) ? n.delete(no) : n.add(no); return n; });
  let no = all.length + 1;

  return (
    <section id="career">
      <div className="wrap">
        <div className="eyebrow reveal">/career</div>
        <h2 className="sec reveal d1">지나온 기록</h2>
        <div className="yt">
          {CAREER.map(g => (
            <Fragment key={g.year}>
              <div className="yt-year"><h3>{g.year}</h3><span>{g.items.length} {g.items.length > 1 ? 'records' : 'record'}</span></div>
              {g.items.map(it => {
                const n = --no, isOpen = openNo.has(n);
                return (
                  <div className={`yt-item${isOpen ? ' open' : ''}`} key={it.title}>
                    <button className="yt-head" aria-expanded={isOpen} onClick={() => toggle(n)}>
                      <span className="yt-no">{String(n).padStart(2, '0')}</span>
                      <span className="yt-title">{it.title}</span>
                      <span className="yt-chev"><Chev /></span>
                    </button>
                    <div className="yt-body"><div><div className="yt-panel">
                      <div className="yt-meta">{it.meta.map((m, i) => <span key={i}>{i > 0 && <> <i>•</i> </>}{m}</span>)}</div>
                      {it.text && <p>{it.text}</p>}
                      <div className="yt-status">{it.status.map(([t, hl]) => <span key={t} className={hl ? 'hl' : ''}>{t}</span>)}</div>
                    </div></div></div>
                  </div>
                );
              })}
          </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
