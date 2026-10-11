/* 사전고객등록 이벤트 팝업 (홈 화면). "오늘 하루 보지 않기"는 이 브라우저에만 저장된다. */
(function () {
  "use strict";

  var KEY = "prereg-popup-hide-until";
  try {
    if (Number(window.localStorage.getItem(KEY)) > Date.now()) return;
  } catch (e) {}
  if (/[?&]nopopup\b/.test(window.location.search)) return;

  function track(name) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, page_path: window.location.pathname });
  }

  function build() {
    var wrap = document.createElement("div");
    wrap.className = "prereg-pop";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-modal", "true");
    wrap.setAttribute("aria-labelledby", "prereg-pop-title");
    wrap.innerHTML =
      '<div class="prereg-pop__card">' +
      '<button type="button" class="prereg-pop__x" data-pop-close aria-label="닫기">&times;</button>' +
      '<div class="prereg-pop__head">' +
      '<span class="prereg-pop__chip">EVENT</span>' +
      '<h2 id="prereg-pop-title">사전고객등록 이벤트</h2>' +
      '<p class="prereg-pop__gift"><span>사전고객등록 후 계약 시</span><strong>백화점상품권 30만원</strong></p>' +
      "</div>" +
      '<div class="prereg-pop__body">' +
      "<ul>" +
      "<li>분양일정 확정 시 순차 안내</li>" +
      "<li>상품권은 계약 후 7일 이내 지급</li>" +
      "<li>개인·법인 모두 등록 가능</li>" +
      "</ul>" +
      '<a class="prereg-pop__cta" href="/pre-register.html" data-pop-cta>사전고객 등록하기</a>' +
      '<p class="prereg-pop__note">등록만으로는 지급되지 않습니다. 청약·계약 신청이 아닙니다.</p>' +
      "</div>" +
      '<div class="prereg-pop__foot">' +
      '<button type="button" data-pop-today>오늘 하루 보지 않기</button>' +
      '<button type="button" data-pop-close>닫기</button>' +
      "</div>" +
      "</div>";
    return wrap;
  }

  function open() {
    var pop = build();
    var lastFocus = document.activeElement;
    var prevOverflow = document.body.style.overflow;
    document.body.appendChild(pop);
    document.body.style.overflow = "hidden";
    var cta = pop.querySelector("[data-pop-cta]");
    cta.focus();
    track("pre_register_popup_open");

    function close() {
      document.removeEventListener("keydown", onKey);
      pop.remove();
      document.body.style.overflow = prevOverflow;
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function onKey(event) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;
      var items = pop.querySelectorAll("a[href], button");
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    pop.addEventListener("click", function (event) {
      if (event.target === pop || event.target.closest("[data-pop-close]")) close();
      if (event.target.closest("[data-pop-today]")) {
        try {
          var end = new Date();
          end.setHours(23, 59, 59, 999);
          window.localStorage.setItem(KEY, String(end.getTime()));
        } catch (e) {}
        close();
      }
    });
    cta.addEventListener("click", function () {
      track("pre_register_popup_click");
    });
  }

  function start() {
    window.setTimeout(open, 700);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
