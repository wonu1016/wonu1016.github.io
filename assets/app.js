import{jsxs as m,jsx as o,Fragment as He}from"react/jsx-runtime";import{createRoot as bt}from"react-dom/client";import{useRef as Y,useEffect as V,useState as te,useLayoutEffect as dt,Fragment as Mt,useCallback as kt}from"react";import{Renderer as Nt,Mesh as Ft,Program as At,Triangle as Et,Texture as Qe}from"ogl";import{createPortal as Tt}from"react-dom";/*! Includes Electric Logo from React Bits (https://reactbits.dev) - Copyright (c) 2026 David Haz - MIT + Commons Clause */(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))l(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const e of n.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&l(e)}).observe(document,{childList:!0,subtree:!0});function a(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(i){if(i.ep)return;i.ep=!0;const n=a(i);fetch(i.href,n)}})();const ne=typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;function ut(t){ne||!t||(t.classList.remove("hit"),t.offsetWidth,t.classList.add("hit"),t.animate([{transform:"scale(1)"},{transform:"scale(.9)"},{transform:"scale(1.07)"},{transform:"scale(1)"}],{duration:520,easing:"cubic-bezier(.2,.8,.2,1)"}))}function re({href:t,sm:r,className:a="",onClick:l,children:i,...n}){const e=t?"a":"button",s=`sbtn${r?" sm":""}${a?" "+a:""}`;return m(e,{className:s,href:t,onPointerMove:y=>{if(ne)return;const g=y.currentTarget,w=g.getBoundingClientRect();g.style.setProperty("--tx",((y.clientX-w.left-w.width/2)/(w.width/2)*6).toFixed(1)+"px"),g.style.setProperty("--ty",((y.clientY-w.top-w.height/2)/(w.height/2)*4).toFixed(1)+"px")},onPointerLeave:y=>{y.currentTarget.style.setProperty("--tx","0px"),y.currentTarget.style.setProperty("--ty","0px")},onClick:y=>{if(ut(y.currentTarget),l&&l(y),t&&!ne&&!t.startsWith("#")){y.preventDefault();const g=n.target==="_blank";setTimeout(()=>g?window.open(t,"_blank","noopener"):location.href=t,380)}},...n,children:[i,o("span",{className:"flash"})]})}function Lt({theme:t,onToggle:r}){const a=Y(null);return V(()=>{const l=()=>Math.max(window.scrollY,document.documentElement.scrollTop,document.body.scrollTop);let i=l();const n=()=>{const e=l(),s=e-i;Math.abs(s)<6||(a.current.classList.toggle("hide",s>0&&e>120),i=e)};return document.addEventListener("scroll",n,{passive:!0,capture:!0}),()=>document.removeEventListener("scroll",n,{capture:!0})},[]),m("nav",{ref:a,children:[o("a",{className:"logo",href:"#hero",children:"WONU"}),m("div",{className:"links",children:[o("a",{href:"#about",children:"About"}),o("a",{href:"#projects",children:"Projects"}),o("a",{href:"#career",children:"Career"}),o("a",{href:"#contact",children:"Contact"})]}),o(re,{sm:!0,onClick:r,"aria-label":"테마 전환",children:t==="dark"?"☾":"☀"})]})}const Ze=`data:image/svg+xml;charset=utf-8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><path d="M39 3 12 37h17l-4 24 27-34H35z" fill="#fff"/></svg>')}`,St=560,_=4,me=1e20,ae=5,pe=3,Rt=4e6,et=t=>{let r=String(t||"").replace("#","");r.length===3&&(r=r.replace(/./g,l=>l+l));const a=parseInt(r.slice(0,6),16);return Number.isNaN(a)?[1,1,1]:[(a>>16&255)/255,(a>>8&255)/255,(a&255)/255]},tt=(t,r,a,l,i)=>{let n=0;a[0]=0,l[0]=-me,l[1]=me;for(let e=1;e<i;e++){let s=(t[e]+e*e-(t[a[n]]+a[n]*a[n]))/(2*e-2*a[n]);for(;s<=l[n];)n--,s=(t[e]+e*e-(t[a[n]]+a[n]*a[n]))/(2*e-2*a[n]);n++,a[n]=e,l[n]=s,l[n+1]=me}n=0;for(let e=0;e<i;e++){for(;l[n+1]<e;)n++;r[e]=(e-a[n])*(e-a[n])+t[a[n]]}},nt=(t,r,a)=>{const l=Math.max(r,a),i=new Float64Array(l),n=new Float64Array(l),e=new Int32Array(l),s=new Float64Array(l+1);for(let c=0;c<r;c++){for(let d=0;d<a;d++)i[d]=t[d*r+c];tt(i,n,e,s,a);for(let d=0;d<a;d++)t[d*r+c]=n[d]}for(let c=0;c<a;c++){for(let d=0;d<r;d++)i[d]=t[c*r+d];tt(i,n,e,s,r);for(let d=0;d<r;d++)t[c*r+d]=n[d]}},ot=(t,r,a,l,i,n)=>{const e=1/(2*n+1);let s=0;for(let c=0;c<=n&&c<i;c++)s+=t[a+c*l];for(let c=0;c<i;c++)r[a+c*l]=s*e,c+n+1<i&&(s+=t[a+(c+n+1)*l]),c-n>=0&&(s-=t[a+(c-n)*l])},at=(t,r,a,l)=>{const i=new Float32Array(r*a);for(let n=0;n<3;n++){for(let e=0;e<a;e++)ot(t,i,e*r,1,r,l);for(let e=0;e<r;e++)ot(i,t,e,r,a,l)}},Ct=(t,r,a)=>{const l=new Float32Array(r*a);let i=0;for(let u=0;u<r*a;u++)t[u*4+3]<250&&i++;if(i>r*a*.01){for(let u=0;u<r*a;u++)l[u]=t[u*4+3]/255;return l}let n=0,e=0,s=0,c=0;const d=u=>{n+=t[u*4],e+=t[u*4+1],s+=t[u*4+2],c++};for(let u=0;u<r;u++)d(u),d((a-1)*r+u);for(let u=0;u<a;u++)d(u*r),d(u*r+r-1);n/=c,e/=c,s/=c;for(let u=0;u<r*a;u++){const y=Math.max(Math.abs(t[u*4]-n),Math.abs(t[u*4+1]-e),Math.abs(t[u*4+2]-s));l[u]=Math.min(1,Math.max(0,(y-24)/48))}return l},rt=(t,r,a)=>{const{field:l,width:i,height:n}=t,e=Math.min(Math.max(r,.5),i-.5),s=Math.min(Math.max(a,.5),n-.5),c=Math.min(Math.floor(e-.5),i-2),d=Math.min(Math.floor(s-.5),n-2),u=e-.5-c,y=s-.5-d,g=d*i+c,w=l[g]+(l[g+1]-l[g])*u,R=l[g+i]+(l[g+i+1]-l[g+i])*u;return w+(R-w)*y+Math.hypot(r-e,a-s)},Pt=t=>{const r=t.naturalWidth||t.width,a=t.naturalHeight||t.height;if(!r||!a)return null;const l=St/Math.max(r,a),i=Math.max(2,Math.round(r*l)),n=Math.max(2,Math.round(a*l)),e=document.createElement("canvas");e.width=i,e.height=n;const s=e.getContext("2d",{willReadFrequently:!0});if(!s)return null;s.drawImage(t,0,0,i,n);const c=Ct(s.getImageData(0,0,i,n).data,i,n);let d=i,u=n,y=-1,g=-1;for(let h=0;h<n;h++)for(let v=0;v<i;v++)c[h*i+v]<=.01||(v<d&&(d=v),v>y&&(y=v),h<u&&(u=h),h>g&&(g=h));if(y<0)return null;const w=y-d+1,R=g-u+1,T=Math.ceil(Math.max(w,R)*.25)+2,F=w+T*2,L=R+T*2,O=new Float32Array(F*L),G=new Float32Array(F*L);for(let h=0;h<L;h++)for(let v=0;v<F;v++){const f=v-T+d,A=h-T+u,W=f>=0&&A>=0&&f<i&&A<n?c[A*i+f]:0,P=h*F+v;if(W>=1)O[P]=0,G[P]=me;else if(W<=0)O[P]=me,G[P]=0;else{const D=.5-W;O[P]=D>0?D*D:0,G[P]=D<0?D*D:0}}nt(O,F,L),nt(G,F,L);const C=new Float32Array(F*L);for(let h=0;h<F*L;h++)C[h]=Math.sqrt(O[h])-Math.sqrt(G[h]);const I=[];for(let h=1;h<L-1;h++)for(let v=1;v<F-1;v++){const f=h*F+v,A=C[f];if(A>0||C[f-1]<=0&&C[f+1]<=0&&C[f-F]<=0&&C[f+F]<=0)continue;const W=C[f+1]-C[f-1],P=C[f+F]-C[f-F],D=Math.hypot(W,P)||1;I.push(v+.5-A*W/D,h+.5-A*P/D)}const K=Math.max(1,Math.ceil(I.length/2/3e3))*2,ie=[];for(let h=0;h<I.length;h+=K)ie.push(I[h],I[h+1]);const S=Math.max(w,R),j=Math.ceil(S*.7/_),b=Math.ceil(w/_)+j*2,z=Math.ceil(R/_)+j*2,ee=new Float32Array(b*z);for(let h=0;h<L;h++){const v=Math.floor((h-T)/_)+j;for(let f=0;f<F;f++){const A=Math.floor((f-T)/_)+j;ee[v*b+A]+=Math.exp(-Math.abs(C[h*F+f])/1.5)/(_*_)}}const B=ee.slice(),U=Math.max(1,Math.round(S*.035/_)),X=Math.max(2,Math.round(S*.13/_));at(ee,b,z,U),at(B,b,z,X);const Q=Math.sqrt(2*Math.PI*(U*U+U))*_/3,k=Math.sqrt(2*Math.PI*(X*X+X))*_/3,p=new Float32Array(b*z*2);for(let h=0;h<b*z;h++)p[h*2]=ee[h]*Q,p[h*2+1]=B[h]*k;return{field:C,edges:ie,width:F,height:L,pad:T,logoWidth:w,logoHeight:R,glow:p,glowWidth:b,glowHeight:z,glowOffset:T-j*_}},Se=(t,r,a)=>{const{edges:l,logoWidth:i,logoHeight:n}=t,e=l.length/2;if(e<2)return null;const s=Math.max(i,n);let c=Math.floor(Math.random()*e);if(a){let y=!1;for(let g=0;g<40&&!y;g++){const w=Math.floor(Math.random()*e);Math.hypot(l[w*2]-a.x,l[w*2+1]-a.y)<a.radius&&(c=w,y=!0)}if(!y)return null}const d=l[c*2],u=l[c*2+1];for(let y=0;y<24;y++){const g=Math.floor(Math.random()*e),w=l[g*2],R=l[g*2+1],T=Math.hypot(w-d,R-u);if(T<s*.08||T>s*.3)continue;const F=-(R-u)/T,L=(w-d)/T,O=T*(.2+Math.random()*.3),G=(d+w)/2,C=(u+R)/2,I=rt(t,G+F*O,C+L*O),K=rt(t,G-F*O,C-L*O);if(!(Math.max(I,K)<=0))return{ax:d,ay:u,bx:w,by:R,bow:I>=K?O:-O,seed:1+Math.random()*60,born:r,life:.35+Math.random()*.45}}return null},It=`#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,jt=`#version 300 es
precision highp float;
precision highp int;

uniform sampler2D tFieldFrom;
uniform sampler2D tGlowFrom;
uniform sampler2D tFieldTo;
uniform sampler2D tGlowTo;
uniform vec4 uMapFrom;
uniform vec4 uSizeFrom;
uniform vec4 uMapTo;
uniform vec4 uSizeTo;
uniform float uMorph;
uniform vec2 uResolution;
uniform float uUnit;
uniform float uTime;
uniform float uPresence;
uniform vec3 uHover;
uniform float uHoverRadius;
uniform vec4 uPulses[${pe}];
uniform float uPulseBoost;
uniform float uFlash;
uniform vec3 uColor;
uniform vec3 uGlowColor;
uniform float uIntensity;
uniform float uGlow;
uniform float uThickness;
uniform float uStrands;
uniform float uBend;
uniform float uCrackle;
uniform float uFlicker;
uniform float uFill;
uniform float uInk;
uniform vec4 uArcEnds[${ae}];
uniform vec4 uArcShape[${ae}];

in vec2 vUv;
out vec4 fragColor;

uint scramble(uint x) {
  x ^= x >> 16u;
  x *= 0x7feb352du;
  x ^= x >> 15u;
  x *= 0x846ca68bu;
  x ^= x >> 16u;
  return x;
}

float fieldAt(sampler2D tex, vec4 map, vec4 size, vec2 p) {
  vec2 f = (p - map.xy) / map.z;
  vec2 c = clamp(f, vec2(0.5), size.xy - 0.5);
  return (textureLod(tex, c / size.xy, 0.0).r + length(f - c)) * map.z;
}

vec2 glowAt(sampler2D tex, vec4 map, vec4 size, vec2 p) {
  vec2 f = (p - map.xy) / map.z - map.w;
  return textureLod(tex, f / (size.zw * ${_}.0), 0.0).rg;
}

float shape(vec2 p, float k) {
  float to = fieldAt(tFieldTo, uMapTo, uSizeTo, p);
  if (k >= 1.0) return to;
  return mix(fieldAt(tFieldFrom, uMapFrom, uSizeFrom, p), to, k);
}

vec2 aura(vec2 p, float k) {
  vec2 to = glowAt(tGlowTo, uMapTo, uSizeTo, p);
  if (k >= 1.0) return to;
  return mix(glowAt(tGlowFrom, uMapFrom, uSizeFrom, p), to, k);
}

vec4 corner(ivec2 c, uint seed) {
  uint h = scramble(uint(c.x) * 0x8da6b343u + uint(c.y) * 0xd8163841u + seed * 0xcb1ab31fu);
  return vec4(uvec4(h, h >> 8u, h >> 16u, h >> 24u) & 255u) / 127.5 - 1.0;
}

vec2 drift(vec2 p, uint seed, out mat2 jac) {
  vec2 i = floor(p);
  vec2 f = p - i;
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  vec2 du = 30.0 * f * f * (f * (f - 2.0) + 1.0);
  ivec2 c = ivec2(i);
  vec4 ga = corner(c, seed);
  vec4 gb = corner(c + ivec2(1, 0), seed);
  vec4 gc = corner(c + ivec2(0, 1), seed);
  vec4 gd = corner(c + ivec2(1, 1), seed);
  vec2 fb = f - vec2(1.0, 0.0);
  vec2 fc = f - vec2(0.0, 1.0);
  vec2 fd = f - vec2(1.0);
  vec2 va = vec2(dot(ga.xy, f), dot(ga.zw, f));
  vec2 vb = vec2(dot(gb.xy, fb), dot(gb.zw, fb));
  vec2 vc = vec2(dot(gc.xy, fc), dot(gc.zw, fc));
  vec2 vd = vec2(dot(gd.xy, fd), dot(gd.zw, fd));
  vec2 k = va - vb - vc + vd;
  vec4 g = ga + u.x * (gb - ga) + u.y * (gc - ga) + u.x * u.y * (ga - gb - gc + gd);
  jac = mat2(
    g.xy + du * (u.yx * k.x + vec2(vb.x - va.x, vc.x - va.x)),
    g.zw + du * (u.yx * k.y + vec2(vb.y - va.y, vc.y - va.y))
  );
  return va + u.x * (vb - va) + u.y * (vc - va) + u.x * u.y * k;
}

float wobble(vec2 p, uint seed) {
  mat2 jac;
  return drift(p, seed, jac).x;
}

vec2 ripple(vec2 p, out float surge) {
  vec2 push = vec2(0.0);
  surge = 0.0;
  float width = uUnit * 10.0;
  for (int i = 0; i < ${pe}; i++) {
    vec4 pulse = uPulses[i];
    if (pulse.w <= 0.0) continue;
    vec2 d = p - pulse.xy;
    float dist = length(d);
    float front = (dist - pulse.z * uUnit * 150.0) / width;
    float env = exp(-front * front) * pulse.w * exp(-pulse.z * 1.7) * smoothstep(0.0, uUnit * 8.0, dist);
    push += d / max(dist, 1.0) * env * cos(front * 2.2) * uUnit * 7.5;
    surge += env;
  }
  return push;
}

vec2 wander(vec2 p, float t, uint seed, float reachScale, out mat2 jac, out vec2 sway) {
  vec2 q = p / uUnit;
  mat2 ja;
  mat2 jb;
  mat2 jc;
  mat2 jd;
  vec2 a = drift(q * 0.028 + vec2(t * 0.29, t * 0.21), seed, ja);
  vec2 b = drift(q * 0.085 + a * 0.4 + vec2(t * 0.83, -t * 0.61) + 17.0, seed + 1u, jb);
  vec2 c = drift(p / 9.0 + b * 0.6 + vec2(t * 1.9, t * 1.3) + 5.0, seed + 2u, jc);
  vec2 d = drift(p / 4.1 + vec2(-t * 2.7, t * 2.2) + 11.0, seed + 3u, jd);
  float bendAmp = uBend * 8.0 * reachScale;
  float rippleAmp = uBend * 3.2 * reachScale;
  float crinkleAmp = uCrackle * 1.5 * reachScale;
  jac = ja * (0.028 * bendAmp) + jb * (0.085 * rippleAmp) + jc * (crinkleAmp / 9.0) + jd * (crinkleAmp * 0.35 / 4.1);
  sway = (a * bendAmp + b * rippleAmp) * uUnit;
  return sway + (c + d * 0.35) * crinkleAmp;
}

vec2 glowShape(float line, float spread, float w) {
  float x = abs(line);
  float y = abs(spread);
  return vec2(exp(-x * x / (w * w * 0.5)) + exp(-y / (w * 2.2)) * 0.6, exp(-y / (w * 4.5)) * 0.5);
}

void addArc(vec2 p, vec4 ends, vec4 info, float t, inout vec3 light, inout float energy, inout float hot) {
  if (info.y < 0.002) return;
  vec2 ab = ends.zw - ends.xy;
  float len = max(length(ab), 1.0);
  vec2 dir = ab / len;
  vec2 rel = p - ends.xy;
  float s = dot(rel, dir);
  float h = dot(rel, vec2(-dir.y, dir.x));
  float margin = abs(info.x) + uCrackle * (2.0 + len * 0.08) + uThickness * 12.0 + 10.0;
  if (s < -margin || s > len + margin || abs(h) > margin) return;
  float u = clamp(s / len, 0.0, 1.0);
  float taper = sin(3.14159265 * u);
  float bendSlope = s > 0.0 && s < len ? 3.14159265 / len * cos(3.14159265 * u) : 0.0;
  float beyond = max(-s, 0.0) + max(s - len, 0.0);
  for (int c = 0; c < 2; c++) {
    uint seed = uint(info.z * 131.0) + uint(c) * 29u + 7u;
    float jag = 0.0;
    float jagSlope = 0.0;
    float wave = max(len * 0.3, 14.0);
    float weight = uCrackle * (1.5 + len * 0.05) * (c == 0 ? 1.0 : 1.5);
    for (int o = 0; o < 3; o++) {
      mat2 jac;
      float n = drift(vec2(s / wave + info.z * 3.0, t * (1.4 + float(o) * 1.1)), seed + uint(o), jac).x;
      jag += n * weight;
      jagSlope += jac[0].x * weight / wave;
      wave *= 0.42;
      weight *= 0.4;
    }
    float offset = (info.x + jag) * taper;
    float offsetSlope = (info.x + jag) * bendSlope + jagSlope * taper;
    float across = (h - offset) / sqrt(1.0 + offsetSlope * offsetSlope);
    float gap = length(vec2(beyond, across));
    float w = uThickness * (c == 0 ? 0.9 : 0.6);
    vec2 g = glowShape(gap, gap, w);
    float k = info.y * (c == 0 ? 1.0 : 0.45);
    light += (uColor * g.x + uGlowColor * g.y * uGlow) * k;
    energy += (g.x + g.y * uGlow) * k;
    hot += exp(-gap * gap / (w * w * 0.16)) * k * (c == 0 ? 1.0 : 0.0);
  }
}

void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uResolution;
  float t = uTime;
  vec3 light = vec3(0.0);
  float energy = 0.0;
  float hot = 0.0;

  float surge;
  vec2 pr = p - ripple(p, surge);
  float k = uMorph >= 1.0 ? 1.0 : smoothstep(0.0, 1.0, clamp(uMorph * 1.7 - 0.35 + 0.35 * wobble(p / uUnit * 0.018, 41u), 0.0, 1.0));
  float transit = uMorph >= 1.0 ? 0.0 : sin(3.14159265 * uMorph);
  float base = shape(pr, k);

  vec2 toHover = p - uHover.xy;
  float heat = min(uHover.z * exp(-dot(toHover, toHover) / (uHoverRadius * uHoverRadius)) + surge * 1.4 + transit * 0.5, 2.0);
  float heatCap = min(uHover.z + uPulseBoost * 1.4 + transit * 0.5, 2.0);
  float breath = 1.0 + uFlicker * 0.6 * wobble(vec2(t * 2.1, 7.0), 3u);
  float grow = uPresence;

  float edge = abs(base);
  vec2 halo = aura(pr, k);
  float ink = uInk;
  float bloom = (halo.x * 0.16 + halo.y * 0.08) * (1.0 - ink * 0.65) * uGlow * (1.0 + heat * 1.2);
  float body = smoothstep(0.75, -0.75, base) * uFill * (0.06 + 1.2 * min(halo.x, 1.0)) * (1.0 + heat * 0.5);
  light += uGlowColor * bloom * grow * grow;
  energy += bloom * grow * grow;

  float reachScale = mix(0.15, 1.0, grow) * (1.0 + heat * 0.9);
  float reach = (uUnit * uBend * 16.0 + uCrackle * 3.0) * (1.0 + heatCap * 0.9) + uThickness * 20.0 + 8.0;
  if (edge < reach && grow > 0.0) {
    float fade = smoothstep(reach, reach * 0.55, edge);
    vec2 q = pr / uUnit;
    float count = min(uStrands + heat * 2.5, 6.0);
    float limit = min(uStrands + heatCap * 2.5, 6.0);
    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      if (fi >= limit) break;
      float present = clamp(count - fi, 0.0, 1.0);
      if (present <= 0.0) continue;
      uint seed = uint(i) * 7u + 3u;
      mat2 jac;
      vec2 sway;
      float lead = i == 0 ? 1.0 : 0.0;
      vec2 warped = pr + wander(pr, t * (1.0 + fi * 0.19), seed, reachScale * mix(0.6 + fi * 0.2, 0.7, lead), jac, sway);
      float dw = shape(warped, k);
      vec2 slope = vec2(shape(warped + vec2(1.0, 0.0), k), shape(warped + vec2(0.0, 1.0), k)) - dw;
      float d = dw / max(length(slope + jac * slope), 0.3);
      float spread = shape(pr + sway, k);
      float swell = 0.5 + 0.5 * wobble(q * 0.06 + vec2(t * 0.9, fi * 5.1 - t * 0.6), seed + 8u);
      float w = uThickness * mix(0.5, 1.0, lead) * (0.5 + swell);
      float vis = mix(0.3 + 0.45 * smoothstep(-0.25, 0.2, wobble(q * 0.035 + vec2(t * 0.21, fi * 3.7), seed + 5u)), 1.0, lead);
      float spark = 1.0 - uFlicker * 0.3 * (0.5 + 0.5 * wobble(vec2(t * 6.0, fi * 2.3), seed + 6u));
      float weight = max(vis, heat * 0.85) * spark * fade * present * (0.7 + 0.6 * swell);
      vec2 g = glowShape(d, spread, w) * weight;
      float soft = mix(1.0, mix(0.5, 1.0, lead), ink);
      vec3 stroke = mix(uColor, uGlowColor, ink * (1.0 - lead) * 0.65);
      float haze = uGlow * (1.0 + heat) * (1.0 - ink * 0.7);
      light += stroke * g.x * soft + uGlowColor * g.y * haze;
      energy += g.x * soft + g.y * haze;
      hot += exp(-d * d / (w * w * 0.16)) * lead * weight;
    }
    light *= grow;
    energy *= grow;
  }

  for (int i = 0; i < ${ae}; i++) addArc(pr, uArcEnds[i], uArcShape[i], t, light, energy, hot);

  float gain = uIntensity * breath * (1.0 + heat * 0.45) * (1.0 + uFlash * 0.3) * 1.4;
  float alpha = 1.0 - exp(-energy * gain);
  vec3 color = mix(1.0 - exp(-light * gain), alpha * light / max(energy, 1e-4), ink);
  color = mix(color, vec3(alpha), clamp(hot * grow, 0.0, 1.0) * ink * 0.85);
  float tint = (1.0 - exp(-body * gain * 1.2)) * grow * grow * (1.0 - ink * 0.82);
  color += uGlowColor * tint * (1.0 - alpha);
  alpha += tint * (1.0 - alpha);
  float grain = (fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) - 0.5) / 255.0;
  alpha = clamp(alpha + grain, 0.0, 1.0);
  fragColor = vec4(clamp(color + grain, 0.0, alpha), alpha);
}
`,Ot=({src:t=Ze,color:r="#ecc7ff",glowColor:a="#ad6dff",scale:l=.7,intensity:i=1,glow:n=1,thickness:e=1.5,strands:s=4,bend:c=.6,crackle:d=1.5,arcs:u=1,flicker:y=.6,fill:g=0,speed:w=2.5,interactive:R=!0,cursorIntensity:T=.75,cursorRadius:F=100,theme:L="dark",onRender:O,className:G="",style:C})=>{const I=Y(null),K=Y(null),ie=Y(null);return V(()=>{K.current={color:r,glowColor:a,scale:l,intensity:i,glow:n,thickness:e,strands:s,bend:c,crackle:d,arcs:u,flicker:y,fill:g,speed:w,interactive:R,cursorIntensity:T,cursorRadius:F,theme:L,onRender:O}}),V(()=>{let S=!0;const j=new Image;return j.crossOrigin="anonymous",j.decoding="async",j.onload=()=>{if(!S)return;let b=null;try{b=Pt(j)}catch{b=null}b&&(ie.current=b)},j.src=t||Ze,()=>{S=!1,j.onload=null}},[t]),V(()=>{var Xe,_e;const S=I.current;if(!S)return;const j=new Nt({dpr:Math.min(window.devicePixelRatio||1,2),alpha:!0,premultipliedAlpha:!0,antialias:!1}),b=j.gl;if(!j.isWebgl2){(Xe=b.getExtension("WEBGL_lose_context"))==null||Xe.loseContext();return}b.clearColor(0,0,0,0);const z=b.canvas;z.style.display="block",z.style.width="100%",z.style.height="100%",S.appendChild(z);const ee=()=>({shape:null,field:new Qe(b,{image:new Float32Array([1e3]),width:1,height:1,internalFormat:b.R16F,format:b.RED,type:b.FLOAT,minFilter:b.LINEAR,magFilter:b.LINEAR,generateMipmaps:!1,flipY:!1,unpackAlignment:1}),glow:new Qe(b,{image:new Float32Array([0,0]),width:1,height:1,internalFormat:b.RG16F,format:b.RG,type:b.FLOAT,minFilter:b.LINEAR,magFilter:b.LINEAR,generateMipmaps:!1,flipY:!1,unpackAlignment:1})}),B=[ee(),ee()],U=Array.from({length:ae*4},()=>0),X=Array.from({length:ae*4},()=>0),Q=Array.from({length:pe*4},()=>0),k={tFieldFrom:{value:B[1].field},tGlowFrom:{value:B[1].glow},tFieldTo:{value:B[0].field},tGlowTo:{value:B[0].glow},uMapFrom:{value:[0,0,1,0]},uSizeFrom:{value:[1,1,1,1]},uMapTo:{value:[0,0,1,0]},uSizeTo:{value:[1,1,1,1]},uMorph:{value:1},uResolution:{value:[1,1]},uUnit:{value:1},uTime:{value:0},uPresence:{value:0},uHover:{value:[0,0,0]},uHoverRadius:{value:120},uPulses:{value:Q},uPulseBoost:{value:0},uFlash:{value:0},uColor:{value:[1,1,1]},uGlowColor:{value:[.43,.48,1]},uIntensity:{value:1},uGlow:{value:1},uThickness:{value:1.8},uStrands:{value:3},uBend:{value:1},uCrackle:{value:1},uFlicker:{value:.4},uFill:{value:.5},uInk:{value:0},uArcEnds:{value:U},uArcShape:{value:X}},p=new Ft(b,{geometry:new Et(b),program:new At(b,{vertex:It,fragment:jt,uniforms:k,depthTest:!1,depthWrite:!1})}),h=((_e=window.matchMedia)==null?void 0:_e.call(window,"(prefers-reduced-motion: reduce)").matches)??!1,v={x:0,y:0,over:!1},f={x:0,y:0,vx:0,vy:0,power:0},A=[],W=[];let P=0,D=null,J=1,ve=null,de=0,ke=0;const ge=[[1,1,1],[1,1,1]];let ze=!1,le=0,se=1,ce=1,ue=0,Ne=performance.now(),ye=!0;const pt=(N,x)=>{N.shape=x,N.field.image=x.field,N.field.width=x.width,N.field.height=x.height,N.field.needsUpdate=!0,N.glow.image=x.glow,N.glow.width=x.glowWidth,N.glow.height=x.glowHeight,N.glow.needsUpdate=!0},Be=(N,x)=>{const q=Math.max(1e-4,Math.min(se*x.scale/N.logoWidth,ce*x.scale/N.logoHeight));return{fit:q,ox:se/2-(N.pad+N.logoWidth/2)*q,oy:ce/2-(N.pad+N.logoHeight/2)*q,unit:Math.max(N.logoWidth,N.logoHeight)*q/100}},We=()=>{se=Math.max(1,S.clientWidth),ce=Math.max(1,S.clientHeight),j.dpr=Math.min(window.devicePixelRatio||1,2,Math.sqrt(Rt/(se*ce))),j.setSize(se,ce),k.uResolution.value=[se,ce]},De=N=>{var Ye;ue=0;const x=K.current,q=Math.min(.05,Math.max(0,(N-Ne)/1e3));Ne=N;const Ae=ie.current;Ae&&Ae!==B[P].shape&&(D=Ae),D&&J>=1&&(B[P].shape&&(P=1-P,J=0,A.length=0),pt(B[P],D),D=null),J<1&&(J=Math.min(1,J+q/(D?.3:1.6)));const Z=B[P].shape,oe=J<1?B[1-P].shape:null;Z&&(de=Math.min(1,de+q/1.4));const Ee=de*de*(3-2*de);if(Z&&x){const H=Be(Z,x),he=oe?Be(oe,x):H,vt=J*J*(3-2*J),gt=he.unit+(H.unit-he.unit)*vt,Te=x.interactive&&v.over;Te&&f.power<.01&&(f.x=v.x,f.y=v.y,f.vx=0,f.vy=0),f.vx+=((v.x-f.x)*120-f.vx*19)*q,f.vy+=((v.y-f.y)*120-f.vy*19)*q,f.x+=f.vx*q,f.y+=f.vy*q,f.power+=((Te?1:0)-f.power)*(1-Math.exp(-q/(Te?.3:.55)));const yt=h?.2:1;le+=q*x.speed*yt;for(let M=A.length-1;M>=0;M--)le-A[M].born>A[M].life&&A.splice(M,1);const Ke=M=>({x:(M.x-H.ox)/H.fit,y:(M.y-H.oy)/H.fit,radius:Math.max(1,x.cursorRadius)/H.fit});if(ve&&J>=1&&x.arcs>0)for(let M=0;M<3&&A.length<ae;M++){const E=Se(Z,le,Ke(ve));E&&A.push(E)}if(ve=null,!h&&Ee>.8&&J>=1&&A.length<ae){const M=q*x.speed*x.arcs;if(Math.random()<M*6*f.power*x.cursorIntensity){const E=Se(Z,le,Ke(f));E&&A.push(E)}else if(Math.random()<M*2.2){const E=Se(Z,le,null);E&&A.push(E)}}for(let M=0;M<ae;M++){const E=M*4,$=A[M];if(!$){X[E+1]=0;continue}const fe=(le-$.born)/$.life;U[E]=H.ox+$.ax*H.fit,U[E+1]=H.oy+$.ay*H.fit,U[E+2]=H.ox+$.bx*H.fit,U[E+3]=H.oy+$.by*H.fit,X[E]=$.bow*H.fit,X[E+1]=Math.sin(Math.PI*Math.min(1,Math.max(0,fe)))*Ee,X[E+2]=$.seed}let Le=0,Je=0;for(let M=W.length-1;M>=0;M--)(N-W[M].born)/1e3>2&&W.splice(M,1);for(let M=0;M<pe;M++){const E=M*4,$=W[M];if(!$){Q[E+3]=0;continue}const fe=(N-$.born)/1e3;Q[E]=$.x,Q[E+1]=$.y,Q[E+2]=fe,Q[E+3]=1,Le=Math.max(Le,Math.exp(-fe*1.7)),Je+=Math.exp(-fe*7)}const Ve=B[1-P];k.tFieldTo.value=B[P].field,k.tGlowTo.value=B[P].glow,k.tFieldFrom.value=Ve.field,k.tGlowFrom.value=Ve.glow,k.uMapTo.value=[H.ox,H.oy,H.fit,Z.glowOffset],k.uSizeTo.value=[Z.width,Z.height,Z.glowWidth,Z.glowHeight],oe&&(k.uMapFrom.value=[he.ox,he.oy,he.fit,oe.glowOffset],k.uSizeFrom.value=[oe.width,oe.height,oe.glowWidth,oe.glowHeight]),k.uMorph.value=J,k.uUnit.value=gt,k.uTime.value=le,k.uPresence.value=Ee,k.uHover.value=[f.x,f.y,f.power*Math.max(0,x.cursorIntensity)],k.uHoverRadius.value=Math.max(1,x.cursorRadius),k.uPulseBoost.value=Le,k.uFlash.value=Je;const xt=[et(x.color),et(x.glowColor)],wt=ze?1-Math.exp(-q/.35):1;ze=!0;for(let M=0;M<2;M++)for(let E=0;E<3;E++)ge[M][E]+=(xt[M][E]-ge[M][E])*wt;k.uColor.value=ge[0].slice(),k.uGlowColor.value=ge[1].slice(),k.uIntensity.value=x.intensity,k.uGlow.value=x.glow,k.uThickness.value=x.thickness,k.uStrands.value=Math.max(1,Math.min(6,Math.round(x.strands))),k.uBend.value=x.bend,k.uCrackle.value=x.crackle,k.uFlicker.value=h?0:x.flicker,ke+=((x.theme==="light"?1:0)-ke)*(1-Math.exp(-q/.25)),k.uFill.value=x.fill,k.uInk.value=ke,j.render({scene:p}),(Ye=x.onRender)==null||Ye.call(x,z)}ye&&(ue=requestAnimationFrame(De))},Ge=()=>{ue||!ye||(Ne=performance.now(),ue=requestAnimationFrame(De))},Fe=N=>{const x=S.getBoundingClientRect();v.x=N.clientX-x.left,v.y=N.clientY-x.top,v.over=!0},qe=N=>{var x;Fe(N),!(!((x=K.current)!=null&&x.interactive)||h)&&(W.push({x:v.x,y:v.y,born:performance.now()}),W.length>pe&&W.shift(),ve={x:v.x,y:v.y})},xe=()=>{v.over=!1};S.addEventListener("pointermove",Fe),S.addEventListener("pointerdown",qe),S.addEventListener("pointerleave",xe),S.addEventListener("pointercancel",xe);const $e=new ResizeObserver(We);$e.observe(S);const Ue=new IntersectionObserver(([N])=>{ye=N.isIntersecting,Ge()});return Ue.observe(S),We(),Ge(),()=>{var N;ye=!1,cancelAnimationFrame(ue),$e.disconnect(),Ue.disconnect(),S.removeEventListener("pointermove",Fe),S.removeEventListener("pointerdown",qe),S.removeEventListener("pointerleave",xe),S.removeEventListener("pointercancel",xe),(N=b.getExtension("WEBGL_lose_context"))==null||N.loseContext(),z.parentNode&&z.parentNode.removeChild(z)}},[]),o("div",{ref:I,className:`electric-logo ${G}`.trim(),style:C})},ht="https://app.notion.com/p/wonu-portfolio/0a97ea1e118183969d1781d77d7c3dce",Ht=["걱정시키지 않는","소통을 중시하는","사용자를 생각하는"],Me={name:"양원우",role:"Backend Developer",school:"경북소프트웨어마이스터고등학교",since:2025,motto:"팀원이 걱정하지 않는 개발",values:["유지보수가 쉬운 SW","사용자의 입장을 먼저","사회 문제를 해결하는 프로젝트"],learning:["Spring Boot","MariaDB"],awards:6,contact:{email:"anyaswint@gmail.com",github:"wonu1016"}},zt=[["HTTP/1.1","200 OK"],["Content-Type","application/json; charset=utf-8"],["X-Developer","wonu"],["X-Motto","worry-free"],["X-Response-Time","38ms"]],Bt=[{name:"Folio",main:!0,x:0,y:-80},{name:"Reply",x:-470,y:-300,tags:["FastAPI","Chrome Ext"]},{name:"ToneMate",x:470,y:-310,tags:["Flutter","Spring Boot","WebSocket"]},{name:"ExportNavi",x:-470,y:180,tags:["Spring Boot","MySQL","React"]},{name:"Aketch",x:470,y:170,tags:["React","Spring Boot","MySQL"]},{name:"capteam",x:0,y:330,tags:["React","Node.js"]}],be={tags:["Node.js","FastAPI","React","OpenAI API"],summary:"AI 포트폴리오 분석 서비스",period:"2026.01 – 04",meta:[["기간","2026.01.06 – 04.16"],["팀","FE 1 · BE 1 · AI 1"],["역할","Backend"],["구분","교내 방학 프로젝트"]],overview:"포트폴리오를 잘 썼는지 판단할 명확한 기준이 없다는 문제에서 출발해, 자체 기준으로 분석하고 피드백을 주는 서비스를 만들었습니다.",features:["PDF·이미지 업로드 후 AI OCR로 텍스트 추출","직무별 적합도 점수와 강점·약점 분석","맞춤 기업 추천, 3·6개월 커리어 로드맵","레이더·바 차트로 역량 시각화"],flow:["파일 업로드","OCR 엔진","Layout 엔진","Semantic 엔진","Consulting 엔진","리포트 시각화"],did:["REST API 엔드포인트와 Request/Response 스키마 설계","JWT 기반 회원가입·로그인, 프로필 API","OCR / Layout / Consulting 엔진 구현"],trouble:[["문제","AI 서버와 인증 서버 주소가 하드코딩되어 있고 FastAPI 실행 포트가 불명확해 요청이 연결되지 않음"],["해결","서버별 포트를 명확히 분리하고 .env로 로컬/배포 주소를 나눠 관리"],["배운 점","JWT 인증 흐름과 인메모리 저장의 한계 — 실제 서비스엔 영속 DB 연동이 필수"]],links:[["GitHub ↗","https://github.com/Folio-Ai-project"],["시연 영상 ↗","https://www.youtube.com/watch?v=3BeM9U-I2O4"]]},it=[{year:"2026",items:[{title:"2026 1학기 캡스톤 프로젝트 — 대상",meta:["2026.07.16","경북소프트웨어마이스터고"],status:[["대상 (1위)",1]]},{title:"교내 해커톤 프로젝트 — UI/UX상",meta:["2026.07.14","경북소프트웨어마이스터고"],status:[["UI/UX상",1]]},{title:"장애인날 기념 2026 코딩 발명 아이디어·에세이 경진대회",meta:["2026.04.18","행복일자리운동본부"],text:"장애인을 위한 맞춤 가이드 아이디어로 참가.",status:[["장려상",1]]},{title:"교내 방학 프로젝트 — 4등",meta:["2026.03.13","경북소프트웨어마이스터고"],status:[["4등",1]]},{title:"2026 AI EXPO 출품",meta:["2026"],text:"AI EXPO 출품작 제작에 참여.",status:[["출품",0]]}]},{year:"2025",items:[{title:"레벨 업 프로젝트 — 3등",meta:["2025.12.01","경북소프트웨어마이스터고"],status:[["3등",1]]},{title:"2025 SOFT WAVE 출품",meta:["2025"],text:"SOFT WAVE 출품작 제작에 참여.",status:[["출품",0]]},{title:"알고리즘 테스트 — 7등",meta:["2025.06.12","경북소프트웨어마이스터고"],status:[["7등",1]]},{title:"웹 개발 동아리 WINE — 백엔드",meta:["2025.03.19 ~","교내 개발 동아리"],text:"동아리 프로젝트에서 백엔드를 담당.",status:[["활동 중",0]]},{title:"체육 동아리 체육부",meta:["2025.03.19 ~","교내 체육 학생부"],status:[["활동 중",0]]},{title:"경북소프트웨어마이스터고등학교 입학",meta:["2025.03 ~"],status:[["재학 중",0]]}]},{year:"CERTIFICATION",items:[{title:"ITQ — PowerPoint · Excel",meta:["자격증"],status:[["PowerPoint",0],["Excel",0]]}]}],Wt=[["GitHub","wonu1016","https://github.com/wonu1016"],["velog","@anyaswint","https://velog.io/@anyaswint/posts"],["Linktree","anyaswint","https://linktr.ee/anyaswint"],["Notion","노션 포트폴리오",ht]],Dt={dark:{color:"#e3eeff",glowColor:"#4d8dff"},light:{color:"#1d4ed8",glowColor:"#3b82f6"}};function Gt(){const t=document.createElement("canvas");t.width=1400,t.height=1100;const r=t.getContext("2d");r.font='900 440px Pretendard, "Noto Sans KR", "Arial Black", system-ui, sans-serif',r.textAlign="center",r.textBaseline="middle",r.fillStyle=r.strokeStyle="#000",r.lineJoin="round",r.lineWidth=10,[["PORT",300],["FOLIO",780]].forEach(([e,s])=>{r.fillText(e,700,s),r.strokeText(e,700,s)});const a=document.createElement("canvas");a.width=t.width,a.height=t.height;const l=a.getContext("2d");l.filter="blur(12px)",l.drawImage(t,0,0);const i=l.getImageData(0,0,a.width,a.height),n=i.data;for(let e=3;e<n.length;e+=4)n[e]=n[e]>128?255:0;return l.putImageData(i,0,0),a.toDataURL("image/png")}function qt({words:t}){const[r,a]=te(ne?t[0]:"");return V(()=>{if(ne)return;let l=0,i=0,n=!1,e;const s=()=>{const c=t[l];i+=n?-1:1,a(c.slice(0,i));let d=n?45:110+Math.random()*60;!n&&i===c.length?(n=!0,d=l===0?2600:1600):n&&i===0&&(n=!1,l=(l+1)%t.length,d=400),e=setTimeout(s,d)};return e=setTimeout(s,700),()=>clearTimeout(e)},[t]),m(He,{children:[o("span",{"aria-label":t[0],children:r}),o("span",{className:"caret","aria-hidden":"true",children:"|"})]})}function $t({theme:t}){const[r,a]=te(null);return V(()=>{let l=!0;return(document.fonts?document.fonts.ready:Promise.resolve()).then(()=>l&&a(Gt())),()=>{l=!1}},[]),m("section",{id:"hero",children:[o("div",{id:"electric",children:r&&o(Ot,{src:r,scale:.9,strands:3,bend:.25,crackle:.9,arcs:1,speed:1.6,intensity:1,glow:.5,thickness:1.5,flicker:.3,fill:0,interactive:!0,cursorIntensity:.75,cursorRadius:100,theme:t,...Dt[t]})}),m("div",{className:"hero-copy",children:[m("h1",{children:["안녕하세요",o("br",{}),o("span",{className:"typed-line",children:o(qt,{words:Ht})}),"개발자 양원우입니다"]}),o("p",{children:"경북소프트웨어마이스터고 · Backend Developer"})]}),m("div",{className:"scroll-hint",children:["SCROLL",o("i",{})]})]})}function je(t,r=0,a=[]){const l="  ".repeat(r),i=n=>a.push([n,"j-p"]);if(Array.isArray(t))i(`[
`),t.forEach((n,e)=>{a.push([l+"  ",""]),je(n,r+1,a),i(e<t.length-1?`,
`:`
`)}),i(l+"]");else if(t&&typeof t=="object"){const n=Object.keys(t);i(`{
`),n.forEach((e,s)=>{a.push([l+"  ",""]),a.push([`"${e}"`,"j-k"]),i(": "),je(t[e],r+1,a),i(s<n.length-1?`,
`:`
`)}),i(l+"}")}else a.push([typeof t=="string"?`"${t}"`:String(t),typeof t=="string"?"j-s":"j-n"]);return a}const lt=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;"),st=t=>t.reduce((r,[a])=>r+a.length,0),Oe=je(Me),Ut=zt.flatMap(([t,r],a)=>a===0?[[t+" ","j-k"],[r,"j-n"],[`
`,""]]:[[t,"j-k"],[": ","j-p"],[r,"j-s"],[`
`,""]]),Xt={body:Oe,headers:Ut};function we(t,r,a){let l="",i="",n=r;for(const[e,s]of t){if(n<=0)break;const c=e.slice(0,n);n-=c.length,c.split(`
`).forEach((d,u)=>{u>0&&(l+=`<span class="l">${i||" "}</span>`,i=""),d&&(i+=s?`<span class="${s}">${lt(d)}</span>`:lt(d))})}return l+`<span class="l">${i}${a?'<span class="j-caret"></span>':""}</span>`}const Re='<span class="api-empty"><span>↗ <b>Send</b>를 눌러 요청을 보내면<br>여기에 응답이 표시됩니다.</span></span>',_t={cls:"api-status idle",html:"<b>대기 중</b> · 응답 없음"};function Yt(){const[t,r]=te("body"),[a,l]=te(!1),[i,n]=te(Re),[e,s]=te(_t),c=Y(null),d=Y(0);dt(()=>{const g=c.current;g.innerHTML=we(Oe,st(Oe)),g.style.minHeight=g.offsetHeight+"px",g.innerHTML=Re},[]),V(()=>()=>{d.current++},[]);function u(g){const w=++d.current,R=Xt[g],T=st(R);if(ne){n(we(R,T));return}s({cls:"api-status loading",html:"<b>Sending…</b>"}),n(we(R,0,!0)),setTimeout(()=>{if(w!==d.current)return;const F=28+Math.floor(Math.random()*30);s({cls:"api-status",html:`<b>200 OK</b> · ${F} ms · ${(new Blob([JSON.stringify(Me)]).size/1024).toFixed(1)} KB`});const L=performance.now(),O=Math.min(1600,T*4.5);(function G(C){if(w!==d.current)return;const I=Math.min(1,(C-L)/O);n(we(R,Math.floor(T*I),I<1)),I<1&&requestAnimationFrame(G)})(L)},420)}const y=g=>{r(g),a?u(g):n(Re)};return m("div",{className:"api reveal d2",id:"api",children:[m("div",{className:"api-bar",children:[o("i",{}),o("i",{}),o("i",{}),o("span",{children:"wonu-api — about"})]}),m("div",{className:"api-req",children:[o("span",{className:"method",children:"GET"}),m("div",{className:"url",children:["/api/v1/developers/",o("b",{children:"wonu"})]}),o(re,{sm:!0,className:a?"":"pulse",onClick:()=>{l(!0),u(t)},children:"Send"})]}),m("div",{className:"api-meta",children:[o("div",{className:"api-tabs",role:"tablist",children:[["body","Body"],["headers","Headers"]].map(([g,w])=>o("button",{role:"tab","aria-selected":t===g,onClick:()=>y(g),children:w},g))}),o("span",{className:e.cls,dangerouslySetInnerHTML:{__html:e.html}})]}),o("pre",{className:"api-body",ref:c,"aria-live":"polite",dangerouslySetInnerHTML:{__html:i}})]})}function Kt(){return o("section",{id:"about",children:m("div",{className:"wrap about",children:[m("div",{className:"about-intro",children:[o("div",{className:"eyebrow reveal",children:"/about"}),m("div",{className:"about-id reveal d1",children:[o("div",{className:"avatar",children:"사진"}),m("div",{children:[o("b",{children:"양원우"}),o("small",{children:"Backend Developer · 경북소프트웨어마이스터고"})]})]}),m("h3",{className:"reveal d1",children:["백엔드 개발자라서,",o("br",{}),o("em",{children:"API로"})," 소개합니다."]}),m("p",{className:"lead reveal d2",children:[o("code",{children:"Send"}),"를 눌러 저를 호출해 보세요. 응답이 곧 저예요. 팀원이 이런 걱정 저런 걱정을 하지 않도록, 유지보수하기 쉬운 코드를 먼저 생각합니다."]}),m("div",{className:"btns reveal d3",children:[o(re,{href:"#projects",children:"프로젝트 보기 →"}),o(re,{href:ht,target:"_blank",rel:"noopener",children:"노션 포트폴리오 ↗"})]})]}),o(Yt,{})]})})}function ft(){return m("svg",{className:"radar",viewBox:"0 0 200 200","aria-hidden":"true",children:[m("g",{className:"rg",children:[o("polygon",{points:"100.0,80.5 118.5,94.0 111.5,115.8 88.5,115.8 81.5,94.0"}),o("polygon",{points:"100.0,61.0 137.1,87.9 122.9,131.6 77.1,131.6 62.9,87.9"}),o("polygon",{points:"100.0,41.5 155.6,81.9 134.4,147.3 65.6,147.3 44.4,81.9"}),o("polygon",{points:"100.0,22.0 174.2,75.9 145.8,163.1 54.2,163.1 25.8,75.9"}),o("line",{x1:"100",y1:"100",x2:"100.0",y2:"22.0"}),o("line",{x1:"100",y1:"100",x2:"174.2",y2:"75.9"}),o("line",{x1:"100",y1:"100",x2:"145.8",y2:"163.1"}),o("line",{x1:"100",y1:"100",x2:"54.2",y2:"163.1"}),o("line",{x1:"100",y1:"100",x2:"25.8",y2:"75.9"})]}),o("polygon",{className:"rd",points:"100.0,32.9 150.4,83.6 142.2,158.1 71.6,139.1 42.1,81.2"})]})}const Ce=(t,r)=>({top:t.top+"px",left:t.left+"px",width:t.width+"px",height:t.height+"px",borderRadius:r+"px"});function Jt({source:t,onClosed:r}){const a=Y(null),l=Y(!1);dt(()=>{const e=a.current,s=t.getBoundingClientRect();Object.assign(e.style,Ce(s,24));const c={top:"0px",left:"0px",width:innerWidth+"px",height:innerHeight+"px",borderRadius:"0px"};e.animate([Ce(s,24),c],{duration:ne?1:650,easing:"cubic-bezier(.7,0,.2,1)",fill:"forwards"}).onfinish=()=>{Object.assign(e.style,{top:0,left:0,width:"100%",height:"100%",borderRadius:0}),e.classList.add("ready")}},[t]);const i=()=>{if(l.current)return;l.current=!0;const e=a.current;e.classList.remove("ready");const s=t.getBoundingClientRect();setTimeout(()=>{e.animate([{top:"0px",left:"0px",width:innerWidth+"px",height:innerHeight+"px",borderRadius:"0px"},Ce(s,24)],{duration:ne?1:550,easing:"cubic-bezier(.7,0,.2,1)",fill:"forwards"}).onfinish=r},200)};V(()=>{const e=s=>{s.key==="Escape"&&i()};return addEventListener("keydown",e),()=>removeEventListener("keydown",e)});const n=be;return Tt(o("div",{className:"detail",ref:a,children:m("div",{className:"scroller",children:[o(re,{sm:!0,className:"d-close",onClick:i,children:"닫기 ✕"}),m("div",{className:"d-hero",children:[o(ft,{}),m("div",{className:"wrap",children:[o("h2",{children:"Folio"}),o("p",{children:n.summary})]})]}),m("div",{className:"wrap d-body",children:[o("div",{className:"d-meta",children:n.meta.map(([e,s])=>m("div",{children:[e,o("b",{children:s})]},e))}),m("div",{className:"d-grid",children:[o("h6",{children:"개요"}),o("p",{children:n.overview}),o("h6",{children:"주요 기능"}),o("ul",{children:n.features.map(e=>o("li",{children:e},e))}),o("h6",{children:"동작 흐름"}),o("div",{className:"flow",children:n.flow.map(e=>o("span",{children:e},e))}),o("h6",{children:"내가 한 일"}),o("ul",{children:n.did.map(e=>o("li",{children:e},e))}),o("h6",{children:"트러블슈팅"}),o("div",{className:"trouble",children:n.trouble.map(([e,s])=>m("div",{children:[o("b",{children:e}),s]},e))}),o("h6",{children:"화면"}),m("div",{className:"shots",children:[o("div",{children:"스크린샷 1"}),o("div",{children:"스크린샷 2"}),o("div",{children:"스크린샷 3"})]}),o("h6",{children:"링크"}),o("div",{className:"btns",children:n.links.map(([e,s])=>o(re,{href:s,target:"_blank",rel:"noopener",children:e},s))})]})]})]})}),document.body)}const Pe=1800,Ie=1300,ct=(t,r)=>(t%r+r)%r;function Vt(){const t=Y(null),r=Y(null),a=Y(null),[l,i]=te(!1),n=Y(!1),e=()=>{n.current||(n.current=!0,ut(a.current),i(!0))},s=()=>{n.current=!1,i(!1)};return V(()=>(a.current.style.visibility=l?"hidden":"",document.body.style.overflow=l?"hidden":"",()=>{document.body.style.overflow=""}),[l]),V(()=>{const c=t.current,d=[...c.querySelectorAll(".item")].map(p=>({el:p,x:+p.dataset.x,y:+p.dataset.y,w:0,h:0}));let u={x:0,y:0},y={x:0,y:0},g=!1,w=0,R=null,T=0,F=1,L=1,O=1,G=!0,C=0,I=null;function K(){const p=c.clientWidth,h=c.clientHeight,v=Math.min((p-80)/1200,(h-170)/800);F=L=O=Math.max(.5,Math.min(1.1,v)),p<700&&(F=Math.max(.24,(p-80)/1200),O=Math.max(.5,Math.min(.62,p/640)),L=Math.max(.5,Math.min(1,(h-170)/800))),d.forEach(f=>{f.w=f.el.offsetWidth,f.h=f.el.offsetHeight})}function ie(){const p=Math.max(-6,Math.min(6,y.x*.35)),h=Pe*F,v=Ie*L;for(const f of d){const A=ct(f.x*F+u.x+h/2,h)-h/2,W=ct(f.y*L+u.y+v/2,v)-v/2;f.el.style.transform=`translate(${A-f.w/2}px, ${W-f.h/2}px) scale(${O}) rotate(${p*.5}deg)`}c.style.backgroundPosition=`${u.x}px ${u.y}px`}function S(){G&&(g||(u.x+=y.x,u.y+=y.y,y.x*=.94,y.y*=.94,Math.abs(y.x)<.02&&Math.abs(y.y)<.02&&(y.x=y.y=0)),ie(),C=requestAnimationFrame(S))}function j(p,h){if(I&&I!==p&&(I.classList.remove("hov"),I.style.removeProperty("--rx"),I.style.removeProperty("--ry")),I=p,c.classList.toggle("has-hov",!!p),!p)return;p.classList.add("hov");const v=p.getBoundingClientRect(),f=(h.clientX-v.left)/v.width,A=(h.clientY-v.top)/v.height;p.style.setProperty("--cx",(f*100).toFixed(1)+"%"),p.style.setProperty("--cy",(A*100).toFixed(1)+"%"),ne||(p.style.setProperty("--ry",((f-.5)*12).toFixed(2)+"deg"),p.style.setProperty("--rx",((.5-A)*10).toFixed(2)+"deg"))}const b=p=>{p.target.closest("button")||(j(null),g=!0,w=0,R={x:p.clientX,y:p.clientY},T=performance.now(),y={x:0,y:0},c.setPointerCapture(p.pointerId),c.classList.add("dragging"))},z=p=>{!g&&p.pointerType==="mouse"&&j(p.target.closest(".card"),p)},ee=p=>{if(!g)return;const h=p.clientX-R.x,v=p.clientY-R.y,f=performance.now(),A=Math.max(1,f-T);u.x+=h,u.y+=v,w+=Math.abs(h)+Math.abs(v),y={x:h/A*16,y:v/A*16},R={x:p.clientX,y:p.clientY},T=f,w>30&&r.current&&(r.current.style.opacity=0)},B=p=>{g&&(g=!1,c.classList.remove("dragging"),performance.now()-T>80&&(y={x:0,y:0}),w<6&&document.elementsFromPoint(p.clientX,p.clientY).find(v=>v===a.current)&&e())},U=()=>{g=!1,c.classList.remove("dragging")},X=p=>{const h={ArrowLeft:[1,0],ArrowRight:[-1,0],ArrowUp:[0,1],ArrowDown:[0,-1]}[p.key];h&&(p.preventDefault(),y.x+=h[0]*6,y.y+=h[1]*6)},Q=()=>{const p={...u},h=performance.now();y={x:0,y:0};const v=Math.round(p.x/(Pe*F))*Pe*F,f=Math.round(p.y/(Ie*L))*Ie*L;(function A(W){if(!G)return;const P=Math.min(1,(W-h)/700),D=1-Math.pow(1-P,4);u.x=p.x+(v-p.x)*D,u.y=p.y+(f-p.y)*D,P<1&&requestAnimationFrame(A)})(h)};c.addEventListener("pointerdown",b),c.addEventListener("pointermove",z),c.addEventListener("pointermove",ee),c.addEventListener("pointerleave",()=>j(null)),c.addEventListener("pointerup",B),c.addEventListener("pointercancel",U),c.addEventListener("keydown",X);const k=c.querySelector("#centerBtn");return k.addEventListener("click",Q),addEventListener("resize",K),(document.fonts?document.fonts.ready:Promise.resolve()).then(()=>{G&&(K(),C=requestAnimationFrame(S))}),()=>{G=!1,cancelAnimationFrame(C),c.removeEventListener("pointerdown",b),c.removeEventListener("pointermove",z),c.removeEventListener("pointermove",ee),c.removeEventListener("pointerup",B),c.removeEventListener("pointercancel",U),c.removeEventListener("keydown",X),k.removeEventListener("click",Q),removeEventListener("resize",K)}},[]),m("section",{id:"projects",children:[m("div",{className:"wrap",children:[o("div",{className:"eyebrow reveal",children:"/projects"}),o("h2",{className:"sec reveal d1",children:"만든 것들"})]}),m("div",{className:"stage",ref:t,tabIndex:0,"aria-label":"프로젝트 캔버스. 드래그하거나 방향키로 이동",children:[Bt.map(c=>o("div",{className:"item","data-x":c.x,"data-y":c.y,children:c.main?m("article",{className:"card feature",id:"folioCard",ref:a,role:"button",tabIndex:0,"aria-label":"Folio 상세 보기",onKeyDown:d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),e())},children:[m("div",{className:"thumb",children:[o("div",{className:"rep-tag",children:"PORTFOLIO REPORT"}),m("div",{className:"rep-bars",children:[o("i",{style:{"--w":"82%"}}),o("i",{style:{"--w":"64%"}}),o("i",{style:{"--w":"73%"}})]}),o(ft,{}),o("span",{children:"Folio"})]}),m("div",{className:"meta",children:[m("div",{children:[o("h4",{children:"Folio"}),m("p",{children:[be.summary," · ",be.period]}),o("div",{className:"tags",children:be.tags.map(d=>o("span",{className:"tag",children:d},d))})]}),o("span",{className:"open",children:"자세히 →"})]})]}):m("div",{className:"card sub",children:[o("h5",{children:c.name}),o("div",{className:"tags",children:c.tags.map(d=>o("span",{className:"tag",children:d},d))})]})},c.name)),m("div",{className:"stage-ui",children:[o("span",{className:"hint",ref:r,children:"드래그해서 이동 · 끝없이 이어져요"}),o(re,{sm:!0,id:"centerBtn",children:"가운데로"})]})]}),l&&o(Jt,{source:a.current,onClosed:s})]})}const Qt=()=>o("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.4",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:o("path",{d:"M6 9l6 6 6-6"})});function Zt(){const t=it.flatMap(n=>n.items),[r,a]=te(new Set([t.length])),l=n=>a(e=>{const s=new Set(e);return s.has(n)?s.delete(n):s.add(n),s});let i=t.length+1;return o("section",{id:"career",children:m("div",{className:"wrap",children:[o("div",{className:"eyebrow reveal",children:"/career"}),o("h2",{className:"sec reveal d1",children:"지나온 기록"}),o("div",{className:"yt",children:it.map(n=>m(Mt,{children:[m("div",{className:"yt-year",children:[o("h3",{children:n.year}),m("span",{children:[n.items.length," ",n.items.length>1?"records":"record"]})]}),n.items.map(e=>{const s=--i,c=r.has(s);return m("div",{className:`yt-item${c?" open":""}`,children:[m("button",{className:"yt-head","aria-expanded":c,onClick:()=>l(s),children:[o("span",{className:"yt-no",children:String(s).padStart(2,"0")}),o("span",{className:"yt-title",children:e.title}),o("span",{className:"yt-chev",children:o(Qt,{})})]}),o("div",{className:"yt-body",children:o("div",{children:m("div",{className:"yt-panel",children:[o("div",{className:"yt-meta",children:e.meta.map((d,u)=>m("span",{children:[u>0&&m(He,{children:[" ",o("i",{children:"•"})," "]}),d]},u))}),e.text&&o("p",{children:e.text}),o("div",{className:"yt-status",children:e.status.map(([d,u])=>o("span",{className:u?"hl":"",children:d},d))})]})})})]},e.title)})]},n.year))})]})})}function en(){const[t,r]=te("주소 복사"),a=Y(null),l=e=>{r(e),setTimeout(()=>r("주소 복사"),1800)},i=()=>{const e=document.createRange();e.selectNodeContents(a.current);const s=getSelection();s.removeAllRanges(),s.addRange(e),l("선택됨 · 복사해서 쓰세요")},n=()=>{const e=Me.contact.email;navigator.clipboard?navigator.clipboard.writeText(e).then(()=>l("복사됨"),i):i()};return o("section",{id:"contact",children:m("div",{className:"wrap",children:[o("div",{className:"eyebrow reveal",children:"/contact"}),o("h2",{className:"sec reveal d1",children:"연락하기"}),m("div",{className:"mail-row reveal d1",children:[o("span",{className:"mail",ref:a,children:Me.contact.email}),o(re,{onClick:n,children:t})]}),o("ul",{className:"links reveal d2",children:Wt.map(([e,s,c])=>o("li",{children:m("a",{href:c,target:"_blank",rel:"noopener",children:[o("b",{children:e}),o("span",{children:s}),o("em",{children:"↗"})]})},e))})]})})}function tn(){const t=document.documentElement,[r,a]=te(t.dataset.theme),l=kt(i=>{const n=t.dataset.theme==="dark"?"light":"dark",e=()=>{t.dataset.theme=n,a(n);try{localStorage.setItem("theme",n)}catch{}};if(!document.startViewTransition||ne)return e();const s=i.clientX,c=i.clientY,d=Math.hypot(Math.max(s,innerWidth-s),Math.max(c,innerHeight-c));document.startViewTransition(e).ready.then(()=>{t.animate({clipPath:[`circle(0 at ${s}px ${c}px)`,`circle(${d}px at ${s}px ${c}px)`]},{duration:650,easing:"cubic-bezier(.2,.8,.2,1)",pseudoElement:"::view-transition-new(root)"})})},[t]);return[r,l]}function nn(){V(()=>{let t=-9999,r=-9999,a=!1;const l=()=>{a=!1,document.querySelectorAll(".sbtn").forEach(e=>{const s=e.getBoundingClientRect();if(s.bottom<-200||s.top>innerHeight+200)return;const c=s.left+s.width/2,d=s.top+s.height/2,u=Math.max(s.left-t,0,t-s.right),y=Math.max(s.top-r,0,r-s.bottom),g=Math.max(0,1-Math.hypot(u,y)/260),w=g*g*(3-2*g);e.style.setProperty("--ang",Math.atan2(t-c,-(r-d))*180/Math.PI-14+"deg"),e.style.setProperty("--b",w.toFixed(3)),e.style.setProperty("--mx",t-s.left+"px"),e.style.setProperty("--my",r-s.top+"px")})},i=()=>{a||(a=!0,requestAnimationFrame(l))},n=e=>{t=e.clientX,r=e.clientY,i()};return addEventListener("pointermove",n,{passive:!0}),addEventListener("scroll",i,{passive:!0}),()=>{removeEventListener("pointermove",n),removeEventListener("scroll",i)}},[])}function on(){V(()=>{const t=new IntersectionObserver(r=>r.forEach(a=>{a.isIntersecting&&(a.target.classList.add("in"),t.unobserve(a.target))}),{threshold:.15});return document.querySelectorAll(".reveal").forEach(r=>t.observe(r)),()=>t.disconnect()},[])}function an(){const[t,r]=tn();return nn(),on(),m(He,{children:[o(Lt,{theme:t,onToggle:r}),m("main",{children:[o($t,{theme:t}),o(Kt,{}),o(Vt,{}),o(Zt,{}),o(en,{}),o("footer",{children:"© 2026 양원우"})]})]})}let mt=null;try{mt=localStorage.getItem("theme")}catch{}document.documentElement.dataset.theme=mt||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");bt(document.getElementById("root")).render(o(an,{}));
