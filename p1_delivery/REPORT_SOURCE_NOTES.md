# Report shape and chart contract

Audience: technical research report, following the source prompt's manuscript requirement. Primary manuscript is Markdown; portable HTML supplies a reading and chart surface. Technical summary, definitions, evidence, methods, uncertainty, research implications and author-only questions are mapped to Abstract, Methods, Results, Discussion and Availability. Quantitative lookup appendices remain tables because exact N/events/intervals are the task.

Chart question: how does AUPRC change when inputs are restricted to vital signs? Grouped bars show 18 recorded same-cohort 2024 point differences across nine ordered outcome labels, with specialty as the second dimension. Shared reader palette and an explicit specialty legend distinguish series. Zero is the comparison reference. No paired error bars are fabricated. Full-width shared reader layout is validated at its delivered surface. Source: replayed same_cohort_deltas.csv, copied from exact original arm differences.

The earlier chart-free HTML attempt was rejected by the packaged report renderer. A source-backed bar was added because it usefully shows the outcome pattern. Initial renderer query requirements were resolved by actually selecting the aggregate data through SQLite and recording those exact SQL queries. The latest html_delivery_receipt.json records the reached QA level.
