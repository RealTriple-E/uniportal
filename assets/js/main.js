/* UniPortal shared interactions. Progressive enhancement only: content is visible without JS. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Desktop dropdowns ---------- */
  document.querySelectorAll(".nav-item").forEach(function (item) {
    var btn = item.querySelector("button.nav-link");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var open = item.classList.contains("open");
      closeAllDrops();
      if (!open) { item.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
    });
    item.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { item.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.focus(); }
    });
  });
  function closeAllDrops() {
    document.querySelectorAll(".nav-item.open").forEach(function (item) {
      item.classList.remove("open");
      var b = item.querySelector("button.nav-link");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  }
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-item")) closeAllDrops();
  });

  /* ---------- Mobile drawer ---------- */
  var toggle = document.querySelector("[data-drawer-open]");
  var drawer = document.querySelector("[data-drawer]");
  var lastFocus = null;
  function openDrawer() {
    lastFocus = document.activeElement;
    drawer.classList.add("open");
    document.body.style.overflow = "hidden";
    toggle.setAttribute("aria-expanded", "true");
    var c = drawer.querySelector("[data-drawer-close]");
    if (c) c.focus();
  }
  function closeDrawer() {
    drawer.classList.remove("open");
    document.body.style.overflow = "";
    toggle.setAttribute("aria-expanded", "false");
    if (lastFocus) lastFocus.focus();
  }
  if (toggle && drawer) {
    toggle.addEventListener("click", openDrawer);
    drawer.querySelector("[data-drawer-close]").addEventListener("click", closeDrawer);
    drawer.addEventListener("click", function (e) { if (e.target === drawer) closeDrawer(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && drawer.classList.contains("open")) closeDrawer(); });
  }

  /* ---------- Scroll reveal (content visible by default; JS enhances) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Generic tabs: [data-tabs] buttons + [data-tab-panel] ---------- */
  document.querySelectorAll("[data-tabs]").forEach(function (group) {
    var btns = Array.prototype.slice.call(group.querySelectorAll('[role="tab"]'));
    function select(btn) {
      btns.forEach(function (b) {
        var on = b === btn;
        b.setAttribute("aria-selected", on ? "true" : "false");
        b.tabIndex = on ? 0 : -1;
        var p = document.getElementById(b.getAttribute("aria-controls"));
        if (p) p.hidden = !on;
      });
    }
    btns.forEach(function (b, i) {
      b.addEventListener("click", function () { select(b); });
      b.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = btns[(i + 1) % btns.length];
        if (e.key === "ArrowLeft") n = btns[(i - 1 + btns.length) % btns.length];
        if (n) { e.preventDefault(); select(n); n.focus(); }
      });
    });
  });

  /* ---------- Accordions ---------- */
  document.querySelectorAll("[data-accordion]").forEach(function (acc) {
    acc.querySelectorAll(":scope > div > button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        var body = document.getElementById(btn.getAttribute("aria-controls"));
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        if (body) body.hidden = open;
      });
    });
  });

  /* ---------- Steppers (loop / pipeline): [data-stepper] ---------- */
  document.querySelectorAll("[data-stepper]").forEach(function (st) {
    var btns = Array.prototype.slice.call(st.querySelectorAll(".stepper-list button, .explorer-list button"));
    var title = st.querySelector("[data-step-title]");
    var body = st.querySelector("[data-step-body]");
    var dataEl = st.querySelector('script[type="application/json"]');
    var steps = dataEl ? JSON.parse(dataEl.textContent).steps : [];
    var prev = st.querySelector("[data-step-prev]");
    var next = st.querySelector("[data-step-next]");
    var idx = 0;
    function show(i) {
      idx = (i + steps.length) % steps.length;
      btns.forEach(function (b, j) { b.setAttribute("aria-selected", j === idx ? "true" : "false"); });
      if (title) title.textContent = steps[idx].title;
      if (body) body.innerHTML = steps[idx].html;
      var live = st.querySelector("[data-step-live]");
      if (live) live.textContent = "Step " + (idx + 1) + " of " + steps.length + ": " + steps[idx].title;
    }
    btns.forEach(function (b, j) { b.addEventListener("click", function () { show(j); }); });
    if (prev) prev.addEventListener("click", function () { show(idx - 1); });
    if (next) next.addEventListener("click", function () { show(idx + 1); });
    if (steps.length) show(0);
  });

  /* ---------- Architecture explorer: [data-explorer] ---------- */
  document.querySelectorAll("[data-explorer]").forEach(function (ex) {
    var btns = Array.prototype.slice.call(ex.querySelectorAll("[data-layer]"));
    var panel = ex.querySelector("[data-layer-panel]");
    var dataEl = ex.querySelector('script[type="application/json"]');
    var layers = dataEl ? JSON.parse(dataEl.textContent).layers : {};
    function show(key) {
      btns.forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-layer") === key ? "true" : "false"); });
      var L = layers[key];
      if (L && panel) {
        panel.innerHTML = "<p class='micro'>Layer " + L.n + " / " + L.count + "</p><h3>" + L.title + "</h3><p>" + L.desc + "</p><dl class='kv'>" +
          "<dt>Purpose</dt><dd>" + L.purpose + "</dd>" +
          "<dt>Example</dt><dd>" + L.example + "</dd>" +
          "<dt>Governance</dt><dd>" + L.gov + "</dd></dl>";
      }
    }
    btns.forEach(function (b) { b.addEventListener("click", function () { show(b.getAttribute("data-layer")); }); });
    if (btns.length) show(btns[0].getAttribute("data-layer"));
  });

  /* ---------- Scripted chat demos: [data-chat] ---------- */
  document.querySelectorAll("[data-chat]").forEach(function (chat) {
    var log = chat.querySelector("[data-chat-log]");
    var play = chat.querySelector("[data-chat-play]");
    var replay = chat.querySelector("[data-chat-replay]");
    var dataEl = chat.querySelector('script[type="application/json"]');
    var steps = dataEl ? JSON.parse(dataEl.textContent).steps : [];
    var timers = [];
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }
    function addMsg(s) {
      var d = document.createElement("div");
      d.className = "msg " + s.from;
      d.innerHTML = '<span class="who">' + (s.from === "user" ? "You" : "UniPortal AI · demo") + "</span><p>" + s.html + "</p>";
      log.appendChild(d);
      d.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
    }
    function run(instant) {
      clearTimers();
      log.innerHTML = "";
      if (instant || reduced) { steps.forEach(addMsg); done(); return; }
      var t = 400;
      steps.forEach(function (s) {
        t += s.from === "user" ? 900 : 1400;
        timers.push(setTimeout(function () { addMsg(s); }, t));
      });
      timers.push(setTimeout(done, t + 400));
    }
    function done() {
      if (play) play.hidden = true;
      if (replay) replay.hidden = false;
      chat.querySelectorAll("[data-chat-done]").forEach(function (el) { el.hidden = false; });
    }
    if (play) play.addEventListener("click", function () { run(false); });
    if (replay) replay.addEventListener("click", function () {
      replay.hidden = true; if (play) { play.hidden = false; }
      chat.querySelectorAll("[data-chat-done]").forEach(function (el) { el.hidden = true; });
      run(false);
    });
  });

  /* ---------- Lead forms: validate -> WhatsApp compose + mailto fallback ---------- */
  document.querySelectorAll("[data-lead-form]").forEach(function (form) {
    var waNumber = form.getAttribute("data-whatsapp") || "260973981779";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field");
        var bad = !input.value.trim() ||
          (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) ||
          (input.type === "tel" && input.value.trim() && !/^[+\d][\d\s\-()]{5,}$/.test(input.value.trim()));
        if (field) field.classList.toggle("invalid", bad);
        input.setAttribute("aria-invalid", bad ? "true" : "false");
        if (bad) ok = false;
      });
      /* honeypot */
      var hp = form.querySelector(".hp input");
      if (hp && hp.value) return;
      if (!ok) {
        var firstBad = form.querySelector(".field.invalid input, .field.invalid select, .field.invalid textarea");
        if (firstBad) firstBad.focus();
        return;
      }
      var data = {};
      form.querySelectorAll("input, select, textarea").forEach(function (el) {
        if (el.name && el.type !== "submit" && !el.classList.contains("hp-input")) data[el.name] = el.value.trim();
      });
      var lines = ["Hello UniPortal,", ""];
      Object.keys(data).forEach(function (k) { if (data[k]) lines.push(k + ": " + data[k]); });
      var waUrl = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(lines.join("\n"));
      var mailUrl = "mailto:uniportal.hq@gmail.com?subject=" + encodeURIComponent("Website enquiry — " + (data["Name"] || data["Organisation"] || "new enquiry")) +
        "&body=" + encodeURIComponent(lines.join("\n"));
      var done = form.parentElement.querySelector("[data-form-success]");
      if (done) {
        done.hidden = false;
        var waBtn = done.querySelector("[data-form-wa]");
        var mailBtn = done.querySelector("[data-form-mail]");
        if (waBtn) waBtn.href = waUrl;
        if (mailBtn) mailBtn.href = mailUrl;
        form.hidden = true;
        done.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
        var h = done.querySelector("h3"); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
      } else {
        window.open(waUrl, "_blank", "noopener");
      }
    });
    /* live-clear errors */
    form.querySelectorAll("input, select, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        var field = input.closest(".field");
        if (field) field.classList.remove("invalid");
        input.removeAttribute("aria-invalid");
      });
    });
  });
})();
