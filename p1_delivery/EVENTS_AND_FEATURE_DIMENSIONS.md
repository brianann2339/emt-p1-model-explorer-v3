# Events, inputs and model complexity

The table reports development encounters and positive outcomes against the locked transformed input dimension. Overall uses Stage1a candidate inputs (766); Medicine/Surgery use the P1_04 scaled-logistic input (764). Neither is a claim that every final model used the same dimension. Ratios are events per transformed input column, not effective degrees of freedom and not a pass/fail sample-size rule. Independent patients are 19,944 in the overall Stage1a source; specialty patient counts are unavailable in these arm-level aggregate tables.

| Group | Outcome | Development N | Events | Input dimensions | Events / input dimension | Independent patients |
|---|---|---|---|---|---|---|
| medicine | P1 | 15995 | 129 | 764 | 0.168848167539267 | NOT_IN_THIS_AGGREGATE |
| medicine | P2 | 15995 | 1581 | 764 | 2.069371727748691 | NOT_IN_THIS_AGGREGATE |
| medicine | P3 | 15995 | 703 | 764 | 0.9201570680628273 | NOT_IN_THIS_AGGREGATE |
| medicine | S1 | 15995 | 427 | 764 | 0.5589005235602095 | NOT_IN_THIS_AGGREGATE |
| medicine | S2 | 15995 | 696 | 764 | 0.9109947643979057 | NOT_IN_THIS_AGGREGATE |
| medicine | S3 | 15995 | 6010 | 764 | 7.866492146596858 | NOT_IN_THIS_AGGREGATE |
| medicine | S4 | 15995 | 2086 | 764 | 2.730366492146597 | NOT_IN_THIS_AGGREGATE |
| medicine | S5 | 15995 | 351 | 764 | 0.4594240837696335 | NOT_IN_THIS_AGGREGATE |
| medicine | S6 | 15995 | 1018 | 764 | 1.3324607329842932 | NOT_IN_THIS_AGGREGATE |
| surgery | P1 | 8731 | 9 | 764 | 0.011780104712041885 | NOT_IN_THIS_AGGREGATE |
| surgery | P2 | 8731 | 120 | 764 | 0.15706806282722513 | NOT_IN_THIS_AGGREGATE |
| surgery | P3 | 8731 | 56 | 764 | 0.07329842931937172 | NOT_IN_THIS_AGGREGATE |
| surgery | S1 | 8731 | 33 | 764 | 0.04319371727748691 | NOT_IN_THIS_AGGREGATE |
| surgery | S2 | 8731 | 52 | 764 | 0.06806282722513089 | NOT_IN_THIS_AGGREGATE |
| surgery | S3 | 8731 | 1613 | 764 | 2.1112565445026177 | NOT_IN_THIS_AGGREGATE |
| surgery | S4 | 8731 | 425 | 764 | 0.556282722513089 | NOT_IN_THIS_AGGREGATE |
| surgery | S5 | 8731 | 34 | 764 | 0.04450261780104712 | NOT_IN_THIS_AGGREGATE |
| surgery | S6 | 8731 | 103 | 764 | 0.13481675392670156 | NOT_IN_THIS_AGGREGATE |
| overall | P1 | 24784 | 138 | 766 | 0.1801566579634465 | 19944 |
| overall | P2 | 24784 | 1701 | 766 | 2.220626631853786 | 19944 |
| overall | P3 | 24784 | 759 | 766 | 0.9908616187989556 | 19944 |
| overall | S1 | 24784 | 460 | 766 | 0.6005221932114883 | 19944 |
| overall | S2 | 24784 | 748 | 766 | 0.9765013054830287 | 19944 |
| overall | S3 | 24784 | 7664 | 766 | 10.005221932114882 | 19944 |
| overall | S4 | 24784 | 2512 | 766 | 3.279373368146214 | 19944 |
| overall | S5 | 24784 | 385 | 766 | 0.5026109660574413 | 19944 |
| overall | S6 | 24784 | 1121 | 766 | 1.4634464751958225 | 19944 |

Surgery/P1 has nine development events, so precise risk estimation and model complexity are substantial concerns. No universal EPV cutoff certifies the regularized/foundation/neural/ensemble models. Exact trainable parameter counts and effective-complexity measures remain model-specific and are not inferred from input dimensions. This appendix supplies available accounting, not a favorable adequacy judgment.
