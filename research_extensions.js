(() => {
  'use strict';
  const byId = id => document.getElementById(id);
  const esc = x => String(x ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const finite = x => typeof x === 'number' && Number.isFinite(x);
  const fmt = (x, digits=3) => finite(x) ? x.toLocaleString('en-US', {minimumFractionDigits:digits, maximumFractionDigits:digits}) : '—';
  const val = id => byId(id).value;
  const unique = xs => [...new Set(xs.filter(x => x !== null && x !== undefined && x !== ''))];
  const names = {
    medicine:'Medicine 內科', surgery:'Surgery 外科', overall:'Overall 全體',
    '01_standardization':'01 標準化', '02_time_variables':'02 時間變數', '03_emt_treatment':'03 EMT 處置',
    '04_gcs_consciousness':'04 GCS／意識', '05_shock_index_rsig':'05 Shock index／rSIG',
    '06_vital_only_vs_full':'06 生命徵象 vs 完整特徵', '07_logistic_vs_xgboost':'07 Logistic vs XGBoost',
    '08_median_vs_knn':'08 Median vs KNN', '09_class_weight_smotenc_threshold':'09 類別權重／SMOTENC／門檻',
    '10_prehospital_vs_ed_early':'10 到院前 vs 早期到院資料（敏感度分析）',
    '11_collaborator_variables':'11 合作者變數', '12_remove_distance':'12 移除距離',
    age_subgroup:'年齡分層', city_holdout:'城市外部留出', ed_congestion:'急診壅塞',
    grouped_vs_naive_cv:'Grouped vs naive CV', mortality_exclude_critical_discharge:'死亡：排除病危出院',
    p3_non_ett_sga:'P3：ETT／SGA 定義', p3_non_field_ett:'P3：現場 ETT 定義',
    broad_exclusion:'DNR 廣義排除', dnr_blind:'DNR-blind', temporally_clean_exclusion:'DNR 時序乾淨排除',
    full_complete_case:'完整 complete-case', core_vitals_complete_case:'核心生命徵象 complete-case',
    validation_2024:'2024 validation', oof_2020_2023:'2020–2023 OOF', train_2020_2023:'2020–2023 train',
    frozen_2025:'2025 frozen（既有評估）', raw:'Raw 原始機率',
    VALIDATED_COMPUTED:'已計算', VALIDATED_WITH_NOT_ESTIMABLE_COMPONENTS:'已完成，部分無法估計',
    VALIDATED_NOT_ESTIMABLE:'無法估計（非待跑）'
  };
  const label = x => names[x] || x;
  function options(id, values, preferred, all=false) {
    const el = byId(id), old = el.value, vs = unique(values);
    el.innerHTML = (all ? '<option value="">全部</option>' : '') + vs.map(x => `<option value="${esc(x)}">${esc(label(x))}</option>`).join('');
    el.value = vs.includes(old) ? old : vs.includes(preferred) ? preferred : all ? '' : vs[0] || '';
  }
  function table(id, rows, columns) {
    byId(id).innerHTML = rows.length ? `<table><thead><tr>${columns.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${columns.map(c=>`<td>${esc(typeof r[c] === 'number' ? fmt(r[c], Number.isInteger(r[c])?0:5) : r[c])}</td>`).join('')}</tr>`).join('')}</tbody></table>` : '<p class="research-empty">此條件沒有可展示資料；不補零，也不借用其他模型的數值。</p>';
  }
  function plot(id, traces, layout={}) {
    byId(id).style.display = traces.length ? 'block' : 'none';
    if (!traces.length) { if (window.Plotly) Plotly.purge(id); return; }
    byId(id).style.height = `${layout.height || 450}px`;
    if(id==='supplementPlot'&&window.innerWidth<700&&traces.length){
      const first=traces[0];
      if(first.type==='heatmap'||first.orientation==='h'||first.mode==='markers'){
        layout.margin={l:110,r:35,t:35,b:first.type==='heatmap'?115:65};
        if(first.y?.every(x=>typeof x==='string'))layout.yaxis={...layout.yaxis,tickvals:first.y,ticktext:first.y.map(x=>x.length>18?x.slice(0,17)+'…':x),tickfont:{size:9},automargin:false};
        if(first.type==='heatmap')layout.xaxis={...layout.xaxis,tickvals:first.x,ticktext:first.x.map(x=>x.length>16?x.slice(0,15)+'…':x),tickfont:{size:9}};
      }
    }
    return Plotly.react(id, traces, {
      margin:{l:180,r:25,t:30,b:65}, paper_bgcolor:'#fff', plot_bgcolor:'#fff',
      font:{family:'Noto Sans TC, system-ui, sans-serif', color:'#344054', size:12},
      colorway:['#005f73','#ed6a4c','#5576a1','#8f62a5','#46856d','#a57639'],
      legend:{orientation:'h', y:-.25}, hovermode:'closest', ...layout
    }, {responsive:true, displaylogo:false});
  }
  const interval = (r,k) => `${fmt(r[k])}${finite(r[k+'_lower_ci']) && finite(r[k+'_upper_ci']) ? ` [${fmt(r[k+'_lower_ci'])}, ${fmt(r[k+'_upper_ci'])}]` : '（CI 未估計）'}`;
  function ciTrace(rows, valueKey, nameKey, lowKey, highKey) {
    const valid = rows.filter(r=>finite(r[valueKey]));
    return {type:'scatter',mode:'markers',x:valid.map(r=>r[valueKey]),y:valid.map(r=>r[nameKey]),
      marker:{color:'#005f73',size:10},error_x:{type:'data',symmetric:false,
        array:valid.map(r=>finite(r[highKey])?r[highKey]-r[valueKey]:0),
        arrayminus:valid.map(r=>finite(r[lowKey])?r[valueKey]-r[lowKey]:0),color:'#667085',thickness:1.5},
      text:valid.map(r=>`N=${r.N??r.n??'—'}；events=${r.events??'—'}${finite(r[lowKey])?'':'；CI 未估計'}`),
      hovertemplate:'%{y}<br>%{x:.4f}<br>%{text}<extra></extra>',showlegend:false};
  }
  let p104;
  function p104Base() { return p104.results.filter(r=>r.group===val('p104GroupSelect') && r.outcome===val('p104OutcomeSelect') && r.kind===val('p104KindSelect')); }
  function p104Filters(level) {
    if (level<1) options('p104OutcomeSelect', p104.tasks.filter(r=>r.group===val('p104GroupSelect')).map(r=>r.outcome), 'P1');
    const base=p104Base();
    if (level<2) options('p104AnalysisSelect', unique([...base.map(r=>r.analysis),...p104.tasks.filter(r=>r.group===val('p104GroupSelect')&&r.outcome===val('p104OutcomeSelect')&&r.kind===val('p104KindSelect')).map(r=>r.analysis)]), '01_standardization');
    const analysis=base.filter(r=>r.analysis===val('p104AnalysisSelect'));
    if (level<3) options('p104SplitSelect',analysis.map(r=>r.split),'validation_2024');
    if (level<4) options('p104LayerSelect',analysis.filter(r=>r.split===val('p104SplitSelect')).map(r=>r.presentation),'raw');
    renderP104();
  }
  function renderP104() {
    const rows=p104Base().filter(r=>r.analysis===val('p104AnalysisSelect')&&r.split===val('p104SplitSelect')&&r.presentation===val('p104LayerSelect'));
    const tasks=p104.tasks.filter(r=>r.group===val('p104GroupSelect')&&r.outcome===val('p104OutcomeSelect')&&r.kind===val('p104KindSelect')&&r.analysis===val('p104AnalysisSelect'));
    const metric=val('p104MetricSelect');
    const cohorts=unique(rows.map(r=>r.cohort_identity_sha256));
    byId('p104Context').textContent = `${label(val('p104GroupSelect'))} / ${val('p104OutcomeSelect')} / ${label(val('p104AnalysisSelect'))} · ${label(val('p104SplitSelect'))} · ${label(val('p104LayerSelect'))}。${cohorts.length>1?'注意：含不同 cohort，效能差值不作同樣本比較。':'此頁只展示選定實驗的紀錄。'} CI 是各 arm 的 95% CI，不是兩組差值的 CI。`;
    byId('p104ResultBody').innerHTML=rows.length?rows.map(r=>`<tr><td>${esc(r.arm)}<br><small>${esc(r.completion_status?label(r.completion_status):'')}</small></td><td class="numeric">${fmt(r.N,0)} / ${fmt(r.events,0)}</td>${['AUROC','AUPRC','Brier'].map(k=>`<td class="numeric">${esc(interval(r,k))}</td>`).join('')}<td class="numeric">${fmt(r.sensitivity)} / ${fmt(r.specificity)}</td><td>${fmt(r.F1)}</td><td>${fmt(r.threshold_mean)}${r.threshold_min!==r.threshold_max?` [${fmt(r.threshold_min)}, ${fmt(r.threshold_max)}]`:''}</td><td>${fmt(r['net benefit'])}</td></tr>`).join(''):'<tr><td colspan="9">此實驗沒有可估計的結果。請查看下方狀態原因。</td></tr>';
    const valid=rows.filter(r=>finite(r[metric]));
    const trace=ciTrace(valid,metric,'arm',metric+'_lower_ci',metric+'_upper_ci');
    const mobile=window.innerWidth<700;
    if(mobile){trace.y=trace.x;trace.x=valid.map(r=>r.arm.replaceAll('_','<br>'));trace.error_y=trace.error_x;delete trace.error_x;trace.hovertemplate='%{x}<br>%{y:.4f}<br>%{text}<extra></extra>';}
    plot('p104EffectPlot',valid.length?[trace]:[],mobile?
      {height:370,margin:{l:50,r:18,t:25,b:100},xaxis:{automargin:true},yaxis:{title:metric,rangemode:'tozero',...(metric!=='Brier'?{range:[0,1]}:{})}}:
      {height:Math.max(330,valid.length*44+120),yaxis:{autorange:'reversed',automargin:true},xaxis:{title:`${metric}（點估計與個別 arm 95% CI）`,rangemode:'tozero',...(metric!=='Brier'?{range:[0,1]}:{})}});
    const ds=p104.comparisons.filter(r=>r.group===val('p104GroupSelect')&&r.outcome===val('p104OutcomeSelect')&&r.analysis===val('p104AnalysisSelect')&&r.split===val('p104SplitSelect')&&r.presentation===val('p104LayerSelect'));
    const same=ds.filter(r=>r.exact_cohort_match===true);
    const comparisons=same.map(r=>({'參照':r.reference_arm,'比較組':r.comparison_arm,'ΔAUROC':r.delta_AUROC,'ΔAUPRC':r.delta_AUPRC,'ΔBrier':r.delta_Brier}));
    byId('p104ComparisonNote').textContent=`${same.length?'下列差值＝比較組 − 參照組，僅為同 cohort 描述性點估計；Brier 較低較好。':'此條件沒有可作同 cohort 差值的對照。'} ${ds.length-same.length?`${ds.length-same.length} 個跨 cohort 對照不畫差值。`:''} 未提供 paired Δ CI，不能由單臂 CI 或差值宣稱統計顯著。門檻為研究對照記錄值，不替代主頁的鎖定臨床 operating point。`;
    table('p104DeltaTable',comparisons,['參照','比較組','ΔAUROC','ΔAUPRC','ΔBrier']);
    byId('p104FeatureDetails').innerHTML=unique(rows.map(r=>r.feature_set_id)).map(k=>{const f=p104.feature_sets[k];return `<details><summary>${esc(k.slice(0,12))} · ${f?.count??'—'} 個輸入欄位</summary><p class="note">${esc(f?.scope||'')}</p><div class="research-feature-list">${esc((f?.features||[]).join('、'))}</div></details>`;}).join('');
    byId('p104TaskDetails').innerHTML=tasks.map(t=>`<p><span class="research-status ${t.status==='VALIDATED_COMPUTED'?'':'limited'}">${esc(label(t.status))}</span> ${esc(t.task_id)} ${esc(t.reason)}</p>`).join('')+unique(rows.map(r=>r.Interpretation)).map(t=>`<p class="note">${esc(t)}</p>`).join('');
  }
  function renderTasks() {
    const q=val('p104Search').toLowerCase(), rows=p104.tasks.filter(r=>JSON.stringify(r).toLowerCase().includes(q));
    byId('p104FilterNote').textContent=`符合 ${rows.length} / ${p104.tasks.length} 項；完整狀態均保留。`;
    byId('p104TaskBody').innerHTML=rows.map(r=>`<tr><td>${esc(r.task_id)}</td><td>${esc(label(r.status))}</td><td>${esc(r.reason)}</td></tr>`).join('');
  }
  async function initP104() {
    p104=await fetch('p104_results.json').then(r=>r.json());
    const c=p104.coverage,s=c.state_counts;
    byId('p104Summary').innerHTML=`<div><b>${c.validated_terminal_tasks} / ${c.required_task_count}</b><span>已驗證處理結果；不是 494 個數值均可估計</span></div><div><b>${s.VALIDATED_COMPUTED} computed · ${s.VALIDATED_WITH_NOT_ESTIMABLE_COMPONENTS} limited</b><span>12 項部分成分不能估計</span></div><div><b>${s.VALIDATED_NOT_ESTIMABLE} not estimable</b><span>Surgery full complete-case；非缺跑、未補零</span></div>`;
    byId('p104TableLinks').innerHTML=p104.tables.map(t=>`<a href="${esc(t.public_path)}">${esc(t.name)}</a>`).join('');
    ['p104GroupSelect','p104OutcomeSelect','p104KindSelect','p104AnalysisSelect','p104SplitSelect','p104LayerSelect','p104MetricSelect'].forEach((id,i)=>byId(id).addEventListener('change',()=>p104Filters([0,1,1,2,3,4,4][i])));
    byId('p104Search').addEventListener('input',renderTasks); p104Filters(0); renderTasks();
  }
  let supplements, collection, collectionRows=[], page=0, requestVersion=0;
  const collectionCache=new Map();
  const idValidation=id=>['specialty_text_gain','text_gain'].includes(id)?'no_text_export_validation.json':id==='current_validation_dca'?'dca_2024/independent_validation.json':id.startsWith('current_validation')||id==='current_paired_comparisons'?'current_statistics_independent_validation.json':'validation.json';
  const splitOf=r=>r.split??r.analysis_split??'';
  const modelOf=r=>r.model??r.reference_model??'';
  function supplementFilter() {return collectionRows.filter(r=>(!val('supplementGroup')||(r.group??'overall')===val('supplementGroup'))&&(!val('supplementOutcome')||(r.outcome??'')===val('supplementOutcome'))&&(!val('supplementSplit')||splitOf(r)===val('supplementSplit'))&&(!val('supplementModel')||modelOf(r)===val('supplementModel'))&&(!val('supplementSearch')||JSON.stringify(r).toLowerCase().includes(val('supplementSearch').toLowerCase())));}
  function supplementOptions(level) {
    if(collection.parts&&level<=2){loadCollection().catch(e=>{byId('supplementContext').textContent=e.message;});return;}
    if(level<1) options('supplementGroup',collectionRows.map(r=>r.group??'overall'),'medicine');
    let rs=collectionRows.filter(r=>(r.group??'overall')===val('supplementGroup'));
    if(level<2) options('supplementOutcome',rs.map(r=>r.outcome),'P1',true);
    rs=rs.filter(r=>!val('supplementOutcome')||r.outcome===val('supplementOutcome'));
    if(level<3) options('supplementSplit',rs.map(splitOf),'validation_2024',true);
    rs=rs.filter(r=>!val('supplementSplit')||splitOf(r)===val('supplementSplit'));
    if(level<4) options('supplementModel',rs.map(modelOf),/calibration|dca/.test(collection.id)?unique(rs.map(modelOf)).find(x=>x.startsWith('catboost')):undefined,true);
    page=0; renderSupplement();
  }
  function renderSupplement() {
    const rows=supplementFilter(), cols=collection.columns.filter(c=>!['source_id','entity_id','scope','task_id'].includes(c));
    const pageSize=60; page=Math.min(page,Math.max(0,Math.ceil(rows.length/pageSize)-1));
    table('supplementTable',rows.slice(page*pageSize,(page+1)*pageSize),cols);
    byId('supplementCount').textContent=`${rows.length} 列；第 ${rows.length?page+1:0} / ${Math.ceil(rows.length/pageSize)} 頁 · 每頁 ${pageSize} 列。下載檔保留全部 ${collection.rows} 列。`;
    byId('supplementPrev').disabled=page===0; byId('supplementNext').disabled=(page+1)*pageSize>=rows.length;
    const traces=[], id=collection.id, layout={margin:{l:75,r:25,t:35,b:100}};
    const curves=id.includes('dca')||id.includes('calibration') && !id.includes('summary');
    if(curves) {
      const groups=new Map();
      rows.forEach(r=>{const k=[modelOf(r),r.model_variant,r.curve,r.curve_type,r.calibration,r.calibration_method,splitOf(r),r.outcome].filter(Boolean).join(' / ');if(!groups.has(k))groups.set(k,[]);groups.get(k).push(r);});
      const isDca=id.includes('dca');
      for(const [k,rs] of groups) {
        const xy=rs.map(r=>[isDca?r.threshold:r.mean_prediction??r.predicted_mean??r.bin_mean_prediction??r.grid_prediction,isDca?r.net_benefit:r.event_rate??r.observed_rate??r.bin_event_rate??r.observed_probability]).filter(a=>a.every(finite)).sort((a,b)=>a[0]-b[0]);
        if(xy.length) traces.push({type:'scatter',mode:'lines+markers',marker:{size:4},name:k,x:xy.map(a=>a[0]),y:xy.map(a=>a[1])});
      }
      if(!isDca && traces.length) traces.push({type:'scatter',mode:'lines',name:'Perfect calibration',x:[0,1],y:[0,1],line:{dash:'dot',color:'#888'}});
      const thresholds=rows.map(r=>r.threshold).filter(finite);
      layout.xaxis={title:isDca?'Threshold probability':'Mean predicted probability',range:isDca&&thresholds.length?[Math.min(...thresholds),Math.max(...thresholds)]:[0,1],...(isDca?{tickformat:'.0%'}:{})};layout.yaxis={title:isDca?'Net benefit':'Observed event rate',...(isDca?{}:{range:[0,1]})};
    } else if(id==='text_gain'||id==='specialty_text_gain') {
      const rs=rows.filter(r=>String(r.metric).includes('Delta_AUPRC_text_minus_no_text')).map(r=>({...r,display:[r.model,r.outcome,splitOf(r)].join(' / ')}));
      if(rs.length) {traces.push(ciTrace(rs,'value','display','lower_ci','upper_ci'));layout.margin.l=260;layout.xaxis={title:'ΔAUPRC：text − no text（paired 95% CI）',zeroline:true};layout.height=Math.max(350,rs.length*35+100);}
    } else if(id.includes('missingness')&&unique(rows.map(splitOf)).length<=1) {
      const rs=rows.filter(r=>finite(r.missing_rate)).sort((a,b)=>b.missing_rate-a.missing_rate||String(a.feature).localeCompare(String(b.feature))).slice(0,20);
      if(rs.length){traces.push({type:'bar',orientation:'h',x:rs.map(r=>r.missing_rate),y:rs.map(r=>r.feature),marker:{color:'#005f73'},text:rs.map(r=>`Missing ${r.missing_n??'—'} / N=${r.n??'—'}`),hovertemplate:'%{y}<br>%{x:.1%}<br>%{text}<extra></extra>'});layout.height=650;layout.margin.l=200;layout.xaxis={title:'Missing rate（最高 20 項；完整列表見下表）',range:[0,1],tickformat:'.0%'};layout.yaxis={autorange:'reversed',automargin:true};}
    } else if(id.includes('correlations')&&unique(rows.map(splitOf)).length<=1) {
      const rs=rows.filter(r=>r.method==='spearman'&&r.feature_x_group==='vital'&&r.feature_y_group==='vital');
      const xs=unique(rs.map(r=>r.feature_x)),ys=unique(rs.map(r=>r.feature_y));
      if(xs.length&&ys.length){traces.push({type:'heatmap',x:xs,y:ys,z:ys.map(y=>xs.map(x=>rs.find(r=>r.feature_x===x&&r.feature_y===y)?.correlation??null)),zmin:-1,zmax:1,colorscale:[[0,'#315d91'],[.5,'#fff'],[1,'#c95249']],hovertemplate:'%{x}<br>%{y}<br>Spearman ρ=%{z:.3f}<extra></extra>',colorbar:{title:'ρ'}});layout.height=600;layout.margin={l:190,r:70,t:35,b:180};layout.title={text:'生命徵象 Spearman 相關；完整分數比較見下表',font:{size:13}};}
    } else if(id==='current_specialty_ci'||id==='current_validation_ci'||id==='current_overall_ci'||id==='strict_v2_baseline_metrics') {
      const rs=rows.filter(r=>r.metric==='AUPRC').map(r=>({...r,display:[r.model,r.outcome,splitOf(r)].join(' / ')}));
      if(rs.length && rs.length<=50) {traces.push(ciTrace(rs,'value','display','lower_ci','upper_ci'));layout.margin.l=250;layout.xaxis={title:'AUPRC（個別模型 95% CI）',range:[0,1]};layout.height=Math.max(350,rs.length*28+100);}
    }
    plot('supplementPlot',traces,layout);
  }
  async function loadCollection() {
    const version=++requestVersion;
    collection=supplements.collections.find(c=>c.id===val('supplementDataset'));
    byId('supplementContext').textContent='讀取選定資料…';
    let file=collection.json;
    if(collection.parts){
      options('supplementGroup',collection.parts.map(p=>p.group),'medicine');
      options('supplementOutcome',collection.parts.filter(p=>p.group===val('supplementGroup')).map(p=>p.outcome),'P1');
      file=collection.parts.find(p=>p.group===val('supplementGroup')&&p.outcome===val('supplementOutcome')).file;
    }
    if(!collectionCache.has(file)) collectionCache.set(file,await fetch('p1_supplement/'+file).then(r=>r.json()));
    if(version!==requestVersion)return;
    collectionRows=collectionCache.get(file);
    byId('supplementSearch').value='';
    const scope=collection.scope.includes('current')?'目前模型對應來源':collection.scope.includes('specialty')?'分科研究來源':'早期 Overall 參考來源（非目前分科模型）';
    byId('supplementContext').textContent=`${scope}。${collection.notes}`;
    byId('supplementSources').innerHTML=`<p>Scope: ${esc(collection.scope)}</p><p>${esc(collection.notes)}</p><div class="research-links"><a href="p1_supplement/${esc(collection.csv)}">CSV（全部 ${collection.rows} 列）</a><a href="p1_supplement/${esc(collection.json)}">JSON</a><a href="p1_supplement/supplement.json">來源與校驗碼</a><a href="p1_supplement/${idValidation(collection.id)}">數值驗證</a>${collection.id==='specialty_text_gain'?'<a href="p1_supplement/no_text_source_catalog.json">逐 task 配對來源與驗證</a>':''}</div>`;
    if(collection.parts){
      options('supplementSplit',collectionRows.map(splitOf),'validation_2024',true);
      options('supplementModel',collectionRows.map(modelOf),'catboost',true);
      page=0;renderSupplement();
    }else supplementOptions(0);
  }
  async function initSupplement() {
    supplements=await fetch('p1_supplement/supplement.json').then(r=>r.json());
    const priority=['current_validation_ci','current_validation_calibration','current_validation_dca','current_paired_comparisons','current_dca','current_calibration','current_model_summary','specialty_cohort_summary','specialty_table1','specialty_missingness','specialty_correlations','text_gain','specialty_text_gain'];
    const menu=supplements.collections.filter(c=>!c.audit_only&&!['current_overall_ci','current_specialty_ci'].includes(c.id)).sort((a,b)=>(priority.includes(a.id)?priority.indexOf(a.id):99)-(priority.includes(b.id)?priority.indexOf(b.id):99));
    byId('supplementDataset').innerHTML=menu.map(c=>`<option value="${esc(c.id)}">${esc(c.title)} (${c.rows})</option>`).join('');
    byId('supplementDataset').addEventListener('change',()=>loadCollection().catch(e=>{byId('supplementContext').textContent='讀取失敗：'+e.message;}));
    ['supplementGroup','supplementOutcome','supplementSplit','supplementModel'].forEach((id,i)=>byId(id).addEventListener('change',()=>supplementOptions(i+1)));
    byId('supplementSearch').addEventListener('input',()=>{page=0;renderSupplement();});
    byId('supplementPrev').addEventListener('click',()=>{page--;renderSupplement();});byId('supplementNext').addEventListener('click',()=>{page++;renderSupplement();});
    await loadCollection();
  }
  let figures;
  function figureFilters(level) {
    const tasks=figures.tasks;
    if(level<1)options('explanationGroup',tasks.map(r=>r.group),'medicine');
    let rs=tasks.filter(r=>r.group===val('explanationGroup'));
    if(level<2)options('explanationOutcome',rs.map(r=>r.outcome),'P1');
    rs=rs.filter(r=>r.outcome===val('explanationOutcome'));
    if(level<3)options('explanationModel',rs.map(r=>r.family),'catboost');
    const task=rs.find(r=>r.family===val('explanationModel'));
    if(!task)return;
    const items=[...(task.dependence?[{kind:'Dependence',...task.dependence}]:[]),...(task.age_gcs_dependence?[{kind:'Age–GCS',...task.age_gcs_dependence}]:[]),...(task.waterfalls||[])];
    if(level<4)options('explanationKind',items.map(r=>r.kind),'Dependence');
    const item=items.find(r=>r.kind===val('explanationKind'));
    byId('explanationContext').textContent=`${label(task.group)} / ${task.outcome} / ${task.family}；原始 2024 解釋樣本 ${task.sample_count} 筆${item?.provenance?'；此圖為另外補入的來源相符案例':''}。${task.input_scope}。Operating point：${task.threshold?.prediction_variant||task.threshold?.status||'未對應'}，${fmt(task.threshold?.value,5)}。${item?.kind==='ILLUSTRATIVE'?'此為示例案例，不標成 TP/FN。':''}${item?.kind==='Age–GCS'?'顏色標示 GCS，不是 SHAP interaction value，也不是因果效果。':''} ${task.rank_uncertainty||''}`;
    const asset=item?.asset?.path||item?.path;
    byId('explanationImages').innerHTML=asset?`<a href="p1_figures/${esc(asset)}" target="_blank" rel="noopener"><img loading="lazy" src="p1_figures/${esc(asset)}" alt="${esc([task.group,task.outcome,task.family,item.kind].join(' '))}"></a>`:`<p class="research-empty">${item?.status==='NOT_ESTIMABLE_NO_VARYING_NUMERIC_INPUT'?'目前解釋樣本沒有可變動的數值輸入，無法畫數值 dependence；不把整段文字的任意分類編碼當連續變數。':'目前樣本沒有此圖；不將不符合條件的案例標為 TP/FN。'}</p>`;
  }
  async function initFigures() {
    figures=await fetch('p1_figures/figure_index.json').then(r=>r.json());
    ['explanationGroup','explanationOutcome','explanationModel','explanationKind'].forEach((id,i)=>byId(id).addEventListener('change',()=>figureFilters(i+1)));
    figureFilters(0);
  }
  async function initDelivery() {
    const d=await fetch('research_closeout.json').then(r=>r.json());
    byId('deliveryLinks').innerHTML=d.documents.map(r=>`<a href="${esc(r.path)}">${esc(r.label)}</a>`).join('');
    byId('deliveryContext').textContent=d.summary;
    byId('remainingGaps').innerHTML=d.limitations.map(x=>`<p>${esc(x)}</p>`).join('');
  }
  let currentIntervals=[],currentExtraMetadata=[];
  function renderCurrentMetadata() {
    if(typeof getSelectedRep!=='function')return;
    const rep=getSelectedRep(),parent=document.getElementById('detailChampionPanel');
    if(!rep||!parent)return;
    let box=document.getElementById('currentMetadataDetail');
    if(!box){box=document.createElement('div');box.id='currentMetadataDetail';parent.appendChild(box);}
    const rows=currentExtraMetadata.filter(r=>r.entity_id===rep.display_entity_id);
    box.innerHTML=rows.length?`<details><summary>補錄的 SHA 對應模型設定（${rows.length} 項）</summary><p class="note">每項保留實際記錄位置與角色；不以預設 seed、整體母群人數或模型容量上限代替實際 fit/context 記錄。</p><div class="research-table"><table><thead><tr><th>欄位</th><th>記錄值</th><th>來源角色／JSON 路徑</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(r.field)}</td><td style="overflow-wrap:anywhere">${esc(typeof r.value==='object'?JSON.stringify(r.value):r.value)}</td><td style="overflow-wrap:anywhere">${esc(r.record_role)} · ${esc(r.json_path)}<br>${esc(r.source_sha256.slice(0,16))}</td></tr>`).join('')}</tbody></table></div><a href="p1_supplement/current_model_recorded_metadata.json">完整來源與校驗碼</a></details>`:'';
  }
  function renderCurrentIntervals() {
    if(typeof getSelectedRep!=='function')return;
    const rep=getSelectedRep(), parent=document.getElementById('detailOperatingPanel');
    if(!rep||!parent)return;
    let box=document.getElementById('currentIntervalDetail');
    if(!box){box=document.createElement('div');box.id='currentIntervalDetail';parent.appendChild(box);}
    const split=document.getElementById('splitSelect').value;
    const rows=currentIntervals.filter(r=>r.entity_id===rep.display_entity_id && r.split===split && ['AUROC','AUPRC','Brier'].includes(r.metric));
    box.innerHTML=`<h3>同一模型的 2024 信賴區間</h3>${rows.length?`<div class="research-table"><table><thead><tr><th>指標</th><th>點估計 [95% CI]</th><th>N／events</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(r.metric)}</td><td>${fmt(r.value)} [${fmt(r.lower_ci)}, ${fmt(r.upper_ci)}]</td><td>${fmt(r.n,0)} / ${fmt(r.events,0)}</td></tr>`).join('')}</tbody></table></div><p class="note">相同模型、2024 預測來源；2,000 次 patient-group bootstrap，保留來源方法。不是 2025 CI，也不是成對差值 CI。</p>`:'<p class="note">此切分目前沒有對應的已完成 CI；不沿用別的模型／年份。2024 補算進度見統計附錄。</p>'}<p><a href="#supplementPanel">校準、DCA 與統計附錄</a></p>`;
  }
  async function initCurrentIntervals() {
    if(typeof getSelectedRep!=='function')return;
    [currentIntervals,currentExtraMetadata]=await Promise.all(['current_validation_ci','current_model_recorded_metadata'].map(name=>fetch('p1_supplement/'+name+'.json').then(r=>r.json())));
    const strip=document.getElementById('selectedStrip');
    if(strip)new MutationObserver(()=>{renderCurrentIntervals();renderCurrentMetadata();}).observe(strip,{childList:true,subtree:true});
    renderCurrentIntervals();renderCurrentMetadata();
  }
  let baselineIndex,baselineRows=[],baselineRequest=0;
  const baselineCache=new Map();
  const baselineName=r=>r.model.replace(/^score_/,'').replaceAll('_',' ');
  const baselineCI=(r,k)=>{const ci=r.ci95.metrics.find(x=>x.metric===k);return `${fmt(r.metrics[k])}${ci?.status==='ESTIMATED'?` [${fmt(ci.lower_ci)}, ${fmt(ci.upper_ci)}]`:ci?'（無法估計 CI）':'（CI 計算中）'}`;};
  function renderBaselines(){
    const rows=baselineRows.filter(r=>!r.alias_of&&(val('baselineType')==='all'||(val('baselineType')==='scores')===r.model.startsWith('score_'))&&(val('baselineCoverage')==='all'||r.coverage==='exact_current_cohort'));
    const type=val('baselineChart'),traces=[],layout={margin:{l:65,r:20,t:30,b:60},height:420};
    byId('baselineContext').textContent=`${label(val('baselineGroup'))} / ${val('baselineOutcome')} · 2024 validation · ${rows.length} / ${baselineRows.filter(r=>!r.alias_of).length} 個不同比較模型。全站 CI：${baselineIndex.ci95_records}/${baselineIndex.records} 筆（含別名稽核列）。分科 KNN 為分科訓練；其餘轉用的 Overall 模型會在表中標示。`;
    if(type==='AUPRC'){
      const rs=[...rows].sort((a,b)=>b.metrics.AUPRC-a.metrics.AUPRC).map(r=>({...r,...r.metrics,display:baselineName(r),lower:r.ci95.metrics.find(c=>c.metric==='AUPRC')?.lower_ci,upper:r.ci95.metrics.find(c=>c.metric==='AUPRC')?.upper_ci}));
      if(rs.length)traces.push(ciTrace(rs,'AUPRC','display','lower','upper'));
      layout.height=Math.max(400,rows.length*27+100);layout.margin.l=150;layout.xaxis={range:[0,1],title:'AUPRC [95% CI]'};layout.yaxis={autorange:'reversed',automargin:true};
    }else{
      rows.forEach((r,i)=>{const points=r.curves?.[type]||[];if(points.length)traces.push({type:'scatter',mode:'lines',x:points.map(p=>p[0]),y:points.map(p=>p[1]),name:baselineName(r),line:{color:r.model.startsWith('score_')?`hsl(210,8%,${25+(i%8)*6}%)`:r.model==='knn_classifier'?'#005f73':r.model.startsWith('logistic')?'#418765':'#4877a3',width:r.model==='knn_classifier'?2.7:1.4},text:`N=${r.metrics.n}; events=${r.metrics.events}; ${r.trained_population}-trained`,hovertemplate:'%{fullData.name}<br>%{x:.3f}, %{y:.3f}<br>%{text}<extra></extra>'});});
      if(type==='roc')traces.push({type:'scatter',mode:'lines',x:[0,1],y:[0,1],name:'No discrimination',line:{dash:'dot',color:'#aaa'}});
      else unique(rows.map(r=>r.metrics.prevalence)).filter(finite).forEach(p=>traces.push({type:'scatter',mode:'lines',x:[0,1],y:[p,p],name:`Prevalence ${fmt(p)}`,line:{dash:'dot',color:'#999'},hovertemplate:'No-skill baseline=%{y:.4f}<extra></extra>'}));
      layout.xaxis={range:[0,1],title:type==='roc'?'False-positive rate':'Recall'};layout.yaxis={range:[0,1],title:type==='roc'?'Sensitivity':'Precision'};
    }
    layout.showlegend=false;plot('baselinePlot',traces,layout);
    byId('baselineLegend').innerHTML=rows.map(r=>`<span>${esc(baselineName(r))} · ${type==='roc'?'AUROC':'AUPRC'} ${fmt(r.metrics[type==='roc'?'AUROC':'AUPRC'])} · N ${fmt(r.metrics.n,0)}</span>`).join('');
    table('baselineTable',rows.map(r=>({'模型':baselineName(r),'訓練母群':r.trained_population,'評估分科':r.evaluation_population,'N / target':`${r.metrics.n} / ${r.target_n}`,'events':r.metrics.events,'AUROC [95% CI]':baselineCI(r,'AUROC'),'AUPRC [95% CI]':baselineCI(r,'AUPRC'),'Brier [95% CI]':baselineCI(r,'Brier'),'同列 CatBoost AUPRC':r.current_catboost_metrics_same_rows.AUPRC,'涵蓋':r.coverage})),['模型','訓練母群','評估分科','N / target','events','AUROC [95% CI]','AUPRC [95% CI]','Brier [95% CI]','同列 CatBoost AUPRC','涵蓋']);
    byId('baselineCaveat').textContent='分數機率來自原開發資料擬合的單分數 logistic 映射，不是把 NEWS2／rSIG 等原始分數當成機率。rSI_GCS_alias 與 rSIG 同值，下載保留稽核列，图表不重複計數。每個基準及同列 CatBoost 的列與標籤均已核對；可用子集分母不同，請看 N/target 與事件數。不把單臂 CI 當成 paired Δ CI，不改動鎖定的主模型選擇。';
  }
  async function loadBaselines(){
    const ticket=++baselineRequest,part=baselineIndex.collections.find(r=>r.group===val('baselineGroup')&&r.outcome===val('baselineOutcome'));
    byId('baselineContext').textContent='讀取來源對齊的比較資料…';
    if(!baselineCache.has(part.file))baselineCache.set(part.file,await fetch('p1_baselines/'+part.file).then(r=>r.json()));
    if(ticket!==baselineRequest)return;
    const data=baselineCache.get(part.file);baselineRows=Array.isArray(data)?data:data.records;renderBaselines();
  }
  async function initBaselines(){
    baselineIndex=await fetch('p1_baselines/baseline_ci_index.json').then(r=>r.json());
    options('baselineOutcome',baselineIndex.collections.map(r=>r.outcome),'P1');
    ['baselineGroup','baselineOutcome'].forEach(id=>byId(id).addEventListener('change',()=>loadBaselines().catch(e=>{byId('baselineContext').textContent=e.message;})));
    ['baselineType','baselineCoverage','baselineChart'].forEach(id=>byId(id).addEventListener('change',renderBaselines));
    await loadBaselines();
  }
  window.EMTResearchExtensions={p104Filters,renderP104,renderTasks,loadCollection,supplementOptions,renderSupplement,figureFilters,loadBaselines,renderBaselines};
  let resizeTimer;
  window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(p104)renderP104();if(collection)renderSupplement();if(baselineIndex)renderBaselines();},120);});
  for(const [fn,id] of [[initP104,'p104Context'],[initSupplement,'supplementContext'],[initFigures,'explanationContext'],[initDelivery,'deliveryContext'],[initCurrentIntervals,'supplementContext'],[initBaselines,'baselineContext']]) {
    fn().catch(e=>{byId(id).textContent='此區資料未能載入：'+e.message;console.error(e);});
  }
})();
