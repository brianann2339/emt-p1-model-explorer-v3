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
    return `${row.year} 全部合格解釋樣本：${fmtCount(row.explained_n)} 人次；背景 ${fmtCount(row.background_n)} 筆。輸出：${row.output_space}${row.prediction_variant ? '；'+row.prediction_variant : ''}。方法：${row.method_label}。${population}`;
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
