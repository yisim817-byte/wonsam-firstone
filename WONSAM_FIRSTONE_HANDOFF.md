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
- Product character: `주거형 상품 / 기업숙소 검토 가능 상품`
- Target demand: `기업숙소, 직원숙소, 법인 임차, 반도체 배후 주거 수요`
- Price range: `가격 정보 확인 필요`
- Review points: 직주근접성, 기업숙소 활용성, 반도체 배후수요, 법인 수요 대응 가능성
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

### Connected Material Buttons

- `기업 직원숙소 제안서` -> `#` pending Google Form link
- `원삼 센트레빌 분석자료` -> `assets/wonsam-firstone-analysis.pdf`
- `광고 슬라이드 자료` -> `assets/wonsam-firstone-ad-slide.pdf`
- `광고 영상` -> `assets/wonsam-firstone-ad-video.mp4`
- `팟캐스트 자료` -> `assets/wonsam-firstone-podcast.m4a`
- `인포그래픽` -> `assets/wonsam-firstone-infographic.png`

### Pending Material

- `NotebookLM 참고 텍스트`
  - Keep as `자료 준비 중` until `assets/wonsam-firstone-source-note.txt` is available.
- `NotebookLM 웹사이트 자료`
  - Uploaded `code_artifact.html` and `code_artifact (1).html` were checked but not linked because they need expression review before publication.

### Infographic Section

The infographic section now includes `assets/wonsam-firstone-infographic.png` plus the existing HTML/CSS summary cards.

## Google Form Link Follow-up

The Google Form URL should be applied only after the final form link is confirmed.

### `href="#"` Positions For Google Form

- `index.html:253`
  - Current element: `<a class="btn btn-primary" href="#">상담폼 열기</a>`
  - Action after form URL is confirmed: replace `href="#"` with the final Google Form URL.

### Consultation-Related Links And Buttons

- `index.html:29`
  - Text: `상담`
  - Current target: `#consult`
  - Type: desktop navigation link

- `index.html:43`
  - Text: `상담 신청`
  - Current target: `#consult`
  - Type: mobile navigation link

- `index.html:60`
  - Text: `기업숙소 수요 검토 요청`
  - Current target: `#consult`
  - Type: hero primary CTA button

- `index.html:66`
  - Text: `상담 문의`
  - Current target: `#consult`
  - Type: hero secondary consultation CTA button

- `index.html:253`
  - Text: `상담폼 열기`
  - Current target: `#`
  - Type: consultation form CTA button

Consultation-related link/button count: 5 total.

Class-based consultation CTA button count: 3 total.

- `index.html:60` - `기업숙소 수요 검토 요청`
- `index.html:66` - `상담 문의`
- `index.html:253` - `상담폼 열기`

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
