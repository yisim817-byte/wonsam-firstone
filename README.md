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

## 운영 메모

- 본 페이지는 사전검토용 참고 안내 페이지입니다.
- 상담폼 버튼의 `href="#"` 위치에 Google Form 링크를 삽입하면 됩니다.
- 기업 제안서 원본 PDF는 무단 사용 방지를 위해 공개 assets에서 제거함. 홈페이지에서는 직접 다운로드가 아닌 '제안서 열람 요청' 방식으로 전환함. 추후 Google Form 연결 후 담당자 확인 방식으로 제공 예정.
- 제안서 관련 버튼은 Google Form 신청 방식으로 전환 예정이며, 현재는 Form 링크 확정 전이므로 `href="#"` 임시 상태입니다.
- 실제 Form 링크 확정 후 `index.html`의 `분양자료 요청`, `가격 및 잔여호실 문의`, `기업 제안서 열람 요청` 버튼 `href`에 반영하세요.
- 홈페이지 방향을 기업 전용에서 일반고객·기업고객 통합형으로 수정했습니다.
- 일반 실거주, 투자 검토, 인근 근무자 주거 수요를 함께 반영했습니다.
- 기업숙소, 직원숙소, 법인 임차 수요는 별도 하위 타겟으로 유지합니다.
- 홈페이지 상단부에 프로젝트 개요 섹션을 추가해 위치, 상품 성격, 주요 수요, 가격대, 검토 포인트를 안내합니다.
- 세부 주소, 인허가상 상품 유형, 세대수 또는 규모, 가격대, 분양조건은 확인 필요 항목으로 남겨두었습니다.
- 업로드 콘텐츠 적용 상태를 점검하고 분석 PDF, 광고 슬라이드 PDF, 광고 영상, 팟캐스트, 인포그래픽 이미지를 자료 섹션에 반영했습니다.
- 동영상 외 슬라이드, 팟캐스트, 인포그래픽 연결 상태를 확인했습니다.
- NotebookLM 웹사이트 HTML 자료는 공개 전 표현 검수가 필요해 링크하지 않고 검수 필요 상태로 표시했습니다.
- NotebookLM 참고 텍스트 파일이 준비되면 `assets/wonsam-firstone-source-note.txt` 파일로 업로드하고 해당 카드 링크를 연결하세요.
- 기업 제안서는 계속 공개 다운로드 금지이며, Google Form 링크 확정 전까지 제안서 버튼은 `href="#"` 상태를 유지합니다.
- 홈페이지 자료 운영 정책은 공개 다운로드 금지입니다.
- 모든 자료는 홈페이지 내 열람, 상담폼 접수, 이메일 개별 안내 중심으로 운영합니다.
- 기업 제안보고서는 다운로드가 아닌 리딩 전용 상세페이지 `corporate-report.html`로 전환했습니다.
- 일반고객과 기업고객 상담 및 자료 요청은 `consultation.html`에서 안내합니다.
- 기업유치보고서 및 기업 제안자료는 상담폼 접수 후 이메일로 개별 발송 예정입니다.
- Google Form 링크 확정 전까지 관련 버튼은 `href="#"` 또는 `consultation.html` 안내 페이지로 연결합니다.
- 정적 사이트 특성상 공개 assets에 있는 파일은 URL을 알면 접근될 수 있으므로 완전한 다운로드 차단에는 한계가 있습니다.
- 완전 차단이 필요할 경우 인증 기반 뷰어, 서버 기반 접근제어, 제한 열람 플랫폼을 검토해야 합니다.
- 긴급 수정으로 메인 배너 클릭 동선을 실제 상세페이지로 연결했습니다.
- `consultation.html`은 일반고객 상담, 기업수요 검토 신청, 자료 요청 안내, 상담 접수 항목 표를 포함한 상세페이지로 보강했습니다.
- `corporate-report.html`은 기업수요 검토 리딩 전용 상세페이지로 보강했습니다.
- Google Form 링크 확정 전까지 내부 상세페이지 중심으로 동선을 구성합니다.
- 자료 버튼과 사용자 화면의 직접 파일 링크는 금지합니다.
- 기업유치보고서와 세부 자료는 상담 접수 후 이메일 개별 제공 방식으로 유지합니다.
- SK하이닉스 등 특정 기업명이 공식 제휴·지정·보장으로 오해되지 않도록 표현에 유의하고, 방어적 고지 문구 대신 하단에 짧은 참고 안내만 유지하세요.

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
