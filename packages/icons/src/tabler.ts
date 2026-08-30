export type TablerNode = readonly [string, Record<string, string | number>];

export type TablerIconName =
  | 'activity'
  | 'alert-circle'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'check'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'circle-x'
  | 'info-circle'
  | 'loader'
  | 'menu-2'
  | 'minus'
  | 'plus'
  | 'search'
  | 'settings'
  | 'user'
  | 'x';

const icons: Record<TablerIconName, readonly TablerNode[]> = {
  activity: [
    ['path', { d: 'M3 12h4l3 -9l4 18l3 -9h4' }],
  ],
  'alert-circle': [
    ['circle', { cx: '12', cy: '12', r: '9' }],
    ['line', { x1: '12', y1: '8', x2: '12', y2: '12' }],
    ['line', { x1: '12', y1: '16', x2: '12.01', y2: '16' }],
  ],
  'arrow-down': [
    ['line', { x1: '12', y1: '5', x2: '12', y2: '19' }],
    ['path', { d: 'M18 13l-6 6l-6 -6' }],
  ],
  'arrow-left': [
    ['line', { x1: '5', y1: '12', x2: '19', y2: '12' }],
    ['path', { d: 'M5 12l6 6m-6 -6l6 -6' }],
  ],
  'arrow-right': [
    ['line', { x1: '5', y1: '12', x2: '19', y2: '12' }],
    ['path', { d: 'M13 18l6 -6m-6 -6l6 6' }],
  ],
  'arrow-up': [
    ['line', { x1: '12', y1: '19', x2: '12', y2: '5' }],
    ['path', { d: 'M6 11l6 -6l6 6' }],
  ],
  check: [
    ['path', { d: 'M5 12l5 5l10 -10' }],
  ],
  'chevron-down': [
    ['path', { d: 'M6 9l6 6l6 -6' }],
  ],
  'chevron-left': [
    ['path', { d: 'M15 6l-6 6l6 6' }],
  ],
  'chevron-right': [
    ['path', { d: 'M9 6l6 6l-6 6' }],
  ],
  'chevron-up': [
    ['path', { d: 'M6 15l6 -6l6 6' }],
  ],
  'circle-x': [
    ['circle', { cx: '12', cy: '12', r: '9' }],
    ['path', { d: 'M10 10l4 4m0 -4l-4 4' }],
  ],
  'info-circle': [
    ['circle', { cx: '12', cy: '12', r: '9' }],
    ['line', { x1: '12', y1: '8', x2: '12.01', y2: '8' }],
    ['path', { d: 'M11 12h1v4h1' }],
  ],
  loader: [
    ['path', { d: 'M12 3a9 9 0 1 0 9 9' }],
  ],
  'menu-2': [
    ['line', { x1: '4', y1: '6', x2: '20', y2: '6' }],
    ['line', { x1: '4', y1: '12', x2: '20', y2: '12' }],
    ['line', { x1: '4', y1: '18', x2: '20', y2: '18' }],
  ],
  minus: [
    ['line', { x1: '5', y1: '12', x2: '19', y2: '12' }],
  ],
  plus: [
    ['line', { x1: '12', y1: '5', x2: '12', y2: '19' }],
    ['line', { x1: '5', y1: '12', x2: '19', y2: '12' }],
  ],
  search: [
    ['circle', { cx: '11', cy: '11', r: '7' }],
    ['line', { x1: '20', y1: '20', x2: '16', y2: '16' }],
  ],
  settings: [
    ['circle', { cx: '12', cy: '12', r: '3' }],
    ['path', { d: 'M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1 .1l-1.4 1.4l-.1 -.1a1.7 1.7 0 0 0 -1.9 -.3a1.7 1.7 0 0 0 -1 1.5v.1h-2v-.1a1.7 1.7 0 0 0 -1 -1.5a1.7 1.7 0 0 0 -1.9 .3l-.1 .1l-1.4 -1.4l.1 -.1a1.7 1.7 0 0 0 .3 -1.9a1.7 1.7 0 0 0 -1.5 -1h-.1v-2h.1a1.7 1.7 0 0 0 1.5 -1a1.7 1.7 0 0 0 -.3 -1.9l-.1 -.1l1.4 -1.4l.1 .1a1.7 1.7 0 0 0 1.9 .3a1.7 1.7 0 0 0 1 -1.5v-.1h2v.1a1.7 1.7 0 0 0 1 1.5a1.7 1.7 0 0 0 1.9 -.3l.1 -.1l1.4 1.4l-.1 .1a1.7 1.7 0 0 0 -.3 1.9a1.7 1.7 0 0 0 1.5 1h.1v2h-.1a1.7 1.7 0 0 0 -1.5 1z' }],
  ],
  user: [
    ['path', { d: 'M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' }],
    ['path', { d: 'M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' }],
  ],
  x: [
    ['path', { d: 'M18 6l-12 12' }],
    ['path', { d: 'M6 6l12 12' }],
  ],
};

export function resolveTablerIcon(name: string): readonly TablerNode[] | undefined {
  const normalized = name.trim().toLowerCase() as TablerIconName;
  return icons[normalized];
}

export function isTablerIconName(name: string): name is TablerIconName {
  return Boolean(resolveTablerIcon(name));
}
