export const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

// 버튼 클릭 임팩트: 눌림 + 광택 스윕
export function impact(el) {
  if (reduce || !el) return;
  el.classList.remove('hit'); void el.offsetWidth; el.classList.add('hit');
  el.animate([{ transform: 'scale(1)' }, { transform: 'scale(.9)' }, { transform: 'scale(1.07)' }, { transform: 'scale(1)' }],
    { duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)' });
}
