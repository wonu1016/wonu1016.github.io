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

// 노션 Skill stack의 상세 설명과 실제 프로젝트에서 맡은 범위를 기준으로 작성.
export const SKILLS = [
  {
    name: 'Spring Boot', category: 'MAIN BACKEND', featured: true,
    summary: 'REST API를 설계하고, 인증부터 데이터 저장·실시간 통신까지 서버 기능을 구현할 수 있습니다.',
    abilities: [
      'JPA 기반 ORM 설계와 데이터베이스 연동, Gradle 빌드·의존성 관리',
      'Spring Security·JWT 인증/인가와 Google OAuth 2.0 소셜 로그인',
      'WebSocket 양방향 통신, 유효성 검증·예외 처리, Redis·이메일·파일 업로드 연동'
    ],
    source: 'https://app.notion.com/p/3747ea1e11818074aee1d550c2adc6d5'
  },
  {
    name: 'Java', category: 'LANGUAGE',
    summary: '객체지향 원칙을 적용해 확장 가능한 서버 코드를 작성합니다.',
    abilities: [
      '클래스·인터페이스·추상 클래스를 활용한 구조 설계',
      '예외 처리·제네릭·컬렉션·Stream API를 활용한 데이터 처리',
      '멀티스레드, JVM 메모리 구조와 GC의 기본 개념 이해'
    ],
    source: 'https://app.notion.com/p/3747ea1e118180a5975be68a106f1de6'
  },
  {
    name: 'Node.js', category: 'BACKEND',
    summary: '서버의 기본 구조를 이해하고, 데이터베이스와 연결해 조회·저장 기능을 구현할 수 있습니다.',
    abilities: ['서버 애플리케이션 구조 구성', 'DB 연결 설정과 기본 조회·저장 기능 구현'],
    source: 'https://app.notion.com/p/3747ea1e118180fab528ecca3c061481'
  },
  {
    name: 'FastAPI', category: 'BACKEND · TEAM PROJECT',
    summary: '팀 프로젝트에서 API 구조와 인증 흐름을 맡아 AI 담당자의 기능을 서비스에 연결했습니다.',
    abilities: ['요청·응답 스키마와 REST API 엔드포인트 설계', 'JWT 인증 및 외부 서비스 연동'],
    note: 'AI 모델·OpenAI 기능 자체는 담당하지 않았습니다.'
  },
  {
    name: 'React · JavaScript', category: 'FRONTEND',
    summary: '컴포넌트로 화면을 구성하고 백엔드 API와 연결하는 웹 개발을 경험했습니다.',
    abilities: ['컴포넌트 기반 UI 구성', '사용자 입력과 API 응답을 화면 상태에 반영'],
    note: '현재 포트폴리오 사이트도 React로 제작했습니다.'
  }
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
  cover: './images/folio/cover.png',
  screenshots: [
    { src: './images/folio/home.png', title: '포트폴리오 업로드 · 분석 시작' },
    { src: './images/folio/report.png', title: '역량 분석 리포트' },
    { src: './images/folio/recommendations.png', title: '맞춤 기업 추천' },
    { src: './images/folio/roadmap.png', title: '커리어 로드맵' }
  ],
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
    meta: [['기간', '2025'], ['역할', 'FastAPI 백엔드'], ['구분', '팀 프로젝트']],
    overview: '유튜브 댓글을 실시간에 가깝게 확인하면서 악성·불쾌한 표현을 구분할 수 있도록 돕는 크롬 확장 프로그램입니다. 사용자는 댓글을 모두 직접 읽지 않아도 위험도에 따라 댓글을 숨기거나, 순화된 표현으로 확인하거나, 원문을 선택해서 볼 수 있습니다.',
    tags: ['FastAPI', 'Chrome Extension'],
    points: ['크롬 확장 프로그램에서 전달받은 댓글 데이터를 JSON 요청으로 처리하는 REST API 설계', '프론트엔드가 사용하기 쉬운 응답 구조를 정의하고 댓글별 판정 결과를 반환', '위험도에 따라 빨강·노랑·초록 단계로 구분해 화면에 표시하는 흐름 구성', '분석 기능과 화면 기능을 분리해 팀원 간 API 연동이 가능하도록 구조화'],
    note: 'AI 모델과 크롬 확장 프로그램을 포함한 팀 프로젝트입니다. 본인은 FastAPI 기반 백엔드와 API 구조를 담당했으며, AI 모델 자체를 구현한 프로젝트는 아닙니다.',
    links: [['GitHub ↗', 'https://github.com/wonu1016/Reply']]
  },
  ToneMate: {
    summary: '실시간 소통을 중심으로 한 모바일 서비스',
    meta: [['플랫폼', 'Mobile'], ['구성', 'Flutter · Spring Boot'], ['구분', '팀 프로젝트']],
    overview: '사용자 간의 상태와 메시지를 빠르게 주고받을 수 있도록 구성한 실시간 소통 서비스입니다. Flutter 앱에서 발생한 이벤트를 Spring Boot 서버가 전달하고, WebSocket 연결을 통해 화면을 새로고침하지 않아도 변경 사항을 반영하는 것을 목표로 했습니다.',
    tags: ['Flutter', 'Spring Boot', 'WebSocket'],
    points: ['Flutter 클라이언트에서 사용자 입력과 화면 상태를 관리하는 구조 구성', 'Spring Boot 서버를 중심으로 클라이언트 요청과 응답 흐름 연결', 'WebSocket 기반 양방향 통신으로 실시간 이벤트 전달', '연결 상태와 이벤트 순서를 고려해 서비스 흐름을 설계'],
    note: '모바일 클라이언트와 서버를 함께 구성한 팀 프로젝트입니다. 발표에서는 “새로고침 없이 변경 사항을 전달하는 실시간 통신 구조”를 핵심으로 설명하면 좋습니다.'
  },
  ExportNavi: {
    summary: '수출입 업무를 돕는 정보 관리 웹 서비스',
    meta: [['플랫폼', 'Web'], ['구성', 'React · Spring Boot'], ['구분', '팀 프로젝트']],
    overview: '수출입 과정에서 필요한 정보를 한곳에서 확인하고 관리할 수 있도록 만든 웹 서비스입니다. React 기반 화면에서 사용자가 데이터를 입력하고, Spring Boot 서버가 요청을 처리한 뒤 MySQL에 저장하는 전형적인 웹 서비스 구조를 사용합니다.',
    tags: ['Spring Boot', 'MySQL', 'React'],
    points: ['React 화면에서 업무 정보를 조회·입력할 수 있는 사용자 흐름 구성', '프론트엔드 요청을 Spring Boot API와 연결하는 구조 사용', 'MySQL에 업무 데이터를 저장하고 다시 조회하는 데이터 흐름 구성', '화면·서버·데이터베이스를 분리해 기능별로 관리할 수 있도록 설계'],
    note: '팀 프로젝트의 전체 구조를 기준으로 정리했습니다. 발표에서는 “업무 데이터를 화면에서 입력하고 서버와 DB를 거쳐 관리하는 흐름”을 중심으로 설명하면 됩니다.'
  },
  Aketch: {
    summary: 'React와 Spring Boot로 제작한 웹 서비스',
    meta: [['플랫폼', 'Web'], ['구성', 'React · Spring Boot · MySQL'], ['구분', '팀 프로젝트']],
    overview: '웹 화면과 서버 API, 데이터베이스를 연결해 사용자가 서비스를 이용할 수 있도록 구성한 팀 프로젝트입니다. 프론트엔드는 React로 사용자 화면을 제공하고, Spring Boot 서버는 비즈니스 로직과 데이터 처리를 담당합니다.',
    tags: ['React', 'Spring Boot', 'MySQL'],
    points: ['React 컴포넌트 단위로 화면을 구성하고 사용자 입력을 처리', 'Spring Boot API를 통해 프론트엔드와 서버 데이터를 연결', 'MySQL 기반으로 서비스 데이터를 저장하고 조회하는 구조 사용', '클라이언트와 서버의 책임을 나눠 협업하기 쉬운 형태로 구성'],
    note: '팀 프로젝트의 기술 구조와 서비스 제작 경험을 중심으로 정리했습니다. 세부 담당은 발표에서 실제 맡았던 기능에 맞춰 말하면 됩니다.'
  },
  capteam: {
    summary: 'React와 Node.js로 제작한 협업 웹 프로젝트',
    meta: [['플랫폼', 'Web'], ['구성', 'React · Node.js'], ['구분', '팀 프로젝트']],
    overview: '팀원들이 함께 사용하는 기능을 웹으로 구현하기 위해 React 클라이언트와 Node.js 서버를 연결한 프로젝트입니다. 화면에서 발생한 요청을 서버가 처리하고 필요한 데이터를 다시 전달하는 기본적인 웹 애플리케이션 흐름을 경험했습니다.',
    tags: ['React', 'Node.js'],
    points: ['React 컴포넌트를 활용해 화면과 사용자 인터랙션 구성', 'Node.js 서버에서 클라이언트 요청을 처리하는 API 흐름 사용', '프론트엔드와 백엔드 간 데이터 전달 구조를 팀원들과 조율', '기능을 나누어 개발하고 하나의 서비스로 통합하는 협업 경험'],
    note: '팀 협업과 웹 서비스 기본 구조를 보여주는 프로젝트입니다. 발표에서는 React와 Node.js를 연결하면서 얻은 협업·통합 경험을 강조하면 좋습니다.'
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
