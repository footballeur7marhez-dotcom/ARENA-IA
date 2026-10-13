/* ============================================================
   POKÉMON ROUGE FEU — ROM HACK « STARTER UNIVERSEL »
   Logique de l'application (vanilla JS)
   ============================================================ */
(() => {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const STORAGE_KEY = 'firered-romhack-starter-v1';

  /* ---------- Couleurs des types (gen III) ---------- */
  const TYPE_COLORS = {
    plante: '#78C850', feu: '#F08030', eau: '#6890F0', insecte: '#A8B820',
    normal: '#A8A878', poison: '#A040A0', 'électrik': '#F8D030', sol: '#E0C068',
    vol: '#A890F0', psy: '#F85888', combat: '#C03028', roche: '#B8A038',
    glace: '#98D8D8', spectre: '#705898', dragon: '#7038F8',
    'ténèbres': '#705848', acier: '#B8B8D0', 'fée': '#EE99AC'
  };

  const GEN_NAMES = { 1: 'Kanto', 2: 'Johto', 3: 'Hoenn' };

  /* ---------- État ---------- */
  const state = {
    gen: 0,            // 0 = toutes
    legendaryOnly: false,
    type: 'all',
    query: '',
    starter: null      // pokémon choisi (objet)
  };

  const byId = new Map(POKEMON.map((p) => [p.id, p]));
  const cards = new Map(); // id -> élément DOM
  let modalCtx = null;     // { onYes }

  /* ---------- Utilitaires ---------- */
  const norm = (s) => (s || '').toString().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const dex = (id) => '#' + String(id).padStart(3, '0');

  const spriteURL = (id) => `assets/sprites/${id}.png`;

  function typeBadges(types, small) {
    return types.map((t) =>
      `<span class="tbadge" style="background:${TYPE_COLORS[t] || '#666'}">${t}</span>`
    ).join('');
  }

  function chainText(p) {
    if (!p.chain || p.chain.length < 2) return null;
    const names = p.chain.map((id) => byId.get(id)).filter(Boolean).map((x) => x.fr);
    return names.join(' → ');
  }

  /* ---------- Construction de la liste ---------- */
  function buildCards() {
    const grid = $('#grid');
    const frag = document.createDocumentFragment();

    for (const p of POKEMON) {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'card' + (p.leg || p.myth ? ' is-legendary' : '');
      card.dataset.id = p.id;
      card.dataset.search = norm([p.fr, p.en, p.id, p.genus, p.types.join(' '), GEN_NAMES[p.gen]].join(' '));
      card.setAttribute('aria-label', `${p.fr}, Pokédex ${dex(p.id)}`);
      card.innerHTML =
        (p.leg || p.myth ? `<span class="star" title="${p.myth ? 'Pokémon mythique' : 'Pokémon légendaire'}">${p.myth ? '✨' : '⭐'}</span>` : '') +
        `<img src="${spriteURL(p.id)}" alt="${p.fr}" loading="lazy" width="64" height="64">` +
        `<span class="dex">${dex(p.id)}</span>` +
        `<span class="pname">${p.fr}</span>` +
        `<span class="pen">${p.en}</span>` +
        `<span class="ctypes">${typeBadges(p.types)}</span>`;

      const img = card.querySelector('img');
      img.addEventListener('error', () => {
        const fb = document.createElement('span');
        fb.className = 'fallback';
        fb.textContent = dex(p.id);
        img.replaceWith(fb);
      });

      card.addEventListener('click', () => onCardClick(p));
      cards.set(p.id, card);
      frag.appendChild(card);
    }
    grid.appendChild(frag);
  }

  /* ---------- Filtres ---------- */
  function matches(p) {
    if (state.gen && p.gen !== state.gen) return false;
    if (state.legendaryOnly && !(p.leg || p.myth)) return false;
    if (state.type !== 'all' && !p.types.includes(state.type)) return false;
    if (state.query) {
      const hay = cards.get(p.id).dataset.search;
      if (!hay.includes(state.query)) return false;
    }
    return true;
  }

  let visibleIds = [];

  function applyFilters() {
    visibleIds = POKEMON.filter(matches).map((p) => p.id);
    for (const p of POKEMON) {
      cards.get(p.id).style.display = visibleIds.includes(p.id) ? '' : 'none';
    }
    $('#empty').hidden = visibleIds.length > 0;
    $('#count').textContent = `${visibleIds.length} / 386 Pokémon affichés`;
  }

  /* ---------- Choix du starter ---------- */
  function onCardClick(p) {
    if (state.starter) {
      if (state.starter.id === p.id) {
        toast(`C'est déjà ton starter : ${p.fr} !`);
      } else {
        toast('🔒 Starter verrouillé — libère-le pour en choisir un autre.');
      }
      return;
    }
    askConfirm(p);
  }

  function askConfirm(p) {
    openModal({
      text: 'Veux-tu choisir ce Pokémon comme starter ?',
      sprite: spriteURL(p.id),
      name: `${p.fr} ${dex(p.id)}`,
      types: typeBadges(p.types),
      meta: p.leg || p.myth
        ? `⭐ ${p.myth ? 'Mythique' : 'Légendaire'} — ${GEN_NAMES[p.gen]} — ${p.genus}`
        : `${GEN_NAMES[p.gen]} — ${p.genus}`,
      onYes: () => chooseStarter(p)
    });
  }

  function chooseStarter(p) {
    state.starter = p;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: p.id }));
    } catch (e) { /* stockage indisponible : on garde en mémoire */ }
    closeModal();
    renderStarterPanel();
    refreshLock();
    toast(`🎉 ${p.fr} rejoint ton équipe au niveau 5 ! Il restera avec toi toute la partie.`);
  }

  function resetStarter() {
    state.starter = null;
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    renderStarterPanel();
    refreshLock();
    toast('🔓 Starter libéré. Choisis-en un nouveau !');
  }

  function renderStarterPanel() {
    const panel = $('#starter-panel');
    if (!state.starter) { panel.hidden = true; return; }
    const p = state.starter;
    panel.hidden = false;
    $('#starter-sprite').src = spriteURL(p.id);
    $('#starter-sprite').alt = p.fr;
    $('#starter-name').textContent = `${p.fr}  ${dex(p.id)}`;
    $('#starter-types').innerHTML = typeBadges(p.types);
    const chain = chainText(p);
    $('#starter-meta').textContent =
      `${p.leg || p.myth ? (p.myth ? '✨ Mythique' : '⭐ Légendaire') + ' · ' : ''}${GEN_NAMES[p.gen]} · ${p.genus}`;
    $('#starter-chain').innerHTML = chain
      ? `Famille : <b>${chain}</b>`
      : `Famille : <b>${p.fr}</b> (pas d’évolution)`;
  }

  function refreshLock() {
    const locked = !!state.starter;
    $('#lock-hint').hidden = !locked;
    for (const [id, card] of cards) {
      card.classList.toggle('locked', locked && (!state.starter || state.starter.id !== id));
      card.classList.toggle('chosen', locked && state.starter.id === id);
    }
  }

  /* ---------- Modale ---------- */
  function openModal({ text, sprite, name, types, meta, onYes, yesLabel = 'OUI', noLabel = 'NON' }) {
    modalCtx = { onYes };
    $('#modal-text').textContent = text;
    $('#modal-sprite').src = sprite || '';
    $('#modal-sprite').alt = name || '';
    $('#modal-name').textContent = name || '';
    $('#modal-types').innerHTML = types || '';
    $('#modal-yes').textContent = yesLabel;
    $('#modal-no').textContent = noLabel;
    $('#modal').hidden = false;
    $('#modal-yes').focus();
  }

  function closeModal() {
    $('#modal').hidden = true;
    modalCtx = null;
  }

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, 3600);
  }

  /* ---------- Aléatoire ---------- */
  function pickRandom() {
    if (state.starter) {
      toast('🔒 Starter verrouillé — libère-le pour en choisir un autre.');
      return;
    }
    if (!visibleIds.length) {
      toast('Aucun Pokémon dans cette sélection.');
      return;
    }
    const id = visibleIds[Math.floor(Math.random() * visibleIds.length)];
    const p = byId.get(id);
    toast(`🎲 Le hasard a désigné… ${p.fr} !`);
    askConfirm(p);
  }

  /* ---------- Filtres : UI ---------- */
  function buildTypeFilter() {
    const types = [...new Set(POKEMON.flatMap((p) => p.types))].sort((a, b) => a.localeCompare(b, 'fr'));
    const sel = $('#type-filter');
    sel.innerHTML = '<option value="all">Tous les types</option>' +
      types.map((t) => `<option value="${t}">${t}</option>`).join('');
    sel.addEventListener('change', () => { state.type = sel.value; applyFilters(); });
  }

  function bindUI() {
    // Recherche
    const search = $('#search');
    search.addEventListener('input', () => {
      state.query = norm(search.value).trim();
      $('#clear-search').hidden = !search.value;
      applyFilters();
    });
    $('#clear-search').addEventListener('click', () => {
      search.value = '';
      state.query = '';
      $('#clear-search').hidden = true;
      applyFilters();
      search.focus();
    });

    // Chips génération
    $('#gen-chips').addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      document.querySelectorAll('#gen-chips .chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      if (chip.id === 'chip-legendary') {
        state.legendaryOnly = !state.legendaryOnly;
        chip.classList.toggle('active', state.legendaryOnly);
      } else {
        state.legendaryOnly = false;
        $('#chip-legendary').classList.remove('active');
        state.gen = Number(chip.dataset.gen);
      }
      applyFilters();
    });

    // Boutons
    $('#random-btn').addEventListener('click', pickRandom);
    $('#reset-btn').addEventListener('click', () => {
      const p = state.starter;
      if (!p) return;
      openModal({
        text: 'Libérer ton starter actuel et en choisir un autre ?',
        sprite: spriteURL(p.id),
        name: p.fr,
        types: typeBadges(p.types),
        yesLabel: 'OUI',
        noLabel: 'NON',
        onYes: resetStarter
      });
    });
    $('#empty-reset').addEventListener('click', () => {
      search.value = ''; state.query = '';
      $('#clear-search').hidden = true;
      state.gen = 0; state.legendaryOnly = false; state.type = 'all';
      $('#type-filter').value = 'all';
      document.querySelectorAll('#gen-chips .chip').forEach((c) => c.classList.remove('active'));
      document.querySelector('#gen-chips .chip[data-gen="0"]').classList.add('active');
      applyFilters();
    });

    // Modale
    $('#modal-yes').addEventListener('click', () => { const cb = modalCtx && modalCtx.onYes; closeModal(); if (cb) cb(); });
    $('#modal-no').addEventListener('click', closeModal);
    $('#modal').addEventListener('click', (e) => { if (e.target === $('#modal')) closeModal(); });

    // Clavier
    document.addEventListener('keydown', (e) => {
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
      if (!$('#modal').hidden) {
        if (e.key === 'Escape') closeModal();
        // Laisser le navigateur gérer Entrée si le focus est sur un bouton de la modale
        const onBtn = ['modal-yes', 'modal-no'].includes(document.activeElement.id);
        if (e.key === 'Enter' && !onBtn) { e.preventDefault(); $('#modal-yes').click(); }
        return;
      }
      if (e.key === '/' && !typing) { e.preventDefault(); search.focus(); }
      else if ((e.key === 'r' || e.key === 'R') && !typing) pickRandom();
      else if (e.key === 'Escape' && typing) document.activeElement.blur();
    });
  }

  /* ---------- Écran titre ---------- */
  function bindTitle() {
    const start = () => {
      $('#title-screen').remove();
      $('#app').hidden = false;
      $('#search').focus();
    };
    $('#start-btn').addEventListener('click', (e) => { e.stopPropagation(); start(); });
    $('#title-screen').addEventListener('click', start);
  }

  /* ---------- Init ---------- */
  function init() {
    buildCards();
    buildTypeFilter();
    bindUI();
    bindTitle();
    applyFilters();

    // Restauration du starter conservé (localStorage)
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (saved && byId.has(saved.id)) {
        state.starter = byId.get(saved.id);
        renderStarterPanel();
      }
    } catch (e) { /* ignore */ }
    refreshLock();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
