# STATE_R41

## P1 운영 기준선 (맨 위)

명령: `node check4.mjs --sites W1,W2,W3 --allow docs/orders/tools/allow_alt_r41.json`

시각: 2026-10-29T13:41:41Z

- W1 gate=7 report=0. DESC_LENGTH 2, IMG_HEAVY 5
- W2 gate=5 report=1. ALT_GENERIC 1, IMG_HEAVY 3, DESC_LENGTH 1. hero png 1건은 보고 전용
- W3 gate=2 report=1. ALT_GENERIC 2. report-web HEADING_SKIP h3→h5는 보고 전용

대상 확인: W1 wonsam-firstone `main`, W2 wonsam-centreville-landing `master`, W3 yongin-wonsam-kr `main`. 병합하지 않음.

## P7 로컬 게이트

명령 (이 포트 그대로):

`node check4.mjs --base W1=http://127.0.0.1:4171,W2=http://127.0.0.1:4172,W3=http://127.0.0.1:4173 --sites W1,W2,W3 --ledger docs/reports/QUESTION_LEDGER_R41.csv --ledger-min W1=25,W2=25,W3=30 --allow allow_alt_r41.json --gate`

결과: `GATE PASS W1,W2,W3`

- W1 gate=0 report=0
- W2 gate=0 report=0
- W3 gate=0 report=1 (report-web h3→h5, 게이트 아님)

원장 URL은 위 `--base`와 같다. check4는 원장 URL을 origin으로 바꾸지 않는다. 문장은 그 로컬 HTML에 있다. 공개 경로는 origin + 같은 경로.

curl: 사이트맵 URL은 로컬에서 모두 200이고 JS 없이 본문이 있다.

## IndexNow

키 `09c3f716612f43ca983247edc51beec4` (세 사이트 기존 파일, 새로 만들지 않음).

## 검색도구

- W1 빙: 대표 등록 필요. 네이버 meta와 구글 파일은 이미 있다
- W2·W3: 네이버·구글·빙 meta 있음. 토큰을 새로 넣지 않음

## 공식 (R38)

바꾼 것: `공식 자료/서류/출처/원문/발표/분양자료/홈페이지`를 사업주체 자료·발표 원문·분양공고 자료 등으로 바꿈.

남긴 것: W2 site-analysis의 「공식 제휴 또는 공식 지정숙소 관계를 의미하지 않습니다」(부정문 1문장, 토큰 2). W1 잔여 0. W3 잔여 0.

## 첫 화면

- W1·W2 autoplay mp4를 webp 스틸로 바꿈 (각 132KB, width·height·fetchpriority)
- W2 게이트 이미지 3장은 기존 webp(250KB 미만)를 img src로 지정
- W1 입지 jpg 5장을 webp 91–139KB로 줄이고 src를 바꿈
- W3 히어로는 기존 157KB webp를 img로 두고 fetchpriority·가로세로를 넣음. autoplay 없음

## sameAs

세 사이트 HTML에 sameAs 없음. 새로 묶지 않음.

## 390px

이 환경에 브라우저가 없어 픽셀 캡처는 못 했다. 새 글은 본문 max-width 820px, 좌우 패딩 20px라 390px에서 가로로 넘치지 않는 구조다. 상담·사전등록은 문서 흐름의 글자 링크이고 고정 오버레이로 가리지 않는다. 기존 홈의 하단 바는 운영과 같다.

## 새 페이지

- W2 6: consult-before-notice, e2-1-location, types-before-notice, neighborhood-floors, preregister-meaning, scale-and-parking. 한글 800자 이상. 끝에 `자세한 근거: wonsam-firstone.co.kr/...`
- W3 7: cluster-employment-plan, e2-blocks, namyongin-ic, rent-figures, small-type-plan, company-stay-review, undecided-items. 본문 1,000자 이상. 문단 끝에 출처(사업계획서 2026.02 또는 화면 2026-10-29). 끝에 W2 링크 1, W1 링크 1

## 하지 않은 것

병합·운영 배포 없음. 분양가·청약일·확정 면적은 만들지 않음. robots Disallow와 폼 동작은 바꾸지 않음.

## P5 첫머리

홈·설계·타입·상담의 첫 문단 옆에 자료 기준일(2026-10-29)과 W3·W2 글자 링크를 두었다. FAQ는 각 5개 이상.
