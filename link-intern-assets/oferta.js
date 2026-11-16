/* =============================================
   CLASSIS – internal offer tool
   One DOM ("the card") is the single source for:
   - the e-mail version (inline-styled HTML copied to the clipboard)
   - the plain-text version (WhatsApp)
   - the PDF (built with pdfmake: real text, clickable links)
   The offer content lives in window.OFFER (see the offer's data.js).
   ============================================= */
(function () {
  'use strict';

  const OFFER = window.OFFER;
  // branding: OFFER.brandName / OFFER.brandSub override the defaults ('' hides the sub-line)
  const BRAND_NAME = OFFER.brandName || 'Classis by Weddingmusic';
  const BRAND_SUB = 'brandSub' in OFFER ? OFFER.brandSub : 'by Weddingmusic';
  const ASSETS = document.currentScript.src.replace(/[^/]*$/, '');
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const C = { ink: '#3e362c', muted: '#726553', gold: '#b08d57', deep: '#7d5f35', line: '#e5d9c3' };
  const SERIF = "Georgia,'Times New Roman',serif";
  const SANS = "Arial,Helvetica,sans-serif";

  /* ---------- inline styles (must survive being pasted into an e-mail) ---------- */
  const S = {
    p: `margin:0 0 12px;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.ink}`,
    h: `margin:0 0 12px;padding:0 0 8px;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:12px;font-weight:bold;letter-spacing:1.6px;text-transform:uppercase;color:${C.deep}`,
    sub: `margin:14px 0 6px;font-family:${SANS};font-size:15px;font-weight:bold;line-height:1.45;color:${C.ink}`,
    ul: 'margin:0 0 12px;padding:0 0 0 20px',
    li: `margin:0 0 6px;font-family:${SANS};font-size:15px;line-height:1.55;color:${C.ink}`,
    note: `margin:0 0 12px;font-family:${SANS};font-size:13px;font-style:italic;line-height:1.55;color:${C.muted}`,
    rl: `font-family:${SANS};font-size:15px;font-weight:bold;line-height:1.45;color:${C.ink}`,
    rs: `font-family:${SANS};font-size:14px;line-height:1.5;color:${C.muted}`,
    rv: `font-family:${SANS};font-size:15px;font-weight:bold;line-height:1.45;color:${C.deep}`
  };

  const inline = html => html.replace(/<a /g, `<a style="color:${C.deep};text-decoration:underline" `);
  const shortUrl = u => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  const attrEsc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

  /* ---------- build the card from the offer data ---------- */
  function item(x) {
    switch (x.k) {
      case 'p':
        return `<p data-n="p" data-ed style="${S.p}">${inline(x.h)}</p>`;
      case 'to':
        return `<p data-n="to" hidden style="${S.p}">Către: <b data-name></b></p>`;
      case 'sub':
        return `<div data-n="sub" data-ed style="${S.sub}">${inline(x.h)}</div>`;
      case 'note':
        return `<p data-n="note" data-ed style="${S.note}">${inline(x.h)}</p>`;
      case 'ul':
        return `<ul data-n="ul" style="${S.ul}">` +
          x.items.map(t => `<li data-n="li" data-ed data-rm style="${S.li}">${inline(t)}</li>`).join('') + '</ul>';
      case 'rows':
        return x.rows.map(r =>
          `<div data-n="row" data-rm style="margin:0 0 10px">` +
          `<div data-n="rl" data-ed style="${S.rl}">${inline(r[0])}</div>` +
          `<div data-n="rs" data-ed style="${S.rs}">${inline(r[1] || '')}</div></div>`).join('');
      case 'prices':
        return x.rows.map(r =>
          `<div data-n="row" data-rm><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse"><tr>` +
          `<td style="padding:10px 12px 10px 0;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:15px;color:${C.ink}"><span data-n="rl" data-ed>${inline(r[0])}</span></td>` +
          `<td align="right" style="padding:10px 0;border-bottom:1px solid ${C.line};white-space:nowrap"><span data-n="rv" data-ed style="${S.rv}">${inline(r[1])}</span></td>` +
          `</tr></table></div>`).join('');
      case 'btn':
        return `<div data-n="btn" data-href="${attrEsc(x.href)}" data-rm style="margin:6px 0 16px">` +
          `<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate"><tr>` +
          `<td bgcolor="${C.deep}" style="background-color:${C.deep};border-radius:4px;padding:12px 22px">` +
          `<a href="${attrEsc(x.href)}" style="font-family:${SANS};font-size:15px;font-weight:bold;line-height:1.35;color:#ffffff;text-decoration:none"><span data-lbl data-ed>${x.label}</span></a>` +
          `</td></tr></table>` +
          (x.label === shortUrl(x.href) ? '' : `<div style="margin-top:6px;font-family:${SANS};font-size:13px;line-height:1.4;word-break:break-all"><a href="${attrEsc(x.href)}" style="color:${C.deep};text-decoration:underline">${shortUrl(x.href)}</a></div>`) + `</div>`;
    }
    return '';
  }

  function block(b) {
    const pad = 'padding:22px 24px 2px';
    if (b.k === 'hello') {
      return `<tr data-blk="hello" data-rm><td style="padding:26px 24px 6px">${b.items.map(item).join('')}</td></tr>`;
    }
    if (b.k === 'title') {
      return `<tr data-blk="title"><td align="center" style="padding:22px 24px 10px;border-top:1px solid ${C.line}">` +
        `<div data-n="title" data-ed style="margin:0 0 8px;font-family:${SERIF};font-size:26px;line-height:1.25;font-weight:normal;color:${C.ink}">${b.h}</div>` +
        `<div data-n="subtitle" data-ed style="margin:0;font-family:${SERIF};font-size:16px;font-style:italic;line-height:1.45;color:${C.deep}">${b.sub}</div>` +
        `<div data-n="event" data-ed hidden style="margin:12px 0 0;font-family:${SANS};font-size:14px;line-height:1.5;color:${C.muted}"></div>` +
        `</td></tr>`;
    }
    return `<tr data-blk="sec" data-rm><td style="${pad}">` +
      `<div data-n="h" data-ed style="${S.h}">${b.h}</div>${b.items.map(item).join('')}</td></tr>`;
  }

  function cardHtml() {
    const head =
      `<tr><td align="center" style="padding:30px 24px 22px">` +
      `<div data-n="brand" style="font-family:${SERIF};font-size:26px;letter-spacing:6px;line-height:1.2;color:${C.ink}">CLASSIS</div>` +
      (BRAND_SUB ? `<div data-n="brandsub" style="margin-top:5px;font-family:${SANS};font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${C.deep}">${BRAND_SUB}</div>` : '') +
      `</td></tr>`;
    return `<table data-card role="presentation" width="100%" cellpadding="0" cellspacing="0" ` +
      `style="width:100%;max-width:640px;margin:0 auto;border-collapse:collapse;background-color:#ffffff;border:1px solid #eadfca">` +
      head + OFFER.blocks.map(block).join('') +
      `<tr><td style="padding:14px 24px 24px"></td></tr></table>`;
  }

  /* ---------- state ---------- */
  const stage = $('#stage');
  const nameInput = $('#fName');
  const eventInput = $('#fEvent');
  const KEY = `of:${OFFER.id}:v${OFFER.version}`;
  let card = null;
  let editing = false;

  function store(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* private mode */ } }
  function load() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
  function drop() { try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ } }

  function cleanClone(opts) {
    const c = card.cloneNode(true);
    $$('[data-ui]', c).forEach(e => e.remove());
    if (opts.forSend) $$('[hidden]', c).forEach(e => e.remove());
    [c].concat($$('*', c)).forEach(e => {
      e.removeAttribute('contenteditable');
      e.removeAttribute('spellcheck');
      e.removeAttribute('autocapitalize');
      e.removeAttribute('data-ed');
      e.removeAttribute('data-rm');
      if (opts.forSend) {
        Array.from(e.attributes).filter(a => a.name.indexOf('data-') === 0 || a.name === 'hidden').forEach(a => e.removeAttribute(a.name));
      }
    });
    return c;
  }

  function saveDraft() {
    store({ html: cleanClone({}).outerHTML, name: nameInput.value, event: eventInput.value });
    markStale();
  }

  function mount(html) {
    stage.innerHTML = html;
    card = $('[data-card]', stage);
  }

  function init() {
    const d = load();
    if (d && d.html) {
      mount(d.html);
      nameInput.value = d.name || '';
      eventInput.value = d.event || '';
      $('#draftNote').hidden = false;
    } else {
      mount(cardHtml());
    }
  }

  /* ---------- quick fields ---------- */
  function applyName() {
    const sp = $('[data-name]', card);
    if (!sp) return;
    const v = nameInput.value.trim();
    sp.textContent = v;
    if (sp.parentNode) sp.parentNode.hidden = !v;
  }
  function applyEvent() {
    const ev = $('[data-n="event"]', card);
    const v = eventInput.value.trim();
    ev.textContent = v ? 'Eveniment: ' + v : '';
    ev.hidden = !v;
  }
  nameInput.addEventListener('input', () => { applyName(); saveDraft(); });
  eventInput.addEventListener('input', () => { applyEvent(); saveDraft(); });

  /* ---------- edit mode ---------- */
  // button that inserts a new, empty line (make() returns it), then focuses it
  function addButton(make) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'of-add';
    b.textContent = '+ új sor';
    b.setAttribute('data-ui', '');
    b.setAttribute('contenteditable', 'false');
    b.addEventListener('click', ev => {
      ev.preventDefault();
      ev.stopPropagation();
      const el = make();
      setEditing(true);                                  // re-attach × / + buttons
      const f = el.hasAttribute('data-ed') ? el : $('[data-ed]', el);
      if (f) f.focus();
      saveDraft();
    });
    return b;
  }

  function setEditing(on) {
    editing = on;
    document.body.classList.toggle('of-edit', on);
    $('#editToggle').checked = on;
    $('#editFields').hidden = !on;
    $$('[data-ed]', card).forEach(e => {
      if (on) {
        e.setAttribute('contenteditable', 'true');
        e.setAttribute('spellcheck', 'false');
        e.setAttribute('autocapitalize', 'off');
      } else {
        e.removeAttribute('contenteditable');
        e.removeAttribute('spellcheck');
        e.removeAttribute('autocapitalize');
      }
    });
    $$('[data-ui]', card).forEach(e => e.remove());
    if (on) {
      $$('[data-rm]', card).forEach(el => {
        const host = el.tagName === 'TR' ? el.firstElementChild : el;
        host.classList.add('of-host');
        const x = document.createElement('button');
        x.type = 'button';
        x.className = 'of-x';
        x.textContent = '×';
        x.setAttribute('data-ui', '');
        x.setAttribute('contenteditable', 'false');
        x.setAttribute('aria-label', 'Elem törlése');
        x.addEventListener('click', ev => {
          ev.preventDefault();
          ev.stopPropagation();
          el.remove();
          saveDraft();
        });
        host.insertBefore(x, host.firstChild);
      });
      // "+ új sor" under every list and every group of rows (formations, prices)
      $$('[data-n="ul"]', card).forEach(ul => {
        ul.insertAdjacentElement('afterend', addButton(() => {
          const li = document.createElement('li');
          li.setAttribute('data-n', 'li');
          li.setAttribute('data-ed', '');
          li.setAttribute('data-rm', '');
          li.setAttribute('style', S.li);
          ul.appendChild(li);
          return li;
        }));
      });
      $$('[data-n="row"]', card).forEach(row => {
        const next = row.nextElementSibling;
        if (next && next.dataset.n === 'row') return;   // only after the last row of a group
        row.insertAdjacentElement('afterend', addButton(() => {
          const n = row.parentNode.querySelectorAll(':scope > [data-n="row"]');
          const last = n[n.length - 1] || row;
          const copy = last.cloneNode(true);
          $$('[data-ui]', copy).forEach(e => e.remove());
          $$('[data-ed]', copy).forEach(e => { e.innerHTML = ''; });
          last.insertAdjacentElement('afterend', copy);
          return copy;
        }));
      });
    } else {
      $$('.of-host', card).forEach(e => e.classList.remove('of-host'));
      saveDraft();
    }
  }

  $('#editToggle').addEventListener('change', e => setEditing(e.target.checked));

  stage.addEventListener('click', e => { if (editing && e.target.closest('a')) e.preventDefault(); });
  stage.addEventListener('input', () => { if (editing) saveDraft(); });
  stage.addEventListener('paste', e => {
    if (!editing) return;
    e.preventDefault();
    const t = (e.clipboardData || window.clipboardData).getData('text/plain');
    document.execCommand('insertText', false, t);
  });

  $('#btnReset').addEventListener('click', () => {
    if (!window.confirm('Visszaállítod az eredeti ajánlatot? A módosításaid elvesznek.')) return;
    drop();
    nameInput.value = '';
    eventInput.value = '';
    $('#draftNote').hidden = true;
    mount(cardHtml());
    setEditing(editing);
    markStale();
    say('copyMsg', 'Az eredeti ajánlat visszaállítva.');
  });

  /* ---------- read the card into a simple list (used by text + PDF) ---------- */
  function runs(el) {
    const out = [];
    (function walk(n, st) {
      n.childNodes.forEach(c => {
        if (c.nodeType === 3) {
          const t = c.nodeValue.replace(/\s+/g, ' ');
          if (t) out.push(Object.assign({ t }, st));
        } else if (c.nodeType === 1 && !c.hidden && !c.hasAttribute('data-ui')) {
          if (c.tagName === 'BR') out.push(Object.assign({ t: '\n' }, st));
          else if (c.tagName === 'B' || c.tagName === 'STRONG') walk(c, Object.assign({}, st, { b: true }));
          else if (c.tagName === 'I' || c.tagName === 'EM') walk(c, Object.assign({}, st, { i: true }));
          else if (c.tagName === 'A') walk(c, Object.assign({}, st, { href: c.getAttribute('href') }));
          else walk(c, st);
        }
      });
    })(el, {});
    if (out.length) {
      out[0].t = out[0].t.replace(/^\s+/, '');
      out[out.length - 1].t = out[out.length - 1].t.replace(/\s+$/, '');
    }
    return out.filter(r => r.t !== '');
  }
  const plain = rs => rs.map(r => r.t).join('');

  function readCard() {
    const list = [];
    (function visit(el) {
      Array.from(el.children).forEach(c => {
        if (c.hidden || c.hasAttribute('data-ui')) return;
        const n = c.dataset.n;
        if (!n) { visit(c); return; }
        if (n === 'ul') {
          const items = Array.from(c.children).filter(li => !li.hidden && li.dataset.n === 'li').map(runs).filter(r => r.length);
          if (items.length) list.push({ n: 'ul', items });
        } else if (n === 'row') {
          const g = k => { const e = c.querySelector(`[data-n="${k}"]`); return e ? runs(e) : []; };
          const row = { n: 'row', label: g('rl'), sub: g('rs'), value: g('rv') };
          if (row.label.length || row.value.length) list.push(row);
        } else if (n === 'btn') {
          const l = $('[data-lbl]', c);
          list.push({ n: 'btn', label: l ? l.textContent.trim() : '', href: c.dataset.href });
        } else {
          const r = runs(c);
          if (r.length) list.push({ n, runs: r });
        }
      });
    })(card);
    return list;
  }

  /* ---------- plain text (WhatsApp: *bold* headings) ---------- */
  function plainText() {
    const lines = [];
    const gap = () => { if (lines.length && lines[lines.length - 1] !== '') lines.push(''); };
    let prev = '';
    readCard().forEach(it => {
      const afterHeading = prev === 'h';
      prev = it.n;
      switch (it.n) {
        case 'brand': case 'brandsub': break;
        case 'title': gap(); lines.push('*' + plain(it.runs) + '*'); break;
        case 'subtitle': case 'event': lines.push(plain(it.runs)); break;
        case 'h': gap(); lines.push('*' + plain(it.runs).toLocaleUpperCase('ro') + '*'); break;
        case 'sub': if (!afterHeading) gap(); lines.push(plain(it.runs)); break;
        case 'ul': it.items.forEach(r => lines.push('• ' + plain(r))); break;
        case 'row': {
          const l = plain(it.label), s = plain(it.sub), v = plain(it.value);
          lines.push(v ? `${l}: ${v}` : (s ? `${l} – ${s}` : l));
          break;
        }
        case 'btn': lines.push(`${it.label}:`, it.href); break;
        case 'note': lines.push(plain(it.runs)); break;
        default: gap(); lines.push(plain(it.runs));
      }
    });
    gap();
    lines.push(BRAND_NAME);
    return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
  }

  /* ---------- e-mail HTML ---------- */
  function emailHtml() {
    const c = cleanClone({ forSend: true });
    return `<div style="font-family:${SANS}">${c.outerHTML}</div>`;
  }

  /* ---------- UI helpers ---------- */
  function say(id, msg, ok) {
    const el = $('#' + id);
    el.textContent = msg;
    el.classList.toggle('is-ok', !!ok);
  }

  /* ---------- copy ---------- */
  function fallbackCopy(html) {
    const holder = document.createElement('div');
    holder.setAttribute('contenteditable', 'true');
    holder.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;background:#fff';
    holder.innerHTML = html;
    document.body.appendChild(holder);
    const range = document.createRange();
    range.selectNodeContents(holder);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    sel.removeAllRanges();
    holder.remove();
    return ok;
  }

  async function copyRich() {
    if (editing) setEditing(false);
    const html = emailHtml();
    const text = plainText();
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([text], { type: 'text/plain' })
        })]);
        say('copyMsg', 'Kimásolva. Most illeszd be az e-mailbe (Beillesztés).', true);
        return;
      }
    } catch (e) { /* try the fallback below */ }
    say('copyMsg', fallbackCopy(html)
      ? 'Kimásolva. Most illeszd be az e-mailbe (Beillesztés).'
      : 'Nem sikerült a másolás. Próbáld újra, vagy használd a sima szöveget.', true);
  }

  async function copyText() {
    if (editing) setEditing(false);
    const text = plainText();
    try {
      await navigator.clipboard.writeText(text);
      say('copyMsg', 'Sima szöveg kimásolva (WhatsAppba vagy SMS-be illeszthető).', true);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (er) { ok = false; }
      ta.remove();
      say('copyMsg', ok ? 'Sima szöveg kimásolva.' : 'Nem sikerült a másolás.', ok);
    }
  }

  $('#btnCopy').addEventListener('click', copyRich);
  $('#btnCopyText').addEventListener('click', copyText);

  /* ---------- PDF ---------- */
  let fontsReady = false;
  let pdf = null;          // { blob, file, pages, kb }
  let stale = true;
  let building = null;

  function b64(buf) {
    const bytes = new Uint8Array(buf);
    let s = '';
    for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(s);
  }

  async function loadFonts() {
    if (fontsReady) return;
    const roboto = { normal: 'Roboto-Regular.ttf', bold: 'Roboto-Medium.ttf', italics: 'Roboto-Italic.ttf', bolditalics: 'Roboto-MediumItalic.ttf' };
    pdfMake.fonts = { Roboto: roboto };
    try {
      const [a, b] = await Promise.all(['PlayfairDisplay-Regular.ttf', 'PlayfairDisplay-Italic.ttf']
        .map(f => fetch(ASSETS + 'fonts/' + f).then(r => { if (!r.ok) throw new Error(f); return r.arrayBuffer(); })));
      pdfMake.vfs['PlayfairDisplay-Regular.ttf'] = b64(a);
      pdfMake.vfs['PlayfairDisplay-Italic.ttf'] = b64(b);
      pdfMake.fonts.Playfair = { normal: 'PlayfairDisplay-Regular.ttf', bold: 'PlayfairDisplay-Regular.ttf', italics: 'PlayfairDisplay-Italic.ttf', bolditalics: 'PlayfairDisplay-Italic.ttf' };
    } catch (e) {
      pdfMake.fonts.Playfair = roboto;   // still produces a valid PDF
    }
    fontsReady = true;
  }

  const pr = rs => rs.map(r => {
    const o = { text: r.t };
    if (r.b) o.bold = true;
    if (r.i) o.italics = true;
    if (r.href) { o.link = r.href; o.color = C.deep; o.decoration = 'underline'; }
    return o;
  });

  function pdfDefinition() {
    const W = 595.28 - 92;
    const content = [];
    let rows = [];
    const flushRows = () => {
      if (!rows.length) return;
      content.push({
        margin: [0, 0, 0, 8],
        table: { widths: ['*', 'auto'], body: rows.map(r => [
          { text: pr(r.label), color: C.ink },
          { text: pr(r.value), bold: true, color: C.deep, alignment: 'right', noWrap: true }
        ]) },
        layout: {
          hLineWidth: (i, node) => (i > 0 && i < node.table.body.length ? 0.6 : 0),
          hLineColor: () => C.line,
          vLineWidth: () => 0,
          paddingTop: () => 7, paddingBottom: () => 7, paddingLeft: () => 0, paddingRight: () => 0
        }
      });
      rows = [];
    };
    const rule = (color, w, mt, mb) => ({ margin: [0, mt, 0, mb], canvas: [{ type: 'line', x1: 0, y1: 0, x2: W, y2: 0, lineWidth: w, lineColor: color }] });

    readCard().forEach(it => {
      if (it.n === 'row' && it.value.length) { rows.push(it); return; }
      flushRows();
      switch (it.n) {
        case 'brand':
          content.push({ text: plain(it.runs), font: 'Playfair', fontSize: 24, characterSpacing: 5, alignment: 'center', color: C.ink });
          if (!BRAND_SUB) content.push(rule(C.gold, 0.8, 14, 4));
          break;
        case 'brandsub':
          content.push({ text: plain(it.runs).toUpperCase(), fontSize: 7.5, characterSpacing: 3, alignment: 'center', color: C.deep, margin: [0, 3, 0, 0] });
          content.push(rule(C.gold, 0.8, 14, 4));
          break;
        case 'title':
          content.push({ text: plain(it.runs), font: 'Playfair', fontSize: 21, alignment: 'center', margin: [0, 14, 0, 4], color: C.ink, headlineLevel: 1 });
          break;
        case 'subtitle':
          content.push({ text: plain(it.runs), font: 'Playfair', italics: true, fontSize: 12, alignment: 'center', color: C.deep, margin: [0, 0, 0, 4] });
          break;
        case 'event':
          content.push({ text: plain(it.runs), fontSize: 10, alignment: 'center', color: C.muted, margin: [0, 2, 0, 4] });
          break;
        case 'h':
          content.push({ text: plain(it.runs).toLocaleUpperCase('ro'), bold: true, fontSize: 8.5, characterSpacing: 1.4, color: C.deep, margin: [0, 16, 0, 0], headlineLevel: 1, isSection: true });
          content.push(rule(C.line, 0.7, 4, 7));
          break;
        case 'sub':
          content.push({ text: pr(it.runs), bold: true, margin: [0, 6, 0, 3], headlineLevel: 1 });
          break;
        case 'ul':
          content.push({ ul: it.items.map(r => ({ text: pr(r) })), markerColor: C.gold, margin: [0, 0, 0, 6], lineHeight: 1.25 });
          break;
        case 'row':
          content.push({ stack: [{ text: pr(it.label), bold: true }, it.sub.length ? { text: pr(it.sub), color: C.muted, fontSize: 9.5 } : null].filter(Boolean), margin: [0, 0, 0, 6] });
          break;
        case 'note':
          content.push({ text: pr(it.runs), italics: true, fontSize: 9, color: C.muted, margin: [0, 0, 0, 7] });
          break;
        case 'btn':
          content.push({
            unbreakable: true,
            margin: [0, 4, 0, 8],
            stack: [
              {
                table: { widths: ['auto'], body: [[{ text: it.label, link: it.href, color: '#ffffff', bold: true, fontSize: 10.5, margin: [12, 6, 12, 6] }]] },
                layout: { fillColor: () => C.deep, hLineWidth: () => 0, vLineWidth: () => 0 }
              },
              it.label.trim() === shortUrl(it.href) ? null : { text: shortUrl(it.href), link: it.href, color: C.deep, decoration: 'underline', fontSize: 8.5, margin: [0, 3, 0, 0] }
            ].filter(Boolean)
          });
          break;
        default:
          content.push({ text: pr(it.runs), margin: [0, 0, 0, 7], lineHeight: 1.3 });
      }
    });
    flushRows();

    // keep every heading together with the content right after it (no orphan
    // headings at the bottom of a page): group heading (+ rule) + first block, and
    // for a sub-heading directly under a section heading also its list
    const grouped = [];
    for (let i = 0; i < content.length; i++) {
      const n = content[i];
      if (n.headlineLevel !== 1) { grouped.push(n); continue; }
      const grp = [n];
      let j = i + 1;
      if (n.isSection && content[j]) grp.push(content[j++]);            // the rule under a section heading
      if (content[j]) grp.push(content[j++]);                           // first block after it
      if (grp[grp.length - 1].headlineLevel === 1 && content[j]) grp.push(content[j++]); // sub-heading → its list
      grouped.push({ unbreakable: true, stack: grp });
      i = j - 1;
    }

    return {
      pageSize: 'A4',
      pageMargins: [46, 44, 46, 56],
      info: { title: OFFER.shareTitle, author: BRAND_NAME },
      defaultStyle: { font: 'Roboto', fontSize: 10.5, lineHeight: 1.3, color: C.ink },
      content: grouped,
      footer: (page, pages) => ({
        margin: [46, 18, 46, 0],
        columns: [
          { text: BRAND_NAME + ' · classis.ro', link: 'https://www.classis.ro/', fontSize: 8, color: C.muted },
          { text: page + ' / ' + pages, fontSize: 8, color: C.muted, alignment: 'right' }
        ]
      }),
      pageBreakBefore: (cur, following) => cur.headlineLevel === 1 && following.length === 0
    };
  }

  function fileName() {
    const n = nameInput.value.trim()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return OFFER.pdfName + (n ? '-' + n : '') + '.pdf';
  }

  function markStale() {
    stale = true;
    pdf = null;
    $('#btnShare').disabled = true;
    $('#btnOpen').disabled = true;
    $('#btnDownload').disabled = true;
    if ($('#panelPdf').hidden === false) schedule();
  }

  let timer = null;
  function schedule() {
    clearTimeout(timer);
    say('pdfMsg', 'A PDF készül…');
    timer = setTimeout(buildPdf, 500);
  }

  function buildPdf() {
    if (building) return building;
    if (editing) { say('pdfMsg', 'Kapcsold ki a szerkesztést, utána elkészül a PDF.'); return Promise.resolve(); }
    stale = false;
    building = (async () => {
      try {
        await loadFonts();
        const def = pdfDefinition();
        const blob = await new Promise((res, rej) => {
          try { pdfMake.createPdf(def).getBlob(res); } catch (e) { rej(e); }
        });
        if (stale) return;   // edited meanwhile; a new build is already scheduled
        const file = new File([blob], fileName(), { type: 'application/pdf' });
        const buf = await blob.arrayBuffer();
        const pages = (new TextDecoder('latin1').decode(buf).match(/\/Type\s*\/Page[^s]/g) || []).length;
        pdf = { blob, file, pages, kb: Math.max(1, Math.round(blob.size / 1024)) };
        $('#btnShare').disabled = false;
        $('#btnOpen').disabled = false;
        $('#btnDownload').disabled = false;
        say('pdfMsg', `A PDF kész: ${pages} oldal, ${pdf.kb} KB. Koppints a Küldés gombra.`, true);
      } catch (e) {
        say('pdfMsg', 'Nem sikerült elkészíteni a PDF-et. Frissítsd az oldalt, és próbáld újra.');
        stale = true;
      } finally {
        building = null;
      }
    })();
    return building;
  }

  function download() {
    if (!pdf) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(pdf.blob);
    a.download = pdf.file.name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
  }

  $('#btnShare').addEventListener('click', async () => {
    if (!pdf) return;
    if (navigator.canShare && navigator.canShare({ files: [pdf.file] })) {
      try {
        await navigator.share({ files: [pdf.file], title: OFFER.shareTitle });
        say('pdfMsg', 'Elküldve vagy megosztva.', true);
      } catch (e) {
        if (e && e.name !== 'AbortError') say('pdfMsg', 'A megosztás nem sikerült. Használd a Letöltés gombot.');
      }
    } else {
      download();
      say('pdfMsg', 'Ezen az eszközön nincs megosztás, ezért letöltöttem a PDF-et.', true);
    }
  });
  $('#btnOpen').addEventListener('click', () => { if (pdf) window.open(URL.createObjectURL(pdf.blob), '_blank'); });
  $('#btnDownload').addEventListener('click', download);

  /* ---------- tabs ---------- */
  function showTab(name) {
    const isPdf = name === 'pdf';
    $('#tabCopy').setAttribute('aria-selected', String(!isPdf));
    $('#tabPdf').setAttribute('aria-selected', String(isPdf));
    $('#panelCopy').hidden = isPdf;
    $('#panelPdf').hidden = !isPdf;
    if (isPdf && (stale || !pdf)) { if (editing) setEditing(false); schedule(); }
  }
  $('#tabCopy').addEventListener('click', () => showTab('copy'));
  $('#tabPdf').addEventListener('click', () => showTab('pdf'));

  /* ---------- go ---------- */
  init();
  applyName();
  applyEvent();
  markStale();

  window.OfferTool = { emailHtml, plainText, readCard, pdfDefinition, buildPdf, getPdf: () => pdf };
})();
