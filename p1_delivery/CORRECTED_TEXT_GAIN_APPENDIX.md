# Corrected paired text/no-text results

All 54 source-bound model/outcome pairs (36 current specialty, 18 earlier Overall) now have two independently validated split-specific results: 108 paired contrasts, 324 metric/interval rows. Each patient belongs once to the stratum defined by maximum outcome within that split. Both probability vectors use identical patient draws; the original task/split seeds and 2,000 replicates are preserved. Legacy overlapping-strata intervals are superseded and retained only for audit. Predictive models, predictions, folds and point estimates are unchanged.

The 18 Overall pairs are the earlier w03b source cohort, not the current final Overall display cohort. Nominal 95% intervals are not multiplicity-adjusted. Positive delta means AUPRC with text minus AUPRC without text; this is not a causal effect or evidence of prospective clinical benefit.

## Primary-outcome 2024 contrasts

| Group/outcome | Model | N/events | With-text AUPRC | No-text AUPRC | Delta [paired 95% CI] |
|---|---|---|---|---|---|
| medicine/P1 | ft_transformer | 4770/98 | 0.412510 | 0.446303 | -0.033792 [-0.092428, 0.024876] |
| medicine/P1 | mlp_plr | 4770/98 | 0.401502 | 0.407641 | -0.006139 [-0.059727, 0.053524] |
| medicine/P2 | ft_transformer | 4770/568 | 0.538827 | 0.539129 | -0.000302 [-0.011277, 0.010805] |
| medicine/P2 | mlp_plr | 4770/568 | 0.570880 | 0.565350 | 0.005530 [-0.003195, 0.014457] |
| medicine/P3 | ft_transformer | 4770/253 | 0.392109 | 0.304228 | 0.087881 [0.044176, 0.127663] |
| medicine/P3 | mlp_plr | 4770/253 | 0.356675 | 0.356796 | -0.000121 [-0.011104, 0.013018] |
| overall/P1 | ft_transformer | 7504/107 | 0.395484 | 0.497159 | -0.101675 [-0.163177, -0.027357] |
| overall/P1 | mlp_plr | 7504/107 | 0.429395 | 0.398146 | 0.031248 [0.003738, 0.057991] |
| overall/P2 | ft_transformer | 7504/609 | 0.543923 | 0.537916 | 0.006007 [-0.004609, 0.016308] |
| overall/P2 | mlp_plr | 7504/609 | 0.572982 | 0.566688 | 0.006294 [-0.002709, 0.015891] |
| overall/P3 | ft_transformer | 7504/285 | 0.347770 | 0.359216 | -0.011446 [-0.034520, 0.009680] |
| overall/P3 | mlp_plr | 7504/285 | 0.382671 | 0.370316 | 0.012355 [0.000184, 0.026435] |
| surgery/P1 | ft_transformer | 2712/9 | 0.126379 | 0.213227 | -0.086848 [-0.232287, 0.006404] |
| surgery/P1 | mlp_plr | 2712/9 | 0.570921 | 0.415259 | 0.155661 [0.021259, 0.352543] |
| surgery/P2 | ft_transformer | 2712/41 | 0.494167 | 0.395907 | 0.098260 [0.025962, 0.154635] |
| surgery/P2 | mlp_plr | 2712/41 | 0.424048 | 0.408568 | 0.015480 [-0.028936, 0.067235] |
| surgery/P3 | ft_transformer | 2712/32 | 0.521892 | 0.576235 | -0.054343 [-0.147211, 0.079235] |
| surgery/P3 | mlp_plr | 2712/32 | 0.618132 | 0.618551 | -0.000419 [-0.072938, 0.077436] |

## Nine-outcome 2024 descriptive pattern

The counts below summarize nominal intervals, not a post-hoc model selection or a corrected family-wise hypothesis test. Every model/outcome and both splits remain available in the accompanying CSVs.

| Group/model | Comparisons | Positive points | CI entirely >0 | CI entirely <0 | Delta range |
|---|---|---|---|---|---|
| overall/ft_transformer | 9 | 6 | 1 | 1 | -0.101675 to 0.039537 |
| overall/mlp_plr | 9 | 8 | 2 | 0 | -0.012186 to 0.031248 |
| medicine/ft_transformer | 9 | 6 | 3 | 0 | -0.033792 to 0.087881 |
| medicine/mlp_plr | 9 | 4 | 1 | 0 | -0.011685 to 0.009594 |
| surgery/ft_transformer | 9 | 3 | 1 | 0 | -0.086848 to 0.106945 |
| surgery/mlp_plr | 9 | 6 | 2 | 1 | -0.045888 to 0.155661 |
