# Independent frozen-calibration reporting validation

Status: **PASS — independent validation complete, 21,034 checks / 0 failures.** All 108 Overall task/model/spec cells and all 1,080 descriptive calibration bins agree with the independent recomputation. `validation.json` is the machine-readable final authority. This reviewer has no live process and will make no further patient-level reads.

Exactly one separately logged `test_2025` projection read was made from the allowlisted prediction artifact: **1,001,592 existing stored prediction/label rows**, using only the nine authorized task/row/outcome/component/split/label/probability/model-SHA/spec-SHA columns. A schema/footer-only inspection and one source-hash byte-stream scan were logged separately, not counted as patient projections. No patient-level table or row dump was persisted; independent evidence contains only bin aggregates, counts and identity hashes.

Results: maximum bin-statistic difference is **0**. All model/sample counts, event totals, task identities, binary model hashes, sealed-spec hashes, original-row-order hashes, row-set hashes, probability hashes and label hashes match. All 108 entity IDs map exactly to the already-public Overall model summary. Existing Brier values reconcile within `5.551115123125783e-17` floating roundoff; this was identity checking, not new selection or calibration fitting. The nine per-outcome files each contain 12 models / 120 bins, and all JSON/CSV/source/output hashes and numeric roundtrips pass.

There are **22 models with 84 tied bin boundaries**. Independent Python stable sorting plus explicit divmod-sized partitions agrees with the specialty `mergesort + array_split` recipe, including tie order. Ties retain original frozen-row order and may span adjacent bins; labels are consumed only after membership is fixed.

The sole patient-level input was the SHA-bound accepted `evaluation/predictions.parquet` named by the authorization. No raw2025 source, `sealed_cohort.parquet`, model file, sealed-spec file, model load, fit, predict, calibration fitting/selection, threshold change or Kaggle action occurred. Model/spec identities were checked using the accepted manifest and projected binding strings only. Authorized stored-2025 prediction access is disclosed; new raw2025 access remains zero.

The review used validate-data/analyze-data-quality checks for source identity, exact 108-task/model/spec coverage, one-to-one row identities, denominators, aggregation and presentation boundaries. These are descriptive reliability points only, not a fitted calibrator, new confidence band, or evidence of adequate calibration. Fixed 0–1 axes and an identity-line reference are correctly specified in the index; final Plotly/Edge rendering and the primary324 merge remain root-owned.

Recipe source reviewed: the bin-only subsequence in `scripts/build_p1_v2_specialty_p1_06_final_delivery_v1.py:191` and its independent validator counterpart at `scripts/validate_p1_v2_specialty_p1_06_final_delivery_v1.py:232` uses `np.argsort(prediction, kind="mergesort")` followed by `np.array_split(order, min(10, len(order)))`. The surrounding specialty function also fits intercept/slope before binning; that whole function must **not** be called for this new reporting task. Only the fixed bin aggregation is authorized and will be independently implemented here.

`events` is the **bin event count**, `rows` the bin denominator, `events_total` the whole-model event count, and `n` the whole-model denominator. Preserve these distinctions while merging with the existing216 specialty bin rows; the new108 validation does not claim that the not-yet-completed primary324 merge or browser rendering was inspected.

Final source/output bindings:
- `validation.json` SHA: `6010d6849dc7b755a0e5a9eb940afd86607ac5fb16f5752a9f3f2777480742b9`.
- Prediction source SHA: `3118c1555e4ed7c1fec3b7043c7c702c88a2ac242fa4bf8f9a72d5226d21db9f`.
- Accepted manifest SHA: `f9040a9261fbc477d5bd6b1f3000e2ad81626a8ee67f086633a2aec8ed9b2459`.
- `index.json` SHA: `995eb89dbb3fa2fe5afb3b22bac406b3e75952009dd7cca37c6c132ae1e3192c`.
- `bins.json` SHA: `5e50deda77b3fc3b2cf7e7f2e9c7b3fcc348553c5be2c110fc5b00dc04009975`.
- `bins.csv` SHA: `697594894708ba95570d28e6c30bd78af4fbd2c6e7a4bb0c0c171295bd83f24c`.
- `independent_expected_aggregates.json` SHA: `4899e15be25103df21bd7ce409104de5b860acba6a1889236673f8270beee73e`.
- `reviewer_access_ledger.jsonl` SHA: `638cbc5e7926e17023f21182835c0ecbbf650a8422ed00c9c9c6e53741f17316`.
- `independent_validator.py` SHA: `affd34aedb58ceb455156dae719a9563b75e35db2a7470865071fbad604e5131`.

Only reviewer files were written. Producer outputs and accepted evidence were untouched. Any later aggregate/display checks can reuse `independent_expected_aggregates.json`; they do not require another patient projection.
