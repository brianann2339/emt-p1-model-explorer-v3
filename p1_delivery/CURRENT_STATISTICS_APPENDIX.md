# Current 2024 uncertainty and paired-comparison appendix

All 324 locked display models have six-metric intervals; all 270 original five-family prespecified comparisons are complete. These tables select CatBoost and the CatBoost–XGBoost pair as fixed illustrative comparators, not a post-hoc winner selection. Full six-metric/270-pair CSVs are in the portable fixtures. Model-specific and pair-specific denominators remain separate. Nominal unadjusted intervals/p-values do not resolve multiplicity, transportability or causal benefit. The exact source uses 2,000 stratified patient-group bootstrap replicates; the inherited 1,900-success reporting rule is not a new threshold.

## Fixed CatBoost examples for primary outcomes

| Group/outcome | N/events | AUROC [95% CI] | AUPRC [95% CI] | Brier [95% CI] |
|---|---:|---|---|---|
| overall/P1 | 7289/60 | 0.931115 [0.906282, 0.953999] | 0.213703 [0.135555, 0.331876] | 0.007290 [0.006857, 0.007707] |
| overall/P2 | 7289/526 | 0.908038 [0.896519, 0.918860] | 0.489512 [0.448606, 0.531855] | 0.059194 [0.056100, 0.062162] |
| overall/P3 | 7289/237 | 0.913556 [0.894931, 0.930884] | 0.383623 [0.324951, 0.446564] | 0.028481 [0.026470, 0.030437] |
| medicine/P1 | 4770/98 | 0.940944 [0.919655, 0.959322] | 0.467949 [0.368685, 0.570886] | 0.014657 [0.013342, 0.016057] |
| medicine/P2 | 4770/568 | 0.884963 [0.871309, 0.897859] | 0.576214 [0.537891, 0.615329] | 0.072745 [0.069422, 0.076190] |
| medicine/P3 | 4770/253 | 0.897502 [0.879326, 0.914477] | 0.375752 [0.323158, 0.436678] | 0.039721 [0.037437, 0.042085] |
| surgery/P1 | 2712/9 | 0.941135 [0.824151, 0.999505] | 0.621538 [0.367724, 0.880362] | 0.002343 [0.001813, 0.002800] |
| surgery/P2 | 2712/41 | 0.927478 [0.891331, 0.958619] | 0.469710 [0.322491, 0.630076] | 0.011176 [0.008878, 0.013476] |
| surgery/P3 | 2712/32 | 0.937687 [0.873237, 0.982661] | 0.619920 [0.450514, 0.793709] | 0.006112 [0.004378, 0.008041] |

## Prespecified CatBoost minus XGBoost examples

| Group/outcome | Common N/events | AUPRC difference [paired 95% CI] | AUROC difference | Nominal DeLong P |
|---|---:|---|---:|---:|
| overall/P1 | 7289/60 | 0.028154 [-0.016833, 0.079857] | -0.005148 | 0.4126 |
| overall/P2 | 7289/526 | 0.001445 [-0.011020, 0.014139] | -0.000188 | 0.8894 |
| overall/P3 | 7289/237 | -0.000147 [-0.019507, 0.020196] | -0.000795 | 0.7191 |
| medicine/P1 | 4770/98 | 0.051562 [-0.014275, 0.106023] | -0.005075 | 0.2316 |
| medicine/P2 | 4770/568 | 0.013254 [0.003310, 0.023016] | 0.002617 | 0.05918 |
| medicine/P3 | 4770/253 | 0.006688 [-0.016527, 0.027023] | 0.000612 | 0.763 |
| surgery/P1 | 2712/9 | 0.374191 [0.073877, 0.579319] | -0.022773 | 0.3814 |
| surgery/P2 | 2712/41 | 0.087752 [-0.015152, 0.165114] | -0.000151 | 0.9831 |
| surgery/P3 | 2712/32 | 0.126299 [0.052175, 0.188998] | 0.003778 | 0.6601 |

Source: current_supplement_terminal and current_statistics_independent in sources.json. These current-model paired results must not be attached to P104 ablation arms or older v1 cohorts. No new model fit, predictive-model call or raw2025 read was used to generate these intervals and comparisons. The separate 27 KNN fits are new authorized baseline work, not part of these 324 current-model CI computations.
