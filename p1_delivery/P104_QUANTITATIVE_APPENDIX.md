# P1_04 quantitative appendix

All estimates below use the recorded pre-2025 research comparator, with the exact split and probability layer. Arm-level confidence intervals are not paired-difference intervals. The complete 1,659 arm rows are in the accompanying fixtures and the replay's 2024 output.

## Twelve ablations and other same-cohort comparisons

Delta is comparison arm minus reference arm. Counts pool only descriptions across outcomes; there is no pooled effect or multiplicity-adjusted inference. Different-cohort comparisons are excluded from the delta summary.

| Analysis | Group | Contrasts | Negative delta | Min delta AP | Max delta AP | Comparison arms |
|---|---|---|---|---|---|---|
| 01_standardization | medicine | 9 | 0 | +0.008937 | +0.066124 | logistic_unscaled |
| 01_standardization | surgery | 9 | 2 | -0.091589 | +0.132691 | logistic_unscaled |
| 02_time_variables | medicine | 9 | 4 | -0.008645 | +0.011651 | without_time_intervals_complete |
| 02_time_variables | surgery | 9 | 4 | -0.010146 | +0.043590 | without_time_intervals_complete |
| 03_emt_treatment | medicine | 9 | 5 | -0.012653 | +0.011819 | without_emt_treatment |
| 03_emt_treatment | surgery | 9 | 4 | -0.013859 | +0.053020 | without_emt_treatment |
| 04_gcs_consciousness | medicine | 9 | 4 | -0.015396 | +0.007177 | without_gcs_consciousness |
| 04_gcs_consciousness | surgery | 9 | 4 | -0.050053 | +0.040120 | without_gcs_consciousness |
| 05_shock_index_rsig | medicine | 9 | 4 | -0.004956 | +0.005361 | without_shock_index_rsig |
| 05_shock_index_rsig | surgery | 9 | 1 | -0.004668 | +0.059399 | without_shock_index_rsig |
| 06_vital_only_vs_full | medicine | 9 | 9 | -0.255378 | -0.019432 | vital_only |
| 06_vital_only_vs_full | surgery | 9 | 9 | -0.186535 | -0.024746 | vital_only |
| 07_logistic_vs_xgboost | medicine | 9 | 0 | +0.036649 | +0.177459 | xgboost |
| 07_logistic_vs_xgboost | surgery | 9 | 1 | -0.175478 | +0.240823 | xgboost |
| 08_median_vs_knn | medicine | 9 | 3 | -0.016258 | +0.014206 | knn |
| 08_median_vs_knn | surgery | 9 | 1 | -0.007132 | +0.280902 | knn |
| 09_class_weight_smotenc_threshold | medicine | 18 | 6 | -0.061233 | +0.047029 | smotenc; threshold_shift |
| 09_class_weight_smotenc_threshold | surgery | 18 | 10 | -0.206952 | +0.115991 | smotenc; threshold_shift |
| 10_prehospital_vs_ed_early | medicine | 9 | 0 | +0.004217 | +0.040113 | plus_ed_early |
| 10_prehospital_vs_ed_early | surgery | 9 | 2 | -0.023462 | +0.097143 | plus_ed_early |
| 11_collaborator_variables | medicine | 9 | 5 | -0.004985 | +0.011236 | without_collaborator_variables_exact |
| 11_collaborator_variables | surgery | 9 | 1 | -0.004869 | +0.051254 | without_collaborator_variables_exact |
| 12_remove_distance | medicine | 9 | 3 | -0.017286 | +0.009598 | without_distance |
| 12_remove_distance | surgery | 9 | 4 | -0.009294 | +0.049960 | without_distance |
| dnr_blind | medicine | 9 | 6 | -0.036798 | +0.005690 | dnr_blind |
| dnr_blind | surgery | 9 | 5 | -0.008764 | +0.055815 | dnr_blind |
| grouped_vs_naive_cv | medicine | 9 | 0 | +0.000000 | +0.000000 | naive_row_stratified |
| grouped_vs_naive_cv | surgery | 9 | 0 | +0.000000 | +0.000000 | naive_row_stratified |
| mortality_exclude_critical_discharge | surgery | 1 | 0 | +0.000000 | +0.000000 | critical_discharge_excluded |
| temporally_clean_exclusion | surgery | 9 | 5 | -0.008764 | +0.055815 | temporally_clean_exclusion |

## Primary outcomes: full, time-removed and vital-only arms

| Group | Outcome | Arm | N | Events | AUROC [95% CI] | AUPRC [95% CI] |
|---|---|---|---|---|---|---|
| medicine | P1 | locked_full | 4770 | 98 | 0.940944 [0.920427, 0.960663] | 0.467949 [0.369157, 0.571382] |
| medicine | P1 | without_time_intervals_complete | 4770 | 98 | 0.936766 [0.914843, 0.957143] | 0.472712 [0.379787, 0.575217] |
| medicine | P1 | locked_full | 4770 | 98 | 0.940944 [0.920427, 0.960663] | 0.467949 [0.369157, 0.571382] |
| medicine | P1 | vital_only | 4770 | 98 | 0.903726 [0.881121, 0.923654] | 0.213797 [0.152156, 0.294704] |
| medicine | P2 | locked_full | 4770 | 568 | 0.884963 [0.871244, 0.898355] | 0.576214 [0.53961, 0.613641] |
| medicine | P2 | without_time_intervals_complete | 4770 | 568 | 0.882527 [0.868986, 0.895154] | 0.56757 [0.531529, 0.604421] |
| medicine | P2 | locked_full | 4770 | 568 | 0.884963 [0.871244, 0.898355] | 0.576214 [0.53961, 0.613641] |
| medicine | P2 | vital_only | 4770 | 568 | 0.777426 [0.755576, 0.797324] | 0.387507 [0.352449, 0.426862] |
| medicine | P3 | locked_full | 4770 | 253 | 0.89689 [0.877769, 0.914638] | 0.369064 [0.31969, 0.43299] |
| medicine | P3 | without_time_intervals_complete | 4770 | 253 | 0.898844 [0.88123, 0.915861] | 0.378823 [0.327223, 0.44106] |
| medicine | P3 | locked_full | 4770 | 253 | 0.89689 [0.877769, 0.914638] | 0.369064 [0.31969, 0.43299] |
| medicine | P3 | vital_only | 4770 | 253 | 0.825892 [0.799484, 0.851129] | 0.245659 [0.205836, 0.296965] |
| surgery | P1 | locked_full | 2712 | 9 | 0.96658 [0.908112, 0.997408] | 0.261247 [0.143121, 0.575463] |
| surgery | P1 | without_time_intervals_complete | 2712 | 9 | 0.967197 [0.909094, 0.997782] | 0.280946 [0.156779, 0.58345] |
| surgery | P1 | locked_full | 2712 | 9 | 0.96658 [0.908112, 0.997408] | 0.261247 [0.143121, 0.575463] |
| surgery | P1 | vital_only | 2712 | 9 | 0.900399 [0.726118, 0.992513] | 0.232033 [0.0784594, 0.565159] |
| surgery | P2 | locked_full | 2712 | 41 | 0.920652 [0.877361, 0.956573] | 0.369779 [0.236885, 0.527355] |
| surgery | P2 | without_time_intervals_complete | 2712 | 41 | 0.910018 [0.864948, 0.949385] | 0.38547 [0.249165, 0.541972] |
| surgery | P2 | locked_full | 2712 | 41 | 0.920652 [0.877361, 0.956573] | 0.369779 [0.236885, 0.527355] |
| surgery | P2 | vital_only | 2712 | 41 | 0.816589 [0.724202, 0.896909] | 0.259537 [0.146977, 0.407764] |
| surgery | P3 | locked_full | 2712 | 32 | 0.945021 [0.887101, 0.985259] | 0.582494 [0.422066, 0.800266] |
| surgery | P3 | without_time_intervals_complete | 2712 | 32 | 0.924802 [0.859391, 0.975118] | 0.589406 [0.412609, 0.802197] |
| surgery | P3 | locked_full | 2712 | 32 | 0.945021 [0.887101, 0.985259] | 0.582494 [0.422066, 0.800266] |
| surgery | P3 | vital_only | 2712 | 32 | 0.909142 [0.842404, 0.967197] | 0.550411 [0.397203, 0.71917] |

## Age

Compare denominators and arm definitions first. Subgroup estimates need not cover the same patients; no causal or improvement claim follows from these marginal intervals.

| Group | Outcome | Arm | N | Events | AUROC [95% CI] | AUPRC [95% CI] |
|---|---|---|---|---|---|---|
| medicine | P1 | age_18_64 | 1959 | 21 | 0.972923 [0.935829, 0.995269] | 0.509822 [0.347894, 0.743252] |
| medicine | P1 | age_65_plus | 2811 | 77 | 0.913703 [0.882498, 0.942154] | 0.449381 [0.342688, 0.56496] |
| medicine | P2 | age_18_64 | 1959 | 118 | 0.936908 [0.914793, 0.956913] | 0.633916 [0.552609, 0.716111] |
| medicine | P2 | age_65_plus | 2811 | 450 | 0.840384 [0.820721, 0.860431] | 0.562705 [0.518978, 0.60927] |
| medicine | P3 | age_18_64 | 1959 | 91 | 0.921606 [0.888503, 0.948862] | 0.460048 [0.374657, 0.580197] |
| medicine | P3 | age_65_plus | 2811 | 162 | 0.877955 [0.852486, 0.90197] | 0.325723 [0.270416, 0.399525] |
| surgery | P1 | age_18_64 | 1672 | 5 | 0.997241 [0.993586, 1] | 0.507372 [0.27997, 1] |
| surgery | P1 | age_65_plus | 1040 | 4 | 0.8861 [0.656758, 0.999275] | 0.317613 [0.0689371, 0.892857] |
| surgery | P2 | age_18_64 | 1672 | 11 | 0.945378 [0.863849, 0.994854] | 0.388937 [0.173247, 0.683325] |
| surgery | P2 | age_65_plus | 1040 | 30 | 0.845611 [0.770538, 0.912592] | 0.379031 [0.221979, 0.571872] |
| surgery | P3 | age_18_64 | 1672 | 15 | 0.942386 [0.857838, 0.994015] | 0.595767 [0.368273, 0.841291] |
| surgery | P3 | age_65_plus | 1040 | 17 | 0.924846 [0.821049, 0.997132] | 0.656686 [0.453442, 0.88221] |

## City

Compare denominators and arm definitions first. Subgroup estimates need not cover the same patients; no causal or improvement claim follows from these marginal intervals.

| Group | Outcome | Arm | N | Events | AUROC [95% CI] | AUPRC [95% CI] |
|---|---|---|---|---|---|---|
| medicine | P1 | new_taipei_to_taipei | 487 | 13 | 0.863681 [0.748763, 0.961698] | 0.480926 [0.230273, 0.732371] |
| medicine | P1 | taipei_to_new_taipei | 4283 | 85 | 0.86757 [0.823467, 0.905142] | 0.167812 [0.121891, 0.240231] |
| medicine | P2 | new_taipei_to_taipei | 487 | 63 | 0.874551 [0.828464, 0.916269] | 0.537595 [0.436638, 0.675343] |
| medicine | P2 | taipei_to_new_taipei | 4283 | 505 | 0.805593 [0.784742, 0.826075] | 0.375965 [0.340642, 0.419095] |
| medicine | P3 | new_taipei_to_taipei | 487 | 23 | 0.794978 [0.702553, 0.867087] | 0.133912 [0.0939604, 0.249321] |
| medicine | P3 | taipei_to_new_taipei | 4283 | 230 | 0.82408 [0.793336, 0.852221] | 0.199554 [0.171728, 0.238845] |
| surgery | P1 | new_taipei_to_taipei | 310 | 2 | 0.993506 [0.983607, 1] | 0.416667 [0.22619, 1] |
| surgery | P1 | taipei_to_new_taipei | 2402 | 7 | 0.5 [0.5, 0.5] | 0.00291424 [0.00289495, 0.00293378] |
| surgery | P2 | new_taipei_to_taipei | 310 | 5 | 0.876721 [0.715506, 0.992904] | 0.40589 [0.0633185, 0.821277] |
| surgery | P2 | taipei_to_new_taipei | 2402 | 36 | 0.757373 [0.665822, 0.842597] | 0.0962042 [0.0468926, 0.193585] |
| surgery | P3 | new_taipei_to_taipei |  |  |  |  |
| surgery | P3 | taipei_to_new_taipei | 2402 | 32 | 0.902743 [0.821258, 0.965882] | 0.461513 [0.318472, 0.676472] |

## DNR

Compare denominators and arm definitions first. Subgroup estimates need not cover the same patients; no causal or improvement claim follows from these marginal intervals.

| Group | Outcome | Arm | N | Events | AUROC [95% CI] | AUPRC [95% CI] |
|---|---|---|---|---|---|---|
| medicine | P1 | all_comer_reference | 4770 | 98 | 0.940944 [0.920022, 0.960339] | 0.467949 [0.371741, 0.574062] |
| medicine | P1 | dnr_blind | 4770 | 98 | 0.939282 [0.915654, 0.95854] | 0.43115 [0.336525, 0.537121] |
| medicine | P1 | all_comer_reference | 4770 | 98 | 0.940944 [0.920022, 0.960339] | 0.467949 [0.371741, 0.574062] |
| medicine | P1 | temporally_clean_exclusion | 4768 | 98 | 0.941778 [0.920396, 0.961347] | 0.405318 [0.317745, 0.519426] |
| medicine | P1 | all_comer_reference | 4770 | 98 | 0.940944 [0.920022, 0.960339] | 0.467949 [0.371741, 0.574062] |
| medicine | P1 | broad_exclusion | 4405 | 42 | 0.97051 [0.937397, 0.993844] | 0.596303 [0.462841, 0.748016] |
| medicine | P2 | all_comer_reference | 4770 | 568 | 0.884963 [0.871586, 0.897906] | 0.576214 [0.538778, 0.612851] |
| medicine | P2 | dnr_blind | 4770 | 568 | 0.881743 [0.867824, 0.895638] | 0.567314 [0.529454, 0.605694] |
| medicine | P2 | all_comer_reference | 4770 | 568 | 0.884963 [0.871586, 0.897906] | 0.576214 [0.538778, 0.612851] |
| medicine | P2 | temporally_clean_exclusion | 4768 | 567 | 0.882391 [0.868086, 0.895428] | 0.567807 [0.529411, 0.605234] |
| medicine | P2 | all_comer_reference | 4770 | 568 | 0.884963 [0.871586, 0.897906] | 0.576214 [0.538778, 0.612851] |
| medicine | P2 | broad_exclusion | 4405 | 343 | 0.863755 [0.84479, 0.882871] | 0.462829 [0.416028, 0.51449] |
| medicine | P3 | all_comer_reference | 4770 | 253 | 0.89689 [0.878232, 0.915449] | 0.369064 [0.319562, 0.434817] |
| medicine | P3 | dnr_blind | 4770 | 253 | 0.896805 [0.877859, 0.914715] | 0.368608 [0.31673, 0.430856] |
| medicine | P3 | all_comer_reference | 4770 | 253 | 0.89689 [0.878232, 0.915449] | 0.369064 [0.319562, 0.434817] |
| medicine | P3 | temporally_clean_exclusion | 4768 | 253 | 0.896416 [0.876162, 0.914752] | 0.371405 [0.323135, 0.435483] |
| medicine | P3 | all_comer_reference | 4770 | 253 | 0.89689 [0.878232, 0.915449] | 0.369064 [0.319562, 0.434817] |
| medicine | P3 | broad_exclusion | 4405 | 231 | 0.913067 [0.894015, 0.930881] | 0.419123 [0.366533, 0.488143] |
| surgery | P1 | all_comer_reference | 2712 | 9 | 0.96658 [0.907959, 0.997294] | 0.261247 [0.141496, 0.567362] |
| surgery | P1 | dnr_blind | 2712 | 9 | 0.96658 [0.906378, 0.997249] | 0.261247 [0.13382, 0.567376] |
| surgery | P1 | all_comer_reference | 2712 | 9 | 0.96658 [0.907959, 0.997294] | 0.261247 [0.141496, 0.567362] |
| surgery | P1 | temporally_clean_exclusion | 2712 | 9 | 0.96658 [0.907535, 0.997291] | 0.261247 [0.144648, 0.585861] |
| surgery | P1 | all_comer_reference | 2712 | 9 | 0.96658 [0.907959, 0.997294] | 0.261247 [0.141496, 0.567362] |
| surgery | P1 | broad_exclusion | 2700 | 8 | 0.997214 [0.99462, 0.999027] | 0.52931 [0.296089, 0.80182] |
| surgery | P2 | all_comer_reference | 2712 | 41 | 0.920652 [0.877246, 0.95682] | 0.369779 [0.233041, 0.540369] |
| surgery | P2 | dnr_blind | 2712 | 41 | 0.918611 [0.875072, 0.955937] | 0.364111 [0.238063, 0.535704] |
| surgery | P2 | all_comer_reference | 2712 | 41 | 0.920652 [0.877246, 0.95682] | 0.369779 [0.233041, 0.540369] |
| surgery | P2 | temporally_clean_exclusion | 2712 | 41 | 0.918611 [0.877877, 0.953847] | 0.364111 [0.23516, 0.529907] |
| surgery | P2 | all_comer_reference | 2712 | 41 | 0.920652 [0.877246, 0.95682] | 0.369779 [0.233041, 0.540369] |
| surgery | P2 | broad_exclusion | 2700 | 33 | 0.909 [0.859099, 0.951968] | 0.282555 [0.158883, 0.457446] |
| surgery | P3 | all_comer_reference | 2712 | 32 | 0.945021 [0.885748, 0.984474] | 0.582494 [0.419625, 0.801675] |
| surgery | P3 | dnr_blind | 2712 | 32 | 0.953463 [0.91227, 0.983544] | 0.58193 [0.423277, 0.787629] |
| surgery | P3 | all_comer_reference | 2712 | 32 | 0.945021 [0.885748, 0.984474] | 0.582494 [0.419625, 0.801675] |
| surgery | P3 | temporally_clean_exclusion | 2712 | 32 | 0.953463 [0.913779, 0.983557] | 0.58193 [0.420856, 0.78127] |
| surgery | P3 | all_comer_reference | 2712 | 32 | 0.945021 [0.885748, 0.984474] | 0.582494 [0.419625, 0.801675] |
| surgery | P3 | broad_exclusion | 2700 | 30 | 0.93779 [0.877093, 0.979739] | 0.593531 [0.418799, 0.800099] |

## P3 recorded airway exclusions

Compare denominators and arm definitions first. Subgroup estimates need not cover the same patients; no causal or improvement claim follows from these marginal intervals.

| Group | Outcome | Arm | N | Events | AUROC [95% CI] | AUPRC [95% CI] |
|---|---|---|---|---|---|---|
| medicine | P3 | all_comer_reference | 4770 | 253 | 0.89689 [0.878232, 0.915449] | 0.369064 [0.319562, 0.434817] |
| medicine | P3 | p3_non_field_ett | 4759 | 248 | 0.896477 [0.876766, 0.915858] | 0.372438 [0.323549, 0.43634] |
| medicine | P3 | all_comer_reference | 4770 | 253 | 0.89689 [0.878232, 0.915449] | 0.369064 [0.319562, 0.434817] |
| medicine | P3 | p3_non_ett_sga | 4712 | 224 | 0.8913 [0.869176, 0.910837] | 0.351885 [0.298973, 0.417884] |
| surgery | P3 | all_comer_reference | 2712 | 32 | 0.937687 [0.875383, 0.982029] | 0.61992 [0.451539, 0.802625] |
| surgery | P3 | p3_non_field_ett | 2711 | 31 | 0.935713 [0.874542, 0.980795] | 0.609592 [0.438793, 0.79241] |
| surgery | P3 | all_comer_reference | 2712 | 32 | 0.937687 [0.875383, 0.982029] | 0.61992 [0.451539, 0.802625] |
| surgery | P3 | p3_non_ett_sga | 2705 | 29 | 0.932207 [0.871558, 0.982377] | 0.657887 [0.485337, 0.83447] |

## Mortality definition

Compare denominators and arm definitions first. Subgroup estimates need not cover the same patients; no causal or improvement claim follows from these marginal intervals.

| Group | Outcome | Arm | N | Events | AUROC [95% CI] | AUPRC [95% CI] |
|---|---|---|---|---|---|---|
| medicine | P1 | critical_discharge_excluded | 4766 | 94 | 0.937614 [0.912961, 0.959767] | 0.455741 [0.366303, 0.576581] |
| medicine | P1 | primary_definition_reference | 4770 | 98 | 0.940944 [0.919978, 0.958851] | 0.467949 [0.374486, 0.569809] |
| medicine | P2 | critical_discharge_excluded | 4749 | 547 | 0.883191 [0.868654, 0.897185] | 0.563038 [0.525751, 0.603944] |
| medicine | P2 | primary_definition_reference | 4770 | 568 | 0.884963 [0.871602, 0.898458] | 0.576214 [0.539123, 0.613809] |
| surgery | P1 | critical_discharge_excluded | 2712 | 9 | 0.96658 [0.905687, 0.997297] | 0.261247 [0.131349, 0.587337] |
| surgery | P1 | primary_definition_reference | 2712 | 9 | 0.96658 [0.907712, 0.997284] | 0.261247 [0.133451, 0.578174] |
| surgery | P2 | critical_discharge_excluded | 2710 | 39 | 0.916679 [0.873017, 0.9513] | 0.322224 [0.203633, 0.495759] |
| surgery | P2 | primary_definition_reference | 2712 | 41 | 0.920652 [0.878796, 0.957033] | 0.369779 [0.244184, 0.54488] |

## Grouped versus naive CV

Compare denominators and arm definitions first. Subgroup estimates need not cover the same patients; no causal or improvement claim follows from these marginal intervals.

| Group | Outcome | Arm | N | Events | AUROC [95% CI] | AUPRC [95% CI] |
|---|---|---|---|---|---|---|
| medicine | P1 | naive_row_stratified | 4770 | 98 | 0.940944 [0.920148, 0.959639] | 0.467949 [0.373238, 0.574141] |
| medicine | P1 | patient_grouped | 4770 | 98 | 0.940944 [0.919142, 0.959612] | 0.467949 [0.377181, 0.566875] |
| medicine | P2 | naive_row_stratified | 4770 | 568 | 0.884963 [0.871211, 0.898697] | 0.576214 [0.541138, 0.615048] |
| medicine | P2 | patient_grouped | 4770 | 568 | 0.884963 [0.870927, 0.898144] | 0.576214 [0.538282, 0.615299] |
| medicine | P3 | naive_row_stratified | 4770 | 253 | 0.89689 [0.87728, 0.915255] | 0.369064 [0.321287, 0.434446] |
| medicine | P3 | patient_grouped | 4770 | 253 | 0.89689 [0.877641, 0.915005] | 0.369064 [0.321615, 0.43137] |
| surgery | P1 | naive_row_stratified | 2712 | 9 | 0.96658 [0.907992, 0.997246] | 0.261247 [0.136754, 0.577983] |
| surgery | P1 | patient_grouped | 2712 | 9 | 0.96658 [0.907125, 0.997339] | 0.261247 [0.134385, 0.566202] |
| surgery | P2 | naive_row_stratified | 2712 | 41 | 0.920652 [0.878116, 0.95521] | 0.369779 [0.23768, 0.539534] |
| surgery | P2 | patient_grouped | 2712 | 41 | 0.920652 [0.8766, 0.955075] | 0.369779 [0.236143, 0.531174] |
| surgery | P3 | naive_row_stratified | 2712 | 32 | 0.945021 [0.890224, 0.985553] | 0.582494 [0.417482, 0.784883] |
| surgery | P3 | patient_grouped | 2712 | 32 | 0.945021 [0.889366, 0.984073] | 0.582494 [0.422744, 0.785358] |

## Limited and non-estimable dispositions

These are completed dispositions, not queued model jobs. Blank metrics remain blank.

| Task | Disposition | Recorded reason |
|---|---|---|
| medicine__P2__missingness_full_complete_case | VALIDATED_WITH_NOT_ESTIMABLE_COMPONENTS |  |
| medicine__P3__missingness_full_complete_case | VALIDATED_WITH_NOT_ESTIMABLE_COMPONENTS |  |
| medicine__S1__missingness_full_complete_case | VALIDATED_WITH_NOT_ESTIMABLE_COMPONENTS |  |
| medicine__S5__missingness_full_complete_case | VALIDATED_WITH_NOT_ESTIMABLE_COMPONENTS |  |
| medicine__S6__missingness_full_complete_case | VALIDATED_WITH_NOT_ESTIMABLE_COMPONENTS |  |
| surgery__P1__city_holdout | VALIDATED_WITH_NOT_ESTIMABLE_COMPONENTS |  |
| surgery__P1__age_subgroup | VALIDATED_WITH_NOT_ESTIMABLE_COMPONENTS |  |
| surgery__P3__city_holdout | VALIDATED_WITH_NOT_ESTIMABLE_COMPONENTS |  |
| surgery__S1__city_holdout | VALIDATED_WITH_NOT_ESTIMABLE_COMPONENTS |  |
| surgery__S2__city_holdout | VALIDATED_WITH_NOT_ESTIMABLE_COMPONENTS |  |
| surgery__S4__city_holdout | VALIDATED_WITH_NOT_ESTIMABLE_COMPONENTS |  |
| surgery__S5__city_holdout | VALIDATED_WITH_NOT_ESTIMABLE_COMPONENTS |  |
| surgery__P1__missingness_full_complete_case | VALIDATED_NOT_ESTIMABLE | empty evaluation or single-class training cohort |
| surgery__P2__missingness_full_complete_case | VALIDATED_NOT_ESTIMABLE | empty evaluation or single-class training cohort |
| surgery__P3__missingness_full_complete_case | VALIDATED_NOT_ESTIMABLE | empty evaluation or single-class training cohort |
| surgery__S1__missingness_full_complete_case | VALIDATED_NOT_ESTIMABLE | empty evaluation or single-class training cohort |
| surgery__S2__missingness_full_complete_case | VALIDATED_NOT_ESTIMABLE | empty evaluation or single-class training cohort |
| surgery__S3__missingness_full_complete_case | VALIDATED_NOT_ESTIMABLE | empty evaluation or single-class training cohort |
| surgery__S4__missingness_full_complete_case | VALIDATED_NOT_ESTIMABLE | empty evaluation or single-class training cohort |
| surgery__S5__missingness_full_complete_case | VALIDATED_NOT_ESTIMABLE | empty evaluation or single-class training cohort |
| surgery__S6__missingness_full_complete_case | VALIDATED_NOT_ESTIMABLE | empty evaluation or single-class training cohort |
