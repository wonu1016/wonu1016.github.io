export const NOTION = 'https://app.notion.com/p/wonu-portfolio/0a97ea1e118183969d1781d77d7c3dce';

export const TYPED_WORDS = ['걱정시키지 않는', '소통을 중시하는', '사용자를 생각하는']; // 첫 문구가 메인

export const PROFILE = {
  name: '양원우',
  role: 'Backend Developer',
  school: '경북소프트웨어마이스터고등학교',
  since: 2025,
  motto: '팀원이 걱정하지 않는 개발',
  values: ['유지보수가 쉬운 SW', '사용자의 입장을 먼저', '사회 문제를 해결하는 프로젝트'],
  learning: ['Spring Boot', 'MariaDB'],
  awards: 6,
  contact: { email: 'anyaswint@gmail.com', github: 'wonu1016' }
};

export const HEADERS = [
  ['HTTP/1.1', '200 OK'], ['Content-Type', 'application/json; charset=utf-8'],
  ['X-Developer', 'wonu'], ['X-Motto', 'worry-free'], ['X-Response-Time', '38ms']
];

// x, y: 캔버스 좌표. main 이 true 면 Folio 카드(클릭하면 상세 화면으로 확대)
export const PROJECTS = [
  { name: 'Folio', main: true, x: 0, y: -80 },
  { name: 'Reply', x: -470, y: -300, tags: ['FastAPI', 'Chrome Ext'] },
  { name: 'ToneMate', x: 470, y: -310, tags: ['Flutter', 'Spring Boot', 'WebSocket'] },
  { name: 'ExportNavi', x: -470, y: 180, tags: ['Spring Boot', 'MySQL', 'React'] },
  { name: 'Aketch', x: 470, y: 170, tags: ['React', 'Spring Boot', 'MySQL'] },
  { name: 'capteam', x: 0, y: 330, tags: ['React', 'Node.js'] }
];

export const FOLIO = {
  tags: ['Node.js', 'FastAPI', 'React', '팀 AI 협업'],
  summary: 'AI 포트폴리오 분석 서비스',
  period: '2026.01 – 04',
  meta: [['기간', '2026.01.06 – 04.16'], ['팀', 'FE 1 · BE 1 · AI 1'], ['역할', 'Backend'], ['구분', '교내 방학 프로젝트']],
  overview: '포트폴리오를 잘 썼는지 판단할 명확한 기준이 없다는 문제에서 출발해, 자체 기준으로 분석하고 피드백을 주는 서비스를 만들었습니다.',
  features: ['PDF·이미지 업로드 후 AI OCR로 텍스트 추출', '직무별 적합도 점수와 강점·약점 분석', '맞춤 기업 추천, 3·6개월 커리어 로드맵', '레이더·바 차트로 역량 시각화'],
  flow: ['파일 업로드', 'OCR 엔진', 'Layout 엔진', 'Semantic 엔진', 'Consulting 엔진', '리포트 시각화'],
  did: ['REST API 엔드포인트와 Request/Response 스키마 설계', 'JWT 기반 회원가입·로그인, 프로필 API', '팀 AI 담당자와 연결되는 백엔드 API 및 인증 흐름 구현'],
  trouble: [
    ['문제', 'AI 서버와 인증 서버 주소가 하드코딩되어 있고 FastAPI 실행 포트가 불명확해 요청이 연결되지 않음'],
    ['해결', '서버별 포트를 명확히 분리하고 .env로 로컬/배포 주소를 나눠 관리'],
    ['배운 점', 'JWT 인증 흐름과 인메모리 저장의 한계 — 실제 서비스엔 영속 DB 연동이 필수']
  ],
  links: [['GitHub ↗', 'https://github.com/Folio-Ai-project'], ['시연 영상 ↗', 'https://www.youtube.com/watch?v=3BeM9U-I2O4']]
};

export const PROJECT_DETAILS = {
  Reply: {
    summary: '유튜브 댓글 AI 필터링 크롬 확장 프로그램',
    meta: [['기간', '2025'], ['역할', 'Backend'], ['구분', '팀 프로젝트']],
    overview: '악성 댓글을 사용자가 안전하게 볼 수 있도록 댓글을 분석하고, 결과에 따라 숨김·순화·원문 표시를 제공하는 프로젝트입니다.',
    tags: ['FastAPI', 'Chrome Extension'],
    points: ['유튜브 댓글 데이터를 JSON으로 받아 처리하는 REST API 설계', '댓글 분석 결과를 크롬 확장 프로그램에 전달하는 백엔드 로직 구현', '빨강·노랑·초록 단계에 따른 댓글 표시 흐름 구성'],
    note: 'AI 모델과 크롬 확장 프로그램을 포함한 팀 프로젝트이며, 개인 담당은 FastAPI 기반 백엔드와 API 구조입니다.',
    links: [['GitHub ↗', 'https://github.com/wonu1016/Reply']]
  },
  ToneMate: {
    summary: '실시간 소통을 중심으로 한 팀 프로젝트',
    meta: [['역할', 'Team project'], ['정리 상태', '간단 정리']],
    overview: 'Flutter 클라이언트와 Spring Boot 서버, WebSocket 통신을 활용해 실시간 상호작용을 구현한 프로젝트입니다.',
    tags: ['Flutter', 'Spring Boot', 'WebSocket'],
    points: ['모바일 클라이언트와 서버 간 실시간 통신 구조 사용', 'WebSocket 기반 이벤트 흐름을 중심으로 기능 구성'],
    note: '현재는 프로젝트 개요와 사용 기술만 정리했습니다. 개인 담당 범위는 자료 확인 후 보완할 예정입니다.'
  },
  ExportNavi: {
    summary: '수출입 업무를 돕는 웹 서비스',
    meta: [['역할', 'Team project'], ['정리 상태', '간단 정리']],
    overview: 'React 화면과 Spring Boot 서버, MySQL 데이터베이스를 연결해 업무 정보를 관리하는 프로젝트입니다.',
    tags: ['Spring Boot', 'MySQL', 'React'],
    points: ['프론트엔드와 백엔드 API 연동 구조 사용', '관계형 데이터베이스 기반 정보 관리 흐름 구성'],
    note: '팀 프로젝트의 전체 기술 구성과 프로젝트 방향을 우선 정리했습니다.'
  },
  Aketch: {
    summary: '웹 기반 서비스 제작 팀 프로젝트',
    meta: [['역할', 'Team project'], ['정리 상태', '간단 정리']],
    overview: 'React 클라이언트와 Spring Boot 서버, MySQL을 사용하는 웹 프로젝트입니다.',
    tags: ['React', 'Spring Boot', 'MySQL'],
    points: ['웹 클라이언트와 서버 API 연결', 'MySQL 기반 데이터 저장 구조 사용'],
    note: '개인 담당 범위는 프로젝트 자료를 확인한 뒤 세부 내용을 보완할 예정입니다.'
  },
  capteam: {
    summary: '팀 협업으로 제작한 웹 프로젝트',
    meta: [['역할', 'Team project'], ['정리 상태', '간단 정리']],
    overview: 'React와 Node.js를 사용해 팀 단위로 제작한 웹 프로젝트입니다.',
    tags: ['React', 'Node.js'],
    points: ['React 기반 화면 구성', 'Node.js 서버와 클라이언트 연결'],
    note: '현재는 프로젝트 개요와 사용 기술만 정리했습니다.'
  }
};

// no 는 아래에서 자동으로 매겨집니다 (아래에서 위로 1, 2, 3 …)
export const CAREER = [
  { year: '2026', items: [
    { title: '2026 1학기 캡스톤 프로젝트 — 대상', meta: ['2026.07.16', '경북소프트웨어마이스터고'], status: [['대상 (1위)', 1]] },
    { title: '교내 해커톤 프로젝트 — UI/UX상', meta: ['2026.07.14', '경북소프트웨어마이스터고'], status: [['UI/UX상', 1]] },
    { title: '장애인날 기념 2026 코딩 발명 아이디어·에세이 경진대회', meta: ['2026.04.18', '행복일자리운동본부'], text: '장애인을 위한 맞춤 가이드 아이디어로 참가.', status: [['장려상', 1]] },
    { title: '교내 방학 프로젝트 — 4등', meta: ['2026.03.13', '경북소프트웨어마이스터고'], status: [['4등', 1]] },
    { title: '2026 AI EXPO 출품', meta: ['2026'], text: 'AI EXPO 출품작 제작에 참여.', status: [['출품', 0]] }
  ] },
  { year: '2025', items: [
    { title: '레벨 업 프로젝트 — 3등', meta: ['2025.12.01', '경북소프트웨어마이스터고'], status: [['3등', 1]] },
    { title: '2025 SOFT WAVE 출품', meta: ['2025'], text: 'SOFT WAVE 출품작 제작에 참여.', status: [['출품', 0]] },
    { title: '알고리즘 테스트 — 7등', meta: ['2025.06.12', '경북소프트웨어마이스터고'], status: [['7등', 1]] },
    { title: '웹 개발 동아리 WINE — 백엔드', meta: ['2025.03.19 ~', '교내 개발 동아리'], text: '동아리 프로젝트에서 백엔드를 담당.', status: [['활동 중', 0]] },
    { title: '체육 동아리 체육부', meta: ['2025.03.19 ~', '교내 체육 학생부'], status: [['활동 중', 0]] },
    { title: '경북소프트웨어마이스터고등학교 입학', meta: ['2025.03 ~'], status: [['재학 중', 0]] }
  ] },
  { year: 'CERTIFICATION', items: [
    { title: 'ITQ — PowerPoint · Excel', meta: ['자격증'], status: [['PowerPoint', 0], ['Excel', 0]] }
  ] }
];

export const LINKS = [
  ['GitHub', 'wonu1016', 'https://github.com/wonu1016'],
  ['velog', '@anyaswint', 'https://velog.io/@anyaswint/posts'],
  ['Linktree', 'anyaswint', 'https://linktr.ee/anyaswint'],
  ['Notion', '노션 포트폴리오', NOTION]
];
