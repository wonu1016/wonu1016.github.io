import { useState, useCallback } from 'react';
import { reduce } from '../lib.js';

// 라이트/다크 전환. 버튼을 누른 자리에서 원형으로 퍼지는 View Transition.
export function useTheme() {
  const root = document.documentElement;
  const [theme, setTheme] = useState(root.dataset.theme);
  const toggle = useCallback(e => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    const apply = () => {
      root.dataset.theme = next; setTheme(next);
      try { localStorage.setItem('theme', next); } catch (err) {}
    };
    if (!document.startViewTransition || reduce) return apply();
    const x = e.clientX, y = e.clientY;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      root.animate({ clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(.2,.8,.2,1)', pseudoElement: '::view-transition-new(root)' });
    });
  }, [root]);
  return [theme, toggle];
}
