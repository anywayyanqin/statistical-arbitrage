# Design QA

- Source visual truth: `/var/folders/3f/7q9w80_d6mlgjr4_ykxp4wm40000gn/T/codex-clipboard-3457f046-b032-4fa4-9961-520b6dcc033e.png`, `/var/folders/3f/7q9w80_d6mlgjr4_ykxp4wm40000gn/T/codex-clipboard-ae793451-f178-4259-8a27-784717f88431.png`, configuration-toolbar reference `/var/folders/3f/7q9w80_d6mlgjr4_ykxp4wm40000gn/T/codex-clipboard-7f1c5044-f19b-4a41-9559-506ea6780059.png`, and linked trade-list reference `/var/folders/3f/7q9w80_d6mlgjr4_ykxp4wm40000gn/T/codex-clipboard-16190637-b2fe-40bc-a620-25b299941779.png`
- Implementation screenshot: final in-app browser capture of `http://localhost:8000/?qa=remove-signal` (captured during final QA; browser-managed screenshot was not exported to disk)
- Viewport: 1080 × 719 CSS px, desktop
- Source pixels: 2875 × 1433, 2867 × 1454, focused toolbar crop 2679 × 618, and linked-trade reference 2770 × 1447; normalized by fitting the desktop composition into the implementation viewport and comparing toolbar/trade regions separately
- Implementation pixels: 1080 × 719 at the in-app browser's native density
- State: RU–NR selected, 1Y range, expanded combination sidebar, default editable configuration applied; latest responsive QA captured with `价差带` active after both splitters were dragged

## Full-view comparison evidence

The implementation preserves the reference's dominant hierarchy: compact top command bar, large chart-first upper region, and a bordered strategy tester below. The requested project-specific adaptation is present: the left side is a searchable arbitrage-combination library with collapse/expand behavior; the right side is the candlestick chart; the lower region combines key performance metrics, equity/drawdown, recent B/S signals, and a full trade table tab.

The implementation intentionally omits TradingView's global drawing and utility side rails because they are not part of the statistical-arbitrage workflow. This gives the main chart the same visual priority without copying unrelated product chrome.

## Focused region comparison evidence

- Upper chart: candle density, fine grid, right price scale, period selector, instrument header, and B/S markers match the reference's trading-workspace rhythm.
- Lower tester: tabbed header, parameter strip, large numeric metrics, chart/table modes, compact row density, and semantic green/red states follow the reference.
- Configuration toolbar: editable date range, capital, strategy preset, direction, cost, and adjustment controls now sit above the performance/trade tabs, matching the reference hierarchy.
- Linked trades: each transaction is grouped into a close/current-position row and an entry row, with direction, date, spread value, holding period, return, PnL, and cumulative NAV aligned in TV-like columns.
- Chart linkage: the chart shows only circular `B` / `S` action points. A directional arrow connects each opening action to its closing action, hover exposes a compact trade tooltip, and clicking a point opens and highlights the corresponding table group.
- Status filtering: the table's status header is an inline selector with `全部状态 / 开仓 / 平仓`; filtered views retain the same linked-trade behavior and TV-like density.
- Left library: designed as the requested project-specific addition; selection, search, and collapse states were tested in the browser.
- Single-screen workspace: at the 1082 × 719 laptop viewport, the full chart, configuration row, performance tabs, metric summary, and the beginning of the performance chart remain inside the viewport with no document scroll.
- Resizable regions: a TV-like horizontal splitter adjusts chart/tester height, and a vertical splitter adjusts the combination-library/chart width; canvases redraw continuously after either change.
- Spread band: the active `价差带` view renders a visible MA20 centerline, dashed ±2σ boundaries, and a translucent band while preserving candles and B/S linking.

## Required fidelity surfaces

- Fonts and typography: system UI stack matches the neutral TradingView-like tone; hierarchy, small labels, numeric metrics, and dense table copy remain readable at the tested viewport.
- Spacing and layout rhythm: 6 px workspace gutters, fine panel dividers, 54 px top bar, chart-first proportions, and compact controls are consistent across regions.
- Colors and visual tokens: white panels, cool gray canvas, fine gray rules, blue selected states, green gains/buys, and red losses/sells map cleanly to the source visual language.
- Image quality and asset fidelity: the reference contains no product imagery requiring raster assets. Charts are rendered sharply at device pixel density; no placeholder imagery is used.
- Copy and content: all labels are adapted to Chinese statistical-arbitrage terminology and use the project's real pair names and mock-backtest output.

## Findings

No actionable P0/P1/P2 visual or interaction mismatches remain for the requested adaptation.

## Interaction and technical checks

- Sidebar collapse and expand: passed.
- Combination switching with synchronized chart and tester data: passed.
- Range switching: passed.
- Performance / B/S trade tracking tabs: passed.
- Backtest rerun control: passed.
- Editable configuration dirty state and apply flow: passed; changing the start date updates the status to `配置待应用`, and applying it recalculates the strategy output.
- B/S-only marker rendering and directional holding-period arrow: passed.
- Status selector: `开仓` passed with 13 entry rows; `平仓` passed with 12 closed-trade rows and correctly excludes the current open position.
- Chart marker click to BS tab, scroll, and selected-row highlight: passed with trade 13.
- Trade-row hover/click back to chart highlight: passed.
- Horizontal chart/tester resize: passed by dragging the divider upward at 1082 × 719.
- Vertical library/chart resize: passed by narrowing the left library; chart and band reflowed correctly.
- `K线 / 价差带` view switching: passed; the final QA state is `价差带`.
- Browser console errors and warnings: none.

## Comparison history

- Initial implementation pass: the lower tester used a static parameter summary and an unnecessary pair-specific title.
- Annotation iteration: removed the title, promoted the configuration toolbar above the tabs, replaced static text with editable native controls, and added pending/applied/running states.
- Post-fix evidence: final in-app browser capture at 1080 × 719 shows the toolbar above `绩效概览 / BS 买卖点跟踪`; all controls fit without clipping and the browser console contains no errors or warnings.
- Linked-trade iteration: replaced one-line trade summaries with paired entry/exit rows, added chart markers and holding connectors, and implemented bidirectional hover/click linking.
- Linked-trade post-fix evidence: clicking the visible rightmost `B开` marker switched to `BS 买卖点跟踪`, scrolled to trade 13, and highlighted its paired rows; console remained free of errors and warnings.
- B/S annotation iteration: replaced `B开 / S开 / 平` labels with action-only circular `B / S` points, made closing points use the opposite action, and added an arrowhead to every completed holding connector. Added the status-header selector for all/open/close views.
- B/S post-fix evidence: final 1080 × 719 browser capture shows circular B/S points without phase text, the selected trade's solid blue directional arrow, and `全部状态` in the table header. Browser interaction verified `开仓` and `平仓` filtered views; console errors and warnings remained empty.
- Laptop-layout iteration: the previous minimum row heights forced the workspace beyond a short laptop viewport and the chart buttons were static. Replaced the fixed minimums with a bounded single-screen grid, added horizontal/vertical splitters, compacted controls below 800 px viewport height, and implemented chart-layer state.
- Laptop-layout post-fix evidence: the final 1082 × 719 in-app browser capture contains both main modules without page overflow. The screenshot after dragging shows a narrower library, a taller tester, and the Bollinger-style spread band redrawn across the resized chart. `K线`, `价差带`, and `指标` switching produced no console errors or warnings.
- Toolbar annotation iteration: removed the unused `指标` control from the visible chart toolbar and limited chart-mode binding to `K线` and `价差带`, preserving the compact two-mode layout requested by the annotation.
- Pair-list annotation iteration: changed the library label to `推荐套利对`, kept the concrete pair names as the primary content, removed the secondary formula/industry annotations from each row, and shortened `BS 买卖点跟踪` to `BS点`.
- Pair-name annotation iteration: changed the recommended soybean-meal / rapeseed-meal pair label from `豆粕–菜粕` to the concrete English contract-code label `M–RM`.
- Performance-panel annotation iteration: removed the compact `最近 BS 信号` side panel from the performance view and expanded the cumulative-return chart across the full lower width; detailed BS tracking remains available in `BS点`.
- Performance-panel post-fix evidence: clean in-app browser capture shows the lower performance chart spanning the full width with no `最近 BS 信号` panel; clicking `BS点` still renders the linked-trade table and browser logs remain empty.
- Custom-spread annotation iteration: restored the compact builder below the pair search with two contract selectors and `+ / − / × / ÷` operator buttons. The `创建价差对` action calls the existing custom-pair model, adds the new pair to the library, and switches the chart to it.
- Custom-spread post-fix evidence: browser interaction created `M+RM`, the pair appeared in the list, the chart title switched to `M+RM价差`, and console errors/warnings remained empty.
- Direct-input custom-spread iteration: replaced the two select menus with TV-like editable symbol inputs, focused autocomplete suggestions, a live expression preview, clickable `+ / − / × / ÷` controls, and Enter-to-generate behavior.
- Direct-input post-fix evidence: at the current 1435 × 719 in-app browser viewport, typing `M` opened matching instrument suggestions, clicking `+` updated the preview to `M + NR`, and generating created `M+NR`, added it to the library, and switched the chart. Browser console errors/warnings remained empty.
- Navigation recovery iteration: restored the top-level `回测记录` route using the existing localStorage run schema, persisted current workbench backtests, and added `查看结果` / `载入参数` actions without removing the new chart workspace.
- Navigation recovery post-fix evidence: clicking `回测记录` opened the record table with persisted local runs; `查看结果` returned to the workbench with the saved RU–NR snapshot; browser console errors/warnings remained empty.
- Single-expression custom-spread iteration: removed the separate leg inputs and replaced them with one TV-like expression search field. Users can type symbols or contract codes, select autocomplete results, click inline `+ / − / × / ÷` insertion buttons, clear the expression, and press Enter to generate.
- Single-expression post-fix evidence: cleared the field, entered `M`, clicked `+`, entered `RM`, confirmed the live preview `M + RM`, generated the pair, and verified `M+RM` appeared in the library and became the active chart. Browser console errors/warnings remained empty.
- Unified-expression annotation iteration: removed the standalone pair search and live preview row. The single TV-like field now searches existing arbitrage pairs and instruments, supports inline operators, opens an existing pair when selected or confirmed, and creates a new pair when the expression is valid.
- Unified-expression post-fix evidence: `RU` displayed existing pair candidates; pressing Enter on `TA` opened `TA–MA`; `M+RM` and `RU−1.20×HC` generated custom pairs, with the latter retaining `1.20 ×` in the chart subtitle. Recommended `RU–NR` omitted the coefficient consistently, the `指标` toolbar button was absent, and static checks passed with no browser console errors observed.

## Follow-up polish

- P3: expose the MA window and standard-deviation multiplier as user-editable indicator parameters if the product scope expands.
- P3: replace the illustrative live quote label with a data-bound latest candle value when a real market feed is introduced.

final result: passed
