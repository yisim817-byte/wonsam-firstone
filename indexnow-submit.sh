#!/bin/bash
# IndexNow 제출 스크립트 - 사이트가 실제 배포되어 아래 key 파일이
# https://www.wonsam-firstone.co.kr/09c3f716612f43ca983247edc51beec4.txt 로 200 응답을 준 뒤에 실행하십시오.

KEY="09c3f716612f43ca983247edc51beec4"
HOST="www.wonsam-firstone.co.kr"
KEY_LOCATION="https://${HOST}/${KEY}.txt"

echo "1) key file check:"
curl -s -o /dev/null -w "  %{url_effective} -> %{http_code}\n" "$KEY_LOCATION"

echo "2) IndexNow submit:"
curl -s -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d "{\"host\": \"${HOST}\", \"key\": \"${KEY}\", \"keyLocation\": \"${KEY_LOCATION}\", \"urlList\": [\"https://${HOST}/\", \"https://${HOST}/field-analysis.html\", \"https://${HOST}/neighborhood-commerce.html\", \"https://${HOST}/unit-types.html\", \"https://${HOST}/intelligence-report.html\", \"https://${HOST}/design.html\", \"https://${HOST}/pre-interest.html\", \"https://${HOST}/corporate-interest.html\", \"https://${HOST}/consultation.html\", \"https://${HOST}/corporate-request.html\"]}" \
  -w "\nHTTP status: %{http_code}\n"
