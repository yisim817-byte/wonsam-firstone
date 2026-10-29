# WONSAM_DIAG_R41

측정 2026-10-29. P1 기준선은 운영 URL에 `check4.mjs --sites W1,W2,W3 --allow allow_alt_r41.json` (게이트 플래그 없음). 숫자 원본은 `baseline_r41/summary.json`.

## 색인 차단

| 사이트 | robots | meta robots(홈) | X-Robots-Tag | canonical |
|---|---|---|---|---|
| W1 | 200, `Disallow: /` 아님. `Disallow: /admin.html`, `/api/`만. Sitemap 줄 있음 | index | 없음 | `https://www.wonsam-firstone.co.kr/` |
| W2 | 200, 전체 차단 아님. Sitemap 줄 있음 | index | 없음 | `https://www.skwonsam.site/` |
| W3 | 200, 전체 차단 아님. Sitemap 줄 있음 | index | 없음 | `https://xn--cg4bj2imdx1a.kr/` |

## sitemap (운영, 작업 전)

| 사이트 | URL 수 | 비고 |
|---|---|---|
| W1 | 7 | 홈·상담·설계·입지·근생·타입·현장분석 |
| W2 | 3 | 홈·site-analysis·pre-register |
| W3 | 3 | 홈·analysis-report·report-web |
| 합계 | 13 | |

로컬 브랜치(미배포)는 W2 9, W3 10, W1 7. lastmod 최신값은 2026-10-29.

## 페이지 본문

운영 check4가 받은 HTML은 전부 status 200. JS 없이 본문이 있다.

작업 전 홈 한글 대략: W1 1,552자, W2 1,472자, W3 2,876자. W1 내부는 상담 466·타입 564·근생 690·설계 735·입지 1,041·현장분석 2,493 (스크립트·메뉴 제외 기준, 직전 실측).

## 제목 구조 (운영)

check4 title 15–40, description 50–95 밖:

- W1 `design.html` description 49자
- W1 `unit-types.html` description 47자
- W2 `pre-register.html` description 112자

홈 title 길이: W1 37, W2 35, W3 38. H1은 각 1개.

## 링크

운영 홈 기준 W1↔W2↔W3 상호 링크 0. 내부 링크는 각 사이트 메뉴 안. 이번 브랜치에서 핵심 페이지와 새 글에 글자 링크를 넣었다.

## 검색도구 인증

- W1: 네이버 meta 있음. 구글은 `google736bfb963f7c9c20.html` 파일. 빙 meta 없음 → 대표 등록 필요
- W2: 네이버·구글·빙 meta 있음
- W3: 네이버·구글·빙 meta 있음

코드에 없는 토큰은 넣지 않았다.

## IndexNow

세 사이트 모두 `/09c3f716612f43ca983247edc51beec4.txt` 가 있고 파일 내용도 같은 키.

## 첫 화면 용량

- W1·W2 운영 히어로는 autoplay mp4 약 27MB
- W2 홈에서 250KB 초과로 게이트에 걸린 이미지: site-fab-relation.png 2292KB, gateway-access.png 2042KB, demand-location.png 2402KB. hero-project-overview.png 1966KB는 파일명에 hero가 있어 보고 전용
- W1 입지 리포트 jpg 5장 293–381KB
- W3 히어로 webp 157KB, autoplay 없음

## 중복

머리말 `용인원삼 센트레빌`을 도메인 3개가 나눠 가진다. 문장 전체 복사는 새 글에서 하지 않았다. 교차 8-gram은 이전 생성 때 최악 0.108.

## 검색 노출

이번 턴에 네이버·구글 `site:` 결과 수를 다시 세지 못했다. 확인 불가.

같은 날 앞서 실측: 네이버 웹 `용인원삼 센트레빌` 상위 10 오가닉에 세 도메인 0/10. 나온 쪽은 다른 랜딩과 블로그.

## 근거 필요 (화면에 기준일이 없어 새 숫자로 쓰지 않음)

- 분양가, 청약 일정, 확정 면적·호실
- 모델하우스 운영 여부
- 이동 시간(분)
- 용인시 보도자료 날짜가 화면에 없는 일정

## 순위가 안 나오는 원인 3가지

1. 노출 0. 네이버 웹 상위 10 오가닉 0/10. 작업 전 색인 URL 합계 13.
2. 본문이 얇다. W2 홈 한글 1,472자, W1 홈 1,552자, W1 상담·타입·근생·설계·입지는 466–1,041자.
3. 주제를 받을 하위 URL이 없었다. 공고 전 상담 범위, E2, 타입 미확정, 근생, 사전등록과 청약의 차이, 주차, 고용 4만 7천의 주어, 개통된 길과 계획, 월세 출처. 도메인 3개가 같은 머리말을 나눈다.
