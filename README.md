# React OpenLayers 프로젝트

React + OpenLayers를 학습하기 위한 프로젝트입니다.

## 🚀 기술 스택

- **프론트엔드 프레임워크**: React 19
- **언어**: TypeScript
- **빌드 도구**: Vite
- **지도 라이브러리**: OpenLayers 10.6.1
- **상태 관리**: TanStack React Query
- **HTTP 클라이언트**: Axios
- **라우팅**: React Router DOM
- **스타일링**: Emotion React
- **테스트**: MSW (Mock Service Worker)

## 📁 프로젝트 구조

```
src/
├── app/                 # 애플리케이션 핵심
│   ├── providers/       # 컨텍스트 프로바이더
│   └── routes/          # 라우트 설정
├── entities/            # 비즈니스 엔티티
├── features/            # 기능 모듈
├── layouts/             # 레이아웃 컴포넌트
│   ├── MainLayout/      # 메인 페이지 레이아웃
│   └── MapLayout/       # 지도 전용 레이아웃
├── pages/               # 페이지 컴포넌트
│   ├── Home/            # 홈 페이지
│   ├── Map/             # OpenLayers 지도 페이지
│   └── NotFound/        # 404 페이지
├── shared/              # 공유 유틸리티
│   ├── api/             # API 설정
│   ├── config/          # 앱 설정
│   ├── lib/             # 서드파티 라이브러리 설정
│   ├── styles/          # 공유 스타일 및 색상
│   ├── types/           # TypeScript 타입 정의
│   └── ui/              # 재사용 가능한 UI 컴포넌트
└── mocks/               # MSW 모킹 핸들러
```

## 🛠️ 시작하기

### 사전 요구사항

- Node.js (18+ 권장)
- npm 또는 yarn

### 설치

1. 저장소를 클론합니다:

```bash
git clone <repository-url>
cd react-openlayers
```

2. 의존성을 설치합니다:

```bash
npm install
```

3. 개발 서버를 실행합니다:

```bash
npm run dev
```

4. 브라우저에서 `http://localhost:5173`으로 이동합니다

## 📚 문서

- [Notion 주소](https://www.notion.so/React-Openlayers-248f7ff1c3df803c8c07e07510ee9196?source=copy_link)
