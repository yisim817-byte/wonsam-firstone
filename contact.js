window.SITE_CONTACT = {
  REPRESENTATIVE_PHONE: "1644-6873",
  REPRESENTATIVE_TEL: "tel:16446873",
  CONTACT_NUMBERS: [
    {
      label: "대표번호",
      value: "1644-6873",
      href: "tel:16446873"
    }
  ]
};

document.addEventListener("DOMContentLoaded", function () {
  var contact = window.SITE_CONTACT;
  if (!contact) return;

  document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
    link.setAttribute("href", contact.REPRESENTATIVE_TEL);
    if (/^\s*(1644-6873|전화 상담\s*\d|대표번호\s*\d)/.test(link.textContent || "")) {
      link.textContent = (link.textContent || "").replace(/1644-6873/g, contact.REPRESENTATIVE_PHONE);
    }
  });

  document.querySelectorAll("[data-contact-phone]").forEach(function (node) {
    node.textContent = contact.REPRESENTATIVE_PHONE;
  });
});
