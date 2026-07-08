window.SITE_CONTACT = {
  REPRESENTATIVE_PHONE: "1644-6873",
  REPRESENTATIVE_TEL: "tel:16446873",
};

document.addEventListener("DOMContentLoaded", function () {
  var contact = window.SITE_CONTACT;
  if (!contact) return;

  document.querySelectorAll("[data-contact-phone]").forEach(function (node) {
    node.textContent = contact.REPRESENTATIVE_PHONE;
  });

  document.querySelectorAll('a[href="tel:16446873"], a[data-contact-phone-link]').forEach(function (link) {
    link.setAttribute("href", contact.REPRESENTATIVE_TEL);
  });
});
