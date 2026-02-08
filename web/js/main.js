(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Date and time picker
    $('#date').datetimepicker({
        format: 'L'
    });
    $('#time').datetimepicker({
        format: 'LT'
    });


    // Service carousel
    $(".service-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        center: true,
        autoplay: true,
        smartSpeed: 1000,
        margin: 30,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

$(document).on('click', '.lightboxOverlay', function(e) {
    if (e.target === this) {
        $('.lb-close').trigger('click');
    }
});

// =====================================================
// Cookie Consent (banner + modal) - v1
// Requiere que exista en el HTML: #cookieBanner y #cookieModal
// =====================================================
(function () {
  const KEY = "cookieConsent_v1";

  function getConsent() {
    try { return JSON.parse(localStorage.getItem(KEY) || "null"); }
    catch { return null; }
  }

  function setConsent(consent) {
    localStorage.setItem(KEY, JSON.stringify(consent));
  }

  function showBanner() {
    const banner = document.getElementById("cookieBanner");
    if (banner) banner.classList.add("is-visible");
  }

  function hideBanner() {
    const banner = document.getElementById("cookieBanner");
    if (banner) banner.classList.remove("is-visible");
  }

  function openModal() {
    const modal = document.getElementById("cookieModal");
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    const modal = document.getElementById("cookieModal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  function runBlockedThirdParty() {
    // Maps
    document.querySelectorAll("iframe[data-src]").forEach((iframe) => {
      iframe.src = iframe.getAttribute("data-src");
      iframe.removeAttribute("data-src");
    });

    // Google Calendar: scripts placeholder
    document
      .querySelectorAll('script[type="text/plain"][data-consent="third-party"][data-gcal-target]')
      .forEach((scr) => {
        const targetId = scr.dataset.gcalTarget;
        const color = scr.dataset.gcalColor || "#343a40";
        const el = document.getElementById(targetId);
        if (!el) return;
        if (el.dataset.rendered === "1") return;

        el.innerHTML = "";
        window.calendar.schedulingButton.load({
          url: "https://calendar.google.com/calendar/appointments/AcZssZ3oTHK7aVM3SP2_AgRVnGlZB0OpY_NuOf52wvg=?gv=true",
          color,
          label: "Reservar una cita",
          target: el,
        });

        el.dataset.rendered = "1";
        scr.remove();
      });
  }

  function enableThirdParty() {
    // Si el script de Google Calendar no está cargado, lo cargamos y luego ejecutamos
    if (!document.querySelector('script[data-consent="gcal-loader"]')) {
      const s = document.createElement("script");
      s.src = "https://calendar.google.com/calendar/scheduling-button-script.js";
      s.defer = true;
      s.setAttribute("data-consent", "gcal-loader");
      s.onload = runBlockedThirdParty;
      document.head.appendChild(s);
    } else {
      runBlockedThirdParty();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("cookieBanner");
    if (!banner) return; // esta página no tiene banner

    const modal = document.getElementById("cookieModal");

    const btnAccept = document.getElementById("cookieAccept");
    const btnReject = document.getElementById("cookieReject");
    const btnSettings = document.getElementById("cookieSettings");
    const btnSave = document.getElementById("cookieSave");
    const btnClose = document.getElementById("cookieClose");
    const chkThirdParty = document.getElementById("consentThirdParty");

    const existing = getConsent();
    if (!existing) showBanner();
    else if (existing.thirdParty) enableThirdParty();

    btnAccept?.addEventListener("click", () => {
      setConsent({ necessary: true, thirdParty: true, date: new Date().toISOString() });
      hideBanner();
      enableThirdParty();
      location.reload();
    });

    btnReject?.addEventListener("click", () => {
      setConsent({ necessary: true, thirdParty: false, date: new Date().toISOString() });
      hideBanner();
    });

    btnSettings?.addEventListener("click", () => {
      const current = getConsent();
      if (chkThirdParty) chkThirdParty.checked = !!(current && current.thirdParty);
      openModal();
    });

    btnSave?.addEventListener("click", () => {
      const consent = { necessary: true, thirdParty: !!(chkThirdParty && chkThirdParty.checked), date: new Date().toISOString() };
      setConsent(consent);
      closeModal();
      hideBanner();
      if (consent.thirdParty) enableThirdParty();
    });

    btnClose?.addEventListener("click", closeModal);
    modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  });
})();

