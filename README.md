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
- 기업 제안서 원본 PDF는 공개 assets에서 제거되어 있으며, 어떤 페이지에서도 직접 링크되지 않습니다. `corporate-report.html`은 HTML 리딩 페이지로만 운영합니다.
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

## 연락처

HUMANE  
010-3138-1712  
yisim817@gmail.com  
www.humanekorea.co.kr
