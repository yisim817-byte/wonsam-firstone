# WONSAM_FIRSTONE_HANDOFF

## Current Scope

- Project: Wonsam Centreville First One static landing page
- Repository: https://github.com/yisim817-byte/wonsam-firstone
- Final domain: https://www.wonsam-firstone.co.kr
- Base domain: https://wonsam-firstone.co.kr
- Proposal PDF status: removed from public assets, not restored
- Representative phone number: issued and in use — `010-3138-1712`

## Files Checked

- `index.html`
- `style.css`
- `script.js`
- `README.md`

## Source Materials Section Added

Added a source materials section and a card-based infographic section while keeping the existing page structure.

기업 제안서 원본 PDF는 무단 사용 방지를 위해 공개 assets에서 제거함. 홈페이지에서는 직접 다운로드가 아닌 '제안서 열람 요청' 방식으로 전환함. 추후 Google Form 연결 후 담당자 확인 방식으로 제공 예정.

## General And Corporate Customer Reframe

### Current Direction

- The Wonsam First One homepage is not a corporate-only page.
- The page targets both individual customers and corporate customers.
- Individual customer targets: 실거주, 인근 근무자 주거, 가족 거주, 투자 검토.
- Corporate customer targets: 기업숙소, 직원숙소, 법인 임차.
- Copy should remain balanced so general customers do not feel excluded.

### Copy Guidance

- Keep the corporate housing angle as a sub-target, not the whole page center.
- Include general consultation CTAs such as 가격, 잔여호실, 계약조건, 분양자료 요청.
- Keep the company proposal request separate from general consultation.
- Use confirmed source material only for price, remaining units, contract terms, address, and scale.
- Do not add unverified numbers or conditions.

## Read-only Request-based Resource Flow

### Emergency Fix Standard

- Simple file creation is not considered complete.
- Main page banners and CTAs must move users to real detail pages.
- `consultation.html` must include both individual-customer and corporate-customer consultation paths.
- `corporate-report.html` must be a readable report-style detail page, not a short placeholder summary.
- All resources should be operated as reading, in-page playback, or consultation request flows.
- Until the Google Form is confirmed, route users to internal detail pages or email-based inquiry paths.
- Direct file links should be removed from user-facing screens.

### Current Direction

- The homepage targets both individual customers and corporate customers.
- Resources are operated as read-only or request-based access, not public download flows.
- `consultation.html` has been implemented as a detail page for general consultation, corporate demand review, material request guidance, and expected input fields.
- `corporate-report.html` has been implemented as a report-style detail page with overview, location review, individual demand, corporate demand, material delivery, and caution sections.
- Company attraction reports and company proposal materials should be sent individually by email after consultation form submission.
- Direct PDF links are prohibited in public page CTAs.
- Original PDF exposure in public assets should be avoided.

### Static Site Limitation

- A static site cannot guarantee 100% file access prevention if source files are placed in public assets.
- Current implementation minimizes exposure by removing direct file links and avoiding proposal PDF assets.
- Full prevention requires an authenticated viewer, server-side access control, or a restricted external viewing platform.

### Remaining Resource Flow Tasks

- Create the final Google Form.
- Connect consultation and material request buttons to the confirmed Form URL.
- Organize the email delivery process for company attraction reports and detailed materials.
- Re-check all pages for direct PDF links.
- Review whether resource PDFs should be converted into HTML or image-based reading pages.
- Keep `corporate-report.html` as a no-file-link report page unless an approved restricted viewer is introduced.
- Keep video/audio controls configured to reduce visible save actions where browser support allows.
- Final-check mobile click paths.
- Update `README.md` and this handoff when final links are confirmed.

## Project Overview And Content Audit

### Completed In Current Update

- Added a project overview section near the top of `index.html`.
- Added overview fields for location, product character, target demand, price range, review points, and material access method.
- Kept unclear values as `확인 필요` instead of inventing numbers or conditions.
- Reorganized the source materials section as `검토 자료 모음`.
- Audited uploaded content and connected available files.
- Kept the company proposal PDF blocked from direct public download.

### Overview Fields Added

- Location: `경기도 용인시 처인구 원삼면 일대`
- Product character: `주거형 상품 / 일반·기업 수요 검토 가능 상품`
- Target demand: 실거주, 인근 근무자 주거, 가족 거주, 투자 검토, 기업숙소, 직원숙소, 법인 임차
- Price range: `가격 정보 확인 필요`
- Review points: 반도체 배후수요, 직주근접 가능성, 원삼 생활권, 일반 주거 수요, 기업숙소 활용성, 법인 수요 대응 가능성
- Material access: request-based access for the company proposal

### Must Confirm Before Final Publication

- Actual detailed address
- Official product type / permitted use
- Unit count or project scale
- Price range
- Sale conditions
- Uploaded slide filename
- Podcast filename
- Infographic filename
- Website material filename

Do not add unverified numbers, prices, conditions, or official-looking claims. Leave unclear items as `확인 필요`.

### Added Assets

- `assets/wonsam-firstone-analysis.pdf`
- `assets/wonsam-firstone-ad-slide.pdf`
- `assets/wonsam-firstone-ad-video.mp4`
- `assets/wonsam-firstone-podcast.m4a`
- `assets/wonsam-firstone-infographic.png`

### Connected Material Flows

- `입지·상품 분석자료` -> `corporate-report.html`
- `광고 슬라이드 자료` -> `consultation.html`
- `광고 영상` -> inline video player with `controlsList="nodownload"`
- `팟캐스트 자료` -> inline audio player with `controlsList="nodownload"`
- `인포그래픽` -> in-page `#infographic` section
- `기업수요 검토 보고서` -> `corporate-report.html`
- `상담 및 자료 요청` -> `consultation.html`

### Pending Material

- `NotebookLM 참고 텍스트`
  - Keep as `자료 준비 중` until `assets/wonsam-firstone-source-note.txt` is available.
- `NotebookLM 웹사이트 자료`
  - Uploaded `code_artifact.html` and `code_artifact (1).html` were checked but not linked because they need expression review before publication.
- Final Google Form URL
  - Keep request buttons as `href="#"` or route to `consultation.html` until the final URL is confirmed.

### Infographic Section

The infographic section now includes `assets/wonsam-firstone-infographic.png` plus the existing HTML/CSS summary cards.

## Google Form Link Follow-up (OBSOLETE — kept for history only)

> **This entire section describes an approach that was abandoned.** The Google Form
> plan below was replaced by the Supabase + Vercel Functions backend described in
> "HUMANE Brand Colors + Admin Backend". There are no `href="#"` placeholders left
> anywhere on the site — every CTA points to a real page. Do not act on anything in
> this section; it is left only so the reasoning trail isn't lost.

The Google Form URL should be applied only after the final form link is confirmed.

### `href="#"` Positions For Google Form

- Button text: `일반·기업 상담 요청`
  - Action after form URL is confirmed: replace `href="#"` with the final general consultation Form URL.
- Button text: `분양자료 요청`
  - Action after form URL is confirmed: replace `href="#"` with the final material request Form URL.
- Button text: `가격 및 잔여호실 문의`
  - Action after form URL is confirmed: replace `href="#"` with the final consultation Form URL.
- Button text: `기업 제안서 열람 요청`
  - Action after form URL is confirmed: replace `href="#"` with the final company proposal request Form URL.

### Consultation-Related Links And Buttons

- `index.html:29`
  - Text: `상담`
  - Current target: `#consult`
  - Type: desktop navigation link

- `index.html:43`
  - Text: `상담 신청`
  - Current target: `#consult`
  - Type: mobile navigation link

- Hero primary CTA
  - Text: `일반·기업 상담 요청`
  - Current target: `#consult`
  - Type: hero primary CTA button

- Hero material request CTA
  - Text: `분양자료 요청`
  - Current target: `#`
  - Type: hero material request CTA button

- Consultation section CTA
  - Text: `일반·기업 상담 요청`
  - Current target: `#`
  - Type: consultation form CTA button

Consultation-related link/button count: 5 total.

Class-based consultation CTA button count: 3 total.

- Hero - `일반·기업 상담 요청`
- Hero - `분양자료 요청`
- Consultation section - `일반·기업 상담 요청`

## Representative Phone Number Follow-up

Do not change the current phone number until the representative phone number is issued.

Positions to update after issuance:

- `index.html:257`
  - Current value: `<a href="tel:010-3138-1712">010-3138-1712</a>`
  - Update both the `tel:` value and the visible text.

- `index.html:283`
  - Current value: `<p>010-3138-1712</p>`
  - Update the visible footer phone number.

- `README.md:50`
  - Current value: `010-3138-1712`
  - Update the documentation contact number.

## Proposal PDF Access Follow-up (superseded — see status below)

> Updated status: the "Next Owner Tasks" below (create a Google Form) were never
> done and are no longer the plan — superseded by the Supabase + Vercel Functions
> backend. Current, accurate status:
> - Company proposal PDF direct download is blocked — confirmed, still true.
> - No direct proposal PDF link remains anywhere on the site — confirmed, still true.
> - Proposal-related buttons are **real links**, not `href="#"` — `corporate-report.html`
>   and `corporate-request.html` both exist and are fully wired up.
> - Corporate inquiries are collected via `corporate-request.html` → Supabase, not email-after-form.

The original company proposal PDF is no longer served from public assets and stays that way permanently.

Recommended review points (still valid):

- Do not restore the original proposal PDF to public assets without approval.
- Provide the proposal content individually only after a request is received and a company/담당자 is confirmed.

## Do Not Change Without Approval

- Homepage design
- PDF file
- DNS settings
- Domain settings
- Contact number before representative number issuance

## Design Rebuild (Airbnb / Notion split)

- `index.html` and `consultation.html` rebuilt in an Airbnb-style visual language (white canvas, Rausch-red CTA, rounded photo/card grid, pill summary bar). Tokens live under `body.theme-airbnb` in `style.css`.
- `corporate-report.html` and new `corporate-request.html` rebuilt in a Notion-style document/form language (warm canvas-soft background, blue pill CTA, hairline cards, tables). Tokens live under `body.theme-notion` in `style.css`.
- General-customer flow is phone-only (`tel:010-3138-1712` / `consultation.html`); corporate flow is report + request form (`corporate-report.html` / `corporate-request.html`). No forms are exposed to general customers.
- `corporate-request.html` originally submitted via `mailto:` — **this was replaced** in the next round by the Supabase + Vercel Functions backend described below. It now submits via `fetch('/api/corporate-request')`, not mailto.
- The old on-page rent/loan simulator section on `index.html` was removed — it wasn't part of the redefined customer journey and risked implying guaranteed returns.
- `assets/wonsam-firstone-ad-slide.pdf` and `assets/wonsam-firstone-analysis.pdf` are **not linked from any page** (no direct PDF links per policy). They are currently orphaned files in the repo — needs a decision: convert to an in-page HTML/image reading section, or remove from the repo entirely.
- `assets/wonsam-centreville-first-one-company-housing-proposal.pdf` remains deleted and was not restored.

## HUMANE Brand Colors + Admin Backend (this round)

- Pulled exact brand colors from the live `humanekorea.co.kr` site via computed styles: logo "H" = green `#017c2e`, logo "A" = orange `#fe6301`, ink `#111827`, muted `#6b7280`, hairline `#e5e7eb`. Both `theme-airbnb` and `theme-notion` in `style.css` now share this palette (`--primary` = orange for CTAs, `--accent` = green for labels/tags/checkmarks) instead of Airbnb red / Notion blue. No red or blue remains anywhere in `style.css`.
- Built a real submission backend instead of mailto: new Supabase project `wonsam-firstone` (ref `imtkbgdrvwmgvolzscxt`) with a `corporate_requests` table (RLS enabled, zero policies — only reachable via the service_role key from server-side code). `api/corporate-request.js` inserts rows; `api/admin-requests.js` requires a `Bearer <ADMIN_TOKEN>` header (compared with `crypto.timingSafeEqual`) and returns the list. `admin.html` is a password-gated page (`noindex`) that calls that endpoint — no secrets live in any HTML/JS shipped to the browser.
- **Action required from the user before this works in production:** add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `ADMIN_TOKEN` to the Vercel project's Environment Variables (see README.md "기업자료 요청 백엔드" section for exact steps). The service_role key must be copied from the Supabase dashboard directly — it was intentionally never printed in chat or committed to the repo.
- A separate, isolated Supabase project was created specifically for this (rather than reusing the existing "yisim817-byte's Project" that backs the main HUMANE site's `site_diagnoses`/`accounts` tables), to avoid mixing wonsam-firstone data with unrelated production data.
- Did not attempt to convert the 142-page proposal PDF (`원삼센트레빌_기업숙소_제안서_v3_표지최종_수정본.pdf`) into HTML content — `pdftoppm`/`poppler` isn't installed so page images couldn't be rendered, and `pdftotext` output was garbled (embedded font/CID issue). `corporate-report.html`'s hand-written sections already serve the "read-only" requirement; if the client wants the actual proposal book's content reproduced page-by-page, that needs a proper PDF text/image extraction pass done separately.

## Disclaimer Wording Policy Change (this round)

- Removed the "본 페이지는 공식 분양 홈페이지가 아닌 ...", "본 페이지는 SK하이닉스의 공식 안내 페이지가 아닙니다" defensive-disclaimer pattern from every page (`index.html`, `corporate-report.html`, `corporate-request.html`, `consultation.html`). The client felt it read as "this looks like an unofficial site" and undercut trust, especially on the corporate request page whose whole purpose is inviting a confident inquiry.
- Replaced with a short neutral note: "본 페이지의 정보는 상담 안내용 자료이며, 세부 조건은 상담 시 최신 자료 기준으로 확인됩니다." kept small in the footer only — no negative disclaimers near the hero, cards, or CTAs anymore.
- Genuinely useful consumer-protection language (수익/가치 상승 보장하지 않음, 가격·조건 변동 가능) was kept, just decoupled from the "not an official page" framing.
- Going forward: do not reintroduce "SK하이닉스 공식/지정/전용" or "확정/보장 수요" style phrasing anywhere — stick to descriptive language like "반도체 클러스터 배후수요", "인근 산업단지 근무자 주거 수요", "기업숙소 활용 가능성".
- The remaining hero mention "SK하이닉스 용인 반도체클러스터 정문권" (`index.html`) was rephrased to "용인 반도체클러스터 배후 생활권" — no company name in the hero anymore.

## Handoff Verification (this round — "집 컴퓨터" continuation check)

Confirmed before starting work: `git fetch origin` + `git pull origin main` showed the local clone already at `origin/main` HEAD, working tree clean, no uncommitted changes to report. Both baseline commits the user asked to verify (`0f6d476…` disclaimer cleanup, `ab672c2…` CTA link fix) are ancestors of HEAD — confirmed via `git merge-base --is-ancestor`. HEAD was actually one commit ahead of what the handoff prompt assumed (`0c810c0`, the SK Hynix hero-wording fix from the immediately preceding turn), so nothing was missed.

### Current implementation summary
- **General customers**: phone-only (`tel:010-3138-1712`), no forms, via `index.html` hero/CTA-split and `consultation.html`.
- **Corporate customers**: `corporate-report.html` (8-section HTML-only read briefing, no PDF) → `corporate-request.html` (company_name/phone/email required, purpose optional) → `POST /api/corporate-request` → Supabase `corporate_requests` table.
- **Admin review**: `admin.html` (password field, `noindex`) → `GET /api/admin-requests` with `Authorization: Bearer <token>` → server compares against `process.env.ADMIN_TOKEN` via `crypto.timingSafeEqual` → returns the row list only on match.
- No secrets anywhere in the repo. No `.env` file tracked. No `package.json`/`vercel.json` needed — Vercel auto-detects the two `api/*.js` files as Node serverless functions (confirmed in build logs: `lambdaRuntimeStats: {"nodejs":2}`).

### Verified this round (live, on www.wonsam-firstone.co.kr)
- `GET /api/admin-requests` with no auth header → 401, no data. Same result with a wrong bearer token → 401, no data. Never tested with the real `ADMIN_TOKEN` — the assistant does not know it and was instructed not to try to find out or print it.
- index.html → 기업자료 요청 → `corporate-request.html` ✓; index.html → 기업수요 보고서 열람 → `corporate-report.html` ✓; corporate-report.html hero CTA → `corporate-request.html` ✓; consultation.html has no `<form>` element and links to `corporate-request.html` for corporate visitors ✓.
- `corporate-request.html` form fields confirmed via DOM: `company_name`/`phone`/`email` all `required`, `purpose` optional select, submit button present, status message container present.
- No `.pdf` references, no download buttons, no restored proposal PDF, no banned disclaimer/SK-Hynix/guaranteed-return phrasing found in any of the 4 customer-facing pages (checked by fetching live HTML and string-matching the full banned list).
- Mobile viewport emulation could not be re-verified live this round — `resize_window` on the remote Chrome tab does not actually change `window.innerWidth` in this environment (tried on 3 separate occasions across sessions, always stays at the underlying display's native width). This is a tooling limitation, not a site regression: the responsive CSS (`@media (max-width: 920px)` / `(max-width: 640px)` in `style.css`) has not been touched since it was last visually confirmed correct (1-column card stacks, working hamburger nav, unbroken form) via the dedicated Preview tool's device emulation, before local preview servers were ruled out for this project (see the "no local servers" feedback below).

### Known remaining tasks / open decisions
- **Vercel env vars** (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_TOKEN`) — status unknown to the assistant; only the project owner can confirm these are set in the Vercel dashboard. Until they are, `/api/corporate-request` and `/api/admin-requests` will both return `500 서버 설정이 완료되지 않았습니다`.
- `assets/wonsam-firstone-ad-slide.pdf` and `assets/wonsam-firstone-analysis.pdf` are still orphaned (unlinked) in the repo — decide whether to convert to in-page reading sections or delete.
- No automated test for the "correct password" admin path exists or should exist in this repo/session — that verification is the account owner's to do, manually, with their own credential.

### Security limits (unchanged from previous rounds, still accurate)
- `admin.html` auth is a single shared password, not per-user accounts — no session expiry, no login-attempt throttling, no audit log.
- If `ADMIN_TOKEN` leaks, submitted company/phone/email data becomes readable by whoever has it. Rotate periodically; only Vercel dashboard access should be able to see/change it.
- Supabase project is on the free tier — revisit if traffic/storage grows.

### How to check the current deployment
`git log --oneline -5` locally, then confirm the same commit SHA appears as `githubCommitSha` in the latest Vercel deployment for project `wonsam-firstone` (or just check `https://www.wonsam-firstone.co.kr` directly — CTA labels/colors are a quick visual tell for which build is live).

### Do-not-touch reminders for the next owner
- Never commit `.env`, never print/paste `ADMIN_TOKEN` or the Supabase `service_role` key into chat, code, README, or this file.
- Never restore `assets/wonsam-centreville-first-one-company-housing-proposal.pdf`.
- Never add a PDF download button or direct PDF link on any customer-facing page.
- Never add a general-customer form — general customers stay phone-only.
- Never reintroduce `href="#"` or an internal anchor on a core CTA (상담/신청/자료요청/기업수요).
- Never use "SK하이닉스 공식/지정/전용", "확정 기업수요", "보장 수요", or return-guarantee language ("확정수익", "수익보장", "원금보장", etc.) anywhere.
- Do not run local dev/preview servers (`python -m http.server`, `npm run dev` via the Preview tool, etc.) for this project — it triggers a Windows Firewall prompt the user does not want. Verify changes by reading code directly or checking the live Vercel URL instead.

## Proposal Reading Feature + Infographic Modal (this round)

### What changed
- `corporate-report.html`: inserted a new unnumbered `.proposal-viewer-section` right after section "1. 기업수요 검토 개요" (before "2. 입지 및 배후수요", which keeps its own numbering — the new section deliberately uses a "READ ONLY" eyebrow badge instead of a number so nothing downstream had to be renumbered). It renders 8 page images in a vertical scroll of white cards, each `<figure class="proposal-page">` with an `<img>` + page-number `<figcaption>`, ending in a `기업자료 요청하기` / `메인으로 돌아가기` CTA row (real links, no anchors).
- `index.html`: the infographic `<img>` in the "자료 열람" media grid is now wrapped in a `.infographic-card` (`role="button" tabindex="0"`, `data-modal-target="infographicModal"`) with a "클릭해서 크게 보기" hint. A `#infographicModal` (`.media-modal`) was added near the end of `<body>`, reusing the same `assets/wonsam-firstone-infographic.png` file (no new image).
- `script.js`: added generic modal open/close wiring (`[data-modal-target]` click + Enter/Space, `[data-modal-close]` click, Escape key, `body.modal-open` scroll lock). Purely additive — did not touch the existing nav-toggle or corporate-request-form submit logic.
- `style.css`: added `.proposal-viewer-section`, `.read-only-note`, `.proposal-page-viewer`, `.proposal-page`, `.proposal-page img/figcaption` (Notion-theme document card look), and `.infographic-card`, `.click-hint`, `.media-modal` + its `__backdrop`/`__content`/`__close` parts, `body.modal-open` (theme-agnostic, works on either theme since both define the same `--bg-soft`/--hairline/--primary/--accent` tokens). Reused `--primary` (HUMANE orange) for the modal close button and `--accent` (HUMANE green) for `.click-hint` — no Airbnb red or Notion blue introduced.

### Source files identified (not committed as PDFs)
Three candidate "proposal" PDFs existed outside the repo, in the user's local OneDrive folders (never tracked by git):
1. `원삼_센트레빌_퍼스트원_제안서.pdf` (12 pages, image-heavy, general marketing deck) — not used.
2. **`원삼센트레빌_기업숙소_제안서_v3_표지최종_수정본.pdf`** (8 pages per PyMuPDF — an earlier file-read tool had reported "142 pages" for this file, which was wrong; PyMuPDF is the authoritative parser here) — this is the one used. Its content and title ("원삼 센트레빌 퍼스트원 · 기업 직원숙소 검토 제안서") match the "기업제안서/기업검토제안서" request exactly, addressed to "총무팀·인사팀·경영지원팀" — this is almost certainly the source the previously-deleted `assets/wonsam-centreville-first-one-company-housing-proposal.pdf` came from.
3. `원삼_센트레빌_퍼스트원_비전.pdf` (16 pages, "vision" deck) — not used.

Content check before publishing: no third-party PII, no other named companies beyond HUMANE's own already-public contact info (`010-3138-1712`, `yisim817@gmail.com`, business registration `320-60-00456`) and location references (SK Hynix, 동부건설 as builder brand) that are already used elsewhere on the live site. Page 7 is a blank "회신 양식" (response form template) with empty fields, not filled-in customer data.

### Policy note the next owner should know
The proposal's page 6 includes specific pricing figures (평균 분양가 약 2억 2,500만 원, 계약금 10%, 중도금 조건, 청약금 범위) that earlier rounds of this project deliberately kept gated behind "상담 후 개별 안내" (consultation-only). Rendering the actual proposal pages as images necessarily makes that same information visible on the public page now — this is a direct consequence of this round's explicit instruction ("업로드된 기업제안서 원문을 실제로 읽을 수 있게 만든다"), not an oversight. If the account owner wants pricing kept confidential again, the fix is either to drop `page-06.webp` from the viewer or to source a redacted version of that page — flagged in README.md too.

### Files/folders added
- `assets/corporate-proposal-pages/page-01.webp` … `page-08.webp` (8 files, ~0.51 MB total, converted from the PDF above via PyMuPDF + Pillow, no PDF committed).

### Confirmed unaffected (protected per this round's instructions)
`git diff --stat` on `api/corporate-request.js`, `api/admin-requests.js`, `admin.html`, and `corporate-request.html` showed **zero changes** — none of them were touched. Re-verified live after deploy: `/api/admin-requests` still 401s with no auth and with a wrong token; `corporate-request.html` form fields (company_name/phone/email required, purpose optional) unchanged; no admin password anywhere in source.

### How to check the deployment
Same as before: compare `git log --oneline -3` locally against the `githubCommitSha` on the latest Vercel production deployment for project `wonsam-firstone`, or just load `https://www.wonsam-firstone.co.kr/corporate-report.html` and scroll past section 1 — the "기업제안서 열람" section with 8 page images should appear immediately.

### Remaining open items
- Vercel env var status (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_TOKEN`) still unconfirmed by the assistant — unchanged from previous rounds.
- `assets/wonsam-firstone-ad-slide.pdf` and `assets/wonsam-firstone-analysis.pdf` remain orphaned (unlinked) — still an open decision from previous rounds.
- No automated regression test suite exists; every round has relied on manual live-fetch/DOM checks against production. Consider a lightweight Playwright smoke test if this project keeps growing.

## Proposal Source Swap + Color Direction Reversal (this round)

- **Proposal source replaced.** Last round's 8-page HUMANE-toned document (`원삼센트레빌_기업숙소_제안서_v3`) is no longer used. This round's client instruction explicitly attached and pointed at `원삼_센트레빌_퍼스트원_제안서.pdf` (in the project folder, not the `원삼센트레빌` folder) — a 12-page NotebookLM-generated navy/gold slide deck titled "원삼 센트레빌 퍼스트원 기업 및 사전검토용 안내서". PyMuPDF page count (12) is authoritative; the environment's automatic PDF-page-count tool has now been wrong twice on files in this project (claimed 142 for one file that was actually 8, and 112 for this one that's actually 12) — always cross-check with `fitz.open(path).page_count` before trusting it.
- **Defect found and fixed with user sign-off.** Pages 2–11 of the source PDF had a hallucinated footer band on every page: an unrelated "Kia" logo, garbled text ("곡국 정정자 전자이보브"), a fake department name ("국토 장기자산 운용본부"), and the wrong year ("2023.07"). Asked the user how to handle it before proceeding (AskUserQuestion); they approved cropping. Fixed by rendering at 2.2x zoom and cropping the bottom 6.5% of pages 2–11 only (pages 1 and 12 are full-bleed cover/closing slides with no such band, left uncropped). Verified visually on 2 crop-boundary cases (a table page and a 3-column icon page) that no real content was cut.
- **Files replaced:** `assets/corporate-proposal-pages/page-01.webp` … `page-12.webp` (12 files, ~2.42 MB total, 3028px wide). The old 8-file set from last round was deleted first.
- `corporate-report.html`: hero rewritten to spec — title "기업수요 검토 보고서", dashboard-style `.hero-info-grid` with 6 cards (사업명/위치/상품 성격/주요 수요/상담 방식/자료 제공 방식), two hero CTAs ("기업제안서 열람" scrolls to `#proposal-viewer` via same-page anchor — not a page-redirect anchor, so it doesn't violate the no-internal-anchor-for-core-CTA rule; "기업자료 요청하기" links to corporate-request.html as always). Proposal viewer section now shows all 12 images with a mid-scroll "자료요청하기" prompt inserted between page 6 and page 7.
- **Color direction reversed:** client judged the NotebookLM-style navy/white/dashboard tone more suitable than the HUMANE orange/green treatment from the prior round. `--primary` in `style.css` now resolves to `var(--humane-navy)` (#1e3a8a, matching the "text-navy"/"bg-blue-900" classes in the client's own `code_artifact.html`/`code_artifact (1).html` mockups and the proposal deck's navy) instead of `var(--humane-orange)`. `--accent` (green, #017c2e) is unchanged and still carries section labels/badges. The dark bottom CTA card's accent text changed from a light-orange tint to a gold tint (#d4a656) to pair with navy. This is a real reversal of the previous round's explicit "HUMANE 초록/주황" branding decision — flagged clearly to the user in README.md rather than silently overwritten.
- `code_artifact.html` and `code_artifact (1).html` (Tailwind-based "인텔리전트 분석 리포트" mockups with ROI calculators, Chart.js graphs, "완판 전략" copy) were read for visual-language reference only (navy/indigo dashboard aesthetic) — their actual promotional copy (수익률 계산기, "ONLY 1%", "완판" language) was deliberately NOT ported into the live site, since it conflicts with this project's standing rules against investment-return claims and pressure-sale language.
- **Not built this round:** a dedicated "사전의향서 접수" (pre-interest form) page/banner. No `pre-interest.html` exists yet; per instruction, this was left undocumented-but-noted rather than built, since creating a banner with nowhere real to link it would violate the no-dead-link rule. Flagged as a future task in README.md.
- Confirmed via `git diff --stat api/ admin.html corporate-request.html` that none of the protected admin/backend files changed this round either.
