import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Sbtn from './Sbtn.jsx';
import { PROFILE, HEADERS, NOTION } from '../data.js';
import { reduce } from '../lib.js';

/* ---- JSON 을 [텍스트, 클래스] 토큰으로 쪼개서, 앞에서부터 n 글자만 HTML 로 그림 ---- */
function tok(v, ind = 0, out = []) {
  const pad = '  '.repeat(ind), P = t => out.push([t, 'j-p']);
  if (Array.isArray(v)) {
    P('[\n');
    v.forEach((x, i) => { out.push([pad + '  ', '']); tok(x, ind + 1, out); P(i < v.length - 1 ? ',\n' : '\n'); });
    P(pad + ']');
  } else if (v && typeof v === 'object') {
    const ks = Object.keys(v);
    P('{\n');
    ks.forEach((k, i) => { out.push([pad + '  ', '']); out.push([`"${k}"`, 'j-k']); P(': '); tok(v[k], ind + 1, out); P(i < ks.length - 1 ? ',\n' : '\n'); });
    P(pad + '}');
  } else out.push([typeof v === 'string' ? `"${v}"` : String(v), typeof v === 'string' ? 'j-s' : 'j-n']);
  return out;
}
const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const total = ts => ts.reduce((n, [t]) => n + t.length, 0);

const bodyTokens = tok(PROFILE);
const headerTokens = HEADERS.flatMap(([k, v], i) => i === 0
  ? [[k + ' ', 'j-k'], [v, 'j-n'], ['\n', '']]
  : [[k, 'j-k'], [': ', 'j-p'], [v, 'j-s'], ['\n', '']]);
const TOKENS = { body: bodyTokens, headers: headerTokens };

function html(ts, n, caret) {
  let out = '', line = '', left = n;
  for (const [t, c] of ts) {
    if (left <= 0) break;
    const part = t.slice(0, left); left -= part.length;
    part.split('\n').forEach((seg, i) => {
      if (i > 0) { out += `<span class="l">${line || ' '}</span>`; line = ''; }
      if (seg) line += c ? `<span class="${c}">${esc(seg)}</span>` : esc(seg);
    });
  }
  return out + `<span class="l">${line}${caret ? '<span class="j-caret"></span>' : ''}</span>`;
}

const EMPTY = '<span class="api-empty"><span>↗ <b>Send</b>를 눌러 요청을 보내면<br>여기에 응답이 표시됩니다.</span></span>';
const IDLE = { cls: 'api-status idle', html: '<b>대기 중</b> · 응답 없음' };

function ApiCard() {
  const [tab, setTab] = useState('body');
  const [sent, setSent] = useState(false);
  const [bodyHtml, setBodyHtml] = useState(EMPTY);
  const [status, setStatus] = useState(IDLE);
  const bodyRef = useRef(null);
  const run = useRef(0);

  // 타이핑 중 레이아웃이 흔들리지 않도록 전체 응답 높이만큼 미리 확보
  useLayoutEffect(() => {
    const el = bodyRef.current;
    el.innerHTML = html(bodyTokens, total(bodyTokens));
    el.style.minHeight = el.offsetHeight + 'px';
    el.innerHTML = EMPTY;
  }, []);
  useEffect(() => () => { run.current++; }, []);

  function request(which) {
    const id = ++run.current, ts = TOKENS[which], N = total(ts);
    if (reduce) { setBodyHtml(html(ts, N)); return; }
    setStatus({ cls: 'api-status loading', html: '<b>Sending…</b>' });
    setBodyHtml(html(ts, 0, true));
    setTimeout(() => {
      if (id !== run.current) return;
      const ms = 28 + Math.floor(Math.random() * 30);
      setStatus({ cls: 'api-status', html: `<b>200 OK</b> · ${ms} ms · ${(new Blob([JSON.stringify(PROFILE)]).size / 1024).toFixed(1)} KB` });
      const start = performance.now(), dur = Math.min(1600, N * 4.5);
      (function frame(now) {
        if (id !== run.current) return;
        const k = Math.min(1, (now - start) / dur);
        setBodyHtml(html(ts, Math.floor(N * k), k < 1));
        if (k < 1) requestAnimationFrame(frame);
      })(start);
    }, 420);
  }

  const pick = t => { setTab(t); if (sent) request(t); else setBodyHtml(EMPTY); };

  return (
    <div className="api reveal d2" id="api">
      <div className="api-bar"><i /><i /><i /><span>wonu-api — about</span></div>
      <div className="api-req">
        <span className="method">GET</span>
        <div className="url">/api/v1/developers/<b>wonu</b></div>
        <Sbtn sm className={sent ? '' : 'pulse'} onClick={() => { setSent(true); request(tab); }}>Send</Sbtn>
      </div>
      <div className="api-meta">
        <div className="api-tabs" role="tablist">
          {[['body', 'Body'], ['headers', 'Headers']].map(([k, label]) => (
            <button key={k} role="tab" aria-selected={tab === k} onClick={() => pick(k)}>{label}</button>
          ))}
        </div>
        <span className={status.cls} dangerouslySetInnerHTML={{ __html: status.html }} />
      </div>
      <pre className="api-body" ref={bodyRef} aria-live="polite" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </div>
  );
}

export default function About() {
  return (
    <section id="about">
      <div className="wrap about">
        <div className="about-intro">
          <div className="eyebrow reveal">/about</div>
          <div className="about-id reveal d1">
            <div className="avatar">사진</div>
            <div><b>양원우</b><small>Backend Developer · 경북소프트웨어마이스터고</small></div>
          </div>
          <h3 className="reveal d1">백엔드 개발자라서,<br /><em>API로</em> 소개합니다.</h3>
          <p className="lead reveal d2"><code>Send</code>를 눌러 저를 호출해 보세요. 응답이 곧 저예요. 팀원이 이런 걱정 저런 걱정을 하지 않도록, 유지보수하기 쉬운 코드를 먼저 생각합니다.</p>
          <div className="btns reveal d3">
            <Sbtn href="#projects">프로젝트 보기 →</Sbtn>
            <Sbtn href={NOTION} target="_blank" rel="noopener">노션 포트폴리오 ↗</Sbtn>
          </div>
        </div>
        <ApiCard />
      </div>
    </section>
  );
}
