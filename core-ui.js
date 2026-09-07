(() => {
  'use strict';
  const el=id=>document.getElementById(id), esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  if(!window.EMTCommonRowsUI){el('coreWorkspace').innerHTML='<p role="alert">共同樣本資料未完整載入，請重新整理；目前不顯示模型排名。</p>';return;}
  const number=x=>typeof x==='number'&&Number.isFinite(x)?x:null;
  const display=x=>number(x)===null?'—':x.toFixed(4);
  const groupNames={overall:'全急診',medicine:'急診內科',surgery:'急診外科'};
  let sortMetric='AUROC', chart='Rank', detail='Operating', view='compare', secondary='p104Panel', chartTicket=0, chartQueue=Promise.resolve();
  function rankedRows(outcome=state.outcome,group=state.group,split=state.split,metric=sortMetric){
    const rows=DATA.representatives.filter(r=>r.outcome===outcome&&r.group===group).map(rep=>({rep,metricValue:number(rep[split+'_'+metric])}));
    rows.sort((a,b)=>{
      if(a.metricValue!==b.metricValue)return a.metricValue===null?1:b.metricValue===null?-1:b.metricValue-a.metricValue;
      return a.rep.display_entity_id<b.rep.display_entity_id?-1:a.rep.display_entity_id>b.rep.display_entity_id?1:0;
    });
    let previous=null,rank=null;
    return rows.map((row,i)=>{if(row.metricValue!==null&&row.metricValue!==previous)rank=i+1;previous=row.metricValue;return {...row,rank:row.metricValue===null?null:rank};});
  }
  visibleReps=()=>rankedRows().map(r=>r.rep);
  function differentPopulation(rep,split=state.split){
    if(rep.model_key!=='rSI_sMS')return false;
    const peer=DATA.representatives.find(r=>r.outcome===rep.outcome&&r.group===rep.group&&r.model_key==='catboost');
    return !!peer&&rep[split+'_N']!==peer[split+'_N'];
  }
  function displayRank(row,rows,split=state.split){
    if(differentPopulation(row.rep,split))return '參考';
    return row.metricValue===null?'—':1+rows.filter(r=>!differentPopulation(r.rep,split)&&r.metricValue!==null&&r.metricValue>row.metricValue).length;
  }
  selectDefaultEntity=()=>{const rows=visibleReps();if(!rows.some(r=>r.display_entity_id===state.selectedEntity))state.selectedEntity=rows[0]?.display_entity_id??null;};
  function activate(selector,key,value){document.querySelectorAll(selector).forEach(button=>{const active=button.dataset[key]===value;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});}
  function renderRanking(){
    const rows=rankedRows();
    el('modelList').innerHTML=`<table><thead><tr><th scope="col">名次</th><th scope="col">模型</th><th scope="col">AUROC ↑</th><th scope="col">AUPRC ↑</th><th scope="col">敏感度／特異度</th><th scope="col">N／事件數</th></tr></thead><tbody>${rows.map(row=>{
      const {rep}=row,rank=displayRank(row,rows);
      const m=metricFor(rep),selected=rep.display_entity_id===state.selectedEntity;
      const cell=key=>`<td class="score-cell ${sortMetric===key?'sort-column':''}"><span class="score-value" title="${esc(m[key])}">${display(m[key])}</span>${sortMetric===key&&number(m[key])!==null?`<span class="score-track" aria-hidden="true"><span class="score-fill" style="width:${Math.max(0,Math.min(100,m[key]*100))}%"></span></span>`:''}</td>`;
      return `<tr data-entity="${esc(rep.display_entity_id)}" class="${selected?'selected':''}"><td class="rank-number">${rank}</td><th scope="row"><button type="button" class="model-label" aria-label="查看 ${esc(traceName(rep))} 的詳細結果">${esc(traceName(rep))}</button><small class="mobile-model-n">N ${fmtCount(m.N)} · 事件 ${fmtCount(m.events)}</small>${differentPopulation(rep)?'<small class="cohort-warning">不同母群，不列共同名次</small>':''}</th>${cell('AUROC')}${cell('AUPRC')}<td>${display(m.sensitivity)}／${display(m.specificity)}</td><td>${fmtCount(m.N)}／${fmtCount(m.events)}</td></tr>`;
    }).join('')}</tbody></table>`;
    el('rankingSummary').textContent=`${rows.length} 個模型 · ${sortMetric} 由高到低`;
    el('rankContext').textContent=`${DATA.outcome_labels[state.outcome]} · ${groupNames[state.group]} · ${state.split==='external_2025'?'2025 封存評估（描述性排序）':'2024 驗證集'}。點選模型名稱，查看其詳細圖表。`;
  }
  renderModelList=renderRanking;
  function renderCohorts(){
    const rankings=Object.fromEntries(groups.map(g=>[g,rankedRows(state.outcome,g,state.split,sortMetric)]));
    el('cohortComparison').innerHTML=`<table><thead><tr><th scope="col">模型</th>${groups.map(g=>`<th scope="col">${groupNames[g]}<br><small>${sortMetric} · 欄內名次 · N／事件數</small></th>`).join('')}</tr></thead><tbody>${rankedRows().map(({rep})=>`<tr><th scope="row">${esc(traceName(rep))}</th>${groups.map(g=>{const row=rankings[g].find(r=>r.rep.model_key===rep.model_key);return `<td>${row?`<strong title="${row.metricValue}">${display(row.metricValue)}</strong><br><small>${differentPopulation(row.rep)?'不同母群參考':'第 '+displayRank(row,rankings[g])+' 名'} · N=${fmtCount(row.rep[state.split+'_N'])}／事件 ${fmtCount(row.rep[state.split+'_events'])}</small>`:'未提供'}</td>`;}).join('')}</tr>`).join('')}</tbody></table>`;
  }
  function drawCurves(kind){
    const ordered=rankedRows(), traces=[], legends=[];
    if(kind==='roc')traces.push({type:'scatter',mode:'lines',x:[0,1],y:[0,1],line:{color:'#adb7c2',dash:'dot',width:1},showlegend:false,hoverinfo:'skip'});
    for(const {rep,rank} of ordered){
      const curve=DATA.curves.find(c=>c.display_entity_id===rep.display_entity_id&&c.outcome===state.outcome&&c.group===state.group&&c.split===state.split&&c.curve_type===kind);
      if(!curve)continue;
      const selected=rep.display_entity_id===state.selectedEntity, metric=kind==='roc'?'AUROC':'AUPRC', name=traceName(rep), color=curve.plot_color||'#64748b';
      traces.push({type:'scatter',mode:'lines',x:curve.x,y:curve.y,name,customdata:curve.thresholds,showlegend:false,line:{color,dash:curve.plot_dash||'solid',width:selected?3.5:1.7},opacity:selected?1:.65,hovertemplate:`${esc(name)}<br>${metric}: ${display(rep[state.split+'_'+metric])}<br>${kind==='roc'?'FPR':'Recall'}: %{x:.4f}<br>${kind==='roc'?'TPR':'Precision'}: %{y:.4f}<br>Threshold: %{customdata:.4f}<extra></extra>`});
      legends.push(`<button type="button" data-entity="${esc(rep.display_entity_id)}" class="curve-legend-item ${selected?'selected':''}"><span class="curve-swatch" style="border-top-color:${color}"></span><span>${differentPopulation(rep)?'參考':displayRank(ordered.find(r=>r.rep===rep),ordered)}. ${esc(name)} <strong>${display(rep[state.split+'_'+metric])}</strong></span></button>`);
    }
    const plotId=kind==='roc'?'rocPlot':'prPlot';
    Plotly.react(plotId,traces,{margin:{l:64,r:28,t:20,b:60},font:{family:'Noto Sans TC,system-ui,sans-serif',size:12,color:'#334155'},paper_bgcolor:'#fff',plot_bgcolor:'#fff',showlegend:false,hovermode:'closest',xaxis:{title:{text:kind==='roc'?'1 − 特異度（False positive rate）':'敏感度（Recall）'},range:[0,1],gridcolor:'#edf1f4',zeroline:false},yaxis:{title:{text:kind==='roc'?'敏感度（True positive rate）':'陽性預測值（Precision）'},range:[0,1],gridcolor:'#edf1f4',zeroline:false}},{responsive:true,displaylogo:false});
    el(kind==='roc'?'rocLegend':'prLegend').innerHTML=legends.join('');
  }
  function showChart(next){
    chart=next;
    ['Rank','Roc','Pr','Cohorts'].forEach(k=>{el('panel'+k).hidden=k!==chart;el('panel'+k).classList.toggle('active',k===chart);});
    activate('[data-chart]','chart',chart);
    el('comparisonTitle').textContent={Rank:'模型排名',Roc:'ROC 曲線比較',Pr:'PR 曲線比較',Cohorts:'同一結局，三族群對照'}[chart];
    el('rankContext').textContent=`${DATA.outcome_labels[state.outcome]} · ${groupNames[state.group]} · ${state.split==='external_2025'?'2025 封存評估（描述性排序）':'2024 驗證集'}。${['Roc','Pr'].includes(chart)?`圖例依 ${sortMetric} 排序，線旁數值為 ${chart==='Pr'?'AUPRC':'AUROC'}。`:'點選模型名稱，查看其詳細圖表。'}`;
    if(chart==='Cohorts')renderCohorts();else if(chart!=='Rank')drawCurves(chart.toLowerCase());
  }
  switchTab=showChart;
  function updateSelection(){
    const rep=getSelectedRep();if(!rep)return;
    const rows=rankedRows();el('focusModelSelect').innerHTML=rows.map(r=>`<option value="${esc(r.rep.display_entity_id)}">${displayRank(r,rows)}. ${esc(traceName(r.rep))}</option>`).join('');
    el('focusModelSelect').value=state.selectedEntity;
    el('selectedStrip').innerHTML=`<div class="title">${esc(traceName(rep))}</div><p class="note">${esc(DATA.outcome_labels[state.outcome])} · ${groupNames[state.group]} · ${state.split==='external_2025'?'2025 封存評估':'2024 驗證集'} · N=${fmtCount(rep[state.split+'_N'])}／事件 ${fmtCount(rep[state.split+'_events'])}</p>`;
    el('detailEnsembleTab').hidden=rep.display_family!=='Ensemble';
    if(detail==='Ensemble'&&el('detailEnsembleTab').hidden)detail='Operating';
    window.EMTCommonRowsUI?.paint();
  }
  function showDetail(next){
    detail=next;const linked=['Calibration','Dca'].includes(detail);
    ['Champion','Operating','Feature','Shap','Ensemble'].forEach(k=>{el('detail'+k+'Panel').hidden=k!==detail;el('detail'+k+'Panel').classList.toggle('active',k===detail);});
    ['Champion','Operating','Feature','Shap','Ensemble','Calibration','Dca'].forEach(k=>{el('detail'+k+'Tab').classList.toggle('active',k===detail);el('detail'+k+'Tab').setAttribute('aria-pressed',String(k===detail));});
    el('coreSupplementSlot').hidden=!linked;
    if(linked){
      const ticket=++chartTicket,rep=getSelectedRep(),requested={kind:detail,entity_id:rep.display_entity_id,group:state.group,outcome:state.outcome.replace('y_',''),split:state.split};
      el('supplementPanel').hidden=false;el('supplementPanel').classList.add('core-linked-chart');el('coreSupplementSlot').appendChild(el('supplementPanel'));
      el('supplementContext').textContent='讀取選定模型的圖表…';
      chartQueue=chartQueue.catch(()=>{}).then(async()=>{if(ticket!==chartTicket)return;try{if(window.EMTCommonRowsUI?.renderPlot(requested.kind,rep))return;await EMTResearchExtensions.openCoreChart(requested);if(ticket===chartTicket)el('supplementPanel').querySelector('h2').textContent=detail==='Calibration'?'校準圖':'決策曲線（DCA）';}catch(error){if(ticket===chartTicket){el('supplementContext').textContent=error.message;Plotly.purge('supplementPlot');el('supplementTable').innerHTML='';}}});
    }else{
      chartTicket++;
      if(detail==='Shap')renderShap();else if(detail==='Feature')renderFeatures();else if(detail==='Ensemble')renderEnsemble();else {renderChampion();EMTResearchExtensions.ensure('metadata').catch(error=>{el('operatingBox').insertAdjacentHTML('beforeend',`<p class="note">補充 CI 暫未載入：${esc(error.message)}</p>`);});}
    }
  }
  switchDetailTab=showDetail;
  function selectModel(entity,scroll=false){
    if(!currentReps().some(r=>r.display_entity_id===entity))return;
    state.selectedEntity=entity;renderRanking();updateSelection();showChart(chart);showDetail(detail);
    if(scroll)el('selectedModelSection').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function refresh(){
    selectDefaultEntity();activate('[data-outcome]','outcome',state.outcome);activate('[data-group]','group',state.group);
    el('outcomeSelect').value=state.outcome;el('groupSelect').value=state.group;el('splitSelect').value=state.split;el('rankMetricSelect').value=sortMetric;
    el('contextNote').textContent=`${DATA.outcome_labels[state.outcome]}：${DATA.outcome_definitions[state.outcome]||''}`;
    renderRanking();updateSelection();showChart(chart);showDetail(detail);
  }
  renderAll=refresh;
  function setContext(next){
    if(next.outcome&&outcomes.includes(next.outcome))state.outcome=next.outcome;
    if(next.group&&groups.includes(next.group))state.group=next.group;
    if(next.split&&splits.includes(next.split))state.split=next.split;
    if(['AUROC','AUPRC'].includes(next.metric))sortMetric=next.metric;
    state.selectedEntity=null;refresh();
  }
  async function showSecondary(id){
    secondary=id;chartTicket++;await chartQueue;
    const panel=el(id);panel.classList.remove('core-linked-chart');
    ['p104Panel','baselinePanel','supplementPanel','explanationPanel'].forEach(k=>el(k).hidden=k!==id);
    el('secondarySlot').appendChild(panel);panel.hidden=false;activate('[data-secondary]','secondary',id);
    const key={p104Panel:'p104',baselinePanel:'baselines',supplementPanel:'supplement',explanationPanel:'figures'}[id];
    try{await EMTResearchExtensions.ensure(key);if(id==='supplementPanel'){panel.querySelector('h2').textContent='資料與統計附錄';await EMTResearchExtensions.loadCollection();}window.dispatchEvent(new Event('resize'));}catch(error){panel.insertAdjacentHTML('afterbegin',`<p class="note">此區暫未載入：${esc(error.message)}</p>`);}
  }
  async function showView(next){
    view=next;chartTicket++;
    el('coreWorkspace').hidden=view!=='compare';el('secondaryWorkspace').hidden=view!=='supplement';el('reportsWorkspace').hidden=view!=='reports';
    document.querySelectorAll('[data-view]').forEach(button=>{const active=button.dataset.view===view;button.classList.toggle('active',active);if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');});
    if(view==='supplement')await showSecondary(secondary);
    else if(view==='reports'){el('reportSlot').appendChild(el('deliveryPanel'));el('deliveryPanel').hidden=false;await EMTResearchExtensions.ensure('delivery');renderQA();}
    else {showChart(chart);showDetail(detail);}
  }
  document.querySelectorAll('[data-outcome]').forEach(button=>button.onclick=()=>setContext({outcome:button.dataset.outcome}));
  document.querySelectorAll('[data-group]').forEach(button=>button.onclick=()=>setContext({group:button.dataset.group}));
  document.querySelectorAll('[data-chart]').forEach(button=>button.onclick=()=>showChart(button.dataset.chart));
  document.querySelectorAll('[data-view]').forEach(button=>button.onclick=()=>{showView(button.dataset.view);history.replaceState(null,'',button.dataset.view==='compare'?'#compare':button.dataset.view==='reports'?'#deliveryPanel':'#'+secondary);});
  document.querySelectorAll('[data-secondary]').forEach(button=>button.onclick=()=>{showSecondary(button.dataset.secondary);history.replaceState(null,'','#'+button.dataset.secondary);});
  ['Champion','Operating','Feature','Shap','Ensemble','Calibration','Dca'].forEach(k=>el('detail'+k+'Tab').onclick=()=>showDetail(k));
  el('splitSelect').onchange=e=>setContext({split:e.target.value});el('rankMetricSelect').onchange=e=>setContext({metric:e.target.value});
  el('outcomeSelect').onchange=e=>setContext({outcome:e.target.value});el('groupSelect').onchange=e=>setContext({group:e.target.value});
  el('focusModelSelect').onchange=e=>selectModel(e.target.value);
  el('modelList').onclick=event=>{const row=event.target.closest('[data-entity]');if(row)selectModel(row.dataset.entity,!!event.target.closest('button'));};
  ['rocLegend','prLegend'].forEach(id=>el(id).onclick=event=>{const button=event.target.closest('[data-entity]');if(button)selectModel(button.dataset.entity);});
  el('splitSelect').querySelector('[value="validation_2024"]').textContent='2024 驗證集';el('splitSelect').querySelector('[value="external_2025"]').textContent='2025 封存評估';
  el('outcomeSelect').innerHTML=[['主要結局',outcomes.slice(0,3)],['次要結局',outcomes.slice(3)]].map(([label,items])=>`<optgroup label="${label}">${items.map(k=>`<option value="${k}">${esc(DATA.outcome_labels[k])}</option>`).join('')}</optgroup>`).join('');
  const details=document.createElement('details');details.className='core-data-details';details.innerHTML='<summary>分箱／曲線數值與下載</summary>';
  el('supplementTable').before(details);['supplementTable','supplementCount','supplementPrev','supplementNext'].forEach(id=>details.appendChild(el(id)));
  function routeHash(){const hash=location.hash.slice(1);if(['p104Panel','baselinePanel','supplementPanel','explanationPanel'].includes(hash)){secondary=hash;showView('supplement');}else if(hash==='deliveryPanel')showView('reports');else showView('compare');}
  window.addEventListener('hashchange',routeHash);
  window.addEventListener('resize',()=>{if(view==='compare')showChart(chart);});
  window.EMTCoreUI={rankedRows,setContext,showView,showChart,showDetail,selectModel,getState:()=>({...state,metric:sortMetric,view,chart,detail})};
  refresh();routeHash();
})();
