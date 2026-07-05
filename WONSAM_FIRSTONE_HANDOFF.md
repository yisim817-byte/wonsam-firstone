# WONSAM_FIRSTONE_HANDOFF

## Current Scope

- Project: Wonsam Centreville First One static landing page
- Repository: https://github.com/yisim817-byte/wonsam-firstone
- Final domain: https://www.wonsam-firstone.co.kr
- Base domain: https://wonsam-firstone.co.kr
- Proposal PDF status: removed from public assets
- Representative phone number: not issued yet

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

## Google Form Link Follow-up

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

## Proposal PDF Access Follow-up

The original company proposal PDF is no longer served from public assets. Keep proposal access request-based until a Google Form or another gated confirmation flow is approved.

### Current Status

- Company proposal PDF direct download is blocked.
- Proposal-related button labels have been changed.
- No direct proposal PDF link remains in `index.html`.
- Google Form link is not confirmed yet.
- Proposal-related buttons are temporarily set to `href="#"`.

### Next Owner Tasks

- Create the Google Form for company proposal access requests.
- Confirm the final Form URL.
- Insert the Form URL into proposal-related button `href` values in `index.html`.
- Test proposal request button clicks.
- Update `README.md` and this handoff document with the final Form URL.

Recommended review points:

- Do not restore the original proposal PDF to public assets without approval.
- Connect proposal request buttons to the final Google Form only after the form is confirmed.
- Provide the proposal individually after company and 담당자 confirmation.

## Do Not Change Without Approval

- Homepage design
- PDF file
- DNS settings
- Domain settings
- Contact number before representative number issuance
