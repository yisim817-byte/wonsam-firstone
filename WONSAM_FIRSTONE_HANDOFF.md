# WONSAM_FIRSTONE_HANDOFF

## Current Scope

- Project: Wonsam Centreville First One static landing page
- Repository: https://github.com/yisim817-byte/wonsam-firstone
- Final domain: https://www.wonsam-firstone.co.kr
- Base domain: https://wonsam-firstone.co.kr
- PDF path: `assets/wonsam-centreville-first-one-company-housing-proposal.pdf`
- Representative phone number: not issued yet

## Files Checked

- `index.html`
- `style.css`
- `script.js`
- `assets/wonsam-centreville-first-one-company-housing-proposal.pdf`
- `README.md`

## Source Materials Section Added

Added a source materials section and a card-based infographic section while keeping the existing page structure and original proposal PDF link intact.

### Added Assets

- `assets/wonsam-firstone-analysis.pdf`
- `assets/wonsam-firstone-ad-slide.pdf`
- `assets/wonsam-firstone-ad-video.mp4`

### Connected Material Buttons

- `기업 직원숙소 제안서` -> `assets/wonsam-centreville-first-one-company-housing-proposal.pdf`
- `원삼 센트레빌 분석자료` -> `assets/wonsam-firstone-analysis.pdf`
- `광고 슬라이드 자료` -> `assets/wonsam-firstone-ad-slide.pdf`
- `광고 영상` -> `assets/wonsam-firstone-ad-video.mp4`

### Pending Material

- `NotebookLM 참고 텍스트`
  - Keep as `자료 준비 중` until `assets/wonsam-firstone-source-note.txt` is available.

### Infographic Section

The infographic area is currently implemented as HTML/CSS cards, not as an image embed, to avoid exposing unconfirmed contact-number details inside draft image materials.

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

## PDF Watermark Follow-up

The current PDF is linked directly from the landing page. A watermark review is needed before final public distribution because the PDF may be downloaded, forwarded, or viewed outside the landing page context.

Recommended application target:

- `assets/wonsam-centreville-first-one-company-housing-proposal.pdf`

Recommended review points:

- Add a light, non-obstructive watermark to each page if required by the business owner.
- Keep the document readable after watermarking.
- Replace the PDF only after approval of the watermarked file.
- Re-check both PDF buttons after replacement:
  - `index.html:63`
  - `index.html:237`

## Do Not Change Without Approval

- Homepage design
- PDF file
- DNS settings
- Domain settings
- Contact number before representative number issuance
