# IS,ME (이즈미)

> 지금, 나를 돌아보는 시간

20~30대 청년의 생활·정서 상태를 탐색하는 사업 1단계 리서치 설문 PWA입니다.

## 주요 기능

- **오프라인 완전 지원** — 처음 한 번 접속 후 인터넷 없이 사용 가능
- **로컬 데이터 저장** — IndexedDB에 응답 저장 (접수일, 시간, 기기정보 포함)
- **Google Sheets 전송** — 온라인 복귀 시 수동/자동 전송
- **3단계 설문** — 1차 탐색(12문항) · 2차 심층(10문항) · 3차 피드백(7문항)
- **이미지 선택 세트** — 캐릭터 친밀도, 대화 방식, 관계 거리감 (SVG 일러스트)
- **PWA 설치** — 홈 화면에 추가하여 앱처럼 사용

## 운영 방법

```
[Wi-Fi 환경] → 폰으로 사이트 접속 → "홈 화면에 추가"
     ↓
[길거리 조사] → 인터넷 없어도 정상 동작, 응답 로컬 저장
     ↓
[사무실 복귀] → Wi-Fi 연결 → 설정(#/settings)에서 "전송" → Google Sheets 저장
```

## Google Sheets 연동

1. Google Sheets 새로 생성
2. **확장 프로그램 → Apps Script** 클릭
3. 앱 설정 페이지(`#/settings`)에서 **"Apps Script 코드 복사"** → 붙여넣기
4. **배포 → 새 배포 → 웹 앱** (액세스: 모든 사용자)
5. 생성된 URL을 앱 설정 페이지에 입력

## 기술 스택

- Vanilla HTML / CSS / JS (ES Modules, 빌드 도구 없음)
- PWA (Service Worker + manifest.json)
- IndexedDB (로컬 저장)
- Google Apps Script (무료 백엔드)
- Pretendard 폰트

## 프로젝트 구조

```
├── index.html              # SPA 엔트리
├── manifest.json           # PWA 매니페스트
├── sw.js                   # Service Worker
├── css/style.css           # 스타일
├── js/
│   ├── app.js              # 앱 진입점
│   ├── router.js           # SPA 라우터
│   ├── store.js            # IndexedDB 저장소
│   ├── sync.js             # Google Sheets 전송
│   ├── survey-data.js      # 설문 문항 정의
│   ├── svg-illustrations.js # SVG 일러스트
│   └── pages/              # 페이지 컴포넌트
└── assets/icons/           # PWA 아이콘
```
