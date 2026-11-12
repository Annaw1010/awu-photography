/* Awu Photography site logic. You normally don't need to edit this file.
   All content lives in content.js. */
(function () {
  "use strict";
  var S = window.SITE;
  if (!S) {
    document.body.innerHTML = '<p style="padding:2rem;font-family:sans-serif">content.js has a typo (often a missing comma or quote). Open it on GitHub and check the last thing you changed.</p>';
    return;
  }

  var $ = function (id) { return document.getElementById(id); };
  var cats = S.categories || [];
  var albums = S.albums || [];
  var catById = {};
  cats.forEach(function (c) { catById[c.id] = c; });
  var currentCat = "all";

  /* ---------- Helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function url(path) { return path.split("/").map(encodeURIComponent).join("/"); }
  function folderOf(a) { return (a.folder || ("photos/" + a.id)).replace(/\/+$/, ""); }
  function join(a, file) { return file.indexOf("/") > -1 ? file : folderOf(a) + "/" + file; }

  function photoList(a) {
    var files;
    if (Array.isArray(a.photos)) {
      files = a.photos;
    } else {
      var n = parseInt(a.photos, 10) || 0;
      var pattern = a.pattern || "{n}.jpg";
      files = [];
      for (var i = 1; i <= n; i++) files.push(pattern.replace("{n}", i));
    }
    return files.map(function (f) { return join(a, f); });
  }
  function coverOf(a) { return a.cover ? join(a, a.cover) : photoList(a)[0]; }

  // Image that shows the exact expected path if the file can't be found
  function img(src, alt, eager) {
    var el = document.createElement("img");
    if (!eager) el.loading = "lazy";
    el.decoding = "async";
    el.alt = alt || "";
    el.addEventListener("error", function () {
      var box = document.createElement("div");
      box.className = "missing";
      box.innerHTML = "<span>Photo not found</span><code>" + esc(src) + "</code>";
      if (el.parentNode) el.replaceWith(box);
    });
    el.src = url(src || "");
    return el;
  }
  function plural(n) { return n + (n === 1 ? " photo" : " photos"); }

  /* ---------- Site-wide text ---------- */
  var name = S.name || "Awu Photography";
  document.title = name;
  var words = name.split(" ");
  var wm = document.querySelector(".wordmark");
  wm.innerHTML = "<span>" + esc(words[0]) + "</span>" + (words.length > 1 ? "<span>" + esc(words.slice(1).join(" ")) + "</span>" : "");
  document.querySelector(".brand").textContent = name;
  $("tagline").textContent = S.tagline || "";
  $("hero-img").src = url(S.heroPhoto || "");
  $("copyright").textContent = "\u00A9 " + new Date().getFullYear() + " " + name;

  var c = S.contact || {};
  if (c.instagram) $("foot-ig").href = "https://instagram.com/" + c.instagram.replace(/^@/, "");
  else $("foot-ig").remove();
  if (c.email) $("foot-email").href = "mailto:" + c.email;
  else $("foot-email").remove();

  // About
  var ab = S.about || {};
  if (ab.photo) $("about-photo").appendChild(img(ab.photo, "Portrait of the photographer"));
  $("about-copy").innerHTML = (ab.paragraphs || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");

  // Booking buttons
  if (S.bookingLink) {
    document.querySelectorAll("[data-book]").forEach(function (a) {
      a.href = S.bookingLink; a.target = "_blank"; a.rel = "noopener";
      a.removeAttribute("data-book");
    });
    $("book-link").hidden = false;
    $("book-link-btn").href = S.bookingLink;
  }

  /* ---------- Portfolio tabs and album covers ---------- */
  function renderTabs() {
    var list = [{ id: "all", name: "All" }].concat(cats);
    $("tabs").innerHTML = list.map(function (t) {
      var sel = t.id === currentCat;
      return '<button class="tab" role="tab" aria-selected="' + sel + '" data-cat="' + esc(t.id) + '">' +
        esc(t.name) + (t.comingSoon ? '<span class="soon">soon</span>' : "") + "</button>";
    }).join("");
  }

  function albumCard(a) {
    var cat = catById[a.category];
    var count = photoList(a).length;
    var link = document.createElement("a");
    link.className = "album-card";
    link.href = "#album/" + encodeURIComponent(a.id);
    var frame = document.createElement("div");
    frame.className = "frame";
    frame.appendChild(img(coverOf(a), a.title));
    link.appendChild(frame);
    var meta = [cat ? cat.name : "", a.date, plural(count)].filter(Boolean).join(", ");
    link.insertAdjacentHTML("beforeend", "<h3>" + esc(a.title) + "</h3><p>" + esc(meta) + "</p>");
    return link;
  }

  function soonCard(cat) {
    var b = document.createElement("a");
    b.className = "album-card soon-card";
    b.href = "#portfolio";
    b.innerHTML = '<div class="frame"><span>Coming soon</span></div><h3>' + esc(cat.name) + "</h3><p>Booking opens soon</p>";
    b.addEventListener("click", function (e) { e.preventDefault(); selectCat(cat.id); });
    return b;
  }

  function soonPanel(cat) {
    var d = document.createElement("div");
    d.className = "soon-panel";
    d.innerHTML = "<h3>" + esc(cat.name) + " coming soon</h3><p>" + esc(cat.comingSoonText || "Check back soon.") + "</p>";
    var btn = document.createElement("a");
    btn.className = "btn";
    btn.textContent = "Join the list";
    if (S.bookingLink) { btn.href = S.bookingLink; btn.target = "_blank"; btn.rel = "noopener"; }
    else {
      btn.href = "#book";
      btn.addEventListener("click", function () { var sel = $("f-type"); sel.value = cat.name + " (waitlist)"; });
    }
    d.appendChild(btn);
    return d;
  }

  function renderAlbums() {
    var box = $("albums");
    box.innerHTML = "";
    var cat = catById[currentCat];
    var shown = albums.filter(function (a) { return currentCat === "all" || a.category === currentCat; });

    if (cat && cat.comingSoon && shown.length === 0) { box.appendChild(soonPanel(cat)); return; }
    shown.forEach(function (a) { box.appendChild(albumCard(a)); });
    if (currentCat === "all") {
      cats.forEach(function (ct) {
        var has = albums.some(function (a) { return a.category === ct.id; });
        if (ct.comingSoon && !has) box.appendChild(soonCard(ct));
      });
    }
    if (!box.children.length) box.innerHTML = '<p class="empty">No albums here yet.</p>';
  }

  function selectCat(id) {
    currentCat = id;
    renderTabs();
    renderAlbums();
    var t = document.querySelector('.tab[data-cat="' + id + '"]');
    if (t) t.focus({ preventScroll: true });
  }
  $("tabs").addEventListener("click", function (e) {
    var t = e.target.closest(".tab");
    if (t) selectCat(t.getAttribute("data-cat"));
  });
  $("tabs").addEventListener("keydown", function (e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
    var i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    var next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
    selectCat(next.getAttribute("data-cat"));
  });

  /* ---------- Services and inquiry form ---------- */
  $("packages").innerHTML = (S.packages || []).map(function (p) {
    var soon = catById[p.category] && catById[p.category].comingSoon;
    var price = p.price ? esc(p.price) : (soon ? "<em>Coming soon</em>" : "");
    return '<li class="' + (soon ? "p-soon" : "") + '"><span class="p-name">' + esc(p.name) +
      '</span><span class="p-details">' + esc(p.details) + '</span><span class="p-price">' + price + "</span></li>";
  }).join("");

  var types = (S.packages || []).map(function (p) {
    var soon = catById[p.category] && catById[p.category].comingSoon;
    return p.name + (soon ? " (waitlist)" : "");
  });
  types.push("Something else");
  $("f-type").innerHTML = types.map(function (t) { return "<option>" + esc(t) + "</option>"; }).join("");

  $("inquiry").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, status = $("form-status");
    var nameEl = f.elements.name, emailEl = f.elements.email;
    var okName = nameEl.value.trim() !== "";
    var okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim());
    nameEl.setAttribute("aria-invalid", !okName);
    emailEl.setAttribute("aria-invalid", !okEmail);
    if (!okName || !okEmail) {
      status.textContent = !okName ? "Add your name so I know who's asking." : "Add a valid email so I can reply.";
      (!okName ? nameEl : emailEl).focus();
      return;
    }
    if (!c.email) { status.textContent = "Email isn't set up yet. Message me on Instagram instead."; return; }
    var date = f.elements.date.value;
    var subject = "Booking inquiry: " + f.elements.type.value;
    var body = [
      "Name: " + nameEl.value.trim(),
      "Email: " + emailEl.value.trim(),
      "Session: " + f.elements.type.value,
      "Preferred date: " + (date || "Flexible"),
      "",
      f.elements.message.value.trim()
    ].join("\n");
    window.location.href = "mailto:" + c.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    status.textContent = "Your email app should open with the message filled in. Press send there to finish.";
  });

  /* ---------- Album page ---------- */
  var currentPhotos = [];
  function showAlbum(id) {
    var a = albums.filter(function (x) { return x.id === id; })[0];
    if (!a) { location.hash = "#portfolio"; return; }
    var photos = photoList(a);
    currentPhotos = photos;
    var cat = catById[a.category];
    document.title = a.title + " | " + name;
    $("cover-img").src = url(coverOf(a));
    $("cover-img").alt = a.title;
    $("album-title").textContent = a.title;
    $("album-meta").textContent = [cat ? cat.name : "", a.date].filter(Boolean).join(", ");
    $("album-count").textContent = plural(photos.length);
    var m = $("masonry");
    m.innerHTML = "";
    photos.forEach(function (src, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Open photo " + (i + 1) + " of " + photos.length);
      b.appendChild(img(src, a.title + ", photo " + (i + 1), i < 3));
      b.addEventListener("click", function () { openViewer(i, b); });
      m.appendChild(b);
    });
    $("home").hidden = true;
    $("album").hidden = false;
    window.scrollTo(0, 0);
  }

  document.querySelector('#album a[href="#gallery"]').addEventListener("click", function (e) {
    e.preventDefault();
    $("gallery").scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- Photo viewer ---------- */
  var idx = 0, lastFocus = null;
  var lb = $("lb"), lbImg = $("lb-img");
  function show(i) {
    idx = (i + currentPhotos.length) % currentPhotos.length;
    lbImg.src = url(currentPhotos[idx]);
    lbImg.alt = "Photo " + (idx + 1) + " of " + currentPhotos.length;
    $("lb-count").textContent = (idx + 1) + " / " + currentPhotos.length;
    [idx + 1, idx - 1].forEach(function (j) {
      var p = currentPhotos[(j + currentPhotos.length) % currentPhotos.length];
      if (p) new Image().src = url(p);
    });
  }
  function openViewer(i, from) {
    lastFocus = from;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    show(i);
    $("lb-close").focus();
  }
  function closeViewer() {
    lb.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  $("lb-close").addEventListener("click", closeViewer);
  $("lb-prev").addEventListener("click", function () { show(idx - 1); });
  $("lb-next").addEventListener("click", function () { show(idx + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeViewer(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeViewer();
    else if (e.key === "ArrowRight") show(idx + 1);
    else if (e.key === "ArrowLeft") show(idx - 1);
    else if (e.key === "Tab") {
      var f = [$("lb-close"), $("lb-prev"), $("lb-next")];
      var k = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(k + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus();
    }
  });
  var touchX = null;
  lb.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 45) show(idx + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ---------- Top bar turns solid after the big photo ---------- */
  var bar = $("bar"), ticking = false;
  function updateBar() {
    var hero = $("album").hidden ? document.querySelector(".hero") : document.querySelector(".cover");
    var limit = hero ? hero.offsetHeight - bar.offsetHeight : 0;
    bar.classList.toggle("solid", window.scrollY >= limit - 12);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(updateBar); }
  }, { passive: true });
  window.addEventListener("resize", updateBar);

  /* ---------- Routing (#album/<id> opens an album) ---------- */
  function route() {
    if (!lb.hidden) closeViewer();
    var h = decodeURIComponent(location.hash.slice(1));
    if (h.indexOf("album/") === 0) {
      showAlbum(h.slice(6));
    } else {
      document.title = name;
      var wasAlbum = !$("album").hidden;
      $("album").hidden = true;
      $("home").hidden = false;
      var target = h ? document.getElementById(h) : null;
      if (target) requestAnimationFrame(function () { target.scrollIntoView({ behavior: wasAlbum ? "auto" : "smooth" }); });
      else if (wasAlbum || !h) window.scrollTo(0, 0);
    }
    updateBar();
  }
  window.addEventListener("hashchange", route);

  renderTabs();
  renderAlbums();
  route();
})();
