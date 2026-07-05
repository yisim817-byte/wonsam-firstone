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

- 본 페이지는 공식 분양 홈페이지가 아닌 사전검토 안내 페이지입니다.
- 상담폼 버튼의 `href="#"` 위치에 Google Form 링크를 삽입하면 됩니다.
- 기업 제안서 원본 PDF는 무단 사용 방지를 위해 공개 assets에서 제거함. 홈페이지에서는 직접 다운로드가 아닌 '제안서 열람 요청' 방식으로 전환함. 추후 Google Form 연결 후 담당자 확인 방식으로 제공 예정.
- 제안서 관련 버튼은 Google Form 신청 방식으로 전환 예정이며, 현재는 Form 링크 확정 전이므로 `href="#"` 임시 상태입니다.
- 실제 Form 링크 확정 후 `index.html`의 `기업숙소 자료 요청`, `상담 후 제안서 제공`, `제안서 열람 요청` 버튼 `href`에 반영하세요.
- 자료 확인 섹션은 분석 PDF, 광고 슬라이드 PDF, 광고 영상, NotebookLM 참고자료 상태를 카드형으로 안내합니다.
- NotebookLM 참고 텍스트 파일이 준비되면 `assets/wonsam-firstone-source-note.txt` 파일로 업로드하고 해당 카드 링크를 연결하세요.
- SK하이닉스 공식 안내 페이지로 오해되지 않도록 footer 유의사항을 유지하세요.

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

## 연락처

HUMANE  
010-3138-1712  
yisim817@gmail.com  
www.humanekorea.co.kr
