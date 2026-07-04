const navToggle = document.querySelector(".nav-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (navToggle && mobileNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const rentInput = document.querySelector("#rent");
const costInput = document.querySelector("#cost");
const basisInput = document.querySelector("#basis");
const simResult = document.querySelector("#simResult");

function formatPercent(value) {
  if (!Number.isFinite(value) || value < 0) {
    return "계산을 위해 값을 확인해주세요";
  }

  return `연간 참고 비율 ${value.toFixed(1)}%`;
}

function updateSimulation() {
  if (!rentInput || !costInput || !basisInput || !simResult) {
    return;
  }

  const rent = Number(rentInput.value);
  const cost = Number(costInput.value);
  const basis = Number(basisInput.value);

  if (basis <= 0) {
    simResult.textContent = "검토 기준 금액을 입력해주세요";
    return;
  }

  const annualReference = ((rent - cost) * 12 / basis) * 100;
  simResult.textContent = formatPercent(annualReference);
}

[rentInput, costInput, basisInput].forEach((input) => {
  if (input) {
    input.addEventListener("input", updateSimulation);
  }
});

updateSimulation();
