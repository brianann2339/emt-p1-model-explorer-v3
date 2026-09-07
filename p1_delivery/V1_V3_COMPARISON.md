# v1 and v3: interpretation and coverage

This comparison describes the audited public snapshot before this closeout's new website edits. Both versions already expose nine outcomes, Overall/Medicine/Surgery and two temporal splits. The v3 branch adds separately developed specialty evidence; the existence of a specialty selector was not new.

| Area | v1 | Audited v3 |
|---|---|---|
| Displayed model/score records | 639, including 474 clinical-score records | 324 core records |
| Traditional scores | 18 distinct display labels | rSI-sMS; further source-aligned supplements are tracked separately |
| Explanation algorithm | Exact TreeSHAP/linear contributions and surrogate methods are mixed | 324 direct explanations of original model outputs, predominantly permutation estimates |
| Plot presentation | Separate beeswarm/worm and importance bar | Same separate presentation |
| New model families | Six principal ML families plus score/limited ensembles | Also BERT, MLP/PLR, FT, CNN and 27 ensemble cells |
| P1_04 specialty analysis | No current additive program | 494 dispositions and 18 aggregate tables |

Direct means the original predictor is explained. It is not a claim of an exact Shapley solution or converged population importance. In the audited v3, 315 cells explain 20 observations and nine explain five; BERT explains whole-text/missingness inputs and stacking explains base-model probabilities. These scopes differ from word-level or end-to-end raw-feature attribution.

All 162 matched six-family 2024 model/group/outcome pairs differ in N. For Overall/P1 CatBoost, v1 N=8,967/events=107/AUROC=0.966116/AUPRC=0.486175; v3 N=7,289/events=60/AUROC=0.931115/AUPRC=0.213703. This is not a common-test-set deterioration comparison. No new raw 2025 records were read for this comparison.

The 7 September audit identified CSV newline normalization changing public byte SHA without changing values. That is a publication-byte issue; the aggregate replay binds both source and exported hashes. Website-specific repair/QA belongs to the accompanying site closeout. Source: current_site_audit in sources.json.

## Current closeout additions, without changing the primary registry

The audited pre-closeout counts above remain a historical snapshot, not an assertion that v3 still lacks these supplements. The current additive delivery now has 324/324 matched current-model validation CI, 270 prespecified five-family paired contrasts, full Medicine/Surgery descriptive tables and all 27 required source-selected best-tree TP/FN and age–GCS views. Current-row baseline points include 27 group-trained KNN fits and the separately identified transferred Overall models/score probabilities. The older 18-score reference panel remains labelled by its earlier cohort; it is not silently substituted into current-model CI. Baseline intervals are complete for all 675 records (2,025 intervals); all 36 specialty no-text comparators and the 54-pair corrected disjoint-patient analysis are complete; old overlapping-strata intervals are audit-only. The core 324 models, their selection and their already-computed frozen results remain unchanged.

V1-style separate beeswarm and mean-absolute-SHAP bars are retained. Direct SHAP describes which predictor is queried, not exact or converged Shapley estimation. Neither the larger catalog nor the new current-row comparisons makes v1/v3 metrics a paired performance experiment across versions.

The report now includes the accepted Overall sensitivity/DNR numerical appendices, source-bound cohort flow, all 324 operating points and corrected text-gain uncertainty. Its copied 17 specialty research choices are not the dashboard's within-family 2024 ranking. No separate Overall cross-family deployment decision is invented from the 108-component authority.
