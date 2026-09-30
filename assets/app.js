/* AI 生图资产库 — 前端逻辑
 * 无依赖，hash 路由：#/ 首屏，#/<projectId> 子项目详情。
 * 数据来自 data/projects.js 与 data/<projectId>.js（挂 window 全局）。
 */
(function () {
  'use strict';

  var PROJECTS = window.AIS_PROJECTS || [];
  var ITEMS = window.AIS_ITEMS || {};

  var app = document.getElementById('app');

  /* ---------- 工具 ---------- */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  var ICON_CHEV = '<svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">' +
    '<path d="M2 4.5L6 8.5L10 4.5" fill="none" stroke="currentColor" stroke-width="1.6" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* 复制：优先 Clipboard API；file:// 下它是 undefined，回退到 execCommand */
  function copyText(text, btn) {
    function done() {
      if (!btn) return;
      var old = btn.textContent;
      btn.textContent = '已复制';
      btn.classList.add('is-done');
      setTimeout(function () {
        btn.textContent = old;
        btn.classList.remove('is-done');
      }, 1400);
    }

    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-1000px';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      if (ok) { done(); return; }
      // 两条路都不行时，把文本选中让用户自己按 Cmd+C
      var pre = btn && btn.closest('.block') ? btn.closest('.block').querySelector('.code') : null;
      if (pre) {
        var r = document.createRange();
        r.selectNodeContents(pre);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        btn.textContent = '已选中，按 Cmd/Ctrl+C';
        setTimeout(function () { btn.textContent = '复制'; }, 2600);
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
  }

  /* ---------- 首屏 ---------- */

  function projectCardHTML(p) {
    var ready = p.status === 'ready';
    var count = p.dataKey && ITEMS[p.dataKey] ? ITEMS[p.dataKey].items.length : 0;

    var chips = (p.groups || []).map(function (g) {
      return '<span class="chip">' + esc(g) + '</span>';
    }).join('');

    var badge = ready
      ? '<span class="badge badge-ready">已上线 · ' + count + ' ' + esc(p.unit || '条') + '</span>'
      : '<span class="badge badge-planned">规划中</span>';

    return '' +
      '<article class="project-card ' + (ready ? 'is-ready' : 'is-planned') + '"' +
        ' style="--card-accent:' + esc(p.accent || '#d9532b') + '"' +
        (ready ? ' data-goto="' + esc(p.id) + '" role="link" tabindex="0"' : '') + '>' +
        '<div class="project-no">SUB-PROJECT ' + String(p.no).padStart(2, '0') + '</div>' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<div class="project-sub">' + esc(p.subtitle) + '</div>' +
        '<p>' + esc(p.desc) + '</p>' +
        (chips ? '<div class="chip-row">' + chips + '</div>' : '') +
        '<div class="card-foot">' + badge +
          (ready ? '<span class="enter-hint">进入查看 →</span>' : '') +
        '</div>' +
      '</article>';
  }

  function renderHome() {
    var totalItems = PROJECTS.reduce(function (n, p) {
      return n + (p.dataKey && ITEMS[p.dataKey] ? ITEMS[p.dataKey].items.length : 0);
    }, 0);
    var ready = PROJECTS.filter(function (p) { return p.status === 'ready'; }).length;

    app.innerHTML = '' +
      '<div class="hero">' +
        '<h2>AI 生图资产库</h2>' +
        '<p>把可复用的 AI 出图资产集中管起来：每个子项目解决一类出图问题，' +
        '内容都能直接复制到出图工具里用。点开卡片进入浏览。</p>' +
        '<div class="hero-meta">' +
          '<span>子项目 <b>' + ready + '</b> 个已上线 / ' + PROJECTS.length + ' 个占位</span>' +
          '<span>可直接复制的 Prompt <b>' + totalItems + '</b> 条</span>' +
          '<span>更新 <b>' + today() + '</b></span>' +
        '</div>' +
      '</div>' +
      '<div class="project-grid">' + PROJECTS.map(projectCardHTML).join('') + '</div>';

    app.querySelectorAll('[data-goto]').forEach(function (el) {
      function go() { location.hash = '#/' + el.getAttribute('data-goto'); }
      el.addEventListener('click', go);
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
      });
    });

    window.scrollTo(0, 0);
  }

  /* ---------- 子项目详情 ---------- */

  var state = { q: '', group: 'ALL' };

  function styleCardHTML(it) {
    var kws = (it.keywords || []).map(function (k) {
      return '<span class="kw">' + esc(k) + '</span>';
    }).join('');

    return '' +
      '<article class="style-card" data-id="' + esc(it.id) + '">' +
        '<div class="style-top" data-toggle>' +
          '<span class="style-no">' + String(it.no).padStart(2, '0') + '</span>' +
          '<div class="style-title">' +
            '<h3>' + esc(it.name) + ' <em>' + esc(it.en) + '</em></h3>' +
            '<p>' + esc(it.desc) + '</p>' +
          '</div>' +
          '<span class="toggle">Prompt ' + ICON_CHEV + '</span>' +
        '</div>' +
        '<div class="style-body" hidden>' +
          '<div class="block">' +
            '<div class="block-head"><h4>Keywords</h4></div>' +
            '<div class="kw-row">' + kws + '</div>' +
          '</div>' +
          '<div class="block">' +
            '<div class="block-head"><h4>Prompt</h4>' +
              '<button class="copy" data-copy="prompt">复制</button></div>' +
            '<pre class="code">' + esc(it.prompt) + '</pre>' +
          '</div>' +
          (it.negative ?
          '<div class="block">' +
            '<div class="block-head"><h4>Negative</h4>' +
              '<button class="copy" data-copy="negative">复制</button></div>' +
            '<pre class="code is-neg">' + esc(it.negative) + '</pre>' +
          '</div>' : '') +
          (it.tip ?
          '<div class="block"><div class="tip"><b>提示</b> · ' + esc(it.tip) + '</div></div>' : '') +
        '</div>' +
      '</article>';
  }

  function renderDetail(pid) {
    var p = PROJECTS.filter(function (x) { return x.id === pid; })[0];
    var bundle = p && p.dataKey ? ITEMS[p.dataKey] : null;

    if (!p || !bundle) {
      app.innerHTML = '<div class="empty">这个子项目还没有内容。<br>' +
        '<a href="#/">← 返回首页</a></div>';
      return;
    }

    var items = bundle.items;
    var groupCounts = {};
    items.forEach(function (it) { groupCounts[it.group] = (groupCounts[it.group] || 0) + 1; });

    var groups = Object.keys(groupCounts);
    var filters = '<button class="filter is-active" data-group="ALL">全部' +
      '<span class="cnt">' + items.length + '</span></button>' +
      groups.map(function (g) {
        return '<button class="filter" data-group="' + esc(g) + '">' + esc(g) +
          '<span class="cnt">' + groupCounts[g] + '</span></button>';
      }).join('');

    app.innerHTML = '' +
      '<div class="crumbs"><a href="#/">全部子项目</a><span>›</span>' +
        '<span>' + esc(p.name) + '</span></div>' +
      '<div class="detail-head">' +
        '<div><h2>' + esc(p.name) + '</h2><p>' + esc(p.desc) + '</p></div>' +
        '<div class="stats">' +
          '<div class="stat"><b>' + items.length + '</b><span>' + esc(p.unit || '条') + '</span></div>' +
          '<div class="stat"><b>' + groups.length + '</b><span>个分组</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="notice"><b>用法</b> · ' + esc(bundle.note || '') + '</div>' +
      '<div class="toolbar">' +
        '<input class="search" type="search" placeholder="搜索风格名、关键词（如 赛博、watercolor、像素）…">' +
        '<div class="filters">' + filters + '</div>' +
      '</div>' +
      '<div class="style-grid" id="grid"></div>' +
      '<div class="empty" id="empty" hidden>没有匹配的风格，换个词试试。</div>';

    var grid = document.getElementById('grid');
    var empty = document.getElementById('empty');

    function paint() {
      var q = state.q.trim().toLowerCase();
      var list = items.filter(function (it) {
        if (state.group !== 'ALL' && it.group !== state.group) return false;
        if (!q) return true;
        var hay = [it.name, it.en, it.desc, it.group, it.tip || '']
          .concat(it.keywords || [], [it.prompt]).join(' ').toLowerCase();
        return hay.indexOf(q) !== -1;
      });

      grid.innerHTML = list.map(styleCardHTML).join('');
      empty.hidden = list.length > 0;
      bindCards();
    }

    function bindCards() {
      grid.querySelectorAll('.style-card').forEach(function (card) {
        var top = card.querySelector('[data-toggle]');
        var body = card.querySelector('.style-body');
        var toggle = card.querySelector('.toggle');

        top.addEventListener('click', function () {
          var open = card.classList.toggle('is-open');
          body.hidden = !open;
          toggle.childNodes[0].nodeValue = open ? '收起 ' : 'Prompt ';
        });

        card.querySelectorAll('[data-copy]').forEach(function (btn) {
          btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var key = btn.getAttribute('data-copy');
            var el = card.querySelector('.code' + (key === 'negative' ? '.is-neg' : ':not(.is-neg)'));
            copyText(el ? el.textContent : '', btn);
          });
        });
      });
    }

    var search = app.querySelector('.search');
    search.addEventListener('input', function () {
      state.q = search.value;
      paint();
    });

    app.querySelectorAll('.filter').forEach(function (btn) {
      btn.addEventListener('click', function () {
        app.querySelectorAll('.filter').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        state.group = btn.getAttribute('data-group');
        paint();
      });
    });

    paint();
    window.scrollTo(0, 0);
  }

  /* ---------- 路由 ---------- */

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  function route() {
    var h = location.hash.replace(/^#\/?/, '');
    state.q = '';
    state.group = 'ALL';
    if (!h) { renderHome(); return; }
    renderDetail(decodeURIComponent(h));
  }

  window.addEventListener('hashchange', route);
  route();
})();
