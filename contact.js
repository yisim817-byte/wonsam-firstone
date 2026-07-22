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

(function () {
  "use strict";

  window.dataLayer = window.dataLayer || [];

  var debugMode = new URLSearchParams(window.location.search).get("tracking_debug") === "1";
  var siteName = "wonsam_firstone";

  function cleanText(value) {
    return (value || "").replace(/\s+/g, " ").trim().slice(0, 100);
  }

  function trackEvent(name, params) {
    var payload = Object.assign({
      event: name,
      site_name: siteName,
      page_path: window.location.pathname
    }, params || {});

    if (debugMode) {
      payload.debug_mode = true;
      payload.test_event = true;
    }

    window.dataLayer.push(payload);
    if (debugMode && window.console) window.console.info("[tracking]", payload);
  }

  function formTypeFromHref(href) {
    if (href.indexOf("corporate-request.html") !== -1) return "corporate_request";
    if (href.indexOf("corporate-interest.html") !== -1) return "corporate_interest";
    if (href.indexOf("pre-interest.html") !== -1) return "pre_interest";
    if (href.indexOf("consultation.html") !== -1) return "consultation";
    return "";
  }

  document.addEventListener("click", function (event) {
    var target = event.target.closest("a, button");
    if (!target) return;

    var href = target.getAttribute("href") || "";
    var buttonText = cleanText(target.textContent || target.getAttribute("aria-label"));

    if (href.indexOf("tel:") === 0) {
      trackEvent("phone_click", {
        button_text: buttonText,
        phone_number: href.replace("tel:", "")
      });
    }

    var formType = formTypeFromHref(href);
    if (formType) {
      trackEvent("consultation_click", {
        button_text: buttonText,
        form_type: formType
      });
    }

    if (target.matches(".btn-primary, .nav-cta, .mobile-cta a")) {
      trackEvent("primary_cta_click", {
        button_text: buttonText,
        form_type: formType
      });
    }

    if (href.indexOf("promotion-viewer.html") !== -1 || /\.pdf(?:$|[?#])/i.test(href)) {
      trackEvent("pdf_view", {
        button_text: buttonText,
        document_name: href
      });
    }
  });

  document.querySelectorAll("video").forEach(function (video) {
    video.addEventListener("play", function () {
      if (video.dataset.trackingPlayed === "true") return;
      video.dataset.trackingPlayed = "true";
      trackEvent("video_play", {
        document_name: video.currentSrc || video.getAttribute("src") || "hero_video"
      });
    });
  });

  window.wonsamTrack = trackEvent;
})();
