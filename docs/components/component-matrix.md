# HANDHELD Component Matrix

| Component | Native semantics | Keyboard | Focus | Loading | Error | Visual | A11y |
|---|---|---|---|---|---|---|---|
| `hh-icon` | SVG | n/a | n/a | n/a | n/a | ✓ | ✓ |
| `hh-button` | button | ✓ | ✓ | ✓ | n/a | ✓ | ✓ |
| `hh-icon-button` | button | ✓ | ✓ | ✓ | n/a | ✓ | ✓ |
| `hh-input` | input | ✓ | ✓ | n/a | ✓ | ✓ | ✓ |
| `hh-textarea` | textarea | ✓ | ✓ | n/a | ✓ | ✓ | ✓ |
| `hh-checkbox` | checkbox | ✓ | ✓ | n/a | n/a | ✓ | ✓ |
| `hh-radio` | radio | ✓ | ✓ | n/a | n/a | ✓ | ✓ |
| `hh-switch` | switch | ✓ | ✓ | n/a | n/a | ✓ | ✓ |
| `hh-select` | select | ✓ | ✓ | n/a | ✓ | ✓ | ✓ |
| `hh-card` | article/button pattern | ✓ | ✓ | n/a | n/a | ✓ | ✓ |
| `hh-badge` | status text | n/a | n/a | n/a | n/a | ✓ | ✓ |
| `hh-spinner` | status | n/a | n/a | ✓ | n/a | ✓ | ✓ |
| `hh-progress` | progressbar | n/a | n/a | ✓ | n/a | ✓ | ✓ |
| `hh-skeleton` | status | n/a | n/a | ✓ | n/a | ✓ | ✓ |
| `hh-toast-region` | status/alert queue | n/a | ✓ (returns focus) | n/a | n/a | ✓ | ✓ |
| `hh-menu` / `hh-menu-item` | menu/menuitem | ✓ (arrow/Home/End/Esc) | ✓ | n/a | n/a | ✓ | ✓ |
| `hh-pagination` | nav | ✓ | ✓ | n/a | n/a | ✓ | ✓ |
| `hh-breadcrumbs` / `hh-breadcrumb-item` | nav/ol | n/a | ✓ | n/a | n/a | ✓ | ✓ |
| `hh-avatar` | img/text fallback | n/a | n/a | n/a | ✓ (image error) | ✓ | ✓ |
| `hh-segmented-control` / `hh-segmented-item` | radiogroup/radio | ✓ | ✓ | n/a | n/a | ✓ | ✓ |
| `hh-slider` | range input | ✓ (native) | ✓ | n/a | n/a | ✓ | ✓ |
| `hh-combobox` / `hh-combobox-option` | combobox/listbox | ✓ (arrows/Home/End/Enter/Esc) | ✓ | n/a | ✓ | ✓ | ✓ |
| `hh-date-picker` | dialog/grid | ✓ (arrows/PageUp/PageDown/Home/End) | ✓ (roving tabindex) | n/a | ✓ | ✓ | ✓ |
| `hh-time-picker` | time input (native) | ✓ (native) | ✓ | n/a | ✓ | ✓ | ✓ |
| `hh-file-upload` | button + file input | ✓ (Enter/Space + native dialog) | ✓ | n/a | ✓ (type/size validation) | ✓ | ✓ |
