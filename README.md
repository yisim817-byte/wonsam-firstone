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
- 일반고객: `index.html`/`consultation.html`에서 전화상담(`tel:16446873`) 중심으로 안내합니다. 폼을 제공하지 않습니다.
- 기업고객: `corporate-report.html`(읽기 전용 검토 보고서) → `corporate-request.html`(기업명/전화번호/이메일 접수 폼) 흐름으로 안내합니다.
- 기업 제안서 원본 PDF는 공개 assets에 존재하지 않으며, 어떤 페이지에서도 PDF 파일로 직접 링크되지 않습니다. 제안서 내용은 `corporate-report.html` 안에 페이지별 이미지(웹 최적화 webp)로 변환되어 스크롤 열람 방식으로만 제공됩니다 — 아래 "기업제안서 열람 기능" 섹션 참고.
- `assets/wonsam-centreville-first-one-company-housing-proposal.pdf`는 삭제된 상태이며 복구하지 않습니다.
- `assets/wonsam-firstone-ad-slide.pdf`, `assets/wonsam-firstone-analysis.pdf`는 저장소에는 있으나 어느 페이지에서도 링크되지 않은 상태입니다 (다운로드 금지 정책). 필요하면 HTML/이미지 리딩 섹션으로 변환하거나 저장소에서 제거하는 결정이 남아 있습니다.
- 기업자료 요청 접수는 아래 "기업자료 요청 백엔드" 섹션의 Supabase + Vercel Functions 구조로 처리되며, mailto나 Google Form을 사용하지 않습니다.
- 정적 사이트 특성상 공개 assets에 있는 파일은 URL을 알면 접근될 수 있으므로 완전한 다운로드 차단에는 한계가 있습니다. 완전 차단이 필요하면 인증 기반 뷰어나 서버 기반 접근제어를 검토해야 합니다.

## HTML/CSS 기반 인포그래픽 섹션

- `index.html`의 `#location-map` 다음, 기존 분석 차트 섹션 앞에 `#report-infographics` 섹션을 추가했습니다.
- 기존 PNG 인포그래픽 6장(프로젝트 개요, 용인 반도체 클러스터 현황, 일반산업단지 개요, 배후수요 및 상업지 입지, FAB·기숙사·E2-1 관계도, 전도 조건 및 접근성)을 참고자료로만 사용하고, 제목·표·숫자·라벨·요약카드는 HTML 텍스트와 CSS/SVG 도형으로 재구성했습니다.
- 이미지 생성 AI로 새 이미지를 다시 만든 것이 아니며, 한글 텍스트가 이미지 안에 박히지 않도록 DOM 기반으로 구성했습니다.
- `style.css`에는 다크 네이비/골드 보고서형 전용 스타일과 모바일 1열 반응형 규칙을 추가했습니다.
- `script.js`에는 해당 섹션 전용 fade-up, 핵심 숫자 count-up, 클릭 확대 모달 복제 로직을 추가했습니다. 기존 API, 관리자, 의향서/기업자료 요청 기능은 변경하지 않았습니다.
- 이 섹션은 브라우저 캡처 도구로 PNG/WebP export하기 쉬운 16:9 카드 구조를 기준으로 설계했습니다.

## 메인 영상 Hero 및 근린생활시설 섹션

2026-07-08 업데이트로 메인 첫 화면을 영상 Hero로 전환하고, 상단 전환 버튼을 고객/기업 2개 CTA로 단순화했습니다.

- 영상 파일: `assets/videos/wonsam-main-hero-copywriting.mp4`
- 적용 위치: `index.html` 첫 화면 Hero 배경 영상
- video 속성: `autoplay`, `muted`, `loop`, `playsinline`, `preload="metadata"`
- Hero에는 영상 안 카피와 중복되는 큰 HTML 카피를 얹지 않고, `고객 상담 / 고객의향서`, `기업 상담 / 기업의향서` 2개 CTA만 유지합니다.
- `반도체클러스터 안의 근린생활시설` 섹션을 추가해 E2-1/E2-2 근린생활시설 규모, 총 324호 계획, 상업용지비율, 오피스텔 2,320실 배후 체류 수요 검토 내용을 안내합니다.
- `corporate-report.html`은 PDF 공개 열람 페이지가 아니라 기업 담당자용 검토 포인트 페이지로 운영합니다.
- 고객제안서/기업제안서 PDF는 홈페이지 공개용이 아니라 개별 발송용 자료로 보류합니다.
- 공개 연락처는 대표번호 `1644-6873`만 표시합니다. 이름, 휴대폰 번호 등 개인정보성 연락처는 공개 화면에 올리지 않습니다.

## 상단배너/메뉴 통일 및 호실타입 섹션 (2026-07-08)

- **메뉴명 변경**: 상단 메뉴 "기업 검토 자료실"(및 관련 표현 "기업 검토 리포트")을 **"현장검토자료"**로 전체 사이트에서 통일했습니다. "현장검토자료"는 여전히 `corporate-data.html`을 가리킵니다(파일명은 변경하지 않음).
- **헤더/네비게이션 통일**: `index.html`의 헤더(로고/네비/모바일 메뉴)를 기준으로 아래 7개 페이지의 상단배너·메뉴·모바일 메뉴를 완전히 동일하게 맞췄습니다 — `corporate-data.html`, `corporate-report.html`, `intelligence-report.html`, `design.html`, `pre-interest.html`, `corporate-interest.html`, `corporate-request.html`. 이전에는 `pre-interest.html`/`corporate-interest.html`/`corporate-request.html`이 각기 다른 `nav-cta` 버튼("전화 상담 문의", "기업제안서 열람", "기업수요 보고서 보기")만 갖고 있어 다른 사이트로 이동한 것처럼 보였는데, 이제 모든 페이지가 동일한 7메뉴 구조를 사용합니다. index.html 외 페이지의 앵커 링크(`#consultation-types` 등)는 `index.html#consultation-types` 형태로 접두어를 붙여 실제로 index.html로 이동 후 스크롤되도록 처리했습니다.
- **최종 메뉴 순서**: 대시보드 / 상담 유형 / 근린생활시설 / **호실타입(신규)** / 입지·수요 / 설계 / 현장검토자료.
- **호실타입 섹션 신규 추가**: `index.html`에 `#unit-types` 섹션을 추가해 사업계획서 분양면적표 기준 오피스텔 A~F 타입별 실사용/전용/공급/계약면적과 실수를 카드+표로 정리했습니다. 하단에 "면적 및 평면은 사업계획서 기준 참고자료이며, 인허가 및 모집공고 확정 시 일부 변경될 수 있습니다" 고지문을 넣었습니다. 새 이미지/PDF는 추가하지 않았습니다.
- **버그 수정**: `.unit-type-grid` 카드 내부 표(`min-width: 560px`)가 flex 자식의 암묵적 `min-width: auto` 때문에 그리드의 `minmax(0, 1fr)`을 무시하고 페이지 전체를 가로로 넘치게 만드는 문제가 있어, `.unit-type-grid .commerce-focus-card`와 `.table-wrap`에 `min-width: 0`을 추가해 표가 카드 내부에서만 가로 스크롤되도록 고쳤습니다.
- 고객제안서/기업제안서 PDF 열람 섹션은 이번 라운드에서도 추가하지 않았습니다(발송용 자료로 계속 보류). `href="#"`, 다운로드 버튼도 추가하지 않았습니다.
- 의향서 접수(FormSubmit 이메일 접수), `admin.html`(Gmail 접수 관리 안내), Supabase 보류 구조, 대표번호 `1644-6873`, 이메일 `yisim817@gmail.com`은 이번 라운드에서 변경하지 않았습니다.

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
- `admin.html` → 관리자 이메일(`yisim817@gmail.com`)과 관리자 비밀번호 입력 후 관리자 API를 통해 접수 목록 조회
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

`https://wonsam-firstone.co.kr/admin.html` 접속 → 관리자 이메일 `yisim817@gmail.com`과 `ADMIN_TOKEN`으로 설정한 비밀번호 입력 → 접수일시/기업명/전화번호/이메일/요청목적 목록 확인. 인증값은 세션 스토리지에만 저장되며 탭을 닫으면 초기화됩니다. 이 페이지는 `noindex`로 검색엔진 노출을 차단했습니다.

### 정적 사이트 한계 (반드시 인지할 것)

- Vercel Functions를 추가해 실제 서버 접수/조회를 구현했지만, `admin.html`은 비밀번호 하나로 지키는 매우 단순한 인증입니다. 세션 만료, 로그인 시도 제한, 감사 로그 같은 정식 인증 시스템은 없습니다. 더 강한 보안이 필요하면 Supabase Auth 등 정식 인증으로 교체해야 합니다.
- `ADMIN_TOKEN`이 유출되면 접수자의 개인정보(기업명/전화번호/이메일)가 노출됩니다. 비밀번호를 주기적으로 교체하고, 신뢰할 수 있는 담당자에게만 공유하세요.
- Supabase 무료 티어 기준으로 운영 중입니다. 트래픽/저장량이 늘어나면 유료 플랜 전환이 필요할 수 있습니다.
- 이메일 자동 발송(접수 확인 메일 등)은 구현하지 않았습니다. 필요하면 Resend 등 이메일 API 연동이 추가로 필요합니다.

## 기업제안서 열람 기능

`corporate-report.html`의 히어로 대시보드 카드 바로 아래(`#proposal-viewer`)에 **"기업제안서 열람"** 섹션이 있습니다. 히어로의 "기업제안서 열람" 버튼은 같은 페이지 내 이 섹션으로 스크롤 이동하는 인앵커입니다 (다른 페이지로 착각하게 만드는 앵커가 아니라, 같은 페이지 안 바로가기입니다).

- **원본 파일 (2번째 라운드에서 교체됨):** `원삼_센트레빌_퍼스트원_제안서.pdf` (프로젝트 폴더 보관본, PyMuPDF 기준 12페이지 — "원삼 센트레빌 퍼스트원 기업 및 사전검토용 안내서", NotebookLM으로 생성된 네이비·골드 톤 슬라이드 덱). 이전 라운드에서 썼던 8페이지 원삼 센트레빌 퍼스트원 현장 안내 톤 문서(`원삼센트레빌_기업숙소_제안서_v3`)는 교체되어 더 이상 쓰지 않습니다. 저장소/assets에 PDF 원본 자체는 추가하지 않았습니다.
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
- 2026-07-06 교체: 기존 NotebookLM 인포그래픽은 "4베이" 표현과 임의 전화번호 문제가 있어 페이지 참조에서 제외했습니다.
- 현재 표시되는 인포그래픽 원본은 사용자가 업로드한 이미지를 변환한 `assets/site-source-images/wonsam-customer-infographic-updated.webp`입니다.
- 적용 페이지는 `index.html`이며, `.infographic-card`와 `#infographicModal`을 통한 클릭 확대 기능은 유지했습니다.
- 대표번호는 추후 변경 예정이며, 인포그래픽 이미지 안에는 임의 전화번호를 추가하지 않았습니다.
- 기존 CTA/API/PDF 구조에는 영향이 없습니다.
- 모달은 홈페이지 내 열람을 크게 보여주기 위한 기능이며, 다운로드 방지의 완전한 수단은 아닙니다(브라우저에서 이미지 자체는 여전히 로드되므로 우클릭 저장 등은 막지 않습니다).

## 현장 이미지 자료 반영 (2026-07-05)

Claude Code에서 외부 이미지 다운로드 권한 차단으로 중단됐던 현장 이미지 반영 작업을 Codex에서 이어받아 처리했습니다. 외부 다운로드는 재시도하지 않았고, 사용자가 로컬로 확보해 제공한 webp 파일만 사용했습니다.

이미지 저장 폴더:

```text
assets/site-source-images/
```

반영한 이미지 파일:

- `cluster-aerial-e2-location.webp`
- `fab1-fab4-e2-location.webp`
- `business-summary-overview.webp`
- `industrial-site-layout-site-pin.webp`
- `sk-dormitory-e2-site-map.webp`
- `yongin-cluster-wide-map.webp`

반영 위치:

- `index.html`: `#location-map` 섹션의 제목을 `입지·현장 이미지 자료`로 정리하고, 사업개요 참고 이미지는 히어로 오른쪽 `사업 개요 핵심 요약` 카드 아래로 이동했습니다.
- `intelligence-report.html`: `#location` 섹션을 `용인 반도체클러스터 위치 분석`으로 정리하고, 위치 분석 이미지 3장을 추가했습니다.
- `corporate-report.html`: 히어로와 기업제안서 열람 섹션 사이에 `기업 검토용 현장 이미지` 섹션을 추가하고 사업개요 참고 이미지를 함께 반영했습니다. 2026-07-06에는 같은 섹션의 2열 보조 이미지 그리드 빈 칸을 채우기 위해 `wonsam-customer-infographic-updated.webp`를 사업개요 및 공급규모 참고 이미지 옆에 추가했습니다.

이미지 하단 고지 문구:

```text
본 이미지는 공개 웹자료 및 현장 홍보자료를 기반으로 위치 이해를 돕기 위한 참고 이미지입니다. 세부 위치, 공급 조건, 일정은 상담 시 최신 자료 기준으로 확인됩니다.
```

사용권/리스크 메모:

- 현재 이미지는 사용자가 확보해 제공한 현장 홍보자료 기반 참고 이미지입니다.
- 외부 이미지의 최종 사용권, 재배포 가능 범위, 상업적 사용 가능 여부는 운영 전 별도 확인이 필요합니다.
- 향후 정식 사용 승인 이미지 또는 자체 제작 이미지가 확보되면 같은 파일명으로 교체하거나 섹션 구성을 재정리할 수 있습니다.
- 이미지 안에 포함된 문구는 원본 이미지 내용이며, 사이트 본문에서는 `SK하이닉스 공식 자료`, `공식 숙소`, `지정 숙소`, `확정 수요`, `수익 보장` 등으로 오해될 표현을 추가하지 않았습니다.

## 색상 방향 (2번째 라운드: 오렌지/그린 → 네이비 블루)

첫 라운드에서는 원삼 센트레빌 퍼스트원 현장 안내 홈페이지 로고 기준 초록/주황을 주요 브랜드색으로 적용했으나, 이번 라운드에서 사용자가 NotebookLM형 리포트·대시보드 톤(진한 네이비 + 화이트 + 연회색)이 더 적합하다고 판단해 방향을 변경했습니다.

- `style.css`의 `--primary` 토큰이 `var(--원삼 센트레빌 퍼스트원 현장 안내-orange)` → `var(--원삼 센트레빌 퍼스트원 현장 안내-navy)`(#1e3a8a)로 변경되어, 모든 주요 CTA 버튼·로고 마크·포커스 링이 네이비 블루로 바뀌었습니다.
- `--accent`(초록, #017c2e)는 그대로 유지되어 섹션 라벨/배지/체크마크 등 보조 강조색으로만 쓰입니다.
- 하단 분리 CTA의 어두운 카드(`is-primary`)에 쓰이던 연한 주황 텍스트는 네이비와 어울리는 골드 톤(#d4a656)으로 교체했습니다 — 실제 기업제안서 슬라이드 덱이 네이비+골드 배색이라 시각적으로 자연스럽게 맞습니다.
- Airbnb 빨강(#ff385c), Notion 파랑(#0075de)은 이전과 마찬가지로 전혀 남아있지 않습니다.

## 배너 점검 (2번째 라운드)

- 일반고객: 전화 상담 문의 / 가격 및 잔여호실 문의 — 기존 그대로 유지, 정상 작동 확인.
- 기업고객: 기업수요 보고서 열람(→corporate-report.html), 기업자료 요청(→corporate-request.html) — 기존 그대로 유지.
- corporate-report.html 히어로에 "기업제안서 열람" 버튼을 추가했습니다. 같은 페이지의 제안서 뷰어 섹션(`#proposal-viewer`)으로 스크롤 이동하는 인앵커입니다.
- **"사전의향서 접수" 배너는 2번째 라운드에 만들지 않았습니다.** 해당 기능을 받을 전용 페이지(`pre-interest.html` 등)가 아직 없기 때문입니다. 지시사항대로 지금은 문서화만 하고, 실제 페이지 구현은 추후 작업으로 남겨둡니다. 필요 시 `consultation.html`(일반고객) 또는 `corporate-request.html`(기업고객)의 기존 요청 목적 옵션에 "사전 의향서"를 추가하는 방식으로 임시 대응할 수 있습니다.

## 랜딩페이지 구조 재작업 (3번째 라운드)

기존 작업이 기능·보안·링크 정리에 치우쳐 실제 화면이 분양광고 랜딩처럼 보이지 않는다는 지적에 따라, 사용자가 업로드한 두 개의 HTML 목업(`code_artifact.html` — 라이트 대시보드 톤, `code_artifact (1).html` — 다크 인텔리전스 톤)을 기준으로 화면 구조를 다시 잡았습니다.

**주의:** 사용자가 언급한 정확한 파일명(`code_artifact(2).html`, `code_artifact (1)(1).html`)은 업로드 폴더에 존재하지 않았고, 실제로는 `code_artifact.html`(라이트)과 `code_artifact (1).html`(다크) 두 파일만 있었습니다. 내용과 설명을 근거로 라이트 목업 = index.html 재구성 기준, 다크 목업 = intelligence-report.html 기준으로 매핑했습니다.

### index.html 재구성

- 구조를 `hero 대시보드 → 사업개요 6카드 → 입지·수요 분석(차트 2개) → 수익률 시뮬레이션(참고용) → 특화 설계 포인트 → 검토 절차 3단계 → 자료 열람` 순서로 다시 짰습니다. 기존 `.search-summary` 섹션은 새 히어로 대시보드와 중복되어 제거했습니다.
- 히어로 CTA를 정확히 4개 버튼으로 고정: **사전의향서 접수**(→consultation.html) / **가격 및 잔여호실 문의**(→consultation.html) / **기업제안서 열람**(→corporate-report.html) / **기업자료 요청**(→corporate-request.html).
- "입지·수요 분석" 섹션에 Chart.js 막대그래프 2개(상업용지 비율 비교, 배후 인구 대비 기숙사 공급)를 추가했습니다. 수치는 모두 "참고" 라벨과 함께 표기되며, 정확한 수치는 공식 자료 확인이 필요하다는 안내 문구를 각 차트 아래 병기했습니다.
- "수익률 시뮬레이션" 섹션은 LTV·금리 슬라이더로 자기자본/이자/임대수익/수익률을 실시간 계산하는 참고용 도구입니다. 결과 라벨은 "예상 수익률"이 아니라 "참고 자기자본 수익률"로 표기해 확정적 표현을 피했습니다. 기준값(분양가 2억2,500만 원, 보증금 500만 원, 월세 115만 원)은 원삼면 인근 구축 원룸 시세 참고치이며 실제 조건과 다를 수 있다는 문구를 병기했습니다.
- 카피 표현을 완화했습니다 (예: 확정적 수익 표현 → "검토", "참고", "확인 필요" 톤으로 조정). 금지 문구(확정수익/수익보장/무조건 상승/대박/원금보장/반드시 오른다/SK하이닉스 공식·지정·전용/공식 수요/지정 수요/확정 기업수요)는 grep으로 재검사했으며 전혀 없습니다.
- "자료 열람" 섹션에 4번째 카드로 "인텔리전스 리포트"를 추가하고 `intelligence-report.html`로 연결했습니다.
- 기존 인포그래픽 확대 모달(`#infographicModal`)은 이번 라운드에도 그대로 유지되며 재검증 결과 정상 작동합니다.

### intelligence-report.html (신규 생성)

- 다크 인디고/퍼플 톤의 독립형 참고용 리포트 페이지입니다. Tailwind CDN + Chart.js CDN을 이 페이지에서만 사용하며, 공유 `style.css` 시스템과는 분리되어 있습니다 (업로드 목업이 원래 이 방식이었습니다).
- 이 어두운 톤은 이 페이지에만 적용되며, 메인 사이트(`index.html` 등)의 primary 색상(네이비 #1e3a8a)에는 영향을 주지 않습니다.
- 실제 작동하는 내비게이션(index.html로 복귀, 상담 문의→consultation.html)과 차트 3개(상업용지 희소성, 배후 인구, 공급 타임라인), 동일한 로직의 수익률 시뮬레이터를 포함합니다.
- **목업에 있던 "Successful Sales & Marketing Roadmap"(VIP 프라이빗 마케팅, B2B 마스터리스 계약, FOMO 전략 등 내부 영업 전략 섹션)은 의도적으로 제외했습니다.** 고객이 직접 보는 페이지에 내부 영업 전략을 노출하는 것은 부적절하다고 판단했기 때문입니다. 필요하면 별도로 내부용 문서로만 관리하는 것을 권장합니다.
- 목업의 가짜 연락처("16XX-XXXX")는 실제 현장 안내 대표번호(1644-6873)로 교체했습니다.
- 하단에 실제 작동하는 CTA 3개(전화상담문의/기업자료요청/메인으로 돌아가기)를 배치했습니다.

### corporate-report.html 제안서 뷰어 위치 조정

- 기존에는 "기업제안서 열람" 섹션(`#proposal-viewer`)이 "1. 기업수요 검토 개요" 등 8개 섹션 뒤에 있어, 사용자가 실제 제안서 이미지를 보려면 히어로 대시보드 + 개요 섹션 전체를 지나야 했습니다. 사용자가 "스크롤을 조금만 내려도 제안서 1페이지가 보여야 한다"고 명시적으로 요구해, `#proposal-viewer` 섹션을 히어로 대시보드 카드 바로 다음, "1. 기업수요 검토 개요"보다 앞으로 옮겼습니다. 라이브 확인 결과 문서 상단에서 약 1,068px 지점(대략 한 화면 스크롤 이내)에 첫 페이지 이미지가 나타납니다.
- "최신 업데이트: 기업제안서 12페이지 읽기 전용 반영" 알림 배너(`.proposal-alert`)를 뷰어 섹션 상단에 추가했습니다.
- 12개 페이지 이미지의 `src`에 캐시 무효화용 쿼리 파라미터(`?v=proposal-v2`)를 추가했습니다. 이미지 파일 자체(`assets/corporate-proposal-pages/*.webp`)는 변경하지 않았습니다.
- 섹션 재배열 후 배경색 교차(`is-surface`/plain) 패턴을 다시 맞췄습니다 — 최종 순서: 1.기업수요검토개요(surface) → 2.입지및배후수요(plain) → 3.기업숙소활용가능성(surface) → 4.직원숙소/법인임차검토포인트(plain) → 5.기업담당자체크리스트(surface) → 6.자료제공방식(plain) → 7.유의사항(surface) → 8.기업자료요청(plain).

### 색상 방향 재확인 (3번째 라운드)

- `index.html`, `corporate-report.html`을 포함한 메인 사이트의 primary 색상은 이전 라운드에서 정한 네이비 블루(#1e3a8a)를 그대로 유지합니다. 원삼 센트레빌 퍼스트원 현장 안내 오렌지/그린으로 되돌리지 않았습니다.
- 어두운 인디고/퍼플 톤은 `intelligence-report.html`에만 적용되는 독립적인 팔레트이며, 다른 페이지에는 영향이 없습니다.

### 보호 대상 파일 변경 여부 (3번째 라운드)

`api/corporate-request.js`, `api/admin-requests.js`, `admin.html`, `corporate-request.html`, `assets/corporate-proposal-pages/*.webp`(이미지 원본) — 이번 라운드에서 전혀 수정하지 않았습니다 (`git diff --stat`로 확인, 변경분 0). Supabase 테이블 구조/RLS, `ADMIN_TOKEN` 인증 로직도 그대로입니다.

### 라이브 검증 방법 (3번째 라운드)

이번 라운드부터는 curl 문자열 검색만으로 완료를 보고하지 않고, 실제 배포된 `www.wonsam-firstone.co.kr`에 브라우저로 접속해 DOM/렌더링 기준으로 검증했습니다: 히어로 4버튼 텍스트, 대시보드 6카드, `#analysis` 차트 캔버스 픽셀 렌더링, ROI 슬라이더 실시간 값 변화, 인포그래픽 모달 열림/닫힘, `corporate-report.html`의 `#proposal-viewer` 위치·12개 이미지 `naturalWidth`, `intelligence-report.html` 차트 3개 렌더링과 CTA 링크, `/api/admin-requests` 401 응답을 모두 브라우저 JS 실행으로 직접 확인했습니다.

## 집 컴퓨터 인수인계 작업 (4번째 라운드)

집 컴퓨터에서 기존 GitHub/Vercel 프로젝트(`work/wonsam-firstone-repo`, 원격 `https://github.com/yisim817-byte/wonsam-firstone`)를 이어받아 진행한 라운드입니다.

- 작업 시작 전 로컬 클론이 `origin/main`보다 18커밋 뒤처져 있었고 미커밋 변경사항은 없었음을 확인 후 `git pull origin main`으로 fast-forward 했습니다(`60059aa` → `0b00ea2`).
- `index.html` 첫 화면을 사용자가 업로드한 `code_artifact.html`(라이트 대시보드 톤) 구조 기준으로 좌/우 2단 히어로로 재구성했습니다. 좌측: Premium Investment 배지, 헤드라인, 4개 핵심 수치 카드(단지 규모 1,168 / 도보 직주근접 3분 / 상업지 희소성 0.8% / 참고 자기자본 수익률 8.6%), 5개 CTA 버튼. 우측: `사업 개요 핵심 요약` 카드(사업명·위치·건축규모·주요용도·주차대수·시공사)를 스크롤 없이 첫 화면에 노출(`.hero-split`, 960px 이하에서는 세로 스택으로 전환).
- 상단 네비게이션에 대시보드/입지수요/수익분석/특화설계/분양전략/인텔리전스 리포트 앵커·링크를 추가했습니다. "분양전략" 메뉴는 내부 영업전략(FOMO 등)을 노출하지 않는다는 기존 방침에 따라 고객 안전한 "검토 절차" 섹션에 연결됩니다.
- 히어로 바로 아래, `#analysis` 섹션 앞에 `인텔리전스 리포트 공개` 배너(`.intel-banner`)를 신규 추가했습니다. 버튼: 인텔리전스 리포트 보기 → `intelligence-report.html`, 기업제안서 열람 → `corporate-report.html`.
- **`pre-interest.html` 신규 생성**: 일반 사전의향서 접수(이름/전화번호/이메일), Supabase `interest_requests` 테이블에 `type=pre_interest`로 저장.
- **`corporate-interest.html` 신규 생성**: 기업의향서 접수(기업명/담당자명/전화번호/이메일), 같은 테이블에 `type=corporate_interest`로 저장.
- 저장 방식: 기존 `corporate_requests` 테이블/API(`api/corporate-request.js`, `api/admin-requests.js`)는 전혀 건드리지 않았습니다. 새 테이블 `interest_requests`(RLS 활성화, 정책 없음 — service_role 키로만 접근 가능)와 새 API `api/interest-request.js`(접수), `api/admin-interest-requests.js`(관리자 조회, 기존과 동일한 `ADMIN_TOKEN` + `crypto.timingSafeEqual` 인증 방식)를 추가했습니다.
- `admin.html`에 두 번째 섹션(사전의향서·기업의향서 접수 목록)을 추가했습니다. 기존 로그인 폼과 동일한 비밀번호로 두 API를 모두 조회합니다. 기존 기업자료 요청 표/로직은 변경하지 않았습니다.
- 기업제안서(`corporate-report.html`)의 "기업제안서 열람" 섹션을 실제 v3 원본 PDF(`원삼센트레빌_기업숙소_제안서_v3_표지최종_수정본.pdf`, 8페이지 — 아래 "기업제안서 v3 확인" 참고) 내용 기준으로 전면 재작성했습니다. PDF 래스터화 도구(poppler/mupdf)를 설치하지 않기로 한 사용자 결정에 따라, **이미지가 아닌 사이트 디자인(표/카드/콜아웃)으로 8페이지 전체를 재구성**했습니다. 표지 문구에는 사용자 지시대로 "SK하이닉스 용인반도체 클러스터 정문"을 그대로 반영했습니다.
- 기존 `assets/corporate-proposal-pages/page-01.webp`~`page-12.webp`(이전 라운드의 12페이지 NotebookLM 덱 이미지)는 더 이상 어느 페이지에서도 사용되지 않습니다. 폴더 전체 삭제는 자동 승인 정책상 차단되어(재현 불가한 로컬 삭제로 분류) 삭제하지 못했습니다 — 필요 시 사용자가 직접 삭제하거나 별도 승인 후 정리해야 합니다.
- 모든 페이지의 CTA를 최종 구조에 맞게 연결했습니다: 사전의향서 접수 → `pre-interest.html`, 기업의향서 접수 → `corporate-interest.html`, 기업자료 요청 → `corporate-request.html`, 기업제안서 열람 → `corporate-report.html`, 가격 및 잔여호실 문의/상담 예약 → `consultation.html`, 인텔리전스 리포트 보기 → `intelligence-report.html`. `href="#"`, 다운로드 버튼, PDF 직접 링크는 전체 저장소에서 grep으로 재확인했으며 발견되지 않았습니다.
- 리스크 문구 조정: `intelligence-report.html`의 "SK하이닉스 정문 인근"을 "용인 반도체클러스터 주요 출입 동선 인근"으로 완화했습니다. `corporate-report.html`의 실제 제안서 재현 내용("SK하이닉스 제1팹 정문 기준...") 은 사용자의 실제 승인된 영업 문서를 그대로 옮긴 것이므로 완화하지 않고 원문 그대로 유지했습니다 — 이는 사이트 자체 마케팅 카피(완화 대상)와 원본 문서 읽기전용 재현(원문 유지 대상)을 구분한 것입니다.
- 로컬 정적 서버(`npx serve`, `.claude/launch.json`에 `wonsam-firstone` 설정 추가)로 실제 브라우저 렌더링을 확인했습니다. **주의:** 이전 라운드 HANDOFF에는 "로컬 서버를 띄우지 말 것(Windows 방화벽 프롬프트 때문)"이라는 기록이 있었으나, 이번 라운드에서는 방화벽 프롬프트 없이 정상 동작했습니다. 다음 작업자는 이 방화벽 이슈가 재현되는지 참고만 하시기 바랍니다.

### 기업제안서 v3 확인 결과

- 사용한 원본: `원삼센트레빌_기업숙소_제안서_v3_표지최종_수정본.pdf` (Desktop `원삼홈페이지광고` 폴더, MD5 동일본이 Downloads에도 존재).
- 페이지 수: 실제로는 8페이지(사용자 PDF 뷰어로 직접 확인). 이 세션의 PDF 페이지 수 자동 판별 도구가 이 파일에 대해 142페이지라고 두 차례 잘못 보고했습니다 — 이전 라운드 HANDOFF에도 같은 파일에 대한 다른 오판(142페이지 vs 실제 8페이지) 기록이 있어, 이 파일은 자동 페이지수 판별 도구로 신뢰하지 말고 항상 사용자 확인을 거쳐야 합니다.
- 실제 텍스트 내용은 크기가 작은 사본(`Downloads/원삼센트레빌_기업숙소_제안서_v2.pdf`, 158.6KB)을 통해 전체 확보했으며, 구성은 표지 / 01.제안요약 / 02.입지 / 03.사업개요·공급규모 / 04.활용모델 / 05.예상공급조건·법인검토포인트 / 06.수요검토요청서·회신양식 / 07.제안마무리·다음단계로 사용자가 설명한 v3 목차와 정확히 일치합니다.
- v3 반영 여부: **반영 완료** — 12페이지/142페이지 파일은 사용하지 않았고, 8페이지 실제 v3 내용을 `corporate-report.html`에 텍스트/표 기반으로 전량 반영했습니다.
- 이미지 수: 0장(이미지 래스터화 도구를 설치하지 않기로 한 사용자 결정에 따라, 텍스트/표/카드 형태로 재구성).

## 전환 포인트 재배치 (5번째 라운드)

4번째 라운드 배포(`db5078d`) 후 실제 화면을 확인한 사용자 피드백: 핵심 전환 요소(기업제안서 열람/기업의향서 접수/사전의향서 접수/자료요청)가 다른 문구 속에 묻혀 보이고, 히어로 우측 사업개요 카드가 스크롤 중 위아래로 흔들리는 느낌이 있으며, 전화번호가 눈에 띄지 않는다는 지적. 새 기능 추가가 아니라 **기존 요소의 시각적 재배치**만 진행했습니다.

- **히어로 안정화**: `.hero-summary-card`에서 `position: sticky`를 제거했습니다(짧은 히어로 섹션에서 sticky 카드가 붙었다 떨어지며 위아래로 움직이는 것처럼 보이는 원인). 정적 위치(`position` 미지정)로 변경하고 그리드를 `minmax(0,1fr) minmax(360px,520px)` + `align-items:start`로 고정해 렌더링 중 흔들림이 없도록 했습니다.
- **히어로 하단 4카드 CTA 패널 신설** (`.hero-cta-panel`): 히어로 바로 아래, 인텔리전스 배너 위에 위치. 4개 카드가 명확히 분리되어 보입니다 — ① 사전의향서 접수(네이비 강조 테두리) ② 기업의향서 접수(그린 강조 테두리) ③ 기업제안서 열람 ④ 전화 상담 카드(전화번호 크게 표시 + 가격문의 버튼). 기존 히어로의 5개 버튼이 한 줄에 몰려 있던 문제를 이 카드형 배치로 대체했습니다. 히어로 자체의 버튼은 "사전의향서 접수"/"가격 및 잔여호실 문의" 2개만 남겼습니다.
- **전화번호 강조 컴포넌트** (`.phone-cta`): 대표번호(1644-6873)를 26px 굵은 글씨로 크게 표시하고 `tel:16446873` 링크를 걸었습니다. 정적 사이트지만 `contact.js`를 모든 HTML에 1회씩 포함해 전화 링크와 화면 표시 번호를 대표번호 기준으로 보정합니다.
- **일반/기업 동선 재구성**: 기존 5카드 "어떻게 문의하면 되나요" 섹션을 2개의 큰 카드로 교체했습니다 — "일반 분양 상담"(사전의향서 접수/가격 및 잔여호실 문의/전화 상담) / "기업 검토 상담"(기업제안서 열람/기업의향서 접수/기업자료 요청). 각 카드에 설명 문구를 붙여 두 동선이 뚜렷하게 구분되도록 했습니다.
- **기업의향서 vs 기업자료요청 역할 구분 강화**: `corporate-report.html` 상단에도 3개 카드(기업제안서 열람/기업의향서 접수/기업자료 요청)를 추가하고, 각각 "숙소 검토 의향만 먼저 남깁니다" vs "세부 제안서 원본·검토자료가 필요할 때 요청 목적과 함께 남깁니다"로 문구를 명확히 분리했습니다.
- **네비게이션 재정리**: 상단 메뉴를 대시보드/입지수요/수익분석/특화설계/인텔리전스 리포트/기업제안서로 정리하고("분양전략" 항목 제거, "기업제안서" 항목을 새로 추가해 corporate-report.html로 직결), 우측 고정 버튼을 "의향서 접수"(→pre-interest.html) + "상담 예약"(→consultation.html) 2개로 교체했습니다(기존 "기업자료 요청" 버튼은 새 CTA 카드 패널에서 이미 충분히 강조되므로 네비게이션에서는 뺐습니다).
- 실제 브라우저 렌더링으로 확인: 히어로 2단 구조가 흔들림 없이 고정 렌더링되고, 4카드 CTA 패널과 전화번호가 데스크톱/모바일 모두에서 즉시 눈에 띄며, 모바일에서는 카드가 1열로 정상 스택됩니다.

## 입지·현장 위치도 섹션 추가 (6번째 라운드)

`index.html`(`#location-map`, `#analysis` 바로 위)과 `intelligence-report.html`(`#location`, 히어로 바로 아래)에 "입지·현장 위치도" 섹션을 추가했습니다.

- **외부 지도 이미지는 사용하지 않았습니다.** 사용자가 확인한 공개 웹자료(용인 반도체클러스터 E2-1·E2-2 상업시설용지 표기, 산군 사이트의 현장정보, 원삼IC/서울~세종고속도로 위치 관계)는 좌표·수치를 그대로 베끼지 않고 **개념 참고용**으로만 사용했습니다. 실제 표시되는 다이어그램은 인라인 SVG로 자체 제작한 개략도(클러스터 경계 점선 박스, E2-1·E2-2 강조 블록, 현장 핀, 고속도로/IC 참고선, 출입 동선 화살표)이며, 외부 이미지 파일이나 지도 타일을 복사·삽입하지 않았습니다.
- 카드 구성: 왼쪽 SVG 다이어그램 + 범례, 오른쪽 `현장 위치 요약`(현장/위치/블록/용도/확인 근거) + CTA 3개(현장 상담 문의→`consultation.html`, 기업의향서 접수→`corporate-interest.html`, 기업제안서 열람→`corporate-report.html`).
- 하단에 "공개 웹자료 기반 위치 참고도이며, 세부 위치와 조건은 상담 시 최신 자료 기준으로 확인됩니다." 고지문을 넣었습니다.
- 금지 표현("SK하이닉스 공식", "지정 숙소", "전용 숙소", "정문 앞 확정") 재검사 완료 — 발견 없음. "주요 출입 동선 인근", "상업시설용지 E2-1·E2-2 블록" 등 완화된 표현만 사용했습니다.
- **향후 실제 현장 위치도 이미지(항공사진/공식 배치도 등)를 합법적으로 확보하면**, `assets/location-map.webp`로 저장한 뒤 `.location-diagram-card` 안의 `<svg>...</svg>` 블록을 `<img src="assets/location-map.webp" alt="...">`로 교체하는 것만으로 두 페이지 모두 대응 가능하도록 마크업을 단순하게 유지했습니다. 외부 원본 이미지를 그대로 가져다 쓸 경우, 출처와 저작권을 먼저 확인해야 합니다.
- 참고한 근거(직접 인용/복사 없음, 사실관계 참고용): 공개 분양 안내 사이트의 "용인 반도체클러스터 핵심 상업지구 E2-1, E2-2 블록" 표기, 산군의 "용인 반도체클러스터 일반산업단지 상업시설용지 E2-2 오피스텔" 현장정보(대지면적 7,062㎡ 등), 인터넷 이미지 검색에서 확인되는 용인 반도체클러스터·SK hynix·서울~세종고속도로·남용인IC 예정 광역 위치 관계.

## 연락처

원삼 센트레빌 퍼스트원 현장 안내  
1644-6873  
  
wonsam-firstone.co.kr

## 2026-07-07 의향서 접수 및 관리자 기능 복구

### 접수 기능

- 개인 사전의향서: `pre-interest.html` → `/api/interest-request`
- 기업의향서: `corporate-interest.html` → `/api/interest-request`
- 기업자료 요청: `corporate-request.html` → `/api/corporate-request`
- 제출 중 버튼 비활성화, 필수값 검증, 전화번호/이메일 기본 형식 검증, 성공/실패 안내 문구를 적용했습니다.
- 새 개인 사전의향서는 `type=personal_interest`, 기업의향서는 `type=corporate_interest`, 기업자료 요청은 `type=corporate_request`로 구분합니다.
- 기존 데이터 호환을 위해 관리자 화면에서는 과거 `pre_interest`도 개인 사전의향서로 함께 표시합니다.

### 관리자 페이지

- 관리자 경로: `/admin.html`
- 관리자 페이지는 관리자 이메일과 관리자 비밀번호를 함께 입력해야 목록을 조회합니다.
- 관리자 이메일 고정값: `yisim817@gmail.com`
- 관리자 비밀번호: Vercel 환경변수 `ADMIN_TOKEN` 값
- 서버 API는 POST body의 `email`이 `yisim817@gmail.com`인지 확인하고, `token`을 Vercel 환경변수 `ADMIN_TOKEN`과 비교합니다.
- 일반 방문자는 접수 목록을 볼 수 없고, API 직접 호출 시 토큰이 없거나 틀리면 401을 반환합니다.
- 관리자 화면에서 개인 사전의향서, 기업의향서, 기업자료 요청을 통합 목록으로 조회하고 유형 필터와 검색을 사용할 수 있습니다.
- 관리자 이메일은 코드에 고정되어도 되지만, `ADMIN_TOKEN`은 절대 코드나 문서에 직접 넣지 않습니다.

### Vercel 환경변수

실제 값은 GitHub에 커밋하지 않습니다.

- `ADMIN_TOKEN`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

### 배포 전 테스트

- `pre-interest.html`에서 이름/전화번호/이메일 입력 후 접수 성공 메시지 확인
- `corporate-interest.html`에서 기업명/담당자명/전화번호/이메일 입력 후 접수 성공 메시지 확인
- `corporate-request.html`에서 기업자료 요청 접수 성공 메시지 확인
- `/api/admin-requests`와 `/api/admin-interest-requests`가 인증값 없이 401을 반환하는지 확인
- `/admin.html`에서 잘못된 이메일 또는 잘못된 비밀번호 입력 시 "관리자 인증에 실패했습니다."가 표시되는지 확인
- `/admin.html`에서 `yisim817@gmail.com`과 올바른 `ADMIN_TOKEN` 입력 후 3종 접수 목록이 최신순으로 표시되는지 확인
- 모바일에서 폼과 관리자 카드 목록이 깨지지 않는지 확인

## 2026-07-07 긴급 운영 전환: 무환경변수 이메일 접수 모드

현재 운영 모드: **무환경변수 이메일 접수 모드**

- 접수 이메일: `yisim817@gmail.com`
- 접수 방식: `FormSubmit`을 통해 개인 사전의향서, 기업 의향서, 기업자료 요청이 이메일로 전달됩니다.
- 개인 사전의향서: `pre-interest.html` → `https://formsubmit.co/yisim817@gmail.com`
- 기업 의향서: `corporate-interest.html` → `https://formsubmit.co/yisim817@gmail.com`
- 기업자료 요청: `corporate-request.html` → `https://formsubmit.co/yisim817@gmail.com`
- 기존 Supabase API 파일은 삭제하지 않았으며, 현재 실사용 폼에서는 호출하지 않습니다.
- 첫 FormSubmit 사용 시 `yisim817@gmail.com`으로 활성화 확인 메일이 올 수 있습니다. 해당 메일에서 활성화를 완료해야 접수가 정상 전달됩니다.

### 관리자 페이지

- `admin.html`은 DB 목록 조회 화면이 아니라 이메일 접수 관리 안내 페이지로 운영합니다.
- 관리자 확인 후 Gmail 검색/라벨 관리 방법과 접수 테스트 링크를 보여줍니다.
- 실제 접수자 개인정보 목록은 관리자 페이지에 노출하지 않습니다.

### 향후 Supabase DB 저장 모드 재활성화

DB 저장 모드로 다시 전환하려면 아래 Vercel 환경변수를 Production에 설정하고, `script.js`의 이메일 접수 모드 비활성화 및 폼 action 복구가 필요합니다.

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_TOKEN`

## 2026-07-07 사업계획서 발췌자료 기반 상가·근린생활시설 보강

- 고객제안서/기업제안서 PDF는 홈페이지 반영용이 아니라 문의고객·방문고객·기업 담당자에게 개별 발송하는 자료로 별도 운영합니다.
- 이번 홈페이지 보강은 `원삼센트레빌_기업제안서용_핵심페이지_Claude업로드.pdf`와 `원삼센트레빌_기업제안서용_핵심페이지_선별메모.md`, 기존 `assets/images/business-plan/` 이미지 기준으로 진행했습니다.
- `index.html`에 `반도체클러스터 안의 근린생활시설` 섹션을 추가해 오피스텔 2,320실과 지상 1층~3층 근린생활시설의 복합상품 구조를 설명했습니다.
- 상업용지비율 약 0.75%, 당 사업지 E2-1·E2-2 비율 약 0.34%, E2-1 근린생활시설 162호·약 2,515평, E2-2 근린생활시설 162호·약 2,552평, 총 324호 계획을 참고자료로 반영했습니다.
- `corporate-report.html`에는 기업 담당자가 볼 수 있는 근린생활시설 검토 포인트를 추가했습니다.
- `intelligence-report.html`에는 상업용지 희소성 분석과 근린생활시설 배후수요 검토 섹션을 보강했습니다.
- 의향서 운영 모드는 FormSubmit 이메일 접수이며, 관리자 페이지는 Gmail 접수 관리 안내 방식입니다.
- 홈페이지 연락처 기준은 `이종석 대표 / 1644-6873 / 010-3138-1712 / yisim817@gmail.com / www.wonsam-firstone.co.kr`입니다.
- Supabase DB 관리자 기능은 보류 상태입니다.

### CTA 노출 정리

- `index.html` 상단 CTA는 `고객 상담 / 고객의향서`와 `기업 상담 / 기업의향서` 2개 선택 카드로 단순화했습니다.
- 고객 CTA는 `pre-interest.html`, 기업 CTA는 `corporate-interest.html`로 연결합니다.
- `index.html` 본문 반복 CTA는 줄였고, 상가·근린생활시설 섹션에는 `상가 상담 문의` 보조 CTA 1개만 남겼습니다.
- 기업자료 요청은 `corporate-report.html` 또는 기업 전용 페이지 내부 보조 동선으로 유지합니다.

## 2026-07-08 호실타입/근린생활시설 상세페이지 분리, 입지·수요/분양전략 섹션 삭제

메인페이지(`index.html`)의 정보량을 줄이고, "설계" 메뉴에서 이미 적용한 "상단배너 메뉴 → 전용 상세페이지" 패턴을 근린생활시설·호실타입에도 동일하게 적용했습니다.

- **신규 상세페이지 2개 생성**: `neighborhood-commerce.html`(근린생활시설), `unit-types.html`(호실타입). 둘 다 `design.html`과 동일한 표준 헤더/모바일 메뉴/푸터/스크립트 구조를 그대로 사용하며, `theme-airbnb` 테마입니다.
  - `neighborhood-commerce.html`: `index.html`에 있던 `commerce-metric-grid`(E2-1/E2-2/TOTAL/LAND RATIO 4개 지표)와 `commerce-detail-grid`(배후 체류 수요/업종 검토/검토 유의사항 3개 카드)를 그대로 옮겼습니다.
  - `unit-types.html`: `index.html`에 있던 `unit-type-grid`(A~F 6개 타입 카드, 전용/공급/계약면적 표)와 하단 고지문을 그대로 옮겼습니다. 실수·면적 수치는 전혀 변경하지 않았습니다.
- **상단 메뉴 링크 갱신**: 8개 HTML 파일(`index.html`, `corporate-data.html`, `corporate-interest.html`, `corporate-report.html`, `corporate-request.html`, `design.html`, `intelligence-report.html`, `pre-interest.html`) 전체의 데스크톱 네비게이션과 모바일 메뉴에서 "근린생활시설"과 "호실타입" 링크가 `neighborhood-commerce.html`, `unit-types.html`을 직접 가리키도록 통일했습니다(이전에는 `index.html` 내부 앵커였습니다).
- **`index.html`에서 4개 섹션 제거**:
  - `#neighborhood-commerce`, `#unit-types` — 위 2개 상세페이지로 이동했으므로 원본은 삭제.
  - `#analysis`(입지·수요 요약 카드 4개 + 연결 모달 4개) — **삭제만 하고 이동하지 않음**. 사용자 지시에 따른 것이며, 상세페이지 신규 생성 없음.
  - `#strategy`(분양전략 · 검토 절차 3단계) — **삭제만 하고 이동하지 않음**. 대체 콘텐츠 없음.
- 삭제 후 `index.html`의 본문 순서는 `hero → 사업개요 → 상담 유형 안내 → 유의사항 → footer`로 단순화되었습니다.
- 삭제된 4개 섹션이 참조하던 이미지 파일(`assets/images/business-plan/final/*.webp`)은 `intelligence-report.html`에서 동일 이미지를 계속 사용 중이므로 삭제하지 않았습니다.
- 사이트 전체 grep으로 `#analysis`, `#strategy`, `#neighborhood-commerce`, `#unit-types`, `locationSummaryModal` 잔여 참조가 없음을 확인했습니다. Node 스크립트로 `index.html`의 태그(`section`/`div`/`article`/`main`/`header`/`footer`/`nav`) 열림/닫힘 개수가 모두 일치함을 확인했습니다.
- 브라우저(로컬 `npx serve`, 포트 4502)로 `index.html`, `neighborhood-commerce.html`, `unit-types.html` 3개 페이지의 렌더링과 콘솔 에러 없음을 확인했습니다.
- 사용자가 "추후 재작업지시내리겟다"(추가 지시는 나중에)라고 명시했으므로, 이번 라운드는 위 범위로 한정하고 다른 섹션은 건드리지 않았습니다.

## 2026-07-08 (3차) 상단배너 정리, 기업 검토 자료실 삭제, 입지·설계 실사진 교체

사업계획서 발췌 PDF(`원삼센트레빌_기업제안서용_핵심페이지_Claude업로드.pdf`, 실제 35페이지 — 첨부 시스템이 85페이지로 오탐)를 Windows 내장 WinRT `Windows.Data.Pdf` API(PowerShell)로 페이지별 렌더링해, 사업계획서 원본 화면만 사용해 입지·설계 자료를 교체했습니다. Python/Pillow, poppler, ImageMagick 등 외부 도구는 설치하지 않았습니다.

### 상단 메뉴 변경
- "근린생활시설" 왼쪽에 **분양안내** 메뉴를 추가했습니다. 상세페이지가 아직 없어 `<a>` 링크가 아닌 `<span class="nav-link-soon">분양안내<em class="nav-soon-badge">준비중</em></span>`로 처리해 `href="#"` 없이 "추후 연결 예정"만 표시합니다.
- "현장검토자료"(기업 검토 자료실, `corporate-data.html`) 메뉴를 10개 페이지(데스크톱+모바일 nav) 전체에서 삭제했습니다. `corporate-report.html`, `intelligence-report.html`의 `corporate-data.html`행 CTA 버튼도 함께 제거했습니다.
- `corporate-data.html` 파일 자체는 삭제하지 않았습니다(신중한 삭제 원칙) — 공개 nav/버튼 연결만 제거해 URL을 직접 아는 경우에만 열립니다.
- `admin.html`, `consultation.html`은 원래도 "메인으로"만 있는 축소 nav라 이번 변경 대상이 아닙니다.

### 입지·수요 (`intelligence-report.html`) 교체
- 기존 AI 합성 인포그래픽 4장(`fab-dormitory-e21-relation.webp` 등, `assets/images/business-plan/final/`)을 삭제했습니다.
- PDF에서 렌더링한 실제 사업계획서 페이지 5장을 JPG로 변환해 `assets/images/business-plan/location/`에 저장하고 반영했습니다: 광역 위치도(원본 19p), 지역 위치도/지구단위계획(원본 18p), 세부 위치도(원본 21p), 산업단지 접근성-철도망(원본 22p), 산업단지 접근성-고속도로·IC(원본 23p).
- 이 PDF 발췌본에는 "FAB·기숙사·E2-1 관계도"에 해당하는 페이지가 없어 임의로 만들지 않았고, 안내 문구로 그 사실을 명시했습니다.
- "상업용지 희소성 분석"(텍스트/수치 데이터 섹션)은 이미지가 아니므로 그대로 유지했습니다.

### 설계 (`design.html`) 교체
- 이전 라운드에 "준비 중" 상태였던 자리에, PDF에서 렌더링한 실제 설계도면 5장을 JPG로 변환해 `assets/images/business-plan/design/`에 저장하고 반영했습니다: 지하 1층(B1, 원본 46p), 지상 1층(원본 47p), 지상 2층(원본 48p), 지상 3층(원본 49p), 오피스텔 기준층(원본 50p).
- 이 PDF 발췌본에는 별도의 배치도·입면도·단면도·세부 주차동선 도면이 없어 임의로 만들지 않았고, 안내 문구로 그 사실을 명시했습니다. 조감도나 프로젝트 개요 이미지를 설계도로 둔갑시키지 않았습니다.

### 공통 처리
- 두 페이지 모두 기존 `.design-drawing-grid`/`.design-drawing-card` 컴포넌트(PC 2열 → 태블릿 2열 → 모바일 1열, `object-fit: contain`)를 재사용해 새 CSS 없이 반응형을 확보했습니다.
- 이미지 10장 모두 `zoomable-image image-zoom-trigger` + `media-modal` 패턴으로 클릭 확대를 적용했습니다.
- FormSubmit, `contact.js`, 대표번호 `1644-6873`/`tel:16446873`은 전혀 변경하지 않았습니다.
- 12개 파일 전체 태그 짝(section/div/article/span/strong/p/h1~h3/figure) 일치 확인, `href="#"` 0건 확인, 브라우저(1440px/390px)에서 이미지 로드·확대모달·nav 순서·콘솔 에러 없음을 확인했습니다.

## Supabase 일시중지 대응 + 광고홍보 자료실 (`feature/promotion-readonly-and-supabase-maintenance`)

### Supabase 사용 현황 점검 결과

`wonsam-firstone` Supabase 프로젝트(ref `imtkbgdrvwmgvolzscxt`)가 7일 이상 활동 부족으로 일시중지 안내를 받았습니다. 점검 결과 **현재 이 프로젝트는 실제 운영에서 전혀 사용되지 않고 있었습니다**:

- `pre-interest.html`/`corporate-interest.html`/`corporate-request.html`은 2026-07-07 라운드부터 `https://formsubmit.co/yisim817@gmail.com`으로 직접 제출되는 이메일 접수 방식으로 운영 중이며, `script.js`에는 `/api/*` fetch 호출이 없습니다.
- `admin.html`도 `/api/admin-requests`/`/api/admin-interest-requests`를 호출하지 않고 Gmail 검색 안내만 표시합니다.
- `corporate_requests`, `interest_requests` 두 테이블 모두 행(row)이 0개였습니다.
- 즉 Supabase가 일시중지되어도 현재 라이브 사이트의 어떤 기능도 깨지지 않는 상태였습니다.

**일시중지 조건**: Supabase 무료(Free) 플랜은 프로젝트에 API/DB 요청이 7일 이상 전혀 없으면 자동으로 일시중지(paused) 상태가 됩니다. 삭제가 아니라 일시중지이며, Supabase 대시보드(project → 상단 배너의 "Restore project" 버튼)에서 수동으로 재개할 수 있습니다. 데이터는 유지됩니다.

### 적용한 대응 방식

의미 없는 요청을 반복해 정책을 우회하는 방식 대신, 이번 라운드에 추가하는 **광고홍보 자료실 기능이 같은 Supabase 프로젝트(DB 테이블 + Storage 버킷)를 실제로 다시 사용**하도록 만들어 근본적으로 활동을 발생시켰습니다. 다만 광고홍보 자료실이 실제로 자주 쓰이기 전 공백을 메우기 위해, 가벼운 Health Check도 함께 추가했습니다.

- **API**: `api/health/supabase.js` — `promotion_files` 테이블에서 `select=id&limit=1` 만 조회하는 최소 요청. 개인정보 조회 없음, service_role 키는 서버 함수 내부에서만 사용, 실패 시 502 + 최소 로그(에러 메시지만, 키/개인정보 없음)만 남깁니다.
- **실행 방식**: Vercel Cron (`vercel.json`의 `crons` 항목, 스케줄 `0 3 * * *` = 매일 1회). GitHub Actions나 별도 서버 없이 기존 Vercel 프로젝트 설정만으로 동작하고, Hobby 플랜에서도 하루 1회 크론은 지원되어 유지보수가 가장 간단합니다.
- 이 Cron 엔드포인트는 인증 없이 공개되어 있지만 `{ok:true/false}` 외에는 아무것도 반환하지 않아 노출 위험이 없습니다.

### 광고홍보 자료실

관리자가 기업제안서/고객제안서 PDF(또는 PPT/PPTX)를 업로드하면, 외부 사용자는 `promotion.html` → `promotion-viewer.html`에서 온라인 열람만 할 수 있습니다.

**페이지 구성**
- `promotion.html`: 기업제안서/고객제안서 카드 목록 (제목/설명/게시일/페이지수/게시상태/자료 열람 버튼). `/api/promotion-files`에서 공개(is_published=true) 자료 메타데이터만 불러옵니다.
- `promotion-viewer.html?id=<uuid>`: PDF.js(cdnjs CDN, v3.11.174 — pdf.js 4+는 ES 모듈(.mjs) 전용으로 바뀌어 이 사이트의 plain `<script>` 태그 방식과 맞지 않아, 클래식 UMD 빌드가 남아있는 3.x 버전을 사용) 기반 읽기 전용 뷰어. 페이지 이동/확대·축소/전체화면을 지원하고, 다운로드·인쇄·원본 링크 UI가 없습니다. `Ctrl+S`/`Ctrl+P`를 차단하며, 우클릭/드래그/복사 차단은 이미 `script.js`에 있는 사이트 전역 처리를 그대로 재사용합니다.
- 상단 메뉴 "광고홍보"를 기존 11개 페이지 전체(분양안내~설계 순서 유지, 맨 끝에 추가)에 붙였습니다.

**데이터/저장 구조**
- Supabase 테이블 `promotion_files` (RLS 활성화, 정책 없음 — 기존 두 테이블과 동일하게 service_role 키를 쓰는 서버 함수만 접근 가능): `id, category(corporate|customer), title, description, storage_path, original_filename, mime_type, file_size, page_count, version, is_published, display_order, published_at, created_at, updated_at, created_by`.
- Supabase Storage 버킷 `promotion` (비공개, PDF만 허용, 50MB 제한), 경로 규칙 `corporate/<timestamp>-<파일명>.pdf`, `customer/<timestamp>-<파일명>.pdf`.
- 외부 공개 API(`/api/promotion-files`)는 `storage_path`를 절대 응답에 포함하지 않습니다. 실제 열람은 `/api/promotion-view-url?id=`이 자료가 `is_published=true`인지 서버에서 재확인한 뒤 **5분짜리 Signed URL**을 그때그때 발급하는 방식이며, Storage 원본 경로가 클라이언트에 직접 노출되지 않습니다.
- 새 자료를 공개로 게시하면 같은 카테고리의 기존 게시본은 자동으로 `is_published=false`로 전환됩니다(카테고리별 대표 게시본 1개 원칙). 이전 버전은 삭제되지 않고 관리자 화면에서 비공개 상태로 남아 다시 공개 전환하거나 완전히 삭제할 수 있습니다.

**관리자 업로드 (`admin.html` 하단 "광고홍보자료 관리")**
- 기존 관리자 로그인(이메일 `yisim817@gmail.com` + `ADMIN_TOKEN`)을 그대로 재사용합니다. 다만 새 관리 API들은 매 요청마다 실제 `ADMIN_TOKEN` 값을 서버에서 검증하므로(`crypto.timingSafeEqual`), 로그인 화면에 올바른 비밀번호를 입력해야 업로드·삭제 등이 정상 동작합니다 (기존 관리자 대시보드 진입 자체는 이메일만 확인하는 느슨한 방식이 그대로 남아 있어, 잘못된 비밀번호로도 대시보드 화면 자체는 보이지만 광고홍보자료 관리 기능만 401로 실패합니다 — 기존 다른 섹션의 동작은 전혀 바꾸지 않았습니다).
- 업로드 시 제목/설명 입력 후 파일(PDF 권장, PPT/PPTX 가능)을 선택하면 됩니다. PDF는 그대로 저장되고, PPT/PPTX는 서버에서 CloudConvert API로 PDF 변환을 시도합니다.
- 공개/비공개 전환, 삭제, 미리보기(새 창)가 각 자료 카드에 있습니다.
- 파일 확장자와 실제 파일 시그니처(매직 바이트: `%PDF-`, ZIP, OLE)를 함께 검사해 확장자를 속인 업로드를 차단합니다.

**PPT/PPTX 자동 변환 — CloudConvert 필요 (사용자 확인 후 설정 필요)**
- Vercel 서버리스 환경에는 LibreOffice 같은 무거운 변환기를 직접 설치할 수 없어, 외부 변환 API인 **CloudConvert**(https://cloudconvert.com)를 서버 함수에서 호출하는 방식으로 구현했습니다.
- 필요한 신규 Vercel 환경변수: `CLOUDCONVERT_API_KEY` (CloudConvert 가입 후 대시보드에서 API 키 발급, 무료 티어로 하루 약 25분 변환 시간 제공 — 가끔 있는 관리자 업로드에는 충분합니다). 이 키는 서버 함수에서만 쓰이며 클라이언트에 노출되지 않습니다.
- **이 환경변수를 설정하기 전까지는 PDF 업로드만 가능**하고, PPT/PPTX 업로드 시 "프레젠테이션 원본은 PDF로 변환한 후 업로드해 주십시오"라는 안내 메시지가 뜨며 안전하게 실패합니다(서버 오류가 아니라 명확한 안내).
- 변환 작업은 최대 60초까지 기다리도록 `vercel.json`에 `maxDuration: 60`을 설정했습니다. Vercel Hobby 플랜의 최대 허용치이며, 그보다 오래 걸리는 매우 큰 파일은 실패할 수 있습니다(그 경우도 PDF로 직접 변환 후 업로드하면 우회됩니다).

**업로드 용량 한계 (알려진 제약)**: 현재 업로드는 파일을 base64로 인코딩해 JSON으로 전송하는 방식이라, Vercel 서버리스 함수의 요청 본문 한도(약 4.5MB)에 걸려 실질적으로 **원본 파일 약 3MB 안팎까지만** 안정적으로 업로드할 수 있습니다. 이번에 등록하는 두 파일(1.4MB, 0.35MB)은 문제없지만, 추후 더 큰 PDF를 올려야 한다면 Supabase Storage에 브라우저가 직접 업로드하는 signed-upload 방식으로 바꾸는 추가 작업이 필요합니다.

### 최초 게시 자료 (사용자가 직접 업로드해야 함)

보안 원칙상(ADMIN_TOKEN은 사용자만 알고 있어야 함) 이 두 파일의 업로드는 **제가 대신 실행할 수 없습니다**. Preview 승인 후 아래 순서로 직접 업로드해 주세요.

1. `admin.html` 접속 → 관리자 이메일/비밀번호 로그인
2. "광고홍보자료 관리" → 기업제안서 카드의 업로드 폼에 `기업검토자료휴메인10p.pdf`(10페이지) 첨부, 제목 예: "기업제안서" 입력 후 업로드
3. 같은 화면 고객제안서 카드에 `원삼센트레빌_5P_광고제안서_최종본.pdf`(5페이지) 첨부, 제목 예: "고객제안서" 입력 후 업로드
4. `promotion.html`에서 카드 2개가 정상 표시되는지, "자료 열람" 클릭 시 뷰어가 정상 작동하는지 확인

### 필수 환경변수 정리 (기존 + 신규)

| 변수명 | 상태 | 비고 |
|---|---|---|
| `SUPABASE_URL` | 기존 | 변경 없음 |
| `SUPABASE_SERVICE_ROLE_KEY` | 기존 | 변경 없음 |
| `ADMIN_TOKEN` | 기존 | 변경 없음, 광고홍보 관리 API도 동일 값 재사용 |
| `CLOUDCONVERT_API_KEY` | **신규** | PPT/PPTX 자동 변환에만 필요. 없어도 PDF 업로드는 정상 동작 |

### 장애 발생 시 확인 순서

1. `promotion.html`에서 카드가 안 보이면 → `/api/promotion-files` 응답 상태 확인 (500이면 `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` 미설정 가능성)
2. 뷰어가 안 열리면 → `/api/promotion-view-url?id=...` 응답 확인 (404면 해당 자료가 비공개 상태, 502면 Storage 접근 실패)
3. 관리자 업로드가 401로 실패하면 → 로그인한 비밀번호가 실제 `ADMIN_TOKEN`과 일치하는지 확인 (대시보드 진입 자체는 이메일만 확인하므로 로그인 성공 여부와 무관하게 따로 확인 필요)
4. PPT/PPTX 업로드가 503으로 실패하면 → `CLOUDCONVERT_API_KEY` 미설정. PDF로 변환 후 업로드하거나 키를 설정
5. Supabase 프로젝트 상태가 궁금하면 → `GET /api/health/supabase` 응답 확인, 또는 Supabase 대시보드에서 프로젝트 상태 확인

### Supabase 재개 방법 (일시중지된 경우)

1. https://supabase.com/dashboard 로그인 → `wonsam-firstone` 프로젝트 선택
2. 상단에 "Project is paused" 배너가 보이면 "Restore project" 클릭
3. 재개는 보통 1~2분 내 완료되며, 완료 후 `GET /api/health/supabase`로 정상 응답을 재확인

### 무료 플랜 정책 변경 시 확인할 항목

- Supabase 무료 플랜의 프로젝트 개수 제한, 일시중지 정책(비활성 기간), Storage 용량 한도가 변경되었는지 Supabase 공지사항 확인
- CloudConvert 무료 티어의 월/일 변환 시간 한도가 변경되었는지 확인
- Vercel Hobby 플랜의 Cron 작업 개수/주기 제한, 서버리스 함수 실행시간 한도가 변경되었는지 확인
