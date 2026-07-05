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

const corporateRequestForm = document.querySelector("#corporate-request-form");

if (corporateRequestForm) {
  const statusBox = corporateRequestForm.querySelector("#corporate-request-status");
  const submitButton = corporateRequestForm.querySelector('button[type="submit"]');

  const showStatus = (message, isError) => {
    statusBox.hidden = false;
    statusBox.textContent = message;
    statusBox.style.color = isError ? "#b91c1c" : "var(--ink)";
    statusBox.style.background = isError ? "#fef2f2" : "var(--bg)";
  };

  corporateRequestForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
      company_name: corporateRequestForm.company_name.value.trim(),
      phone: corporateRequestForm.phone.value.trim(),
      email: corporateRequestForm.email.value.trim(),
      purpose: corporateRequestForm.purpose.value,
    };

    if (!payload.company_name || !payload.phone || !payload.email) {
      showStatus("기업명, 전화번호, 이메일을 모두 입력해 주세요.", true);
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "접수 중...";

    try {
      const response = await fetch("/api/corporate-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("request-failed");
      }

      corporateRequestForm.reset();
      corporateRequestForm.parentElement.insertBefore(statusBox, corporateRequestForm);
      corporateRequestForm.hidden = true;
      showStatus("자료 요청이 접수되었습니다. 담당자가 확인 후 이메일 또는 유선으로 안내드립니다.", false);
    } catch (err) {
      showStatus("접수 중 문제가 발생했습니다. 잠시 후 다시 시도하거나 이메일로 문의해 주세요.", true);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "기업자료 요청하기";
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
