/* 사전고객등록 폼: 개인/법인 전환, 입력 검증, /api/pre-register 전송 */
(function () {
  "use strict";

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

    var payload = {
      type: type,
      phone: onlyDigits(value("phone")),
      consentPrivacy: checked("consentPrivacy"),
      consentNotice: checked("consentNotice"),
      website: (form.querySelector('[name="website"]') || {}).value || "",
      elapsed: Date.now() - openedAt,
      page: window.location.pathname,
      referrer: document.referrer ? document.referrer.slice(0, 300) : "",
      utm: utmString(),
    };
    if (type === "personal") {
      payload.name = value("name");
      payload.birth = onlyDigits(value("birth"));
    } else {
      payload.company = value("company");
      payload.manager = value("manager");
    }

    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-busy", "true");
    var label = submitBtn.textContent;
    submitBtn.textContent = "등록 중…";

    fetch("/api/pre-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        return res.json().catch(function () {
          return { ok: false };
        });
      })
      .then(function (result) {
        if (!result || !result.ok) {
          if (result && result.field) fieldError(result.field, result.error);
          else showStatus((result && result.error) || "등록하지 못했습니다. 잠시 후 다시 시도하시거나 전화로 문의해 주세요.", true);
          return;
        }
        track("pre_register_complete", { register_type: type });
        showDone(result, type);
      })
      .catch(function () {
        showStatus("네트워크 오류로 등록하지 못했습니다. 잠시 후 다시 시도하시거나 전화로 문의해 주세요.", true);
      })
      .then(function () {
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
        submitBtn.textContent = label;
      });
  });

  function showDone(result, type) {
    if (!doneBox) return;
    var receipt = doneBox.querySelector("[data-prereg-receipt]");
    var notice = doneBox.querySelector("[data-prereg-notice]");
    if (receipt) receipt.textContent = result.receiptNo || "";
    if (notice) {
      notice.textContent =
        result.customerNotice === "sent"
          ? "등록하신 연락처로 등록완료 메시지를 보내드렸습니다."
          : type === "corporate"
            ? "담당자 연락처로 등록 확인 연락을 드리겠습니다."
            : "등록완료 메시지는 확인 후 순차 발송됩니다.";
    }
    form.hidden = true;
    doneBox.hidden = false;
    doneBox.focus();
    doneBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  syncType();
})();
