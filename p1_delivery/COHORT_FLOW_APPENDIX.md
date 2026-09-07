# Source-bound cohort flow

The source inventory and analysis populations are distinct levels. The 360,564 source rows are an existing seal-manifest count, not a new raw-data read. The available through-2024 source projection has 287,646 rows. Eligibility leaves 34,428 adult EMT records; 179 duplicate rows are removed, leaving 26,745 development and 7,504 validation records. Removing 1,961 development records from 1,042 overlapping patient groups leaves **24,784 development records / 19,944 groups**, and **7,504 validation records / 6,600 groups**. Recorded post-purge patient overlap is zero. These additions/subtractions are independently checked against the Stage1a manifest.

| Scope | Step | Split | N | Patients |
|---|---|---|---|---|
| source_inventory | sealed raw source rows (inventory only) | all_source_years_metadata_only | 360564 | not in this aggregate |
| source_inventory | development source rows | through_2024 | 287646 | not in this aggregate |
| Stage1a | eligible adult EMT rows before deduplication | through_2024 | 34428 | not in this aggregate |
| Stage1a | duplicate rows removed | through_2024 | 179 | not in this aggregate |
| Stage1a | development rows before patient purge | 2020_2023 | 26745 | not in this aggregate |
| Stage1a | development rows removed by patient isolation | 2020_2023 | 1961 | not in this aggregate |
| Stage1a | retained | train_2020_2023 | 24784 | 19944 |
| Stage1a | retained | validation_2024 | 7504 | 6600 |
| medicine | exact OP_NAME branch retained | overall_le2024 | 20765 | 16274 |
| medicine | exact OP_NAME branch retained | train_2020_2023 | 15995 | 12203 |
| medicine | exact OP_NAME branch retained | validation_2024 | 4770 | 4071 |
| surgery | exact OP_NAME branch retained | overall_le2024 | 11443 | 11090 |
| surgery | exact OP_NAME branch retained | train_2020_2023 | 8731 | 8433 |
| surgery | exact OP_NAME branch retained | validation_2024 | 2712 | 2657 |

The final displayed Overall 2024 cohort contains 7,289 records for the common full-population models, whereas native specialty cohorts contain 4,770 Medicine and 2,712 Surgery records. The different extraction/accepted-source lineages are shown as separate branches, not a falsely reconstructed 215-person exclusion. Each current model's exact N/events remains in current_validation_ci.csv. Score complete-component populations can differ further. A current native specialty population must not be pooled with or substituted for the different final Overall cohort.

Original non-linked/non-transport exclusion counts, exact accrual/follow-up dates and linkage-quality practice not in these manifests remain custodian facts (AUTHOR_DECLARATIONS.md items 1, 8–10), not zeros or inferred patient identities. Sources: Stage1a feature manifest, exact specialty cohort summaries and current model CI aggregates.
