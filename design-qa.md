# Design QA — 回测配置条

- Source visual truth: `/var/folders/jb/bdl4dk916f5bltlk2_5m4kyr0000gn/T/codex-clipboard-540b73cb-471d-4486-bece-8b7df5f23f3b.png`
- Implementation screenshot: `/Users/wangyanqin/WangYanQin/1. 机构客户服务平台/1. 产品内容-机构/44.4-统计套利合约/implementation-config.png`
- Focused implementation evidence: `/Users/wangyanqin/WangYanQin/1. 机构客户服务平台/1. 产品内容-机构/44.4-统计套利合约/implementation-config-focus.png`
- Browser viewport / implementation pixels: 1406 × 791 CSS px at device scale 1; screenshot 1406 × 791 px.
- Source pixels: 2192 × 224 px. The source is a cropped, wider configuration strip, so comparison was normalized by component structure and the focused configuration region rather than by full-page scale.
- State: 3 recommended pairs selected; default dates; 95% entry; 50% exit; 3% drawdown; ratio-forward adjustment. Interaction test also covered custom-entry mode, adjustment selection, and a completed three-pair backtest.

## Full-view comparison evidence

The final page keeps the reference strip above the sidebar/results workspace. All seven control groups are visible without horizontal overflow, and the sidebar remains the single source of truth for multi-pair selection.

## Focused-region comparison evidence

The focused capture verifies the reference hierarchy and order: pair selection, combined date range, segmented entry control, segmented exit control, drawdown, adjustment, and blue primary action. Labels, 40px control height, pale borders, compact spacing, and the selected blue segment follow the supplied visual.

## Findings

- No actionable P0/P1/P2 differences remain for the requested configuration interaction.
- P3: Native browser date fields use platform calendar glyphs rather than the exact calendar icon in the reference; this is acceptable for the current prototype and preserves keyboard/date-picker behavior.
- P3: The pair selector displays “已选 3 个组合” because the product supports multi-pair comparison, while the reference shows one pair. This is an intentional product adaptation.

## Comparison history

1. First rendered comparison found a P2 horizontal overflow and clipped control content because the reference strip was placed inside the narrower results column beside the 300px sidebar.
2. Fix: moved the configuration card above the sidebar/results workspace, expanded its desktop grid, and kept responsive two-column/one-column fallbacks.
3. Post-fix evidence: `implementation-config.png` and `implementation-config-focus.png` show the full strip without clipping or horizontal overflow.

## Required fidelity surfaces

- Typography: existing institutional UI font stack, 13px labels, compact 11–12px control text; hierarchy is consistent and readable.
- Spacing/layout: configuration card is full-width, 12px desktop gaps, 40px controls, aligned baselines, and responsive fallbacks.
- Colors/tokens: existing brand blue, neutral borders/backgrounds, and semantic focus treatment are reused.
- Image/assets: the source contains no product imagery; native calendar/select affordances are used, with no placeholder assets.
- Copy/content: labels and defaults match the reference; the multi-pair summary is intentionally adapted to the current comparison workflow.

## Verification

- JavaScript syntax check passed.
- Custom signal mode toggled successfully.
- Adjustment selection updated successfully.
- Three-pair backtest completed and rendered results/charts.
- Browser console had no errors or warnings.

## 2026-09-24 annotation iteration

- Additional source visual truth: `/var/folders/jb/bdl4dk916f5bltlk2_5m4kyr0000gn/T/codex-clipboard-a43e500e-e33e-41ca-a1c9-3c0f9a1daa51.png` (2560 × 1600 px), especially the two-panel price/spread chart.
- Revised implementation screenshot: `/Users/wangyanqin/WangYanQin/1. 机构客户服务平台/1. 产品内容-机构/44.4-统计套利合约/implementation-spread-chart.png` (1406 × 791 px, CSS viewport 1406 × 791, device scale 1).
- State: CU2601 and RU2605 entered through the searchable contract inputs, added as a custom spread, four-pair backtest completed, market chart visible.

### Findings and fixes

1. P2 — Free-combination controls were fixed selects and repeated the created combination as another sidebar row. Fixed by using searchable contract comboboxes and keeping created combinations only in the results/inspector.
2. P2 — Recommended rows repeated “已选 / 查看” even though the checkbox and focus treatment already conveyed state. Removed the redundant label.
3. P1 — The comparison flow lacked the source design's underlying-contract and synthesized-spread view. Added a switchable two-panel chart with leg prices, spread, rolling mean, and ±2σ bands.
4. Post-fix visual evidence shows readable line separation, aligned two-panel axes, a compact legend, and no horizontal overflow at the tested desktop viewport.

### Fidelity surfaces

- Typography: uses the existing institutional font hierarchy; chart labels and legends remain legible without competing with result metrics.
- Spacing/layout: the chart is placed between the result table and return comparison, preserving the page's analysis sequence.
- Colors/tokens: blue/orange leg lines, blue spread line, neutral mean, red upper band, and green lower band match the reference semantics.
- Image quality: no raster assets are required; data lines remain vector-sharp at the tested viewport.
- Copy/content: contract codes, Chinese names, formula, rolling mean, and ±2σ labels are explicit.

### Verification

- JavaScript syntax checks passed for `app.js` and `mock-data.js`.
- Fuzzy matching accepted partial Chinese names and specific contract codes.
- CU2601–RU2605 was added without a duplicate sidebar row.
- Four-combination backtest completed; the market chart and selector rendered.
- Browser console contained no errors or warnings.

## 2026-09-24 TradingView-style expression iteration

- Source visual truth: Browser Comment 1 additional attachment showing the TradingView symbol-search expression bar (conversation attachment; no local filesystem path exposed).
- Implementation screenshot: `/Users/wangyanqin/WangYanQin/1. 机构客户服务平台/1. 产品内容-机构/44.4-统计套利合约/implementation-expression-builder.png` (1406 × 791 px, CSS viewport 1406 × 791, device scale 1).
- State: search dropdown opened with “沪铜”; CU2601 selected; minus operator added; RU2601 selected; expression added to comparison.

### Findings and fixes

1. P2 — The earlier two-field builder required users to mentally map left and right legs. Replaced it with one expression field.
2. P2 — Contract search and arithmetic composition were separate concepts. The revised control keeps search, clear, and `÷ − + ×` actions together like the reference.
3. Post-fix evidence shows a compact three-row builder in the 300px sidebar, a readable dropdown, hover/focus affordances, and no overlap with the inspector below.

### Fidelity surfaces

- Typography: contract code is emphasized; Chinese contract name and market category are secondary.
- Spacing/layout: search bar and operator strip share a single framed control, with the primary “加入对比” action below.
- Colors/tokens: white fields, neutral borders, and brand-blue focus states reuse the institutional tokens.
- Image/assets: no imagery is required; the control uses native text and interaction elements.
- Copy/content: supports contract code/name search, clear action, four arithmetic operators, validation, and expression persistence.

### Verification

- Search by Chinese name returned CU2601/CU2605/CU2609.
- Contract selection, operator insertion, second-contract selection, and addition to comparison all passed.
- `CU2601 − RU2601` persisted in the field and inspector formula.
- JavaScript syntax checks passed; browser console contained no errors or warnings.

## 2026-09-24 Risk, frequency, and execution controls iteration

- Implementation screenshot: `/Users/wangyanqin/WangYanQin/1. 机构客户服务平台/1. 产品内容-机构/44.4-统计套利合约/implementation-risk-controls.png`.
- Source of truth: Browser Comments 1–7 in the current task.

### Findings and fixes

1. P1 — Custom entry and exit values incorrectly retained a percent suffix. The suffix now appears only in quantile mode; custom mode accepts an absolute spread value.
2. P1 — Recommended combinations did not expose executable contract detail. Rows now show concrete contract codes and the synthesized-spread formula.
3. P2 — The market chart could not change sampling frequency or review horizon. Added daily/minute display controls and 1/3/6/12-month/all lookbacks.
4. P1 — Risk and execution assumptions were incomplete. Added drawdown, volatility, capital allocation, daily order-time, minute interval, and per-combination capital controls.
5. P2 — Adjustment choices covered only one direction. Added forward- and backward-adjusted ratio/difference options plus unadjusted data.

### Verification

- `node --check app.js` and `node --check mock-data.js` passed.
- Reloaded the full page and verified the default view, comparison table, contract/spread chart, and return comparison render together.
- Custom-value mode hides the percent suffix; quantile mode retains it.
- Frequency-dependent execution controls switch between daily order time and minute interval.
- The market chart accepts frequency and lookback changes; minute data is explicitly marked as demo aggregation.
- No page-breaking browser errors were observed during the final reload.

final result: passed

## 2026-09-29 NAV baseline field removal

- Removed the visible `1.0000` NAV baseline field from the execution controls at the user's request.
- Kept the internal simulation baseline at NAV 1.0, while removing the implementation detail from the result snapshot copy.
- Reflowed the execution row to keep frequency, order timing, position, and volatility controls aligned.
- Verified the live page accessibility tree contains no `净值基准` or `1.0000` control.

final result: passed

## 2026-09-24 Combination and NAV terminology iteration

- Implementation screenshot: `/Users/wangyanqin/WangYanQin/1. 机构客户服务平台/1. 产品内容-机构/44.4-统计套利合约/implementation-sidebar-nav-risk.png`.
- Verified at the live local page after cache-busted reload.
- Sidebar selection count is a numeric capsule; recommended rows use main-contract symbols and formulas.
- The duplicate top combination selector and capital input are removed; normalized NAV starts at `1.0000`.
- Buy/sell labels and the drawdown full-liquidation help affordance are present.
- JavaScript syntax checks passed and the default comparison page rendered without breakage.

final result: passed
