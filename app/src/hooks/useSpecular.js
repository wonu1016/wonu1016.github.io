import { useEffect } from 'react';

// Specular 버튼: 반사광(--ang, --b)이 커서 방향을 따라감
export function useSpecular() {
  useEffect(() => {
    let px = -9999, py = -9999, queued = false;
    const update = () => {
      queued = false;
      document.querySelectorAll('.sbtn').forEach(b => {
        const r = b.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = Math.max(r.left - px, 0, px - r.right), dy = Math.max(r.top - py, 0, py - r.bottom);
        const t = Math.max(0, 1 - Math.hypot(dx, dy) / 260), k = t * t * (3 - 2 * t);
        b.style.setProperty('--ang', Math.atan2(px - cx, -(py - cy)) * 180 / Math.PI - 14 + 'deg');
        b.style.setProperty('--b', k.toFixed(3));
        b.style.setProperty('--mx', (px - r.left) + 'px');
        b.style.setProperty('--my', (py - r.top) + 'px');
      });
    };
    const queue = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    const move = e => { px = e.clientX; py = e.clientY; queue(); };
    addEventListener('pointermove', move, { passive: true });
    addEventListener('scroll', queue, { passive: true });
    return () => { removeEventListener('pointermove', move); removeEventListener('scroll', queue); };
  }, []);
}
