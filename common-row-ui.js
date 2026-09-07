(() => {
  'use strict';
  const data=window.EMTCommonRows;
  if(!data||data.schema!=='emt-p1-common-row-2024/1')throw new Error('共同樣本資料未載入，不能顯示共同樣本比較。');
  const original={representatives:DATA.representatives,evidence:DATA.evidence,curves:DATA.curves};
  const prefix='validation_2024_', el=id=>document.getElementById(id);
  let mode='common';
  const active=()=>mode==='common'&&state.split==='validation_2024';
  const record=rep=>active()?data.records[rep.display_entity_id]:null;
  const originalMetricFor=metricFor,originalSplitAuditText=splitAuditText;
  metricFor=rep=>{const metrics=originalMetricFor(rep);if(active())metrics.threshold_strategy='沿用原鎖定門檻';return metrics;};
  splitAuditText=()=>active()?'2024 共同樣本評估；沿用原鎖定門檻':originalSplitAuditText();
  function apply(next=mode){
    mode=next;
    for(const key of ['representatives','evidence'])DATA[key]=mode==='native'?original[key]:original[key].map(rep=>{
      const update=data.records[rep.display_entity_id];
      return update?{...rep,...Object.fromEntries(Object.entries(update.metrics).map(([k,v])=>[prefix+k,v])),evaluation_2024_scope:'overall_rsi_common_rows'}:rep;
    });
    DATA.curves=mode==='native'?original.curves:original.curves.map(curve=>{
      const update=data.records[curve.display_entity_id];
      return update&&curve.split==='validation_2024'?{...curve,...update.curves[curve.curve_type],evaluation_scope:'overall_rsi_common_rows'}:curve;
    });
  }
  const label=document.createElement('label');label.className='core-control common-row-control';
  label.innerHTML='評估樣本<select id="cohortModeSelect" aria-label="評估樣本"><option value="common">共同樣本（主比較）</option><option value="native">原始樣本（補充）</option></select>';
  el('rankMetricSelect').parentElement.after(label);
  const notice=document.createElement('p');notice.id='commonRowNotice';notice.className='common-row-note';el('rankContext').after(notice);
  function paint(){
    el('cohortModeSelect').disabled=state.split!=='validation_2024';
    el('cohortModeSelect').value=mode;
    const rep=getSelectedRep(), n=rep?.[state.split+'_N'],events=rep?.[state.split+'_events'];
    notice.textContent=state.split!=='validation_2024'
      ?'2025 沿用既有封存結果，未套用本次 2024 共同樣本篩選；各模型可能有不同有效 N，請勿視為已對齊。'
      :active()
        ?`2024 共同樣本：Overall 7,289、內科 4,579、外科 2,688 筆（另 22 筆僅屬 Overall）。同一族群／結局的 12 模型使用完全相同的紀錄；所選模型 N=${n?.toLocaleString()}、事件 ${events}。${state.group==='surgery'&&state.outcome==='y_P1'?'外科 P1 只有 2 個事件，點估計排名高度不穩定。':''}不重訓、不重新校準、不調整原門檻。`
        :'原始樣本補充：保留各模型原先的評估結果；rSI-sMS 與其他分科模型可能不是同一批紀錄，不作共同名次比較。';
  }
  const fmt=x=>typeof x==='number'&&Number.isFinite(x)?x.toFixed(4):'未能估計';
  function renderPlot(kind,rep){
    const r=record(rep);if(!r)return false;
    el('supplementPanel').querySelector('h2').textContent=kind==='Calibration'?'共同樣本校準圖':'共同樣本決策曲線（DCA）';
    el('supplementContext').textContent=`${rep.display_label} · ${rep.group} / ${r.outcome} · 2024 共同樣本 · N=${r.n}，事件 ${r.events}。${kind==='Calibration'?'既有機率的校準診斷，不重新校準模型；沿用 2,000 次病人群組 bootstrap。':'沿用原預測機率計算淨效益，不重選操作門檻。'}`;
    const traces=[],layout={margin:{l:70,r:30,t:25,b:65},font:{family:'Noto Sans TC,system-ui,sans-serif'},paper_bgcolor:'#fff',plot_bgcolor:'#fff',xaxis:{title:{text:kind==='Calibration'?'預測機率':'風險門檻'}},yaxis:{title:{text:kind==='Calibration'?'觀察事件機率':'淨效益'}},legend:{orientation:'h'}};
    let headings,rows;
    if(kind==='Calibration'){
      const c=r.calibration.filter(x=>Number.isFinite(x.grid_prediction)&&Number.isFinite(x.observed_probability));
      traces.push({x:c.map(x=>x.grid_prediction),y:c.map(x=>x.status==='ESTIMATED'?x.upper_ci:null),mode:'lines',line:{width:0},showlegend:false,hoverinfo:'skip'});
      traces.push({x:c.map(x=>x.grid_prediction),y:c.map(x=>x.status==='ESTIMATED'?x.lower_ci:null),mode:'lines',line:{width:0},fill:'tonexty',fillcolor:'rgba(0,95,115,.13)',name:'95% CI',hoverinfo:'skip'});
      traces.push({x:c.map(x=>x.grid_prediction),y:c.map(x=>x.observed_probability),mode:'lines+markers',name:rep.display_label,line:{color:'#005f73'},hovertemplate:'預測 %{x:.4f}<br>觀察 %{y:.4f}<extra></extra>'});
      traces.push({x:[0,1],y:[0,1],mode:'lines',name:'理想校準',line:{color:'#94a3b8',dash:'dot'}});
      layout.xaxis.range=[0,1];layout.yaxis.range=[0,1];
      headings=['預測機率','觀察機率','95% CI 下限','95% CI 上限'];rows=c.map(x=>[x.grid_prediction,x.observed_probability,x.status==='ESTIMATED'?x.lower_ci:null,x.status==='ESTIMATED'?x.upper_ci:null]);
    }else{
      for(const [key,name] of [['model',rep.display_label],['all','全部介入'],['none','全部不介入']])traces.push({x:r.dca.map(x=>x.threshold),y:r.dca.map(x=>x[key]),mode:'lines',name,line:{dash:key==='model'?'solid':'dot',width:key==='model'?3:1}});
      headings=['風險門檻','模型淨效益','全部介入','全部不介入'];rows=r.dca.map(x=>[x.threshold,x.model,x.all,x.none]);
    }
    Plotly.react('supplementPlot',traces,layout,{responsive:true,displaylogo:false});
    el('supplementTable').innerHTML=`<table><thead><tr>${headings.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(x=>`<td>${fmt(x)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    el('supplementCount').textContent=`共同樣本曲線 ${rows.length} 列；N=${r.n}／事件 ${r.events}`;
    el('supplementPrev').disabled=true;el('supplementNext').disabled=true;
    el('supplementSources').innerHTML='<a href="common-row-2024.json">共同樣本資料與方法</a> · <a href="common-row-2024.csv">更新指標 CSV</a> · <a href="common-row-validation.json">獨立驗證</a>';
    return true;
  }
  for(const [name,id] of [['renderFeatures','featureNote'],['renderShap','shapBox']]){
    const previous=name==='renderFeatures'?renderFeatures:renderShap;
    const wrapped=()=>{previous();const note=document.createElement('p');note.className='note common-explanation-note';note.textContent='SHAP／特徵重要性沿用已完成的原始 2024 解釋樣本，未因共同評估名單而重算；不是共同樣本全體的重要性。';el(id).appendChild(note);};
    if(name==='renderFeatures')renderFeatures=wrapped;else renderShap=wrapped;
  }
  el('cohortModeSelect').onchange=event=>{apply(event.target.value);state.selectedEntity=null;renderAll();};
  const secondary=el('secondaryWorkspace').querySelector('.secondary-heading p:last-child');
  secondary.textContent+=' 本區及既有報告保留原分析樣本；本次共同樣本更新只作用於主比較的 2024 效能。';
  window.EMTCommonRowsUI={active,record,apply,paint,renderPlot,getMode:()=>mode};
  apply();
  state.selectedEntity=null;
})();
