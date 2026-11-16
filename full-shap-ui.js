(() => {
  'use strict';
  const el = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const records = window.EMTFullShap?.records || [];
  const index = new Map(records.map(row => [`${row.year}|${row.display_entity_id}`, row]));
  const original = {selectedFeatureRows, renderFeatures, openFeatureModal, renderShap};
  const pendingNote = '原有小樣本解釋圖；全量 SHAP 補算中。圖中年份與方法以原圖標示為準。';
  const year = () => state.split === 'external_2025' ? 2025 : 2024;
  function selected() {
    const rep = getSelectedRep();
    if (!rep) return null;
    const row = index.get(`${year()}|${rep.display_entity_id}`);
    return row?.status === 'COMPLETE_VALIDATED' && row.explained_n === row.eligible_n ? row : null;
  }
  function description(row) {
    const population = row.reported_comparison_n && row.reported_comparison_n !== row.explained_n
      ? ` SHAP 使用原模型完整可用母群；目前效能比較的 N=${fmtCount(row.reported_comparison_n)}，兩者不同。` : '';
    const residual = Number.isFinite(row.maximum_absolute_additivity_residual) ? ` 加總最大殘差：${row.maximum_absolute_additivity_residual.toPrecision(6)}（機率單位，紀錄型檢查；不宣稱精確加總）。` : '';
    return `${row.year} 全部合格解釋樣本：${fmtCount(row.explained_n)} 人次；背景 ${fmtCount(row.background_n)} 筆。輸出：${row.output_space}${row.prediction_variant ? '；'+row.prediction_variant : ''}。方法：${row.method_label}。${population}${residual}`;
  }
  const unavailable = () => `${year()} 全量 direct SHAP 尚未完成；未以其他年份、模型或舊小樣本圖代替。`;
  selectedFeatureRows = function(limit=20) {
    const row = selected();
    return row ? row.importance.slice(0, limit).map(item => ({
      feature: item.feature, importance_value: item.mean_abs_shap,
      importance_metric: 'mean |SHAP|', importance_method: row.method_label,
      explanation_scope: `${row.year} full eligible population; N=${row.explained_n}`,
      explanation_kind: 'direct_model_shap'
    })) : original.selectedFeatureRows(limit);
  };
  renderFeatures = function() {
    const row = selected(), target = el('featurePlot');
    if (!row) {
      original.renderFeatures();
      el('featureNote').textContent = pendingNote + ' ' + el('featureNote').textContent;
      return;
    }
    target.innerHTML = '';
    target.style.height = '';
    renderFeaturePlotNumericPublicV2('featurePlot', selectedFeatureRows(10), true);
    el('featureNote').textContent = `${description(row)} mean |SHAP| 與 beeswarm 使用完全相同個案。小圖最多10個特徵，放大最多20個；不是只抽10／20筆個案。`;
  };
  openFeatureModal = function() {
    const row = selected(), target = el('featurePlotModal');
    el('featureModal').classList.add('open');
    el('featureModalTitle').textContent = `${traceName(getSelectedRep())} · ${year()} feature importance`;
    if (!row) {
      original.openFeatureModal();
      el('featureModalNote').textContent = pendingNote + ' ' + el('featureModalNote').textContent;
      return;
    }
    target.innerHTML = '';
    target.style.height = '';
    renderFeaturePlotNumericPublicV2('featurePlotModal', selectedFeatureRows(20), false);
    Plotly.relayout(target, {'xaxis.title.text': `Mean |SHAP| (${row.output_space})`});
    el('featureModalNote').textContent = description(row);
  };
  renderShap = function() {
    const row = selected(), box = el('shapBox');
    if (!row) {
      original.renderShap();
      const notice = document.createElement('p');
      notice.className = 'note';
      notice.textContent = pendingNote;
      box.prepend(notice);
      return;
    }
    box.innerHTML = `<div class="ok"><b>${row.year} 全量 Direct SHAP</b></div>
      <p class="note">${esc(description(row))}</p>
      <p class="note">${esc(row.explanation_level)} 每個點對應一筆真實個案；未用重抽樣複製點增加密度。完整樣本不等於 permutation 特徵排序已證明收斂。</p>
      <div class="shap-thumb-grid">${[['beeswarm_path','direct SHAP beeswarm / worm'],['bar_path','mean |SHAP|']].map(([field,title]) => `<div><div class="note">${esc(title)}</div><button type="button" class="full-shap-image-button" data-image="${esc(row[field])}" data-title="${esc(`${row.year} · ${title} · N=${row.explained_n}`)}"><img class="shap-thumb" src="${esc(row[field])}" alt="${esc(`${row.year} ${title}; N=${row.explained_n}`)}" loading="lazy"></button></div>`).join('')}</div>`;
    box.querySelectorAll('[data-image]').forEach(button => button.onclick = () => openImageModal(button.dataset.image, button.dataset.title));
  };
  window.EMTFullShapUI = {selected, count: index.size};
  if (window.EMTCoreUI) EMTCoreUI.showDetail(EMTCoreUI.getState().detail);
})();

// Public deployment history only. Update shap-release-log.json alongside verified chart releases.
(() => {
  'use strict';
  const workspace = document.getElementById('coreWorkspace');
  if (!workspace) return;
  const make = (tag, text) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    return node;
  };
  const panel = make('details');
  panel.id = 'shap-updates';
  panel.className = 'card';
  panel.style.padding = '0.8rem 1rem';
  panel.style.marginBottom = '1rem';
  const title = make('summary', 'SHAP 更新日誌');
  title.style.cursor = 'pointer';
  title.style.fontWeight = '700';
  panel.append(title);
  const note = make('p', '日期以台灣時間為準；只記錄這個網站已發布的更新，不計入運算中或待驗收的組別。');
  note.className = 'core-footnote';
  panel.append(note);
  const body = make('div', '載入更新紀錄中…');
  body.setAttribute('aria-live', 'polite');
  panel.append(body);
  workspace.prepend(panel);
  if (window.location.hash === '#shap-updates') {
    panel.open = true;
    requestAnimationFrame(() => panel.scrollIntoView({block: 'start'}));
  }
  fetch('shap-release-log.json', {cache: 'no-cache'})
    .then(response => {
      if (!response.ok) throw new Error('Release log unavailable');
      return response.json();
    })
    .then(entries => {
      if (!Array.isArray(entries) || !entries.length) throw new Error('Release log empty');
      const sections = entries.slice().sort((a, b) => b.date.localeCompare(a.date)).map(entry => {
        const section = make('section');
        const heading = make('h3');
        const date = make('time', entry.date.replaceAll('-', '/'));
        date.dateTime = entry.date;
        heading.append(date, document.createTextNode('｜' + entry.title));
        const changes = make('ul');
        for (const change of entry.changes) changes.append(make('li', change));
        section.append(heading, changes);
        return section;
      });
      body.replaceChildren(...sections);
    })
    .catch(() => { body.textContent = '目前無法載入更新日誌，請重新整理後再試。'; });
})();
