/* ================================================================
   REFERENCES.JS — Reference library per member
   ================================================================ */
'use strict';

window.REFS = {};

const TYPE_META = {
  book:    { icon: 'fa-solid fa-book',        cls: 'ref-type-book',    label: 'Livro' },
  link:    { icon: 'fa-solid fa-link',         cls: 'ref-type-link',    label: 'Site' },
  video:   { icon: 'fa-brands fa-youtube',     cls: 'ref-type-video',   label: 'Vídeo' },
  article: { icon: 'fa-solid fa-newspaper',    cls: 'ref-type-article', label: 'Artigo' },
};

function buildRefItem(ref, onDelete) {
  const a = document.createElement('a');
  a.className = 'ref-item';
  a.href   = ref.url || '#';
  a.target = '_blank';
  a.rel    = 'noopener noreferrer';

  const meta = TYPE_META[ref.type] || TYPE_META.link;

  a.innerHTML = `
    <span class="ref-type-icon ${meta.cls}">
      <i class="${meta.icon}"></i>
    </span>
    <span class="ref-info">
      <span class="ref-name">${escHtml(ref.name)}</span>
      <span class="ref-meta">${escHtml(meta.label)}${ref.author ? ' · ' + escHtml(ref.author) : ''}</span>
    </span>
  `;

  // Delete button (stops propagation so link doesn't open)
  const delBtn = document.createElement('button');
  delBtn.className = 'ref-delete';
  delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  delBtn.title = 'Remover referência';
  delBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    a.style.transition = 'opacity 0.2s, transform 0.2s';
    a.style.opacity    = '0';
    a.style.transform  = 'translateX(16px)';
    setTimeout(() => {
      a.remove();
      if (onDelete) onDelete();
    }, 200);
  });
  a.appendChild(delBtn);
  return a;
}

function escHtml(str) {
  const d = document.createElement('div');
  d.textContent = str || '';
  return d.innerHTML;
}

REFS.init = function (memberId, containerEl) {
  if (!containerEl) return;

  const refsData = (SEMINAR.references[memberId] || []).slice(); // local copy

  // Build section
  const section = document.createElement('div');
  section.className = 'refs-section';
  section.innerHTML = `
    <div class="refs-header">
      <span class="refs-title"><i class="fa-solid fa-book-open"></i> Referências</span>
    </div>
    <div class="refs-list" id="refs-list-${memberId}"></div>
    <div class="refs-add-form" id="refs-form-${memberId}">
      <select title="Tipo" id="refs-type-${memberId}">
        <option value="book">📚 Livro</option>
        <option value="link">🔗 Site</option>
        <option value="video">▶️ Vídeo</option>
        <option value="article">📰 Artigo</option>
      </select>
      <input type="text" placeholder="Título da referência" id="refs-name-${memberId}" />
      <input type="text" placeholder="URL (opcional)" id="refs-url-${memberId}" />
      <button class="refs-add-btn" id="refs-add-btn-${memberId}">
        <i class="fa-solid fa-plus"></i> Adicionar
      </button>
    </div>
  `;
  containerEl.appendChild(section);

  const listEl   = document.getElementById('refs-list-' + memberId);
  const addBtn   = document.getElementById('refs-add-btn-' + memberId);
  const typeEl   = document.getElementById('refs-type-' + memberId);
  const nameEl   = document.getElementById('refs-name-' + memberId);
  const urlEl    = document.getElementById('refs-url-' + memberId);

  function renderRef(ref) {
    const item = buildRefItem(ref, () => {});
    listEl.appendChild(item);
  }

  // Pre-populate with initial data
  refsData.forEach(renderRef);

  // Add new reference
  addBtn.addEventListener('click', () => {
    const name = nameEl.value.trim();
    if (!name) { nameEl.focus(); nameEl.style.borderColor = 'var(--red)'; return; }
    nameEl.style.borderColor = '';
    const ref = {
      type:   typeEl.value,
      name:   name,
      url:    urlEl.value.trim() || '#',
      author: ''
    };
    renderRef(ref);
    nameEl.value = '';
    urlEl.value  = '';
    nameEl.focus();
  });

  nameEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addBtn.click();
  });
};
