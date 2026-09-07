# Aggregate supplement collection guide

The earlier `text_gain.csv` interval values are now **legacy audit only**: the source Stage3a bootstrap allowed mixed-outcome patients into both strata. They must not be used as ordinary patient-group confidence intervals. The dedicated disjoint-group correction is complete for all 54 pairs / 108 split contrasts; corrected_text/text_gain.csv and corrected_text/specialty_text_gain.csv are the current interval sources; existing model predictions and point estimates are unchanged. Current Stage2a 324-model CI, 270 pairs and 675 baseline intervals are unaffected.

Current validation, stored frozen aggregate, earlier reference, exact specialty descriptive and current-row baseline scopes remain distinct. Empty historical current_overall_ci and specialty_text_gain collections are preserved schema placeholders: the former is superseded by the completed current_validation_ci collection, and the latter by corrected_text/specialty_text_gain.csv. Neither placeholder represents an outstanding current-model computation.

| Collection | Scope | Rows | File |
|---|---|---:|---|
| current_model_summary | current_frozen_aggregate | 324 | current_model_summary.csv |
| current_dca | current_frozen_aggregate | 28188 | current_dca.csv |
| current_calibration | current_frozen_aggregate | 2160 | current_calibration.csv |
| strict_v2_baseline_metrics | earlier_strict_v2_overall | 6984 | strict_v2_baseline_metrics.csv |
| strict_v2_calibration | earlier_strict_v2_overall | 22013 | strict_v2_calibration.csv |
| strict_v2_dca | earlier_strict_v2_overall | 101268 | strict_v2_dca.csv |
| strict_v2_paired_comparisons | earlier_strict_v2_overall | 90 | strict_v2_paired_comparisons.csv |
| text_gain | earlier_strict_v2_overall_stage3a | 108 | text_gain.csv |
| current_specialty_ci | current_validation_2024_aggregate | 180 | current_specialty_ci.csv |
| specialty_text_gain | accepted_specialty_source_aggregate | 0 | specialty_text_gain.csv |
| current_overall_ci | current_validation_2024_aggregate | 0 | current_overall_ci.csv |
| table1 | strict_v2_development_overall | 41364 | table1.csv |
| correlations | strict_v2_development_overall | 2268 | correlations.csv |
| complete_case_flow | strict_v2_development_overall | 54 | complete_case_flow.csv |
| missingness_by_year | strict_v2_development_overall | 3830 | missingness_by_year.csv |
| missingness_by_city | strict_v2_development_overall | 1532 | missingness_by_city.csv |
| missingness_by_outcome | strict_v2_development_overall | 68940 | missingness_by_outcome.csv |
| score_component_coverage | strict_v2_development_overall | 25 | score_component_coverage.csv |
| specialty_table1 | current_opname_development_cohorts | 82728 | specialty_table1.csv |
| specialty_correlations | current_opname_development_cohorts | 4536 | specialty_correlations.csv |
| specialty_missingness | current_opname_development_cohorts | 4596 | specialty_missingness.csv |
| specialty_cohort_summary | current_opname_development_cohorts | 54 | specialty_cohort_summary.csv |
| specialty_missingness_by_year | current_opname_development_cohorts | 7660 | specialty_missingness_by_year.csv |
| specialty_missingness_by_city | current_opname_development_cohorts | 3064 | specialty_missingness_by_city.csv |
| current_validation_ci | current_validation_2024_aggregate | 1944 | current_validation_ci.csv |
| current_validation_calibration | current_validation_2024_aggregate | 7749 | current_validation_calibration.csv |
| current_paired_comparisons | current_validation_2024_exact_common_rows | 270 | current_paired_comparisons.csv |
| current_model_recorded_metadata | exact_model_sha_bound_metadata | 679 | current_model_recorded_metadata.csv |
| current_model_metadata_summary | exact_model_sha_bound_metadata | 324 | current_model_metadata_summary.csv |
| current_cohort_baseline_metrics | current_2024_exact_available_subset_baseline_points | 675 | current_cohort_baseline_metrics.csv |

All 324 current validation CI/calibration tasks, 270 prespecified comparisons and both specialty descriptive groups are complete. The 675-row additional baseline points include 27 newly completed group-trained KNN comparators; their CI extension is complete at 675/675 records and 2,025 metric intervals. All 36 specialty MLP/FT no-text tasks and their corrected disjoint-patient intervals are complete. Missing metadata fields are explicit: 147 current models have 679 source-recorded values, with no inferred context counts. Author-only declarations and unexecuted full model reproduction are listed separately.

The additional current_cohort_baseline_ci.csv has 2,025 metric rows, directly flattened from the 27 SHA-bound current baseline collections. Exact population, transferred-model role, target/available counts and bootstrap method remain in every record.

Final executable fixture catalog: 41 aggregate collections / 428,146 rows. It includes accepted Overall sensitivity/DNR, source-bound flow, 324 operating points, current2024 DCA and both corrected text-gain tables. Legacy interval files are retained only with audit-only labels.
