import { useRef, useState } from 'react';
import Sbtn from './Sbtn.jsx';
import { PROFILE, LINKS } from '../data.js';

export default function Contact() {
  const [label, setLabel] = useState('주소 복사');
  const mailRef = useRef(null);
  const done = msg => { setLabel(msg); setTimeout(() => setLabel('주소 복사'), 1800); };
  const fallback = () => { // 클립보드 권한이 없으면 텍스트를 선택 상태로
    const r = document.createRange(); r.selectNodeContents(mailRef.current);
    const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
    done('선택됨 · 복사해서 쓰세요');
  };
  const copy = () => {
    const text = PROFILE.contact.email;
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => done('복사됨'), fallback); else fallback();
  };

  return (
    <section id="contact">
      <div className="wrap">
        <div className="eyebrow reveal">/contact</div>
        <h2 className="sec reveal d1">연락하기</h2>
        <div className="mail-row reveal d1">
          <span className="mail" ref={mailRef}>{PROFILE.contact.email}</span>
          <Sbtn onClick={copy}>{label}</Sbtn>
        </div>
        <ul className="links reveal d2">
          {LINKS.map(([name, handle, href]) => (
            <li key={name}><a href={href} target="_blank" rel="noopener"><b>{name}</b><span>{handle}</span><em>↗</em></a></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
