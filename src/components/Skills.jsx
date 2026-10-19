import { useLayoutEffect, useRef, useState } from 'react';
import { NOTION, SKILLS } from '../data.js';

const logo = skill => `./images/skills/${skill.icon}.svg`;
const Arrow = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg>;
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Skills() {
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);
  const contentRef = useRef(null);
  const originRef = useRef(null);
  const motionRef = useRef(null);
  const closingRef = useRef(false);

  useLayoutEffect(() => {
    if (!selected) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closingRef.current = false;
    dialog.dataset.state = reducedMotion() ? 'open' : 'opening';
    dialog.showModal();
    dialog.scrollTop = 0;
    contentRef.current.scrollTop = 0;

    if (!reducedMotion()) {
      const rect = dialog.getBoundingClientRect();
      const origin = originRef.current;
      const x = origin ? Math.max(-160, Math.min(160, origin.x - rect.left - rect.width / 2)) : 0;
      const y = origin ? Math.max(-100, Math.min(100, origin.y - rect.top - rect.height / 2)) : 24;
      // 내용만 움직여서 열리는 동안에도 닫기 버튼의 클릭 위치는 고정한다.
      const motion = contentRef.current.animate([
        { opacity: 0, transform: `translate(${x}px, ${y}px) scale(.86)`, filter: 'blur(4px)' },
        { opacity: 1, transform: 'translate(0, 0) scale(1)', filter: 'blur(0px)' }
      ], { duration: 900, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'both' });
      motionRef.current = motion;
      motion.onfinish = () => {
        if (closingRef.current || motionRef.current !== motion) return;
        dialog.dataset.state = 'open';
        motionRef.current = null;
        motion.cancel();
      };
    }

    return () => {
      const motion = motionRef.current;
      motionRef.current = null;
      if (motion) { motion.onfinish = null; motion.cancel(); }
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  const openSkill = (skill, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    originRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    setSelected(skill);
  };

  const closeSkill = () => {
    const dialog = dialogRef.current;
    if (!dialog.open || closingRef.current) return;
    const opening = dialog.dataset.state === 'opening';
    closingRef.current = true;
    const finishClose = () => {
      dialog.close();
      setSelected(null);
    };
    const previousMotion = motionRef.current;
    motionRef.current = null;
    if (previousMotion) { previousMotion.onfinish = null; previousMotion.cancel(); }
    if (opening || reducedMotion()) return finishClose();

    // 완전히 열린 뒤에는 기존 닫기 효과를 유지한다.
    const current = getComputedStyle(dialog);
    const from = { opacity: current.opacity, transform: current.transform, filter: current.filter };
    const backdrop = getComputedStyle(dialog, '::backdrop');
    dialog.style.setProperty('--skill-backdrop-opacity', backdrop.opacity);
    dialog.style.setProperty('--skill-backdrop-blur', backdrop.backdropFilter || backdrop.webkitBackdropFilter || 'blur(10px)');
    dialog.dataset.state = 'closing';
    const motion = dialog.animate([
      from,
      { opacity: 0, transform: 'translateY(14px) scale(.96)', filter: 'blur(3px)' }
    ], { duration: 320, easing: 'cubic-bezier(.4,0,1,1)', fill: 'both' });
    motionRef.current = motion;
    motion.onfinish = finishClose;
  };

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
              onClick={event => openSkill(skill, event)}
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
        onClose={() => { if (!dialogRef.current?.open) setSelected(null); }}
        onCancel={event => { event.preventDefault(); closeSkill(); }}
        onClick={event => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeSkill();
        }}
      >
        {selected && <>
          <button className="skill-dialog-close" type="button" aria-label="기술 설명 닫기" onClick={closeSkill}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
          <div className="skill-dialog-content" ref={contentRef} style={{ '--skill-color': selected.color, '--skill-footer-delay': `${460 + selected.abilities.length * 110}ms` }}>
            <div className="skill-dialog-heading">
              <span className="skill-logo"><img src={logo(selected)} alt="" width="60" height="60" /></span>
              <div><span className="skill-dialog-category">{selected.category}</span><h3 id="skill-dialog-title">{selected.name}</h3></div>
            </div>
            <p id="skill-dialog-summary" className="skill-dialog-summary">{selected.summary}</p>
            <h4 className="skill-abilities-title">이렇게 활용할 수 있어요</h4>
            <ul className="skill-abilities">
              {selected.abilities.map((ability, index) => <li key={ability} style={{ '--skill-delay': `${460 + index * 110}ms` }}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><p>{ability}</p></li>)}
            </ul>
            {selected.note && <p className="skill-note">{selected.note}</p>}
            {selected.source && <a className="skill-source" href={selected.source} target="_blank" rel="noopener noreferrer">노션에서 자세히 보기 <Arrow /></a>}
          </div>
        </>}
      </dialog>
    </section>
  );
}
