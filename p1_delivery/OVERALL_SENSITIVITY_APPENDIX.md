# Accepted Overall sensitivity and DNR results

The accepted Overall program is now numerically included, alongside but not pooled with the independent specialty program. All 14 numeric W02 task tables are copied from their exact task-manifest bindings. The fifteenth original logical task (field-intubation sensitivity) has its historical not-estimable disposition; the later authorized P3 ETT-only/ETT+SGA evaluation is already reported in the main manuscript and p3_metrics.csv, and supersedes that early display limitation. Original outcome amendments and historical exposure remain disclosed. None of these sources is refit or reselected.

| Source task | Aggregate rows |
|---|---|
| P1_04-ablation-P1 | 50 |
| P1_04-ablation-P2 | 50 |
| P1_04-ablation-P3 | 50 |
| P1_04-ablation-S1 | 50 |
| P1_04-ablation-S2 | 50 |
| P1_04-ablation-S3 | 50 |
| P1_04-ablation-S4 | 50 |
| P1_04-ablation-S5 | 50 |
| P1_04-ablation-S6 | 50 |
| P1_04-sensitivity-ed_congestion | 6 |
| P1_04-sensitivity-city_holdout | 18 |
| P1_04-sensitivity-age_subgroup | 36 |
| P1_04-sensitivity-grouped_vs_naive_cv | 36 |
| P1_04-sensitivity-mortality_definition | 4 |

The accepted Overall W02 AUROC/AUPRC intervals use **2,000 outcome-stratified row resamples**, not patient-group resamples. This is confirmed in the exact task-bound runner `_bootstrap_cis` (SHA dc22acffac0db4b08b4b96f8e7f39e125b8222b34eae963e43ee626b81310b16) for all 14 source tables. Patient dependence is therefore not addressed by these particular legacy intervals. They are retained with their true method/generation and are not relabelled as the current Stage2a disjoint patient-group bootstrap. No accepted model or CI is rerun merely to erase that methodological difference.

## Vital-only/full examples for primary outcomes

These are the source raw research arms, not current display-model probabilities. Net benefit is the recorded arm estimate; the summary CSV does not carry a per-row threshold, so it must not be relabelled as benefit at the final deployment operating point.

| Outcome | Arm | N/events | AUROC [95% CI] | AUPRC [95% CI] | Recorded NB |
|---|---|---|---|---|---|
| P1 | locked_full | 7504/107 | 0.950454 [0.931891, 0.966636] | 0.471609 [0.384276, 0.570010] | 0.002399 |
| P1 | vital_only | 7504/107 | 0.889641 [0.854881, 0.920370] | 0.212551 [0.155579, 0.287996] | -0.000800 |
| P2 | locked_full | 7504/609 | 0.913791 [0.903101, 0.923956] | 0.568923 [0.532544, 0.605129] | 0.013326 |
| P2 | vital_only | 7504/609 | 0.807608 [0.788803, 0.826029] | 0.341130 [0.308398, 0.380151] | 0.002132 |
| P3 | locked_full | 7504/285 | 0.919305 [0.904472, 0.933834] | 0.405717 [0.355827, 0.463892] | -0.038913 |
| P3 | vital_only | 7504/285 | 0.855318 [0.833694, 0.877161] | 0.247506 [0.209894, 0.298307] | -0.039312 |

## All sensitivity scopes

Age, city holdout, grouped-versus-naive CV, mortality definition and ED-congestion arms are all included in closeout/overall_accepted_sensitivity.csv. Their own split, event denominator, population restriction and interpretation are retained. A subgroup population change is not a paired causal effect, and the later mortality definition is not silently replaced by an older study arm.

| Task | Split | Arm rows | N range | AUPRC range |
|---|---|---|---|---|
| P1_04-sensitivity-age_subgroup | oof_2020_2023 | 18 | 11613–13171 | 0.055200–0.669257 |
| P1_04-sensitivity-age_subgroup | validation_2024 | 18 | 3653–3851 | 0.067297–0.636182 |
| P1_04-sensitivity-city_holdout | validation_2024 | 18 | 801–6703 | 0.044953–0.561991 |
| P1_04-sensitivity-ed_congestion | validation_2024 | 6 | 7504–7504 | 0.389723–0.561745 |
| P1_04-sensitivity-grouped_vs_naive_cv | oof_2020_2023 | 18 | 24784–24784 | 0.086424–0.626835 |
| P1_04-sensitivity-grouped_vs_naive_cv | validation_2024 | 18 | 7504–7504 | 0.096567–0.585398 |
| P1_04-sensitivity-mortality_definition | oof_2020_2023 | 2 | 24784–24784 | 0.174782–0.439203 |
| P1_04-sensitivity-mortality_definition | validation_2024 | 2 | 7504–7504 | 0.458904–0.557727 |

## DNR: retained comparisons, not interchangeable cohorts

The three recorded rules cover all nine outcomes. The complete 2,862 metric/DCA comparison rows and 162 flow rows are included. Each retains DNR and all-comer denominators, population rules and the explicit DCA threshold. Below are the primary-outcome 2024 AUPRC comparisons; differences are source-recorded descriptive differences, not newly invented paired intervals.

| Outcome | Rule | DNR/reference N | DNR AUPRC | Reference AUPRC | Difference |
|---|---|---|---|---|---|
| P1 | broad_exclusion | 7127/7504 | 0.606472 | 0.476177 | 0.130295 |
| P1 | dnr_blind | 7504/7504 | 0.473535 | 0.476177 | -0.002642 |
| P1 | temporally_clean_exclusion | 7502/7504 | 0.463014 | 0.476177 | -0.013163 |
| P2 | broad_exclusion | 7127/7504 | 0.462533 | 0.567734 | -0.105202 |
| P2 | dnr_blind | 7504/7504 | 0.567354 | 0.567734 | -0.000381 |
| P2 | temporally_clean_exclusion | 7502/7504 | 0.558930 | 0.567734 | -0.008805 |
| P3 | broad_exclusion | 7127/7504 | 0.442269 | 0.417436 | 0.024833 |
| P3 | dnr_blind | 7504/7504 | 0.407517 | 0.417436 | -0.009919 |
| P3 | temporally_clean_exclusion | 7502/7504 | 0.417786 | 0.417436 | 0.000350 |
