/* 사전고객등록 폼: 개인/법인 전환, 입력 검증, 운영자 이메일 접수(FormSubmit) */
(function () {
  "use strict";

  // 접수 원본: 운영자 이메일. 환경변수 없이 동작하며, 사이트별 첫 접수 때 FormSubmit 활성화 메일을 1회 승인해야 한다.
  var OWNER_ENDPOINT = "https://formsubmit.co/ajax/17a3126b25f4b5bf5caa58cb46bca74d"; // 운영자 Gmail 의 FormSubmit 별칭(주소 비노출)

  var form = document.getElementById("prereg-form");
  if (!form) return;

  var openedAt = Date.now();
  var statusBox = document.getElementById("prereg-status");
  var submitBtn = form.querySelector("button[type=submit]");
  var doneBox = document.getElementById("prereg-done");
  var groups = form.querySelectorAll("[data-prereg-group]");

  function currentType() {
    var checked = form.querySelector("input[name=type]:checked");
    return checked ? checked.value : "personal";
  }

  function syncType() {
    var type = currentType();
    groups.forEach(function (group) {
      var active = group.getAttribute("data-prereg-group") === type;
      group.hidden = !active;
      group.querySelectorAll("input").forEach(function (input) {
        input.disabled = !active;
      });
    });
    clearErrors();
  }

  function onlyDigits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  function formatPhone(value) {
    var d = onlyDigits(value).slice(0, 11);
    if (/^02/.test(d)) {
      if (d.length > 9) return d.replace(/^(02)(\d{4})(\d{0,4})$/, "$1-$2-$3");
      if (d.length > 5) return d.replace(/^(02)(\d{3})(\d{0,4})$/, "$1-$2-$3");
      if (d.length > 2) return d.replace(/^(02)(\d{0,4})$/, "$1-$2");
      return d;
    }
    if (d.length > 10) return d.replace(/^(\d{3})(\d{4})(\d{0,4})$/, "$1-$2-$3");
    if (d.length > 6) return d.replace(/^(\d{3})(\d{3})(\d{0,4})$/, "$1-$2-$3");
    if (d.length > 3) return d.replace(/^(\d{3})(\d{0,4})$/, "$1-$2");
    return d;
  }

  function clearErrors() {
    form.querySelectorAll(".prereg-field-error").forEach(function (el) {
      el.textContent = "";
    });
    form.querySelectorAll("[aria-invalid=true]").forEach(function (el) {
      el.removeAttribute("aria-invalid");
    });
    showStatus("");
  }

  function fieldError(name, message) {
    var type = currentType();
    var input = form.querySelector('[data-prereg-group="' + type + '"] [name="' + name + '"]') || form.querySelector('[name="' + name + '"]');
    if (!input) {
      showStatus(message, true);
      return;
    }
    input.setAttribute("aria-invalid", "true");
    var holder = input.closest(".prereg-field, .prereg-consent");
    var slot = holder && holder.querySelector(".prereg-field-error");
    if (slot) slot.textContent = message;
    else showStatus(message, true);
    input.focus();
  }

  function showStatus(message, isError) {
    if (!statusBox) return;
    statusBox.textContent = message || "";
    statusBox.hidden = !message;
    statusBox.classList.toggle("is-error", Boolean(isError));
  }

  function value(name) {
    var type = currentType();
    var input = form.querySelector('[data-prereg-group="' + type + '"] [name="' + name + '"]') || form.querySelector('[name="' + name + '"]');
    return input ? input.value.trim() : "";
  }

  function checked(name) {
    var input = form.querySelector('[name="' + name + '"]');
    return Boolean(input && input.checked);
  }

  function validate(type) {
    var phone = onlyDigits(value("phone"));
    if (type === "personal") {
      if (value("name").length < 2) return ["name", "이름을 입력해 주세요."];
      var birth = onlyDigits(value("birth"));
      if (birth.length !== 8) return ["birth", "생년월일 8자리를 입력해 주세요. 예: 19850315"];
      if (!/^01[016789]\d{7,8}$/.test(phone)) return ["phone", "휴대폰번호를 확인해 주세요. 예: 010-1234-5678"];
    } else {
      if (value("company").length < 2) return ["company", "회사명을 입력해 주세요."];
      if (value("manager").length < 2) return ["manager", "담당자 이름을 입력해 주세요."];
      if (!/^0\d{8,10}$/.test(phone)) return ["phone", "담당자 전화번호를 확인해 주세요."];
    }
    if (!checked("consentPrivacy")) return ["consentPrivacy", "개인정보 수집·이용에 동의해 주세요."];
    if (!checked("consentNotice")) return ["consentNotice", "분양일정 안내 수신에 동의해 주세요."];
    return null;
  }

  function utmString() {
    var params = new URLSearchParams(window.location.search);
    var keep = [];
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(function (key) {
      if (params.get(key)) keep.push(key + "=" + params.get(key));
    });
    return keep.join("&");
  }

  function track(name, params) {
    window.dataLayer = window.dataLayer || [];
    var payload = { event: name };
    Object.keys(params || {}).forEach(function (key) {
      payload[key] = params[key];
    });
    window.dataLayer.push(payload);
  }

  form.querySelectorAll("input[name=type]").forEach(function (radio) {
    radio.addEventListener("change", syncType);
  });

  form.querySelectorAll('input[name="phone"]').forEach(function (input) {
    input.addEventListener("input", function () {
      input.value = formatPhone(input.value);
    });
  });

  var birthInput = form.querySelector('input[name="birth"]');
  if (birthInput) {
    birthInput.addEventListener("input", function () {
      birthInput.value = onlyDigits(birthInput.value).slice(0, 8);
    });
  }

  var agreeAll = document.getElementById("prereg-agree-all");
  if (agreeAll) {
    agreeAll.addEventListener("change", function () {
      form.querySelectorAll("input[data-prereg-consent]").forEach(function (box) {
        box.checked = agreeAll.checked;
      });
    });
    form.querySelectorAll("input[data-prereg-consent]").forEach(function (box) {
      box.addEventListener("change", function () {
        agreeAll.checked = Array.prototype.every.call(form.querySelectorAll("input[data-prereg-consent]"), function (b) {
          return b.checked;
        });
      });
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();
    var type = currentType();
    var problem = validate(type);
    if (problem) {
      fieldError(problem[0], problem[1]);
      return;
    }

    var source = form.getAttribute("data-source") || window.location.hostname;
    var receipt = makeReceipt();
    var phone = onlyDigits(value("phone"));
    var mail = {
      _subject: "[사전고객등록·" + source + "] " + (type === "corporate" ? "법인 · " + value("company") + " " + value("manager") : "개인 · " + value("name")) + " (" + receipt + ")",
      _template: "table",
      _captcha: "false",
      접수번호: receipt,
      접수시각: kstStamp(),
      사이트: source,
      구분: type === "corporate" ? "법인" : "개인",
    };
    if (type === "personal") {
      var birth = onlyDigits(value("birth"));
      mail.이름 = value("name");
      mail.생년월일 = birth.slice(0, 4) + "-" + birth.slice(4, 6) + "-" + birth.slice(6, 8);
      mail.휴대폰 = formatPhone(phone);
    } else {
      mail.회사명 = value("company");
      mail.담당자 = value("manager");
      mail.전화번호 = formatPhone(phone);
    }
    mail.동의 = "개인정보 수집·이용(필수), 분양일정 안내 수신(필수)";
    var utm = utmString();
    if (utm) mail.유입 = utm;
    if (document.referrer) mail.이전페이지 = document.referrer.slice(0, 300);

    // 자동 등록 차단: 숨김 필드가 채워졌거나 화면 진입 2초 안 제출이면 보내지 않는다.
    var honey = (form.querySelector('[name="website"]') || {}).value || "";
    if (honey || Date.now() - openedAt < 2000) {
      showDone({ receiptNo: receipt }, type);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    var label = submitBtn.textContent;
    submitBtn.textContent = "등록 중…";

    fetch(OWNER_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(mail),
    })
      .then(function (res) {
        return res.json().catch(function () {
          return {};
        });
      })
      .then(function (result) {
        if (!result || String(result.success) !== "true") {
          showStatus(FAIL_TEXT, true);
          return;
        }
        track("pre_register_complete", { register_type: type });
        showDone({ receiptNo: receipt }, type);
      })
      .catch(function () {
        showStatus(FAIL_TEXT, true);
      })
      .then(function () {
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
        submitBtn.textContent = label;
      });
  });

  var FAIL_TEXT = "지금은 온라인 등록을 처리하지 못했습니다. 분양문의 1833-3872로 연락 주시면 바로 등록해 드립니다.";

  function makeReceipt() {
    var d = new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(2, 10).replace(/-/g, "");
    var bytes = new Uint8Array(3);
    (window.crypto || window.msCrypto).getRandomValues(bytes);
    var hex = Array.prototype.map.call(bytes, function (b) {
      return ("0" + b.toString(16)).slice(-2);
    }).join("").toUpperCase();
    return "PR" + d + "-" + hex;
  }

  function kstStamp() {
    return new Date(Date.now() + 9 * 3600 * 1000).toISOString().replace("T", " ").slice(0, 16) + " (KST)";
  }

  function showDone(result, type) {
    if (!doneBox) return;
    var receipt = doneBox.querySelector("[data-prereg-receipt]");
    if (receipt) receipt.textContent = result.receiptNo || "";
    form.hidden = true;
    doneBox.hidden = false;
    doneBox.focus();
    doneBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  syncType();
})();
