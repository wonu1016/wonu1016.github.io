import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Sbtn from './Sbtn.jsx';
import { PROJECT_DETAILS } from '../data.js';

export default function ProjectDetail({ project, onClosed }) {
  const detail = PROJECT_DETAILS[project.name];

  useEffect(() => {
    const onKey = event => { if (event.key === 'Escape') onClosed(); };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = previous; };
  }, [onClosed]);

  if (!detail) return null;
  return createPortal(
    <div className="detail project-detail" role="dialog" aria-modal="true" aria-label={`${project.name} 상세 보기`}>
      <div className="scroller">
        <Sbtn sm className="d-close" onClick={onClosed}>닫기 ✕</Sbtn>
        <div className="d-hero simple-hero"><div className="wrap"><h2>{project.name}</h2><p>{detail.summary}</p></div></div>
        <div className="wrap d-body">
          <div className="d-meta">{detail.meta.map(([key, value]) => <div key={key}>{key}<b>{value}</b></div>)}</div>
          <div className="d-grid">
            <h6>개요</h6><p>{detail.overview}</p>
            <h6>기술 스택</h6><div className="tags detail-tags">{detail.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
            <h6>간단 정리</h6><ul>{detail.points.map(point => <li key={point}>{point}</li>)}</ul>
            <h6>참고</h6><p>{detail.note}</p>
            {detail.links?.length ? <><h6>링크</h6><div className="btns">{detail.links.map(([text, href]) => <Sbtn key={href} href={href} target="_blank" rel="noopener noreferrer">{text}</Sbtn>)}</div></> : null}
          </div>
        </div>
      </div>
    </div>, document.body
  );
}
