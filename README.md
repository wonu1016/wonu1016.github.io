# 양원우 포트폴리오

https://wonu1016.github.io

- `app/` : React(Vite) 소스
- `index.html`, `assets/app.js` : 배포되는 사이트 (GitHub Pages가 그대로 서비스)
- React, ogl 은 `index.html` 의 importmap으로 CDN(esm.sh)에서 불러옵니다.
- 스타일은 `app/src/styles.css` 원본을 그대로 씁니다.

## 수정하고 배포하기
```
cd app
npm install
npm run dev       # 로컬 확인 (http://localhost:5173)
npm run deploy    # ../assets/app.js 갱신
```
그다음 커밋하고 push 하면 1~2분 뒤 사이트에 반영돼요.
글(소개, 수상, 프로젝트, 링크)은 `app/src/data.js` 에 모여 있어요.

`app/src/components/ElectricLogo.jsx` 는 React Bits 컴포넌트입니다 (MIT + Commons Clause, © David Haz). `app/ELECTRIC_LOGO_LICENSE.md` 참고.
