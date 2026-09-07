# EMT P1_04 Medicine/Surgery full ablation and sensitivity delivery

This package is an aggregate reporting handoff. It contains no patient-level rows, model binaries or credentials. Existing accepted research evidence and all captured task roots remain immutable.

## Coverage

- Logical task grid: **494/494** terminal validated, pending **0**.
- Distributed cloud work: **316/316** assignments covered exactly once; validated cloud dispositions **316/316**; unfinished candidates **0**.
- Producer checks: **144,624**, failures **0**; independent packet checks: **18**, failures **0**.
- Dispositions: `473` computed, `12` with explicitly limited components, `9` not estimable.

The earlier 322-pending snapshot was taken before six local tasks completed. The cloud assignment therefore correctly contained 316 genuinely unstarted items; no item was omitted.

## Account allocation

| Account | Assigned | Ordinary | Semantic-limited | Direct revalidated | Not estimable |
|---|---:|---:|---:|---:|---:|
| account-01 | 32 | 7 | 25 | 0 | 0 |
| account-02 | 32 | 6 | 23 | 2 | 1 |
| account-03 | 32 | 6 | 23 | 2 | 1 |
| account-04 | 32 | 4 | 24 | 3 | 1 |
| account-05 | 32 | 5 | 24 | 2 | 1 |
| account-06 | 32 | 7 | 23 | 1 | 1 |
| account-07 | 31 | 6 | 24 | 1 | 0 |
| account-08 | 31 | 6 | 24 | 1 | 0 |
| account-09 | 31 | 4 | 22 | 3 | 2 |
| account-10 | 31 | 5 | 23 | 2 | 1 |

Each account used private, internet-disabled kernels with its own credential; each terminal kernel was captured once. Completed/limited/not-estimable statuses are task-level dispositions, not an assertion of scientific acceptance.

## Aggregate table rows

| Table | Rows |
|---|---:|
| `medicine/ablation_comparison.csv` | 454 |
| `medicine/age_comparison.csv` | 36 |
| `medicine/city_comparison.csv` | 18 |
| `medicine/congestion_comparison.csv` | 12 |
| `medicine/dnr_comparison.csv` | 108 |
| `medicine/grouped_cv_comparison.csv` | 36 |
| `medicine/missingness_comparison.csv` | 156 |
| `medicine/mortality_comparison.csv` | 8 |
| `medicine/p3_airway_comparison.csv` | 8 |
| `surgery/ablation_comparison.csv` | 450 |
| `surgery/age_comparison.csv` | 36 |
| `surgery/city_comparison.csv` | 18 |
| `surgery/congestion_comparison.csv` | 12 |
| `surgery/dnr_comparison.csv` | 108 |
| `surgery/grouped_cv_comparison.csv` | 36 |
| `surgery/missingness_comparison.csv` | 147 |
| `surgery/mortality_comparison.csv` | 8 |
| `surgery/p3_airway_comparison.csv` | 8 |

## Scientific boundaries

- No verification fit, prediction call, HPO, selection change or new raw-2025 access was performed.
- The 18 corrected time items use the current corrected-time plan; old20 evidence is secondary and contributes zero completion increments.
- Not-estimable components retain their explicit disposition; no numerical value or cohort was fabricated.
- `scientific_acceptance=false`, `formal_acceptance=false`, and `full_study_complete=false` remain unchanged.

## Bound evidence

- Assembly receipt: `D:\Codex_分拆Prompt嚴格無到院\outputs\v2\.p104k10\full_assembly_20260906T211456Z_v3\assembly_receipt.json` (SHA-256 `98868cfaa68b850f791f8a272280d992d90b7b516af678f87cd0a288f86928c4`).
- Independent packet validation: `D:\Codex_分拆Prompt嚴格無到院\outputs\v2\.p104k10\full_assembly_20260906T211456Z_v3\independent_validation.json` (SHA-256 `4ddfec6427b85d17af1abef944d830b7313de68b9e03980bab243cefc86d2e26`).
- Ten-account reconciliation: `D:\Codex_分拆Prompt嚴格無到院\outputs\v2\.p104k10\fleet_return_reconciliation_20260906T211456Z_v2.json` (SHA-256 `6ae9f02eae3030b14eed5533bb038b1eb0aba1d2b038ff17ce7f7f5ee017d600`).
- Dedicated semantic and estimability reports remain under the `.p104k10` validation roots and are referenced by the reconciliation manifest.
