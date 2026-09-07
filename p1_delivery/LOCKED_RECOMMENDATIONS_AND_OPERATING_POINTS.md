# Locked model recommendations and operating points

No recommendation is chosen using frozen performance in this update. The 17 selected specialty representatives and Surgery/P1 no-representative disposition are copied from the accepted research-decision registry. The source decision split varies: development OOF for some outcomes, 2024 validation or 2024 cross-fitting under the later specialty contracts for others. They must not all be relabelled development OOF. Sensitivity means the fraction of events detected; specificity is the fraction of non-events correctly excluded. Values below reuse stored frozen aggregates at the previously locked threshold; they are not new evaluations or threshold selection.

| Group/outcome | Locked family | Selection basis | Threshold | Frozen sensitivity | Frozen specificity |
|---|---|---|---|---|---|
| medicine/P1 | tabicl | oof_2020_2023 | 0.013448 | 0.843373 | 0.877943 |
| medicine/P2 | tabicl | oof_2020_2023 | 0.139522 | 0.779817 | 0.799343 |
| medicine/P3 | stacking | oof_2020_2023 | 0.445055 | 0.734628 | 0.872195 |
| medicine/S1 | catboost | validation_2024 | 0.033517 | 0.788820 | 0.854663 |
| medicine/S2 | tabicl | validation_2024 | 0.062968 | 0.789474 | 0.840599 |
| medicine/S3 | stacking | crossfit_2024 | 0.496155 | 0.713043 | 0.721560 |
| medicine/S4 | stacking | crossfit_2024 | 0.457463 | 0.665796 | 0.781295 |
| medicine/S5 | tabicl | validation_2024 | 0.016063 | 0.672269 | 0.730304 |
| medicine/S6 | catboost | validation_2024 | 0.064920 | 0.700000 | 0.695762 |
| surgery/P1 | NO_VALID_REPRESENTATIVE | none | not recorded | not recorded | not recorded |
| surgery/P2 | tabicl | oof_2020_2023 | 0.013729 | 0.878049 | 0.817715 |
| surgery/P3 | tabpfn | oof_2020_2023 | 0.009540 | 0.820513 | 0.919179 |
| surgery/S1 | tabicl | validation_2024 | 0.004157 | 0.941176 | 0.881847 |
| surgery/S2 | tabicl | validation_2024 | 0.005130 | 0.960000 | 0.841635 |
| surgery/S3 | stacking | crossfit_2024 | 0.468661 | 0.629231 | 0.749501 |
| surgery/S4 | stacking | crossfit_2024 | 0.439997 | 0.708609 | 0.815369 |
| surgery/S5 | stacking | crossfit_2024 | 0.443053 | 0.800000 | 0.676200 |
| surgery/S6 | mlp_plr | validation_2024 | 0.491589 | 0.692308 | 0.724503 |

The accepted Overall P1_06 manifest covers 108 locked components but contains no separately recorded nine-outcome cross-family deployment decision. All 108 operating points are nevertheless included in the 324-row locked operating-point CSV. The correct reporting disposition is **no new Overall deployment winner selected here**, not a newly chosen 2025 winner. The dashboard displays within-family representatives and can sort their 2024 values; this is different from the 17 source-recorded cross-family specialty research choices. Neither display operation is substituted for a clinical deployment authorization. Authors may confirm a preexisting documented recommendation if one exists; prospective use requires the clinical workflow judgment already listed in AUTHOR_DECLARATIONS.md.

Calibration quality, DCA and performance uncertainty accompany rather than replace the recorded research selection. rSI-sMS is a separate native-score cohort and cannot simply be ranked against full-population models. No generic model recommendation is imposed on Surgery/P1 with its nine development events.
