# 사전고객등록 이벤트 설정 안내

작성 2026-10-11. 세 사이트(wonsam-firstone.co.kr · skwonsam.site · 용인원삼.kr)에 같은 구조로 들어가 있다.
비밀값은 이 문서와 git에 넣지 않는다. Vercel 프로젝트 → Settings → Environment Variables 에만 넣는다(Sensitive, Production).

## 1. 구성

| 파일 | 역할 |
|---|---|
| `pre-register.html` | 이벤트 상세 + 등록 폼(개인/법인) |
| `pre-register.css` | 상단 배너 + 등록 페이지 스타일 |
| `pre-register.js` | 개인/법인 전환, 입력 검증, `/api/pre-register` 전송 |
| `api/pre-register.js` | Vercel Function. 운영자 알림(이메일·카카오톡) → 고객 등록완료 메시지 |
| 각 페이지 `<body>` 첫 부분 | `.prereg-topbar` 상단 배너(→ `/pre-register.html`) |

수집 항목

- 개인: 이름, 생년월일(8자리), 휴대폰번호
- 법인: 회사명, 담당자 이름, 담당자 전화번호(유선 가능, 휴대폰이면 완료 메시지 발송)
- 필수 동의 2개: 개인정보 수집·이용, 분양일정 안내 수신

## 2. 접수 성공 기준

별도 DB가 없다. **운영자 이메일 또는 카카오톡 중 1개 이상이 수신 처리돼야** 고객에게 접수번호와 완료 화면을 보여준다.
둘 다 미설정이면 503, 둘 다 실패면 502를 돌려주고 고객 화면에는 대표번호 안내만 나온다. 접수 원본 기록은 운영자 이메일이다.

고객 완료 메시지는 운영자 알림 성공 뒤에만 보낸다. 실패해도 접수는 성공으로 유지한다(화면 문구만 달라짐).

## 3. 환경변수 (세 Vercel 프로젝트 각각)

| 변수 | 용도 | 필수 |
|---|---|---|
| `RESEND_API_KEY` | 운영자 이메일 발송(Resend) | 이메일 사용 시 |
| `PREREG_EMAIL_TO` | 받을 이메일. 쉼표로 여러 개 | 이메일 사용 시 |
| `PREREG_EMAIL_FROM` | 보내는 주소. 미설정 시 `onboarding@resend.dev` | 선택 |
| `KAKAO_REST_API_KEY` | 카카오 앱 REST API 키 | 카카오톡 사용 시 |
| `KAKAO_REFRESH_TOKEN` | "나에게 보내기"용 리프레시 토큰 | 카카오톡 사용 시 |
| `KAKAO_CLIENT_SECRET` | 카카오 앱에서 Client Secret 을 켰을 때만 | 선택 |
| `SOLAPI_API_KEY` / `SOLAPI_API_SECRET` | 고객 등록완료 메시지 발송 | 고객 메시지 사용 시 |
| `SOLAPI_SENDER` | SOLAPI 에 등록·승인된 발신번호 | 고객 메시지 사용 시 |
| `SOLAPI_PFID` / `SOLAPI_TEMPLATE_ID` | 알림톡 채널 ID / 승인 템플릿 ID. 없으면 문자(SMS/LMS)로 발송 | 선택 |

넣은 뒤 **재배포**해야 반영된다.

## 4. 이메일(Resend)

1. resend.com 에 운영자 Gmail 로 가입 → API Keys → Create.
2. `RESEND_API_KEY`, `PREREG_EMAIL_TO`(가입한 Gmail) 입력.
3. 도메인 인증 전에는 `onboarding@resend.dev` 발신이며, **가입 계정 본인 메일로만** 발송된다. 다른 주소로 받으려면 Resend 에서 발신 도메인을 인증하고 `PREREG_EMAIL_FROM` 을 바꾼다.
4. 메일 제목 `[사전고객등록·사이트도메인]` 으로 Gmail 필터·라벨을 걸어 두면 사이트별로 분류된다.

## 5. 카카오톡 "나에게 보내기"

카카오 비즈니스 채널 없이 운영자 본인 카카오톡으로 받는 방식이다. 앱 1개로 세 사이트 공용 사용 가능.

1. developers.kakao.com → 내 애플리케이션 → 앱 추가.
2. 앱 키 → **REST API 키** 확인.
3. 카카오 로그인 → 활성화 ON → Redirect URI 등록(예: `https://www.wonsam-firstone.co.kr/`).
4. 카카오 로그인 → 동의항목 → **카카오톡 메시지 전송(talk_message)** 사용 설정.
5. 앱 설정 → 플랫폼 → Web 사이트 도메인에 세 도메인 등록(메시지의 "등록 페이지" 버튼 링크용).
6. 브라우저에서 아래 주소 접속 → 운영자 카카오 계정으로 동의 → 이동된 주소창의 `code=` 값 복사.
   `https://kauth.kakao.com/oauth/authorize?client_id={REST_API_KEY}&redirect_uri={Redirect URI}&response_type=code&scope=talk_message`
7. 터미널에서 토큰 발급(코드는 1회용, 10분 이내):
   ```
   curl -X POST https://kauth.kakao.com/oauth/token \
     -d grant_type=authorization_code -d client_id={REST_API_KEY} \
     -d redirect_uri={Redirect URI} -d code={code}
   ```
   응답의 `refresh_token` 을 `KAKAO_REFRESH_TOKEN` 으로 저장.
8. **리프레시 토큰 유효기간은 약 2개월**이다. 만료 1개월 전부터 카카오톡 알림 끝에 `※ 카카오 토큰 갱신 필요` 가 붙는다. 그때 6~7번을 다시 하고 세 프로젝트의 `KAKAO_REFRESH_TOKEN` 을 교체·재배포한다. 방치하면 카카오톡 알림이 끊기고 이메일만 남는다.

## 6. 고객 등록완료 메시지(SOLAPI)

1. solapi.com 가입 → 발신번호 등록(대표번호 1833-3872 를 쓰려면 통신서비스 이용증명원 등 서류 필요) → API Key/Secret 발급.
2. `SOLAPI_API_KEY`, `SOLAPI_API_SECRET`, `SOLAPI_SENDER` 입력 → 문자(LMS)로 발송된다.
3. 알림톡으로 보내려면 카카오톡 채널을 SOLAPI 에 연동하고 아래 템플릿을 정보성으로 승인받은 뒤 `SOLAPI_PFID`, `SOLAPI_TEMPLATE_ID` 입력. 알림톡 실패 시 문자로 대체 발송된다.

```
[#{현장명}] 사전고객등록 완료

#{고객명}님, 사전고객등록이 완료되었습니다.
접수번호: #{접수번호}

분양 일정이 확정되면 등록하신 연락처로 순차 안내드리겠습니다.

문의 #{대표번호}
```

변수 이름은 코드와 같아야 한다: `#{고객명}` `#{현장명}` `#{접수번호}` `#{대표번호}`. 알림톡 템플릿에는 상품권 등 광고성 문구를 넣지 않는다.

## 7. 확인 순서

1. 환경변수 입력 → 재배포.
2. 운영자 본인 번호로 개인 1건, 법인 1건 테스트 등록.
3. 이메일·카카오톡·고객 문자 수신 확인. 실패 시 Vercel → Logs 에서 `pre-register owner` / `pre-register customer` 줄의 status 확인(개인정보는 로그에 남기지 않는다).
4. 테스트 메일은 삭제한다.

## 8. 운영 주의

- 이후 보내는 **분양일정 안내 문자는 광고성 정보**다. 문자 앞에 `(광고)`, 끝에 무료 수신거부 방법을 넣고, 21시~08시 발송은 피한다.
- 상품권 지급 조건(지급 시기·방법·명의별 1회 여부·제세공과금)은 시행사 확정 후 `pre-register.html` 유의사항에 반영한다.
- 이벤트 종료 시 각 페이지의 `.prereg-topbar` 배너와 `pre-register.css` 링크를 제거하고, 접수 메일은 개인정보처리방침의 보유기간에 맞춰 파기한다.
