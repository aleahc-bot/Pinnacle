/* ============================================================
   FLORIDA AIRE — Design Studio
   Live-switch 4 layouts + header/body fonts. Palette locked.
   Choices persist across pages via localStorage (falls back gracefully).
   ============================================================ */
(function () {
  var LS = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  var LAYOUTS = [
    { id: '1', name: 'Engineered', desc: 'Sharp · gauge hero', mini: ['#F3F6FA', '#1863B0', '#E51F26'] },
    { id: '2', name: 'Bold',       desc: 'Full-bleed · rows',  mini: ['#0B2F5C', '#1863B0', '#E51F26'] },
    { id: '3', name: 'Classic',    desc: 'Image hero · soft',  mini: ['#1863B0', '#0B2F5C', '#8fd0ef'] },
    { id: '4', name: 'Editorial',  desc: 'Minimal · text list',mini: ['#FFFFFF', '#0C1F35', '#E51F26'] },
    { id: '5', name: 'Original',   desc: 'Form hero · blue',   mini: ['#1C63B0', '#FFFFFF', '#ED1C24'] },
    { id: '6', name: 'Light',      desc: 'Form hero · white',  mini: ['#FFFFFF', '#1C63B0', '#ED1C24'] }
  ];
  var HEADER_FONTS = [
    { name: 'Archivo',  v: "'Archivo',sans-serif" },
    { name: 'Sora',     v: "'Sora',sans-serif" },
    { name: 'Anton',    v: "'Anton',sans-serif" },
    { name: 'Poppins',  v: "'Poppins',sans-serif" },
    { name: 'Playfair', v: "'Playfair Display',serif" }
  ];
  var BODY_FONTS = [
    { name: 'Inter',     v: "'Inter',sans-serif" },
    { name: 'Figtree',   v: "'Figtree',sans-serif" },
    { name: 'Roboto',    v: "'Roboto',sans-serif" },
    { name: 'Work Sans', v: "'Work Sans',sans-serif" },
    { name: 'Lora',      v: "'Lora',serif" }
  ];

  var DEF_LAYOUT = '1', DEF_DISP = HEADER_FONTS[0].v, DEF_BODY = BODY_FONTS[0].v;
  var root = document.documentElement;

  function currentLayout() { return LS.get('fa-layout') || DEF_LAYOUT; }
  function currentDisp()   { return LS.get('fa-disp')   || DEF_DISP; }
  function currentBody()   { return LS.get('fa-body')   || DEF_BODY; }

  function applyLayout(id) { root.setAttribute('data-layout', id); LS.set('fa-layout', id); }
  function applyDisp(v)    { root.style.setProperty('--disp', v);   LS.set('fa-disp', v); }
  function applyBody(v)    { root.style.setProperty('--body', v);   LS.set('fa-body', v); }

  // svg helpers
  function svg(paths) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + paths + '</svg>';
  }
  var ICON_SLIDERS = svg('<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>');
  var ICON_X = svg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>');

  function build() {
    // FAB
    var fab = document.createElement('button');
    fab.className = 'ds-fab';
    fab.setAttribute('aria-label', 'Open Design Studio');
    fab.innerHTML = ICON_SLIDERS + '<span class="ds-fab-txt">Design Studio</span>';

    // Overlay + panel
    var overlay = document.createElement('div');
    overlay.className = 'ds-overlay';

    var panel = document.createElement('aside');
    panel.className = 'ds-panel';
    panel.setAttribute('aria-label', 'Design Studio');

    var layoutHTML = LAYOUTS.map(function (l) {
      var bars = l.mini.map(function (c) { return '<i style="flex:1;background:' + c + '"></i>'; }).join('');
      return '<button class="ds-opt" data-layout="' + l.id + '">' +
               '<span class="ds-mini">' + bars + '</span>' +
               '<span class="ds-opt-txt"><b>' + l.name + '</b><span>' + l.desc + '</span></span>' +
             '</button>';
    }).join('');

    var dispHTML = HEADER_FONTS.map(function (f) {
      return '<button class="ds-chip" data-disp="' + f.v.replace(/"/g, '&quot;') + '" style="font-family:' + f.v + '">' + f.name + '</button>';
    }).join('');
    var bodyHTML = BODY_FONTS.map(function (f) {
      return '<button class="ds-chip" data-body="' + f.v.replace(/"/g, '&quot;') + '" style="font-family:' + f.v + '">' + f.name + '</button>';
    }).join('');

    panel.innerHTML =
      '<div class="ds-head"><div><h3>Design Studio</h3><small>Florida Aire · live preview</small></div>' +
        '<button class="ds-close" aria-label="Close">' + ICON_X + '</button></div>' +
      '<div class="ds-sec"><div class="ds-label">Layout</div><div class="ds-layouts">' + layoutHTML + '</div></div>' +
      '<div class="ds-sec"><div class="ds-label">Header font</div><div class="ds-chips" data-group="disp">' + dispHTML + '</div></div>' +
      '<div class="ds-sec"><div class="ds-label">Body font</div><div class="ds-chips" data-group="body">' + bodyHTML + '</div></div>' +
      '<div class="ds-sec"><div class="ds-label">Brand palette · locked</div>' +
        '<div class="ds-swatches"><i style="background:#1863B0"></i><i style="background:#E51F26"></i><i style="background:#0B2F5C"></i><i style="background:#EAF2FB"></i><i style="background:#FFFFFF"></i></div>' +
        '<p class="ds-note">Colors stay on Florida Aire brand across every layout.</p></div>' +
      '<div class="ds-sec"><button class="ds-reset">Reset to default</button></div>';

    document.body.appendChild(fab);
    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    function open() { panel.classList.add('open'); overlay.classList.add('open'); }
    function close() { panel.classList.remove('open'); overlay.classList.remove('open'); }
    fab.addEventListener('click', open);
    overlay.addEventListener('click', close);
    panel.querySelector('.ds-close').addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    // sync active states
    function syncActive() {
      var lay = currentLayout(), disp = currentDisp(), body = currentBody();
      panel.querySelectorAll('.ds-opt').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-layout') === lay);
      });
      panel.querySelectorAll('[data-group="disp"] .ds-chip').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-disp').replace(/&quot;/g, '"') === disp);
      });
      panel.querySelectorAll('[data-group="body"] .ds-chip').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-body').replace(/&quot;/g, '"') === body);
      });
    }

    panel.querySelectorAll('.ds-opt').forEach(function (b) {
      b.addEventListener('click', function () { applyLayout(b.getAttribute('data-layout')); syncActive(); });
    });
    panel.querySelectorAll('[data-group="disp"] .ds-chip').forEach(function (b) {
      b.addEventListener('click', function () { applyDisp(b.getAttribute('data-disp').replace(/&quot;/g, '"')); syncActive(); });
    });
    panel.querySelectorAll('[data-group="body"] .ds-chip').forEach(function (b) {
      b.addEventListener('click', function () { applyBody(b.getAttribute('data-body').replace(/&quot;/g, '"')); syncActive(); });
    });
    panel.querySelector('.ds-reset').addEventListener('click', function () {
      LS.del('fa-layout'); LS.del('fa-disp'); LS.del('fa-body');
      root.setAttribute('data-layout', DEF_LAYOUT);
      root.style.removeProperty('--disp'); root.style.removeProperty('--body');
      syncActive();
    });

    syncActive();
  }

  // ensure stored prefs are applied (head script also does this; this is a safety net)
  root.setAttribute('data-layout', currentLayout());
  if (LS.get('fa-disp')) root.style.setProperty('--disp', currentDisp());
  if (LS.get('fa-body')) root.style.setProperty('--body', currentBody());

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
