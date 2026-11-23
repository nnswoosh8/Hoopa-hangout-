(function () {
  "use strict";
  var cfg = window.SITE_CONFIG || {};
  var or = cfg.ownerrez || {};

  // Strip HTML comments/whitespace to tell whether a snippet was actually pasted.
  function hasContent(html) {
    return !!(html && html.replace(/<!--[\s\S]*?-->/g, "").trim());
  }

  // Inject embed HTML and re-create <script> tags so they actually execute
  // (scripts inserted via innerHTML are inert).
  function injectEmbed(target, html) {
    var tpl = document.createElement("template");
    tpl.innerHTML = html;
    var scripts = tpl.content.querySelectorAll("script");
    scripts.forEach(function (s) { s.remove(); });
    target.appendChild(tpl.content);
    scripts.forEach(function (old) {
      var s = document.createElement("script");
      Array.prototype.forEach.call(old.attributes, function (a) { s.setAttribute(a.name, a.value); });
      s.text = old.text;
      document.body.appendChild(s);
    });
  }

  // Booking widget
  var bookEl = document.getElementById("ownerrez-booking");
  if (bookEl) {
    if (hasContent(or.bookingWidgetHtml)) {
      injectEmbed(bookEl, or.bookingWidgetHtml);
    } else {
      bookEl.classList.add("booking-placeholder");
      bookEl.innerHTML =
        "<p><strong>Online booking is coming soon.</strong></p>" +
        (or.bookingUrl
          ? '<p><a class="btn" href="' + or.bookingUrl + '" target="_blank" rel="noopener">Check availability</a></p>'
          : "<p>Please contact us for dates and rates.</p>");
    }
  }

  // Reviews: OwnerRez widget if present, otherwise static list
  var revEl = document.getElementById("ownerrez-reviews");
  var staticRev = document.getElementById("static-reviews");
  if (revEl && hasContent(or.reviewsWidgetHtml)) {
    injectEmbed(revEl, or.reviewsWidgetHtml);
    if (staticRev) staticRev.remove();
  } else if (staticRev) {
    var reviews = cfg.reviews || [];
    if (!reviews.length) {
      var sec = document.getElementById("reviews");
      if (sec) sec.hidden = true;
    } else {
      reviews.forEach(function (r) {
        var card = document.createElement("article");
        card.className = "card review";
        var stars = "★★★★★".slice(0, r.stars || 5);
        card.innerHTML = '<div class="stars" aria-label="' + (r.stars || 5) + ' stars">' + stars + "</div>";
        var q = document.createElement("blockquote"); q.textContent = "“" + r.quote + "”";
        var who = document.createElement("p"); who.className = "review-who";
        who.textContent = "— " + r.name + (r.source ? ", " + r.source : "");
        card.appendChild(q); card.appendChild(who);
        staticRev.appendChild(card);
      });
    }
  }

  // Gallery with lightbox
  var grid = document.getElementById("gallery-grid");
  var photos = cfg.gallery || [];
  if (grid) {
    photos.forEach(function (p, i) {
      var b = document.createElement("button");
      b.className = "gallery-item" + (i === 0 ? " gallery-feature" : "");
      b.setAttribute("aria-label", "View photo: " + p.alt);
      var img = document.createElement("img");
      img.src = p.src; img.alt = p.alt; img.loading = "lazy";
      img.onerror = function () { b.classList.add("img-missing"); b.setAttribute("data-label", p.alt); };
      b.appendChild(img);
      b.addEventListener("click", function () { openLightbox(i); });
      grid.appendChild(b);
    });
  }

  var lb, lbImg, lbIdx = 0;
  function openLightbox(i) {
    if (!lb) {
      lb = document.createElement("div");
      lb.className = "lightbox";
      lb.innerHTML = '<button class="lb-close" aria-label="Close">×</button>' +
        '<button class="lb-prev" aria-label="Previous">‹</button><img alt="">' +
        '<button class="lb-next" aria-label="Next">›</button>';
      document.body.appendChild(lb);
      lbImg = lb.querySelector("img");
      lb.querySelector(".lb-close").onclick = closeLightbox;
      lb.querySelector(".lb-prev").onclick = function () { show(lbIdx - 1); };
      lb.querySelector(".lb-next").onclick = function () { show(lbIdx + 1); };
      lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
      document.addEventListener("keydown", function (e) {
        if (!lb.classList.contains("open")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") show(lbIdx - 1);
        if (e.key === "ArrowRight") show(lbIdx + 1);
      });
    }
    show(i);
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function show(i) {
    lbIdx = (i + photos.length) % photos.length;
    lbImg.src = photos[lbIdx].src; lbImg.alt = photos[lbIdx].alt;
  }
  function closeLightbox() { lb.classList.remove("open"); document.body.style.overflow = ""; }

  // Contact links
  var c = cfg.contact || {};
  var cl = document.getElementById("contact-links");
  if (cl) {
    var parts = [];
    if (c.email) parts.push('<a href="mailto:' + c.email + '">' + c.email + "</a>");
    if (c.phone) parts.push('<a href="tel:' + c.phone.replace(/[^\d+]/g, "") + '">' + c.phone + "</a>");
    cl.innerHTML = parts.join(" · ") || '<a href="#book">Use the booking widget to send an inquiry</a>';
  }

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }

  // Header shadow on scroll
  var header = document.querySelector(".site-header");
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
