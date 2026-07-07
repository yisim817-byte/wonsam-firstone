const navToggle = document.querySelector(".nav-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (navToggle && mobileNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll("a, button").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function isValidPhone(value) {
  return /^[0-9+\-\s().]{8,20}$/.test(value);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function showFormStatus(statusBox, message, isError) {
  if (!statusBox) return;
  statusBox.hidden = false;
  statusBox.textContent = message;
  statusBox.style.color = isError ? "#b91c1c" : "var(--ink)";
  statusBox.style.background = isError ? "#fef2f2" : "var(--bg)";
}

function lockSubmit(button, isLocked, loadingText, defaultText) {
  if (!button) return;
  button.disabled = isLocked;
  button.textContent = isLocked ? loadingText : defaultText;
}

function getValue(form, name) {
  return form.elements[name] ? form.elements[name].value.trim() : "";
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let detail = "";
    try {
      const body = await response.json();
      detail = body.error || "";
    } catch (err) {
      detail = "";
    }
    throw new Error(detail || "request-failed");
  }

  return response.json().catch(() => ({ ok: true }));
}

const corporateRequestForm = document.querySelector("#corporate-request-form");

if (corporateRequestForm) {
  const statusBox = corporateRequestForm.querySelector("#corporate-request-status");
  const submitButton = corporateRequestForm.querySelector('button[type="submit"]');
  const defaultSubmitText = submitButton.textContent;

  corporateRequestForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
      type: "corporate_request",
      company_name: getValue(corporateRequestForm, "company_name"),
      contact_name: getValue(corporateRequestForm, "contact_name"),
      phone: getValue(corporateRequestForm, "phone"),
      email: getValue(corporateRequestForm, "email"),
      purpose: getValue(corporateRequestForm, "purpose"),
      memo: getValue(corporateRequestForm, "memo"),
      userAgent: navigator.userAgent,
    };

    if (!payload.company_name || !payload.phone || !payload.email) {
      showFormStatus(statusBox, "기업명, 전화번호, 이메일을 모두 입력해 주세요.", true);
      return;
    }

    if (!isValidPhone(payload.phone)) {
      showFormStatus(statusBox, "연락 가능한 전화번호 형식으로 입력해 주세요.", true);
      return;
    }

    if (!isValidEmail(payload.email)) {
      showFormStatus(statusBox, "이메일 형식을 확인해 주세요.", true);
      return;
    }

    lockSubmit(submitButton, true, "접수 중...", defaultSubmitText);

    try {
      await postJson("/api/corporate-request", payload);
      corporateRequestForm.reset();
      corporateRequestForm.parentElement.insertBefore(statusBox, corporateRequestForm);
      corporateRequestForm.hidden = true;
      showFormStatus(statusBox, "기업자료 요청이 정상 접수되었습니다. 담당자가 확인 후 이메일 또는 유선으로 안내드리겠습니다.", false);
    } catch (err) {
      showFormStatus(statusBox, err.message || "접수 중 문제가 발생했습니다. 잠시 후 다시 시도하거나 전화로 문의해 주세요.", true);
    } finally {
      lockSubmit(submitButton, false, "", defaultSubmitText);
    }
  });
}

const preInterestForm = document.querySelector("#pre-interest-form");

if (preInterestForm) {
  const statusBox = preInterestForm.querySelector("#pre-interest-status");
  const submitButton = preInterestForm.querySelector('button[type="submit"]');
  const defaultSubmitText = submitButton.textContent;

  preInterestForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
      type: "personal_interest",
      name: getValue(preInterestForm, "name"),
      phone: getValue(preInterestForm, "phone"),
      email: getValue(preInterestForm, "email"),
      interest_type: getValue(preInterestForm, "interest_type"),
      memo: getValue(preInterestForm, "memo"),
      userAgent: navigator.userAgent,
    };

    if (!payload.name || !payload.phone || !payload.email) {
      showFormStatus(statusBox, "이름, 전화번호, 이메일을 모두 입력해 주세요.", true);
      return;
    }

    if (!isValidPhone(payload.phone)) {
      showFormStatus(statusBox, "연락 가능한 전화번호 형식으로 입력해 주세요.", true);
      return;
    }

    if (!isValidEmail(payload.email)) {
      showFormStatus(statusBox, "이메일 형식을 확인해 주세요.", true);
      return;
    }

    lockSubmit(submitButton, true, "접수 중...", defaultSubmitText);

    try {
      await postJson("/api/interest-request", payload);
      preInterestForm.reset();
      preInterestForm.parentElement.insertBefore(statusBox, preInterestForm);
      preInterestForm.hidden = true;
      showFormStatus(statusBox, "사전의향서가 정상 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.", false);
    } catch (err) {
      showFormStatus(statusBox, err.message || "접수 중 문제가 발생했습니다. 잠시 후 다시 시도하거나 전화로 문의해 주세요.", true);
    } finally {
      lockSubmit(submitButton, false, "", defaultSubmitText);
    }
  });
}

const corporateInterestForm = document.querySelector("#corporate-interest-form");

if (corporateInterestForm) {
  const statusBox = corporateInterestForm.querySelector("#corporate-interest-status");
  const submitButton = corporateInterestForm.querySelector('button[type="submit"]');
  const defaultSubmitText = submitButton.textContent;

  corporateInterestForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
      type: "corporate_interest",
      company_name: getValue(corporateInterestForm, "company_name"),
      contact_name: getValue(corporateInterestForm, "contact_name"),
      phone: getValue(corporateInterestForm, "phone"),
      email: getValue(corporateInterestForm, "email"),
      purpose: getValue(corporateInterestForm, "purpose"),
      memo: getValue(corporateInterestForm, "memo"),
      userAgent: navigator.userAgent,
    };

    if (!payload.company_name || !payload.contact_name || !payload.phone || !payload.email) {
      showFormStatus(statusBox, "기업명, 담당자명, 전화번호, 이메일을 모두 입력해 주세요.", true);
      return;
    }

    if (!isValidPhone(payload.phone)) {
      showFormStatus(statusBox, "연락 가능한 전화번호 형식으로 입력해 주세요.", true);
      return;
    }

    if (!isValidEmail(payload.email)) {
      showFormStatus(statusBox, "이메일 형식을 확인해 주세요.", true);
      return;
    }

    lockSubmit(submitButton, true, "접수 중...", defaultSubmitText);

    try {
      await postJson("/api/interest-request", payload);
      corporateInterestForm.reset();
      corporateInterestForm.parentElement.insertBefore(statusBox, corporateInterestForm);
      corporateInterestForm.hidden = true;
      showFormStatus(statusBox, "기업의향서가 정상 접수되었습니다. 담당자가 기업 검토자료 확인 후 연락드리겠습니다.", false);
    } catch (err) {
      showFormStatus(statusBox, err.message || "접수 중 문제가 발생했습니다. 잠시 후 다시 시도하거나 전화로 문의해 주세요.", true);
    } finally {
      lockSubmit(submitButton, false, "", defaultSubmitText);
    }
  });
}

function openModal(modal) {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeAllModals() {
  document.querySelectorAll(".media-modal.is-open").forEach((modal) => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  });
  const htmlModalBody = document.getElementById("htmlInfographicModalBody");
  if (htmlModalBody) {
    htmlModalBody.innerHTML = "";
  }
  document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-modal-target]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openModal(document.getElementById(trigger.dataset.modalTarget));
  });

  trigger.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openModal(document.getElementById(trigger.dataset.modalTarget));
  });
});

document.querySelectorAll("[data-modal-close]").forEach((closeEl) => {
  closeEl.addEventListener("click", closeAllModals);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeAllModals();
});

const htmlInfographicModal = document.getElementById("htmlInfographicModal");
const htmlInfographicModalBody = document.getElementById("htmlInfographicModalBody");

function openHtmlInfographicModal(card) {
  if (!htmlInfographicModal || !htmlInfographicModalBody || !card) return;
  const clone = card.cloneNode(true);
  clone.removeAttribute("tabindex");
  clone.removeAttribute("role");
  clone.removeAttribute("data-zoom-html");
  clone.classList.add("is-visible");
  clone.querySelectorAll("[data-count-up]").forEach((item) => {
    item.textContent = Number(item.dataset.countUp).toLocaleString();
  });
  htmlInfographicModalBody.innerHTML = "";
  htmlInfographicModalBody.appendChild(clone);
  openModal(htmlInfographicModal);
}

document.querySelectorAll("[data-zoom-html]").forEach((card) => {
  card.addEventListener("click", () => openHtmlInfographicModal(card));

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openHtmlInfographicModal(card);
  });
});

const revealItems = document.querySelectorAll(".reveal-up");

if ("IntersectionObserver" in window && revealItems.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

function animateCountUp(el) {
  const target = Number(el.dataset.countUp);
  if (!Number.isFinite(target) || el.dataset.counted === "true") return;
  el.dataset.counted = "true";
  const duration = 1100;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

const countUpItems = document.querySelectorAll("[data-count-up]");

if ("IntersectionObserver" in window && countUpItems.length) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCountUp(entry.target);
      countObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  countUpItems.forEach((item) => countObserver.observe(item));
} else {
  countUpItems.forEach(animateCountUp);
}
