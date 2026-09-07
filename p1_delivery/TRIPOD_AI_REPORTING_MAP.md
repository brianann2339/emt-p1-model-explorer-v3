# TRIPOD+AI reporting map — 7 September 2026

This map resolves each numbered reporting item and subitem to current evidence, or records the exact information that cannot be inferred computationally. It follows the [official 27-item checklist](https://www.tripod-statement.org/wp-content/uploads/2019/12/TRIPODAI_checklist.pdf), retrieved on 7 September 2026. The short subjects below are paraphrases; the official form remains the submission checklist. Completing this evidence mapping does not mean every clinical or author declaration is available.

| Item | Current manuscript/evidence location | Disposition and precise information still needed |
|---|---|---|
| 1 | Manuscript title | Development, temporal evaluation, prehospital EMT population and nine outcomes identified. |
| 2 | Abstract | Current results include specialty P1_04 and its not-estimable counts. Final author details and journal abstract format are external editorial tasks. |
| 3a | Introduction | Early risk-assessment rationale and model comparison described. No externally benchmarked superiority claim. A domain-specific literature review is not replaced by comparing two internal websites. |
| 3b | Introduction; prediction time | Intended research use by EMS/emergency clinicians described. Prospective treatment workflow was not evaluated. |
| 3c | Discussion; P104 appendix | Age/city/specialty differences described with denominator limits. No claim that these analyses cover all relevant health inequalities. |
| 4 | Abstract; Introduction | Overall development/evaluation and independently developed specialty extension separated. |
| 5a | Data, linkage and participants | Linked Taipei/New Taipei EMS and single-centre hospital source stated; source manifests in sources.json. |
| 5b | Methods; effective-method addendum | Development 2020–2023, temporal validation 2024, historical frozen 2025 stated. Exact final follow-up/data-extraction date requires source custodian confirmation. |
| 6a | Data, linkage and participants | Taipei Tzu Chi Hospital and two EMS source cities described. |
| 6b | Methods; Stage1a manifest | Adult/valid age and linkage eligibility; patient-disjoint partitions. COHORT_FLOW_APPENDIX.md now joins exact manifest accounting to native specialty branches and separately labels model-specific populations. |
| 6c | Prediction time; sensitivity | Prehospital interventions retained under the allowlist; airway/DNR/treatment-removal comparisons documented. |
| 7 | Development; aggregate dictionary | Fold-local transformations, missingness handling, fixed feature order and QC evidence specified. Raw source assessor practice is not established by computational checks. |
| 8a | Outcomes and prediction time | Nine operational outcomes and missing-label conventions stated; source methods bind exact codes. |
| 8b | AUTHOR_DECLARATIONS.md | Assessor qualifications/demographic details and subjective adjudication procedures unavailable; authors must say whether and how manual assessment occurred. |
| 8c | AUTHOR_DECLARATIONS.md | Outcome-assessor blinding procedures unavailable; no fabricated blinding statement. |
| 9a | Stage1a manifest; model source registry | Positive allowlist and outcome-specific locked predictors/variants documented. |
| 9b | Methods; source dictionary | Recorded measurement timing and arrival-variable exclusion described. OP_NAME is hospital-derived retrospective routing. Measurement units/categories reside in source schema; timing of clinical recording requires custodian confirmation where absent. |
| 9c | AUTHOR_DECLARATIONS.md | Predictor-assessor qualifications and subjective measurement practice unavailable. |
| 10 | EVENTS_AND_FEATURE_DIMENSIONS.md | 27 outcome/group event–input rows populated. Nine Surgery/P1 development events and input-dimension limitations disclosed. Effective complexity for each final model is not inferred from candidate dimension; no universal adequacy cutoff. |
| 11 | P104 missingness results; limited/not-estimable table | Completed Medicine/Surgery missingness dispositions; all nine Surgery full-complete-case analyses not estimable. The recorded reasons are preserved. |
| 12a | Development; temporal analysis | Patient-disjoint training/validation and separate frozen chronology described. |
| 12b | Development; source schema | Fold-local imputation/scaling/indicator expansion and fixed feature list described. |
| 12c | Development; exact model/spec sources | Accepted HPO/variant/model sources linked. This reporting update does not refit models. |
| 12d | P104 quantitative appendix | Grouped-naive CV and two city directions documented as the recorded analyses. No hospital-level generalizability is inferred from one centre. |
| 12e | Validation; P104 appendix | AUROC/AUPRC/Brier, individual-arm CI, confusion metrics and recorded net benefit presented. Paired CI coverage is a distinct, explicitly tracked analysis. |
| 12f | Validation; chronology | No model updating after frozen evaluation in this closeout. Raw and previously selected calibrated presentations retain separate sources. |
| 12g | Model/spec and receipt bindings | Probability-source and model identity recorded; protected artifacts remain governed by access conditions. |
| 13 | P104 ablation 09 | Class weights, SMOTENC and threshold shift remain separate recorded arms with corresponding calibration scope. |
| 14 | Discussion; age/city analyses | No fairness optimization or comprehensive fairness certification was performed. Descriptive robustness is not relabelled fairness. |
| 15 | Validation | Probabilities and 2024 operating-point selection rule described; P104 raw/fixed-0.5 research thresholds distinguished. |
| 16 | Methods; V1_V3_COMPARISON.md | Different model/cohort denominators and additional specialty chronology disclosed. |
| 17 | Methods; AUTHOR_DECLARATIONS.md | Existing methods record 15-IRB101 and consent waiver. Approval-letter consistency requires author confirmation. |
| 18a | AUTHOR_DECLARATIONS.md | Funding and funder roles unknown; require author statement. |
| 18b | AUTHOR_DECLARATIONS.md | Conflicts/financial disclosures unknown; require all authors' statements. |
| 18c | sources.json; requirement crosswalk | Local prompt/method lineage is provided. Public protocol location or no-protocol declaration requires authors. |
| 18d | AUTHOR_DECLARATIONS.md | Registration status/identifier unknown; require author declaration. |
| 18e | Availability; private prerequisite interface | Public package contains real aggregates only. Data controller, lawful access mechanism and reuse restrictions require authors. |
| 18f | portable_analysis.zip; verification receipt | Real aggregate pipeline, fixtures, requirements and reproducible tables supplied. Full protected model training replay remains unexecuted and is explicitly distinguished. |
| 19 | AUTHOR_DECLARATIONS.md | Patient/public involvement unknown; do not infer none. |
| 20a | Methods; event appendix; p3_flow.csv | Bound encounter/event/partition counts and airway flow provided. Follow-up timing/source-quality details not present in aggregate tables are marked unavailable. |
| 20b | Source-aligned Table1/missingness supplement crosswalk | Overall source-scoped tables and both exact specialty descriptive cohorts are included: 82,728 specialty Table1 rows, missingness and correlations. Cohort definitions and denominators remain distinct. |
| 20c | Outcome/group N/events and public snapshot | Development/evaluation differences are exposed. No identical-cohort claim from equal sample counts alone. |
| 21 | P104 1,659 arm rows; 648 public primary metrics | N/events retained for each reported arm/model/split; encounter counts are not silently relabelled unique patients. |
| 22 | Accepted model/spec manifests; private-input interface | Exact model identity can be followed locally. Public aggregate package cannot score new patients; model release/licensing/access remains an author/data-owner decision. |
| 23a | P104 appendix; primary statistical supplement crosswalk | All 324 matched current-model six-metric CI and 270 original prespecified exact-common-row contrasts are complete. P104 individual-arm intervals remain marginal; no exhaustive all-family paired coverage is claimed. |
| 23b | P104 age/city/CV appendix | Recorded heterogeneity comparisons included with sparse-cell and different-cohort caveats. |
| 24 | Validation | No new updating results; not applicable to this reporting-only successor. |
| 25 | Discussion | Vital-only versus full-input finding and heterogeneous time-removal effects interpreted without causal claims or like-for-like v1 performance claims. |
| 26 | Discussion; PROBAST appraisal | Rare events, missingness, single centre, historical 2025 exposure, routing and measurement/outcome errors stated. |
| 27a | Availability; source preprocessing | Missing/unavailable values must follow locked preprocessing; no unseen input policy is invented. |
| 27b | Introduction; availability | No validated clinical deployment workflow or user-training study exists; clinical implementation would need prospective evaluation. |
| 27c | Discussion | External validation, calibration uncertainty, explanation stability and prospective utility are named research needs, not prerequisites for preserving already-computed results. |

Computational P1_04 is no longer pending: the 494 dispositions, 18 corrected time tasks, result intervals and limitations are incorporated. Remaining author statements are confined to AUTHOR_DECLARATIONS.md. Remaining technical coverage requirements are individually tracked in REQUIREMENTS_CROSSWALK.md rather than converted into an unsupported global compliance label.

Current additions: accepted Overall sensitivity/DNR numerical tables, 324 locked operating points, 17 copied specialty research recommendations (Surgery/P1 no representative), targeted primary literature and a byte-exact original-code protected-input route. Nine Overall deployment decisions are not inferred from the 108-component authority. Original ascertainment/workflow statements and actual protected training execution remain explicitly outside the completed reporting evidence.
