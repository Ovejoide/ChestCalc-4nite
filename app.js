(() => {
  'use strict';
  const CLAVE = 'chestcalc-4nite-v1';
  const TASAS_GUIA = [
    { id: 'ficha', tasa: 137500, mult: 1.5, moneda: true },
    { id: 'atuendo', tasa: 1562500, mult: 7.5 },
    { id: 'vehiculo', tasa: 7813, mult: 10 },
    { id: 'pico', tasa: 568, mult: 1 },
    { id: 'pista', tasa: 391, mult: 1 },
    { id: 'pantalla', tasa: 272, mult: 1 },
    { id: 'gizmo', tasa: 127, mult: 1 },
  ];
  const TIPOS_INICIALES = [
    { id: 't1', nombre: '', normal: 0, horas: 0, cuenta: true, color: '#ffc933' },
    { id: 't2', nombre: '', normal: 0, horas: 0, cuenta: true, color: '#cfd8ff' },
    { id: 't3', nombre: '', normal: 0, horas: 0, cuenta: true, color: '#b983ff' },
  ];
  const COLORES_NUEVOS = ['#5df3ff', '#ff8ad8', '#7dff9b', '#ff9f5a'];

  /* Nombres por idioma */
  const NOMBRES = {
    en: { t1: 'Treasure Chest', t2: 'Rare Chest', t3: 'Spirit Chest', nuevo: 'New chest',
      ficha: 'Pirate Shop Access', atuendo: 'Gold Outfit', vehiculo: 'Vehicle & Decal', pico: 'Pickaxe or Back Bling',
      pista: 'Jam Track', pantalla: 'Loading Screen', gizmo: 'Gizmo' },
    es: { t1: 'Cofre del tesoro', t2: 'Cofre raro', t3: 'Cofre de espíritu', nuevo: 'Cofre nuevo',
      ficha: 'Ficha pirata', atuendo: 'Atuendo dorado', vehiculo: 'Vehículo y calcomanía', pico: 'Pico o mochila',
      pista: 'Pista musical', pantalla: 'Pantalla de carga', gizmo: 'Gizmo' },
  };

  /* Textos de la interfaz */
  const D = {
    en: {
      title: 'ChestCalc 4nite', h1: 'ChestCalc 4nite',
      subtitle: 'Log the chests you open and see your chances of getting each reward.', lang_label: 'Language',
      reg_h: 'Chests opened', col_type: 'Chest type', col_normal: 'Normal matches', col_hours: 'Treasure Hours', col_total: 'Total',
      col_count: 'Count', col_count_title: 'Untick the types that should not count toward the probability',
      col_remove: 'Remove', foot_counted: 'Counted', btn_new: 'Add chest type', btn_zero: 'Reset counters to zero',
      btn_remove_new: 'Remove added types', btn_row_remove: 'Remove',
      hero_h: 'Your probability', hero_pick: 'Reward you are after', hero_path: 'Progress to 50%', hero_path_aria: 'Progress to 50% probability',
      res_h: 'Probability by reward', ctl_extra: 'Chests you would open later', ctl_mode: 'You would open them in',
      ctl_pergame: 'Chests per game', mode_normal: 'Normal match', mode_hours: 'Treasure Hours',
      th_reward: 'Reward', th_rate: '1 chest in', th_hours_rate: 'During Treasure Hours', th_prob: 'Your probability',
      th_f50: 'Still needed for 50%', th_f90: 'Still needed for 90%', th_50at: '50% at',
      note_html: 'Chance of getting the reward at least once: 1 − (1 − 1/rate)<sup>N</sup>. Every chest counts the same as the first one, and Treasure Hours chests use the boosted rate.',
      ref_h: 'Reference table by number of chests', ref_open_in: 'Chests opened in',
      adj_h: 'Adjust rates', adj_note: 'Values from the Chest Tracker guide for normal matches. If Epic changes the rates, edit them here.',
      adj_mult: 'Treasure Hours multiplier', btn_restore: 'Restore guide rates',
      foot: 'Fortnite does not show how many chests you opened, so you log them yourself. By default every chest type uses the same rates; untick "Count" for types that do not apply. Your data is saved in this browser.',
      lbl_normal: 'normal matches', lbl_hours: 'Treasure Hours',
      ar_minus: (l) => `Subtract one, ${l}`, ar_plus: (l) => `Add one, ${l}`, ar_count: (l) => `Chests opened, ${l}`,
      ar_name: 'Chest type name', ar_includes: (n) => `Count ${n} toward the probability`, ar_remove: (n) => `Remove ${n}`,
      ar_rate: (n) => `1 chest in, ${n}`, ar_mult: (n) => `Multiplier, ${n}`,
      confirm_zero: 'Reset all chest counters to zero?',
      confirm_del: (n, c) => `Remove "${n}" with ${c} chests logged?`,
      confirm_del_new: (k) => `Remove the ${k} added chest types, with all their logged chests?`,
      hero_none: 'Log your opened chests to see your probability.',
      hero_text: (n, t) => `of getting “${n}” at least once after opening ${t} chests.`,
      hero_hours_note: ' Treasure Hours chests weigh more in the calculation.',
      hero_done: 'You already passed 50% probability.',
      hero_need: (f, g, p) => `To reach 50% you need ${f} more chests (about ${g} games at ${p} chests per game).`,
      hero_more: (e, h, p) => ` With ${e} more chests${h ? ' during Treasure Hours' : ''} you would reach ${p}.`,
      th_more: (n) => `With ${n} more`, th_tras: (n) => `After ${n} chests`,
      done: 'Already reached', games: (g) => `about ${g} games`,
      rate_of: (n) => `1 in ${n}`, no_change: 'No change', ref_hours: (n) => `1 in ${n} in Treasure Hours`,
    },
    es: {
      title: 'ChestCalc 4nite', h1: 'ChestCalc 4nite',
      subtitle: 'Anota los cofres que abres y mira cuánta probabilidad tienes de conseguir cada recompensa.', lang_label: 'Idioma',
      reg_h: 'Cofres abiertos', col_type: 'Tipo de cofre', col_normal: 'Partidas normales', col_hours: 'Horas del tesoro', col_total: 'Total',
      col_count: 'Contar', col_count_title: 'Desmarca los tipos que no cuentan para la probabilidad',
      col_remove: 'Quitar', foot_counted: 'Contados', btn_new: 'Agregar tipo de cofre', btn_zero: 'Poner contadores en cero',
      btn_remove_new: 'Quitar los tipos agregados', btn_row_remove: 'Quitar',
      hero_h: 'Tu probabilidad', hero_pick: 'Recompensa que buscas', hero_path: 'Camino al 50 %', hero_path_aria: 'Camino al 50 % de probabilidad',
      res_h: 'Probabilidad por recompensa', ctl_extra: 'Cofres que abrirías después', ctl_mode: 'Los abrirías en',
      ctl_pergame: 'Cofres por partida', mode_normal: 'Partida normal', mode_hours: 'Horas del tesoro',
      th_reward: 'Recompensa', th_rate: '1 cofre de cada', th_hours_rate: 'En Horas del tesoro', th_prob: 'Tu probabilidad',
      th_f50: 'Faltan para el 50 %', th_f90: 'Faltan para el 90 %', th_50at: '50 % a',
      note_html: 'Probabilidad de conseguir la recompensa al menos una vez: 1 − (1 − 1/tasa)<sup>N</sup>. Cada cofre cuenta igual que el primero y los cofres de Horas del tesoro usan la tasa aumentada.',
      ref_h: 'Tabla de referencia por cantidad de cofres', ref_open_in: 'Cofres abiertos en',
      adj_h: 'Ajustar tasas', adj_note: 'Valores de la guía de Chest Tracker para partidas normales. Si Epic cambia las tasas, edítalas aquí.',
      adj_mult: 'Multiplicador en Horas del tesoro', btn_restore: 'Restaurar tasas de la guía',
      foot: 'Fortnite no muestra cuántos cofres abriste, por eso los anotas tú. Por defecto todos los tipos de cofre usan las mismas tasas; desmarca "Contar" en los que no apliquen. Tus datos se guardan en este navegador.',
      lbl_normal: 'partidas normales', lbl_hours: 'Horas del tesoro',
      ar_minus: (l) => `Restar uno, ${l}`, ar_plus: (l) => `Sumar uno, ${l}`, ar_count: (l) => `Cofres abiertos, ${l}`,
      ar_name: 'Nombre del tipo de cofre', ar_includes: (n) => `Contar ${n} en la probabilidad`, ar_remove: (n) => `Quitar ${n}`,
      ar_rate: (n) => `1 cofre de cada, ${n}`, ar_mult: (n) => `Multiplicador, ${n}`,
      confirm_zero: '¿Poner en cero todos los contadores de cofres?',
      confirm_del: (n, c) => `¿Quitar "${n}" con ${c} cofres anotados?`,
      confirm_del_new: (k) => `¿Quitar los ${k} tipos de cofre agregados, con todos sus cofres anotados?`,
      hero_none: 'Anota tus cofres abiertos para ver tu probabilidad.',
      hero_text: (n, t) => `de haber conseguido “${n}” al menos una vez con ${t} cofres abiertos.`,
      hero_hours_note: ' Los cofres de Horas del tesoro pesan más en el cálculo.',
      hero_done: 'Ya superaste el 50 % de probabilidad.',
      hero_need: (f, g, p) => `Para llegar al 50 % faltan ${f} cofres (unas ${g} partidas a ${p} cofres por partida).`,
      hero_more: (e, h, p) => ` Con ${e} cofres más${h ? ' en Horas del tesoro' : ''} llegarías a ${p}.`,
      th_more: (n) => `Con ${n} más`, th_tras: (n) => `Tras ${n} cofres`,
      done: 'Ya superado', games: (g) => `unas ${g} partidas`,
      rate_of: (n) => `1 de ${n}`, no_change: 'Sin cambio', ref_hours: (n) => `1 de ${n} en Horas`,
    },
  };

  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const entero = (v) => { const n = Math.floor(Number(v)); return Number.isFinite(n) && n > 0 ? n : 0; };
  const positivo = (v, def) => { const n = Number(v); return Number.isFinite(n) && n > 0 ? n : def; };

  function cargar() {
    const base = {
      idioma: 'en', tipos: TIPOS_INICIALES.map((t) => ({ ...t })), tasas: TASAS_GUIA.map((t) => ({ ...t })),
      destacada: 'ficha', extra: 1000, modoExtra: 'normal', porPartida: 20, modoRef: 'normal', referencia: [500, 2000, 10000],
    };
    try {
      const g = JSON.parse(localStorage.getItem(CLAVE) || 'null');
      if (!g) return base;
      base.idioma = g.idioma === 'es' ? 'es' : 'en';
      if (Array.isArray(g.tipos)) base.tipos = g.tipos.slice(0, 20).map((t, i) => ({
        id: String(t.id || 'x' + i + Date.now()), nombre: String(t.nombre || '').slice(0, 40),
        normal: entero(t.normal), horas: entero(t.horas), cuenta: t.cuenta !== false,
        color: /^#[0-9a-f]{6}$/i.test(t.color) ? t.color : '#5df3ff',
      }));
      if (Array.isArray(g.tasas)) for (const r of base.tasas) {
        const s = g.tasas.find((x) => x.id === r.id);
        if (s) { r.tasa = Math.max(1, positivo(s.tasa, r.tasa)); r.mult = positivo(s.mult, r.mult); }
      }
      if (base.tasas.some((r) => r.id === g.destacada)) base.destacada = g.destacada;
      base.extra = entero(g.extra); base.modoExtra = g.modoExtra === 'horas' ? 'horas' : 'normal';
      base.porPartida = Math.max(1, entero(g.porPartida) || 20);
      base.modoRef = g.modoRef === 'horas' ? 'horas' : 'normal';
    } catch (e) { /* sin datos guardados */ }
    return base;
  }
  let estado = cargar();
  const guardar = () => { try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch (e) { /* sin almacenamiento */ } };

  const tr = (k, ...a) => { const v = D[estado.idioma][k]; return typeof v === 'function' ? v(...a) : v; };
  const nombreR = (r) => NOMBRES[estado.idioma][r.id];

  /* Los nombres por defecto cambian de idioma; los renombrados por el usuario se respetan */
  function normalizarNombres() {
    const N = NOMBRES[estado.idioma];
    for (const t of estado.tipos) {
      if (['t1', 't2', 't3'].includes(t.id) && (!t.nombre || t.nombre === NOMBRES.en[t.id] || t.nombre === NOMBRES.es[t.id])) t.nombre = N[t.id];
      if (t.id.startsWith('n') && (t.nombre === NOMBRES.en.nuevo || t.nombre === NOMBRES.es.nuevo)) t.nombre = N.nuevo;
    }
  }

  /* Formato de números según idioma */
  const loc = () => (estado.idioma === 'es' ? 'de-DE' : 'en-US');
  const suf = () => (estado.idioma === 'es' ? ' %' : '%');
  const dec = (n, min, max) => n.toLocaleString(loc(), { minimumFractionDigits: min, maximumFractionDigits: max });
  const num = (n) => dec(Math.round(n), 0, 0);
  const pct = (p) => {
    const v = p * 100;
    if (!(v > 0)) return '0' + suf();
    if (v < 0.001) return '< ' + dec(0.001, 3, 3) + suf();
    if (v < 1) return dec(v, 2, 3) + suf();
    if (v < 10) return dec(v, 1, 2) + suf();
    if (v < 99) return dec(v, 0, 1) + suf();
    if (v < 99.99) return dec(v, 2, 2) + suf();
    return '> ' + dec(99.99, 2, 2) + suf();
  };

  /* Matemática: se trabaja con logaritmos para que funcione con millones de cofres */
  const pCofre = (r, horas) => Math.min(0.999999, (horas ? r.mult : 1) / r.tasa);
  const logSin = (r, n, h) => n * Math.log1p(-pCofre(r, false)) + h * Math.log1p(-pCofre(r, true));
  const probDe = (L) => -Math.expm1(L);
  const cofresHasta = (r, L, obj, horas) => {
    const meta = Math.log1p(-obj);
    return L <= meta ? 0 : Math.ceil((meta - L) / Math.log1p(-pCofre(r, horas)));
  };
  const contados = () => estado.tipos.reduce((a, t) => (t.cuenta ? { n: a.n + t.normal, h: a.h + t.horas } : a), { n: 0, h: 0 });
  const destacada = () => estado.tasas.find((r) => r.id === estado.destacada) || estado.tasas[0];
  const esNuevo = (t) => t.id.startsWith('n');

  /* Tabla de registro */
  const stepper = (campo, valor, etiqueta) =>
    `<div class="stepper"><button type="button" data-accion="menos" data-campo="${campo}" aria-label="${esc(tr('ar_minus', etiqueta))}">&minus;</button>` +
    `<input type="number" min="0" step="1" value="${valor}" data-campo="${campo}" aria-label="${esc(tr('ar_count', etiqueta))}">` +
    `<button type="button" data-accion="mas" data-campo="${campo}" aria-label="${esc(tr('ar_plus', etiqueta))}">+</button></div>`;

  function renderRegistro() {
    $('#cuerpo-registro').innerHTML = estado.tipos.map((t, i) =>
      `<tr data-i="${i}" style="--c:${t.color}">` +
      `<td><input class="in-nombre" data-campo="nombre" value="${esc(t.nombre)}" aria-label="${esc(tr('ar_name'))}"></td>` +
      `<td data-label="${esc(tr('col_normal'))}">${stepper('normal', t.normal, tr('lbl_normal'))}</td><td data-label="${esc(tr('col_hours'))}">${stepper('horas', t.horas, tr('lbl_hours'))}</td>` +
      `<td class="der" data-total data-label="${esc(tr('col_total'))}">${num(t.normal + t.horas)}</td>` +
      `<td class="centro" data-label="${esc(tr('col_count'))}"><input type="checkbox" data-campo="cuenta" ${t.cuenta ? 'checked' : ''} aria-label="${esc(tr('ar_includes', t.nombre))}"></td>` +
      `<td><button type="button" class="btn-quitar" data-accion="borrar" aria-label="${esc(tr('ar_remove', t.nombre))}">${tr('btn_row_remove')}</button></td></tr>`).join('');
  }

  const cuerpoReg = $('#cuerpo-registro');
  cuerpoReg.addEventListener('input', (e) => {
    const fila = e.target.closest('tr'); if (!fila) return;
    const t = estado.tipos[fila.dataset.i], c = e.target.dataset.campo;
    if (c === 'nombre') t.nombre = e.target.value.slice(0, 40);
    else if (c === 'normal' || c === 'horas') { t[c] = entero(e.target.value); fila.querySelector('[data-total]').textContent = num(t.normal + t.horas); }
    actualizar();
  });
  cuerpoReg.addEventListener('change', (e) => {
    if (e.target.dataset.campo !== 'cuenta') return;
    estado.tipos[e.target.closest('tr').dataset.i].cuenta = e.target.checked; actualizar();
  });
  cuerpoReg.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    const fila = b.closest('tr'), i = Number(fila.dataset.i), t = estado.tipos[i];
    if (b.dataset.accion === 'borrar') {
      const cant = t.normal + t.horas;
      if (cant > 0 && !confirm(tr('confirm_del', t.nombre, num(cant)))) return;
      estado.tipos.splice(i, 1); renderRegistro(); return actualizar();
    }
    const c = b.dataset.campo;
    t[c] = Math.max(0, t[c] + (b.dataset.accion === 'mas' ? 1 : -1));
    fila.querySelector(`input[data-campo="${c}"]`).value = t[c];
    fila.querySelector('[data-total]').textContent = num(t.normal + t.horas);
    actualizar();
  });
  $('#btn-nuevo').addEventListener('click', () => {
    estado.tipos.push({ id: 'n' + Date.now(), nombre: NOMBRES[estado.idioma].nuevo, normal: 0, horas: 0, cuenta: true, color: COLORES_NUEVOS[estado.tipos.length % COLORES_NUEVOS.length] });
    renderRegistro(); actualizar();
  });
  $('#btn-quitar-nuevos').addEventListener('click', () => {
    const nuevos = estado.tipos.filter(esNuevo);
    if (!nuevos.length || !confirm(tr('confirm_del_new', nuevos.length))) return;
    estado.tipos = estado.tipos.filter((t) => !esNuevo(t));
    renderRegistro(); actualizar();
  });
  $('#btn-cero').addEventListener('click', () => {
    if (!confirm(tr('confirm_zero'))) return;
    estado.tipos.forEach((t) => { t.normal = 0; t.horas = 0; });
    renderRegistro(); actualizar();
  });

  /* Resultados */
  function renderTotales() {
    const { n, h } = contados();
    $('#btn-quitar-nuevos').disabled = !estado.tipos.some(esNuevo);
    $('#tt-normal').textContent = num(n); $('#tt-horas').textContent = num(h); $('#tt-total').textContent = num(n + h);
  }

  function renderHero() {
    const { n, h } = contados(), total = n + h, r = destacada();
    const L = logSin(r, n, h), horasX = estado.modoExtra === 'horas';
    const n50 = cofresHasta(r, 0, 0.5, false), f50 = cofresHasta(r, L, 0.5, horasX);
    $('#hero-pct').textContent = pct(probDe(L));
    $('#hero-texto').textContent = total === 0 ? tr('hero_none') : tr('hero_text', nombreR(r), num(total)) + (h > 0 ? tr('hero_hours_note') : '');
    const avance = Math.min(1, L / Math.log(0.5));
    $('#meta-barra').style.width = (avance * 100) + '%';
    $('#meta-prog').setAttribute('aria-valuenow', Math.round(avance * 100));
    $('#meta-num').textContent = `${num(total)} / ${num(n50)}`;
    let txt = f50 === 0 ? tr('hero_done') : tr('hero_need', num(f50), num(Math.ceil(f50 / estado.porPartida)), num(estado.porPartida));
    if (estado.extra > 0) txt += tr('hero_more', num(estado.extra), horasX, pct(probDe(L + estado.extra * Math.log1p(-pCofre(r, horasX)))));
    $('#hero-extra').textContent = txt;
  }

  function renderResultados() {
    const { n, h } = contados(), horasX = estado.modoExtra === 'horas';
    const cabezaExtra = tr('th_more', num(estado.extra));
    $('#th-extra').textContent = cabezaExtra;
    const faltan = (c) => c === 0 ? tr('done') : `${num(c)}<small>${tr('games', num(Math.ceil(c / estado.porPartida)))}</small>`;
    const celda = (cls, etiqueta, html) => `<td class="${cls}" data-label="${esc(etiqueta)}"><div class="v">${html}</div></td>`;
    $('#cuerpo-res').innerHTML = estado.tasas.map((r) => {
      const L = logSin(r, n, h), P = probDe(L);
      const Px = probDe(L + estado.extra * Math.log1p(-pCofre(r, horasX)));
      const ancho = P > 0 ? Math.max(P * 100, 0.6) : 0;
      return `<tr class="${r.id === estado.destacada ? 'destacada' : ''}">` +
        `<th scope="row">${r.moneda ? '<span class="ficha" aria-hidden="true"></span>' : ''}${esc(nombreR(r))}</th>` +
        celda('der', tr('th_rate'), tr('rate_of', num(r.tasa))) +
        celda('der', tr('th_hours_rate'), r.mult === 1 ? tr('no_change') : `${tr('rate_of', num(r.tasa / r.mult))}<small>&times;${dec(r.mult, 0, 2)}</small>`) +
        celda('celda-prob', tr('th_prob'), `<div class="barra"><span style="width:${ancho}%"></span></div><strong>${pct(P)}</strong>`) +
        celda('der', cabezaExtra, pct(Px)) +
        celda('der', tr('th_f50'), faltan(cofresHasta(r, L, 0.5, horasX))) +
        celda('der', tr('th_f90'), faltan(cofresHasta(r, L, 0.9, horasX))) + '</tr>';
    }).join('');
  }

  /* Referencia fija: las tasas solo se cambian en "Ajustar tasas" */
  function construirReferencia() {
    $('#cuerpo-ref').innerHTML = estado.tasas.map((r) =>
      `<tr data-id="${r.id}"><th scope="row">${esc(nombreR(r))}</th>` +
      `<td class="der" data-label="${esc(tr('th_rate'))}"><div class="v"><span data-r></span><small data-h></small></div></td>` +
      [0, 1, 2].map((k) => `<td class="der" data-c="${k}" data-label="${esc(tr('th_tras', num(estado.referencia[k])))}"></td>`).join('') +
      `<td class="der" data-50 data-label="${esc(tr('th_50at'))}"></td></tr>`).join('');
  }
  function renderReferencia() {
    const horas = estado.modoRef === 'horas';
    document.querySelectorAll('[data-th-ref]').forEach((th) => { th.textContent = tr('th_tras', num(estado.referencia[th.dataset.thRef])); });
    document.querySelectorAll('#cuerpo-ref tr').forEach((row) => {
      const r = estado.tasas.find((x) => x.id === row.dataset.id); if (!r) return;
      row.querySelector('[data-r]').textContent = tr('rate_of', num(r.tasa));
      row.querySelector('[data-h]').textContent = horas && r.mult !== 1 ? tr('ref_hours', num(r.tasa / r.mult)) : '';
      estado.referencia.forEach((c, k) => { row.querySelector(`[data-c="${k}"]`).textContent = pct(probDe(c * Math.log1p(-pCofre(r, horas)))); });
      row.querySelector('[data-50]').textContent = num(cofresHasta(r, 0, 0.5, horas));
    });
  }
  $('#modo-ref').value = estado.modoRef;
  $('#modo-ref').addEventListener('change', (e) => { estado.modoRef = e.target.value; actualizar(); });

  function actualizar() { renderTotales(); renderHero(); renderResultados(); renderReferencia(); guardar(); }

  /* Ajustes de tasas */
  function construirAjustes() {
    $('#cuerpo-ajustes').innerHTML = estado.tasas.map((r) =>
      `<tr><th scope="row">${esc(nombreR(r))}</th>` +
      `<td data-label="${esc(tr('th_rate'))}"><input type="number" min="1" step="1" value="${r.tasa}" data-id="${r.id}" data-campo="tasa" aria-label="${esc(tr('ar_rate', nombreR(r)))}"></td>` +
      `<td data-label="${esc(tr('adj_mult'))}"><input type="number" min="0.1" step="0.1" value="${r.mult}" data-id="${r.id}" data-campo="mult" aria-label="${esc(tr('ar_mult', nombreR(r)))}"></td></tr>`).join('');
  }
  $('#cuerpo-ajustes').addEventListener('input', (e) => {
    const r = estado.tasas.find((x) => x.id === e.target.dataset.id), v = Number(e.target.value);
    if (!r || !Number.isFinite(v)) return;
    if (e.target.dataset.campo === 'tasa' && v >= 1) r.tasa = v;
    if (e.target.dataset.campo === 'mult' && v > 0) r.mult = v;
    actualizar();
  });
  $('#btn-tasas').addEventListener('click', () => {
    estado.tasas = TASAS_GUIA.map((t) => ({ ...t })); construirAjustes(); construirReferencia(); actualizar();
  });

  /* Controles */
  $('#sel-destacada').addEventListener('change', (e) => { estado.destacada = e.target.value; actualizar(); });
  $('#extra').value = estado.extra;
  $('#extra').addEventListener('input', (e) => { estado.extra = entero(e.target.value); actualizar(); });
  $('#modo-extra').value = estado.modoExtra;
  $('#modo-extra').addEventListener('change', (e) => { estado.modoExtra = e.target.value; actualizar(); });
  $('#por-partida').value = estado.porPartida;
  $('#por-partida').addEventListener('input', (e) => { estado.porPartida = Math.max(1, entero(e.target.value) || 1); actualizar(); });

  /* Idioma */
  function aplicarIdioma() {
    document.documentElement.lang = estado.idioma;
    document.title = tr('title');
    document.querySelectorAll('[data-i]').forEach((el) => { el.textContent = tr(el.dataset.i); });
    document.querySelectorAll('[data-i-label]').forEach((el) => { el.dataset.label = tr(el.dataset.iLabel); });
    document.querySelectorAll('[data-i-html]').forEach((el) => { el.innerHTML = tr(el.dataset.iHtml); });
    $('#th-contar').title = tr('col_count_title');
    $('#meta-prog').setAttribute('aria-label', tr('hero_path_aria'));
    $('#idioma').value = estado.idioma;
    $('#sel-destacada').innerHTML = estado.tasas.map((r) => `<option value="${r.id}">${esc(nombreR(r))}</option>`).join('');
    $('#sel-destacada').value = estado.destacada;
    renderRegistro(); construirAjustes(); construirReferencia(); actualizar();
  }
  $('#idioma').addEventListener('change', (e) => {
    estado.idioma = e.target.value === 'es' ? 'es' : 'en';
    normalizarNombres(); aplicarIdioma();
  });

  normalizarNombres();
  aplicarIdioma();
})();
