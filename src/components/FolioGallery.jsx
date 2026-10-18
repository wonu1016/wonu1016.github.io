import { useLayoutEffect, useRef, useState } from 'react';

const Expand = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" /></svg>;
const Chevron = ({ next }) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={next ? 'm9 6 6 6-6 6' : 'm15 6-6 6 6 6'} /></svg>;

export default function FolioGallery({ screenshots }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dialogRef = useRef(null);
  const isOpen = selectedIndex !== null;
  const selected = isOpen ? screenshots[selectedIndex] : null;

  useLayoutEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const scroller = dialog.closest('.scroller');
    const previousOverflow = scroller?.style.overflowY;
    if (scroller) scroller.style.overflowY = 'hidden';
    dialog.showModal();
    dialog.scrollTop = 0;
    return () => {
      if (dialog.open) dialog.close();
      if (scroller) scroller.style.overflowY = previousOverflow;
    };
  }, [isOpen]);

  const move = direction => setSelectedIndex(index => (index + direction + screenshots.length) % screenshots.length);
  const close = () => dialogRef.current.close();

  const onKeyDown = event => {
    // 사진의 Escape가 뒤에 있는 프로젝트 상세 화면까지 닫지 않게 한다.
    if (event.key === 'Escape') event.stopPropagation();
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopPropagation();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  };

  return (
    <div className="folio-gallery">
      <div className="shots">
        {screenshots.map((shot, index) => (
          <figure className="shot" key={shot.src}>
            <button className="shot-open" type="button" onClick={() => setSelectedIndex(index)} aria-label={`${shot.title} 사진과 설명 크게 보기`} aria-haspopup="dialog">
              <img src={shot.src} alt={`Folio 서비스 화면: ${shot.title}`} loading="lazy" />
              <span className="shot-label"><b>{shot.title}</b><Expand /></span>
            </button>
            <figcaption className="shot-caption">{shot.description}</figcaption>
          </figure>
        ))}
      </div>

      <dialog className="shot-viewer" ref={dialogRef} aria-labelledby="shot-viewer-title" aria-describedby="shot-viewer-description" onClose={() => setSelectedIndex(null)} onKeyDown={onKeyDown} onClick={event => { if (event.target === event.currentTarget) close(); }}>
        {selected && <>
          <header className="shot-viewer-header">
            <div><span>FOLIO</span><small aria-live="polite">{String(selectedIndex + 1).padStart(2, '0')} / {String(screenshots.length).padStart(2, '0')}</small></div>
            <button className="shot-viewer-close" type="button" onClick={close} aria-label="사진 닫고 프로젝트로 돌아가기">사진 닫기 <span aria-hidden="true">×</span></button>
          </header>
          <figure className="shot-viewer-figure" key={selected.src}>
            <div className="shot-viewer-image"><img src={selected.src} alt={`Folio 서비스 화면: ${selected.title}`} /></div>
            <figcaption className="shot-viewer-caption" aria-live="polite" aria-atomic="true">
              <h3 id="shot-viewer-title">{selected.title}</h3>
              <p id="shot-viewer-description">{selected.description}</p>
            </figcaption>
          </figure>
          <footer className="shot-viewer-footer">
            <span>← → 사진 이동 · Esc 닫기</span>
            <div>
              <button type="button" onClick={() => move(-1)}><Chevron />이전 사진</button>
              <button type="button" onClick={() => move(1)}>다음 사진<Chevron next /></button>
            </div>
          </footer>
        </>}
      </dialog>
    </div>
  );
}
