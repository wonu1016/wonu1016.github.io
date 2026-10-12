import { impact, reduce } from '../lib.js';

// Specular 스타일 버튼. 마그네틱 호버 + 클릭 임팩트. href 가 있으면 <a>.
export default function Sbtn({ href, sm, className = '', onClick, children, ...rest }) {
  const Tag = href ? 'a' : 'button';
  const cls = `sbtn${sm ? ' sm' : ''}${className ? ' ' + className : ''}`;

  const move = e => {
    if (reduce) return;
    const el = e.currentTarget, r = el.getBoundingClientRect();
    el.style.setProperty('--tx', ((e.clientX - r.left - r.width / 2) / (r.width / 2) * 6).toFixed(1) + 'px');
    el.style.setProperty('--ty', ((e.clientY - r.top - r.height / 2) / (r.height / 2) * 4).toFixed(1) + 'px');
  };
  const leave = e => { e.currentTarget.style.setProperty('--tx', '0px'); e.currentTarget.style.setProperty('--ty', '0px'); };
  const click = e => {
    impact(e.currentTarget);
    onClick && onClick(e);
    // 외부 링크는 임팩트를 보여준 뒤 이동
    if (href && !reduce && !href.startsWith('#')) {
      e.preventDefault();
      const blank = rest.target === '_blank';
      setTimeout(() => blank ? window.open(href, '_blank', 'noopener') : (location.href = href), 380);
    }
  };

  return (
    <Tag className={cls} href={href} onPointerMove={move} onPointerLeave={leave} onClick={click} {...rest}>
      {children}<span className="flash" />
    </Tag>
  );
}
