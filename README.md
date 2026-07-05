# 원삼 센트레빌 퍼스트원 랜딩페이지

기업 직원숙소 및 분양정보 사전검토 안내용 정적 랜딩페이지입니다.

## 파일 구조

```text
index.html
style.css
script.js
assets/
README.md
```

## 운영 메모 (현재 상태 — Google Form 시대 지침 아님)

> 이전 버전의 이 문서는 "Google Form 링크 확정 전까지 `href="#"` 유지" 같은 지침을 담고 있었습니다.
> 그 방식은 폐기되었습니다. 지금은 실제 hrefs와 Supabase 기반 서버 접수 구조로 완전히 대체되었으며,
> 사이트 어디에도 `href="#"` 플레이스홀더가 남아있지 않습니다.

- 본 페이지는 사전검토용 참고 안내 페이지이며, 공식 분양 홈페이지가 아니라는 방어적 문구는 두지 않습니다 (하단 참고 문구만 유지).
- 일반고객: `index.html`/`consultation.html`에서 전화상담(`tel:010-3138-1712`) 중심으로 안내합니다. 폼을 제공하지 않습니다.
- 기업고객: `corporate-report.html`(읽기 전용 검토 보고서) → `corporate-request.html`(기업명/전화번호/이메일 접수 폼) 흐름으로 안내합니다.
- 기업 제안서 원본 PDF는 공개 assets에 존재하지 않으며, 어떤 페이지에서도 PDF 파일로 직접 링크되지 않습니다. 제안서 내용은 `corporate-report.html` 안에 페이지별 이미지(웹 최적화 webp)로 변환되어 스크롤 열람 방식으로만 제공됩니다 — 아래 "기업제안서 열람 기능" 섹션 참고.
- `assets/wonsam-centreville-first-one-company-housing-proposal.pdf`는 삭제된 상태이며 복구하지 않습니다.
- `assets/wonsam-firstone-ad-slide.pdf`, `assets/wonsam-firstone-analysis.pdf`는 저장소에는 있으나 어느 페이지에서도 링크되지 않은 상태입니다 (다운로드 금지 정책). 필요하면 HTML/이미지 리딩 섹션으로 변환하거나 저장소에서 제거하는 결정이 남아 있습니다.
- 기업자료 요청 접수는 아래 "기업자료 요청 백엔드" 섹션의 Supabase + Vercel Functions 구조로 처리되며, mailto나 Google Form을 사용하지 않습니다.
- 정적 사이트 특성상 공개 assets에 있는 파일은 URL을 알면 접근될 수 있으므로 완전한 다운로드 차단에는 한계가 있습니다. 완전 차단이 필요하면 인증 기반 뷰어나 서버 기반 접근제어를 검토해야 합니다.

## Vercel 배포 방법

1. 이 폴더 구조 그대로 Git 저장소에 업로드합니다.
2. Vercel에서 `Add New Project`를 선택하고 해당 저장소를 연결합니다.
3. Framework Preset은 `Other` 또는 정적 사이트 기본값으로 둡니다.
4. Build Command는 비워두고, Output Directory는 `.` 로 설정합니다.
5. 배포 후 Vercel 프로젝트의 `Domains` 메뉴에서 `wonsam-firstone.co.kr`을 추가합니다.
6. 도메인 DNS에서 Vercel이 안내하는 A 레코드 또는 CNAME 레코드를 설정합니다.

## GitHub Pages 배포 방법

1. 이 폴더 구조 그대로 GitHub 저장소의 루트에 업로드합니다.
2. 저장소 `Settings` → `Pages`로 이동합니다.
3. Source를 `Deploy from a branch`로 선택합니다.
4. Branch는 `main`, Folder는 `/root`를 선택한 뒤 저장합니다.
5. 배포 URL이 생성되면 정상 접속 여부를 확인합니다.

## 도메인 연결 방법

- Vercel 사용 시: Vercel 프로젝트 `Domains`에 `wonsam-firstone.co.kr`을 추가하고, 안내된 DNS 레코드를 도메인 관리 업체에 등록합니다.
- GitHub Pages 사용 시: 저장소 `Settings` → `Pages` → `Custom domain`에 `wonsam-firstone.co.kr`을 입력하고, 도메인 DNS에 GitHub Pages용 레코드를 등록합니다.
- DNS 반영에는 보통 수 분에서 최대 24시간 이상 걸릴 수 있습니다.
- HTTPS 인증서가 발급된 뒤 `https://wonsam-firstone.co.kr` 접속을 확인하세요.

## 기업자료 요청 백엔드 (Supabase + Vercel Functions)

`corporate-request.html`의 제출은 더 이상 mailto가 아니라 실제 서버 접수로 처리됩니다.

구조:
- `corporate-request.html` → `fetch('/api/corporate-request')`로 JSON 전송
- `api/corporate-request.js` (Vercel Serverless Function) → Supabase `corporate_requests` 테이블에 저장
- `admin.html` → 관리자 비밀번호 입력 후 `api/admin-requests.js`를 통해 접수 목록 조회
- Supabase 프로젝트: `wonsam-firstone` (project ref: `imtkbgdrvwmgvolzscxt`, region: ap-northeast-2), 테이블 `corporate_requests`는 RLS 활성화 + 정책 없음 → anon/publishable 키로는 절대 조회·삽입 불가하며, service_role 키를 쓰는 서버 함수에서만 접근 가능합니다.

### 배포 전 필수 설정 (Vercel 환경변수)

Vercel 프로젝트(`wonsam-firstone`) → Settings → Environment Variables에 아래 3개를 등록해야 접수/관리자 기능이 동작합니다. 코드에는 어떤 비밀값도 하드코딩되어 있지 않습니다.

| 변수명 | 값 | 비고 |
|---|---|---|
| `SUPABASE_URL` | `https://imtkbgdrvwmgvolzscxt.supabase.co` | 공개 가능한 프로젝트 URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 대시보드 → 해당 프로젝트 → Settings → API → `service_role` 시크릿 키를 복사 | **비공개 값** — Supabase 대시보드에서 직접 복사해서 Vercel에 붙여넣을 것. 절대 코드/채팅/문서에 남기지 말 것 |
| `ADMIN_TOKEN` | 관리자 페이지 로그인 비밀번호로 사용할 문자열 (직접 정하거나 생성기 사용) | `admin.html`은 이 값을 서버에서만 대조하며 HTML/JS 소스에는 값이 노출되지 않음 |

설정 후 재배포(재배포는 Vercel이 자동으로 하거나 Redeploy 버튼 클릭)하면 반영됩니다.

### 관리자 확인 방법

`https://wonsam-firstone.co.kr/admin.html` 접속 → `ADMIN_TOKEN`으로 설정한 비밀번호 입력 → 접수일시/기업명/전화번호/이메일/요청목적 목록 확인. 비밀번호는 세션 스토리지에만 저장되며 탭을 닫으면 초기화됩니다. 이 페이지는 `noindex`로 검색엔진 노출을 차단했습니다.

### 정적 사이트 한계 (반드시 인지할 것)

- Vercel Functions를 추가해 실제 서버 접수/조회를 구현했지만, `admin.html`은 비밀번호 하나로 지키는 매우 단순한 인증입니다. 세션 만료, 로그인 시도 제한, 감사 로그 같은 정식 인증 시스템은 없습니다. 더 강한 보안이 필요하면 Supabase Auth 등 정식 인증으로 교체해야 합니다.
- `ADMIN_TOKEN`이 유출되면 접수자의 개인정보(기업명/전화번호/이메일)가 노출됩니다. 비밀번호를 주기적으로 교체하고, 신뢰할 수 있는 담당자에게만 공유하세요.
- Supabase 무료 티어 기준으로 운영 중입니다. 트래픽/저장량이 늘어나면 유료 플랜 전환이 필요할 수 있습니다.
- 이메일 자동 발송(접수 확인 메일 등)은 구현하지 않았습니다. 필요하면 Resend 등 이메일 API 연동이 추가로 필요합니다.

## 기업제안서 열람 기능

`corporate-report.html`의 히어로 대시보드 카드 바로 아래(`#proposal-viewer`)에 **"기업제안서 열람"** 섹션이 있습니다. 히어로의 "기업제안서 열람" 버튼은 같은 페이지 내 이 섹션으로 스크롤 이동하는 인앵커입니다 (다른 페이지로 착각하게 만드는 앵커가 아니라, 같은 페이지 안 바로가기입니다).

- **원본 파일 (2번째 라운드에서 교체됨):** `원삼_센트레빌_퍼스트원_제안서.pdf` (프로젝트 폴더 보관본, PyMuPDF 기준 12페이지 — "원삼 센트레빌 퍼스트원 기업 및 사전검토용 안내서", NotebookLM으로 생성된 네이비·골드 톤 슬라이드 덱). 이전 라운드에서 썼던 8페이지 HUMANE 톤 문서(`원삼센트레빌_기업숙소_제안서_v3`)는 교체되어 더 이상 쓰지 않습니다. 저장소/assets에 PDF 원본 자체는 추가하지 않았습니다.
- **발견된 결함과 처리:** 이 PDF의 2~11페이지 하단에는 이 프로젝트와 무관한 "Kia" 로고, 글자가 깨진 "국토 장기자산 운용본부" 문구, 잘못된 연도("2023.07")가 박혀 있었습니다 (NotebookLM 생성 과정의 AI 환각으로 추정). 사용자 확인 후, 렌더링 시 각 페이지 하단 6.5%를 프로그램적으로 잘라내 해당 푸터 밴드를 제거했습니다. 1페이지(표지)와 12페이지(맺음말)는 이 결함이 없어 자르지 않았습니다.
- 구현 방식: PyMuPDF로 각 페이지를 2.2배 확대 렌더링 → Pillow로 문제 페이지만 하단 크롭 → webp 변환 (3028px 폭, quality 84) → `assets/corporate-proposal-pages/page-01.webp` ~ `page-12.webp` (총 12개 파일, 약 2.42MB).
- `corporate-report.html`에 흰 카드형 세로 스크롤 뷰어로 12페이지 전체를 표시하며, 6페이지와 7페이지 사이에 "원본 파일 또는 세부 검토자료가 필요한 기업 담당자는 자료요청을 남겨주세요" 중간 유도 배너가 있습니다. PDF 링크, 다운로드 버튼, iframe 없음 — 순수 `<img>` 태그로만 표시됩니다.
- 이미지는 원본 PDF 텍스트를 다시 타이핑한 것이 아니라 페이지를 그대로 래스터화한 것이므로(하단 푸터 크롭 제외) 내용이 원본과 동일합니다. 가격/조건 등 원본에 있는 수치를 임의로 가공하지 않았습니다.
- **알려진 한계:** 11페이지에는 "사전 예약 페이지"로 연결된다는 QR 코드 이미지가 포함되어 있으나, 해당 QR이 실제로 어디로 연결되는지 확인하지 않았고 이미지 안에 박혀 있어 수정할 수 없습니다. 실제 작동하지 않을 수 있습니다.
- 웹에 올라간 이미지는 스크린샷/캡처 자체를 막을 수 없습니다. 완전한 접근 통제가 필요하면 로그인 기반 뷰어가 필요합니다.
- 이전 라운드에 기록했던 "세부 가격자료는 상담 후 개별 안내" 정책과 달리, 이 제안서 이미지에는 예상 분양가·자금계획 등 수치가 원래부터 포함되어 있어 공개됩니다 — 사용자 승인 후 진행했습니다.

## 인포그래픽 확대 보기 기능

`index.html`의 인포그래픽 카드가 클릭 가능한 확대 보기로 개선되었습니다.

- 기존 카드형 미리보기(`.infographic-card`)를 클릭(또는 Enter/Space 키)하면 전체화면에 가까운 모달(`#infographicModal`)로 원본 이미지가 크게 표시됩니다.
- 닫기: 우측 상단 "닫기" 버튼, 배경(어두운 영역) 클릭, ESC 키 — 3가지 모두 지원합니다.
- 모달이 열리면 `body`에 스크롤 잠금이 걸리고, 닫으면 해제됩니다.
- 사용된 이미지 파일은 기존 `assets/wonsam-firstone-infographic.png`를 그대로 재사용했습니다(파일 교체 없음) — 이 파일이 곧 실제 표시되는 인포그래픽 원본입니다.
- 모달은 홈페이지 내 열람을 크게 보여주기 위한 기능이며, 다운로드 방지의 완전한 수단은 아닙니다(브라우저에서 이미지 자체는 여전히 로드되므로 우클릭 저장 등은 막지 않습니다).

## 색상 방향 (2번째 라운드: 오렌지/그린 → 네이비 블루)

첫 라운드에서는 HUMANE 홈페이지 로고 기준 초록/주황을 주요 브랜드색으로 적용했으나, 이번 라운드에서 사용자가 NotebookLM형 리포트·대시보드 톤(진한 네이비 + 화이트 + 연회색)이 더 적합하다고 판단해 방향을 변경했습니다.

- `style.css`의 `--primary` 토큰이 `var(--humane-orange)` → `var(--humane-navy)`(#1e3a8a)로 변경되어, 모든 주요 CTA 버튼·로고 마크·포커스 링이 네이비 블루로 바뀌었습니다.
- `--accent`(초록, #017c2e)는 그대로 유지되어 섹션 라벨/배지/체크마크 등 보조 강조색으로만 쓰입니다.
- 하단 분리 CTA의 어두운 카드(`is-primary`)에 쓰이던 연한 주황 텍스트는 네이비와 어울리는 골드 톤(#d4a656)으로 교체했습니다 — 실제 기업제안서 슬라이드 덱이 네이비+골드 배색이라 시각적으로 자연스럽게 맞습니다.
- Airbnb 빨강(#ff385c), Notion 파랑(#0075de)은 이전과 마찬가지로 전혀 남아있지 않습니다.

## 배너 점검 (이번 라운드)

- 일반고객: 전화 상담 문의 / 가격 및 잔여호실 문의 — 기존 그대로 유지, 정상 작동 확인.
- 기업고객: 기업수요 보고서 열람(→corporate-report.html), 기업자료 요청(→corporate-request.html) — 기존 그대로 유지.
- corporate-report.html 히어로에 "기업제안서 열람" 버튼을 추가했습니다. 같은 페이지의 제안서 뷰어 섹션(`#proposal-viewer`)으로 스크롤 이동하는 인앵커입니다.
- **"사전의향서 접수" 배너는 이번 라운드에 만들지 않았습니다.** 해당 기능을 받을 전용 페이지(`pre-interest.html` 등)가 아직 없기 때문입니다. 지시사항대로 지금은 문서화만 하고, 실제 페이지 구현은 추후 작업으로 남겨둡니다. 필요 시 `consultation.html`(일반고객) 또는 `corporate-request.html`(기업고객)의 기존 요청 목적 옵션에 "사전 의향서"를 추가하는 방식으로 임시 대응할 수 있습니다.

## 연락처

HUMANE  
010-3138-1712  
yisim817@gmail.com  
www.humanekorea.co.kr
