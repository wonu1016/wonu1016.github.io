# 양원우 포트폴리오 (Vite + React)

```
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # dist/ 로 빌드
```

## GitHub Pages 배포
현재 Pages는 `main` 브랜치의 루트(`/`)를 게시합니다. `index.source.html`이 Vite 입력 원본이고, 루트의 `index.html`과 `assets/`는 게시용 빌드 결과입니다.

1. `npm run build` (prebuild가 원본 HTML을 복사해 이전 번들 재빌드를 방지)
2. `cp dist/index.html index.html && cp -R dist/assets/. assets/`
3. 소스와 게시용 파일을 함께 `main`에 push

`.github/workflows/deploy.yml`은 Actions 빌드도 수행하지만, Pages 설정을 GitHub Actions로 바꾸기 전까지 실제 게시 소스는 `main` 브랜치입니다.

## 내용 수정
- 소개/수상/프로젝트/링크 글: `src/data.js`
- 기술 설명: `src/data.js`의 `SKILLS`, 화면 구성은 `src/components/Skills.jsx`
- 색·크기·애니메이션: `src/styles.css` (맨 위 `:root` 토큰)
- 번개 히어로: `src/components/Hero.jsx` 의 ElectricLogo 옵션

## 라이선스
`src/components/ElectricLogo.jsx` 는 React Bits (MIT + Commons Clause, © David Haz).
저작권 주석을 지우지 말고, 컴포넌트 자체를 재배포/판매하지 마세요. 전문은 `ELECTRIC_LOGO_LICENSE.md`.
