import { useEffect, useRef, useState } from 'react';
import { NOTION, SKILLS } from '../data.js';

const logo = skill => `./images/skills/${skill.icon}.svg`;
const Arrow = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg>;

export default function Skills() {
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!selected) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  return (
    <section id="skills">
      <div className="wrap">
        <div className="eyebrow reveal">/skills</div>
        <div className="skills-heading reveal d1">
          <h2 className="sec">기술 스택<span>.</span></h2>
          <p>기술을 선택하면<br />제가 활용해 본 범위를 볼 수 있어요.</p>
        </div>
        <div className="skills-grid reveal d2">
          {SKILLS.map(skill => (
            <button
              className={`skill-trigger${skill.featured ? ' skill-trigger-main' : ''}`}
              key={skill.name}
              type="button"
              style={{ '--skill-color': skill.color }}
              aria-label={`${skill.name} 활용 경험 보기`}
              aria-haspopup="dialog"
              onClick={() => setSelected(skill)}
            >
              {skill.featured && <span className="skill-main-label">MAIN STACK</span>}
              <span className="skill-open-mark" aria-hidden="true">+</span>
              <span className="skill-logo"><img src={logo(skill)} alt="" width="60" height="60" loading="lazy" /></span>
              <span className="skill-name">{skill.name}</span>
            </button>
          ))}
        </div>
        <div className="skills-footer reveal">
          <span>프로젝트에서 직접 사용한 기술들</span>
          <a href={NOTION} target="_blank" rel="noopener noreferrer">전체 기술 기록 <Arrow /></a>
        </div>
      </div>

      <dialog
        className="skill-dialog"
        ref={dialogRef}
        aria-labelledby="skill-dialog-title"
        aria-describedby="skill-dialog-summary"
        onClose={() => setSelected(null)}
        onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
      >
        {selected && <div className="skill-dialog-content" style={{ '--skill-color': selected.color }}>
          <button className="skill-dialog-close" type="button" aria-label="기술 설명 닫기" onClick={() => dialogRef.current.close()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
          <div className="skill-dialog-heading">
            <span className="skill-logo"><img src={logo(selected)} alt="" width="60" height="60" /></span>
            <div><span className="skill-dialog-category">{selected.category}</span><h3 id="skill-dialog-title">{selected.name}</h3></div>
          </div>
          <p id="skill-dialog-summary" className="skill-dialog-summary">{selected.summary}</p>
          <h4 className="skill-abilities-title">이렇게 활용할 수 있어요</h4>
          <ul className="skill-abilities">
            {selected.abilities.map((ability, index) => <li key={ability}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><p>{ability}</p></li>)}
          </ul>
          {selected.note && <p className="skill-note">{selected.note}</p>}
          {selected.source && <a className="skill-source" href={selected.source} target="_blank" rel="noopener noreferrer">노션에서 자세히 보기 <Arrow /></a>}
        </div>}
      </dialog>
    </section>
  );
}
