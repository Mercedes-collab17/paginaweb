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

  const banner = document.getElementById("cookieBanner");
  const modal = document.getElementById("cookieModal");

  // Si la página no tiene banner/modal, no hacemos nada
  if (!banner || !modal) return;

  const btnAccept = document.getElementById("cookieAccept");
  const btnReject = document.getElementById("cookieReject");
  const btnSettings = document.getElementById("cookieSettings");
  const btnSave = document.getElementById("cookieSave");
  const btnClose = document.getElementById("cookieClose");

  const chkThirdParty = document.getElementById("consentThirdParty");

  function getConsent() {
    try { return JSON.parse(localStorage.getItem(KEY) || "null"); }
    catch { return null; }
  }

  function setConsent(consent) {
    localStorage.setItem(KEY, JSON.stringify(consent));
  }

  function showBanner() { banner.classList.add("is-visible"); }
  function hideBanner() { banner.classList.remove("is-visible"); }

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  function enableThirdParty() {
    // 1) Ejecuta scripts inline bloqueados
    document
      .querySelectorAll('script[type="text/plain"][data-consent="third-party"]')
      .forEach((scr) => {
        const s = document.createElement("script");
        if (scr.src) s.src = scr.src;
        s.text = scr.textContent;
        document.body.appendChild(s);
        scr.parentNode.removeChild(scr);
      });

    // 2) Activa iframes con data-src (Maps, etc.)
    document.querySelectorAll("iframe[data-src]").forEach((iframe) => {
      iframe.setAttribute("src", iframe.getAttribute("data-src"));
      iframe.removeAttribute("data-src");
    });
  }

  function applyConsent(consent) {
    if (consent && consent.thirdParty) enableThirdParty();
  }

  function hardRefreshSameUrl() {
    // refresh “limpio” sin re-enviar formularios
    window.location.replace(window.location.pathname + window.location.search + window.location.hash);
  }

  // Init
  const existing = getConsent();
  if (!existing) {
    showBanner();
  } else {
    applyConsent(existing);
  }

  // Events
  btnAccept?.addEventListener("click", () => {
    const consent = { necessary: true, thirdParty: true, date: new Date().toISOString() };
    setConsent(consent);
    hideBanner();

    // Si quieres refrescar siempre al aceptar:
    hardRefreshSameUrl();
  });

  btnReject?.addEventListener("click", () => {
    const consent = { necessary: true, thirdParty: false, date: new Date().toISOString() };
    setConsent(consent);
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

    // Refresca solo si han activado terceros
    if (consent.thirdParty) hardRefreshSameUrl();
  });

  btnClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
})();