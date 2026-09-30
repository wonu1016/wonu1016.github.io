import { useEffect, useRef } from 'react';
import Sbtn from './Sbtn.jsx';

export default function Nav({ theme, onToggle }) {
  const ref = useRef(null);
  // 내리면 숨고 올리면 다시 나타남 (임베드 환경도 잡도록 capture + 가장 큰 스크롤 값)
  useEffect(() => {
    const getY = () => Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop);
    let lastY = getY();
    const onScroll = () => {
      const y = getY(), dy = y - lastY;
      if (Math.abs(dy) < 6) return;
      ref.current.classList.toggle('hide', dy > 0 && y > 120);
      lastY = y;
    };
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    return () => document.removeEventListener('scroll', onScroll, { capture: true });
  }, []);

  return (
    <nav ref={ref}>
      <a className="logo" href="#hero">WONU</a>
      <div className="links">
        <a href="#about">About</a><a href="#projects">Projects</a><a href="#career">Career</a><a href="#contact">Contact</a>
      </div>
      <Sbtn sm onClick={onToggle} aria-label="테마 전환">{theme === 'dark' ? '☾' : '☀'}</Sbtn>
    </nav>
  );
}
