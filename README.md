# 양원우 포트폴리오 (Vite + React)

```
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # dist/ 로 빌드
```

## GitHub Pages 배포
1. 이 폴더를 GitHub 저장소에 push (브랜치: main)
2. 저장소 Settings → Pages → Source 를 **GitHub Actions** 로 선택
3. push 할 때마다 `.github/workflows/deploy.yml` 이 자동으로 빌드·배포

## 내용 수정
- 소개/수상/프로젝트/링크 글: `src/data.js`
- 색·크기·애니메이션: `src/styles.css` (맨 위 `:root` 토큰)
- 번개 히어로: `src/components/Hero.jsx` 의 ElectricLogo 옵션

## 라이선스
`src/components/ElectricLogo.jsx` 는 React Bits (MIT + Commons Clause, © David Haz).
저작권 주석을 지우지 말고, 컴포넌트 자체를 재배포/판매하지 마세요. 전문은 `ELECTRIC_LOGO_LICENSE.md`.
