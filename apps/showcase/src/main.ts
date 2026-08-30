import '@handheld/tokens/tokens.css';
import '@handheld/components';
import './styles.css';

type View = 'overview' | 'activity' | 'forms' | 'settings';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div class="shell">
    <aside class="sidebar" aria-label="Primary navigation">
      <div class="brand">
        <div class="brand-mark">H</div>
        <div><strong>HANDHELD</strong><span>Showcase</span></div>
      </div>
      <nav class="sidebar-nav">
        <button type="button" class="nav-link is-active" data-view="overview"><hh-icon name="activity"></hh-icon><span>Overview</span></button>
        <button type="button" class="nav-link" data-view="activity"><hh-icon name="activity"></hh-icon><span>Activity</span></button>
        <button type="button" class="nav-link" data-view="forms"><hh-icon name="clipboard"></hh-icon><span>Forms</span></button>
        <button type="button" class="nav-link" data-view="settings"><hh-icon name="settings"></hh-icon><span>Settings</span></button>
      </nav>
      <div class="sidebar-bottom">
        <hh-status tone="success" label="System ready"></hh-status>
        <small>Stencil · Web Components</small>
      </div>
    </aside>

    <main class="main">
      <header class="topbar">
        <div class="topbar-title"><span class="eyebrow">PRODUCT SURFACE</span><h1 id="page-title">Overview</h1></div>
        <div class="topbar-actions">
          <button class="icon-control" id="theme-toggle" aria-label="Toggle theme"><hh-icon name="settings"></hh-icon></button>
          <button class="icon-control" id="menu-toggle" aria-label="Open navigation"><hh-icon name="menu-2"></hh-icon></button>
          <hh-button id="create-button"><hh-icon slot="start" name="plus"></hh-icon>Create</hh-button>
        </div>
      </header>

      <div class="content">
        <section class="view" data-panel="overview">
          <hh-alert tone="info" heading="HANDHELD is running the whole surface" dismissible>
            Every element below is composed from HANDHELD Web Components, tokens and Tabler Icons.
          </hh-alert>

          <div class="hero-grid">
            <div class="hero-copy">
              <span class="eyebrow">DESIGN SYSTEM IN ACTION</span>
              <h2>One system, many surfaces.</h2>
              <p>Use this application as the reference surface for composition, responsive behavior, accessibility and visual consistency.</p>
              <div class="hero-actions">
                <hh-button id="hero-create"><hh-icon slot="start" name="plus"></hh-icon>Create item</hh-button>
                <hh-button variant="secondary" id="hero-learn"><hh-icon slot="start" name="info-circle"></hh-icon>Explore system</hh-button>
              </div>
            </div>
            <hh-card class="hero-card">
              <span slot="header" class="card-heading">System health</span>
              <div class="health"><hh-status tone="success">Healthy</hh-status><strong>99.9%</strong></div>
              <p class="muted">Components are rendering consistently across the supported viewport matrix.</p>
              <div slot="footer" class="card-footer"><span>Last check</span><strong>Just now</strong></div>
            </hh-card>
          </div>

          <div class="metrics-grid">
            <hh-metric-card label="Components" value="24" trend="+4 this release" tone="positive"><hh-icon slot="icon" name="settings"></hh-icon></hh-metric-card>
            <hh-metric-card label="Visual states" value="86" trend="All core states covered" tone="positive"><hh-icon slot="icon" name="activity"></hh-icon></hh-metric-card>
            <hh-metric-card label="A11y checks" value="100%" trend="Keyboard + semantics" tone="positive"><hh-icon slot="icon" name="check"></hh-icon></hh-metric-card>
            <hh-metric-card label="Icon set" value="1" trend="Tabler only"><hh-icon slot="icon" name="settings"></hh-icon></hh-metric-card>
          </div>

          <section class="surface-grid">
            <hh-card>
              <span slot="header" class="card-heading">Recent activity</span>
              <div class="activity-list">
                <div class="activity-row"><span class="activity-icon"><hh-icon name="plus"></hh-icon></span><div><strong>New component</strong><p>hh-empty-state added to the showcase.</p></div><time>2m</time></div>
                <div class="activity-row"><span class="activity-icon"><hh-icon name="activity"></hh-icon></span><div><strong>Theme updated</strong><p>Dark mode tokens verified across surfaces.</p></div><time>18m</time></div>
                <div class="activity-row"><span class="activity-icon"><hh-icon name="check"></hh-icon></span><div><strong>Accessibility passed</strong><p>Keyboard and focus checks completed.</p></div><time>42m</time></div>
              </div>
              <div slot="footer" class="card-footer"><span>Showing latest</span><hh-button variant="tertiary" size="small" id="activity-link">View all</hh-button></div>
            </hh-card>

            <hh-card>
              <span slot="header" class="card-heading">Composition</span>
              <div class="composition-demo">
                <hh-status tone="info">Reusable</hh-status>
                <h3>Slots keep components open for composition.</h3>
                <p class="muted">Icons, actions and content can be inserted without changing component logic.</p>
                <div class="mini-actions"><hh-button size="small" variant="secondary">Secondary</hh-button><hh-button size="small">Primary</hh-button></div>
              </div>
            </hh-card>
          </section>
        </section>

        <section class="view" data-panel="activity" hidden>
          <div class="section-intro"><div><span class="eyebrow">DATA DISPLAY</span><h2>Activity</h2><p>Responsive tables, semantic status and toolbar composition.</p></div><hh-button><hh-icon slot="start" name="arrow-down"></hh-icon>Export</hh-button></div>
          <hh-toolbar>
            <span slot="start" class="toolbar-label">Recent events</span>
            <hh-input id="activity-search" placeholder="Search events" aria-label="Search events"></hh-input>
            <div slot="end"><hh-button size="small" variant="secondary">Filters</hh-button></div>
          </hh-toolbar>
          <div id="table-mount"></div>
          <div class="two-col">
            <hh-empty-state heading="No saved filters" description="Create a saved view to keep your most useful activity filters close at hand."><hh-icon slot="icon" name="settings"></hh-icon><div slot="actions"><hh-button>Create filter</hh-button></div></hh-empty-state>
            <hh-card><span slot="header" class="card-heading">Statuses</span><div class="status-stack"><hh-status tone="success">Ready</hh-status><hh-status tone="warning">Review</hh-status><hh-status tone="danger">Blocked</hh-status><hh-status tone="info">Processing</hh-status></div></hh-card>
          </div>
        </section>

        <section class="view" data-panel="forms" hidden>
          <div class="section-intro"><div><span class="eyebrow">FORMS + ACCESSIBILITY</span><h2>Forms</h2><p>Native semantics, clear errors and predictable focus behavior.</p></div></div>
          <div class="form-layout">
            <hh-card>
              <span slot="header" class="card-heading">Create workspace</span>
              <form id="demo-form" class="demo-form">
                <hh-input id="workspace-name" label="Workspace name" name="workspace" required hint="Use a short, recognizable name."></hh-input>
                <hh-input id="workspace-email" label="Owner email" name="email" type="email" required></hh-input>
                <hh-select id="workspace-type" label="Workspace type" name="type" required><option value="">Select one</option><option value="product">Product</option><option value="design">Design system</option><option value="internal">Internal</option></hh-select>
                <hh-textarea id="workspace-notes" label="Notes" name="notes" hint="Optional context for your team."></hh-textarea>
                <div class="check-row"><hh-checkbox id="workspace-agree" label="I understand this is a demo surface."></hh-checkbox></div>
                <div class="form-actions"><hh-button type="reset" variant="secondary">Reset</hh-button><hh-button type="submit">Create workspace</hh-button></div>
                <div id="form-feedback" aria-live="polite"></div>
              </form>
            </hh-card>
            <div class="form-side">
              <hh-card><span slot="header" class="card-heading">Form contract</span><ul class="contract-list"><li><hh-icon name="check"></hh-icon>Native form semantics</li><li><hh-icon name="check"></hh-icon>Associated labels and descriptions</li><li><hh-icon name="check"></hh-icon>Visible keyboard focus</li><li><hh-icon name="check"></hh-icon>Consistent validation states</li></ul></hh-card>
              <hh-alert tone="success" heading="Accessible by default">The components expose the semantics; the application only owns the workflow.</hh-alert>
            </div>
          </div>
        </section>

        <section class="view" data-panel="settings" hidden>
          <div class="section-intro"><div><span class="eyebrow">SYSTEM CONFIGURATION</span><h2>Settings</h2><p>A small surface for demonstrating tabs, disclosure and drawer composition.</p></div></div>
          <hh-tabs id="settings-tabs">
            <hh-tab value="appearance">Appearance</hh-tab>
            <hh-tab value="behavior">Behavior</hh-tab>
            <hh-tab-panel slot="panel" value="appearance"><div class="settings-panel"><hh-switch label="Dark mode" id="settings-dark"></hh-switch><hh-switch label="Reduced motion" id="settings-motion"></hh-switch><hh-accordion multiple><hh-accordion-item value="tokens" label="Tokens"><p>Primitive and semantic tokens provide the visual foundation.</p></hh-accordion-item><hh-accordion-item value="icons" label="Icons"><p>HANDHELD exposes Tabler Icons through a minimal hh-icon API.</p></hh-accordion-item></hh-accordion></div></hh-tab-panel>
            <hh-tab-panel slot="panel" value="behavior"><div class="settings-panel"><hh-alert tone="info" heading="Keyboard first">Try Tab, Enter, Space and Escape across the surface.</hh-alert><hh-button id="open-drawer">Open drawer</hh-button></div></hh-tab-panel>
          </hh-tabs>
        </section>
      </div>
    </main>
  </div>
  <hh-dialog id="create-dialog" label="Create item"><p>This dialog demonstrates native dialog semantics, focus restoration and composable footer actions.</p><div slot="footer"><hh-button variant="secondary" id="cancel-dialog">Cancel</hh-button><hh-button id="confirm-dialog">Create item</hh-button></div></hh-dialog>
  <hh-drawer id="mobile-drawer" label="Navigation"><div class="drawer-nav"><button type="button" data-view="overview">Overview</button><button type="button" data-view="activity">Activity</button><button type="button" data-view="forms">Forms</button><button type="button" data-view="settings">Settings</button></div></hh-drawer>
`;

const table = document.createElement('hh-data-table') as HTMLElement & { columns: unknown; rows: unknown };
table.columns = [
  { key: 'name', label: 'Event' },
  { key: 'status', label: 'Status' },
  { key: 'owner', label: 'Owner' },
  { key: 'amount', label: 'Value', numeric: true },
];
table.rows = [
  { name: 'Component published', status: 'Ready', owner: 'Maya', amount: '$2,410' },
  { name: 'Visual baseline', status: 'Review', owner: 'Leo', amount: '$860' },
  { name: 'A11y audit', status: 'Ready', owner: 'Nina', amount: '$1,240' },
  { name: 'Token update', status: 'Ready', owner: 'Owen', amount: '$540' },
];
document.querySelector('#table-mount')!.appendChild(table);

const dialog = document.querySelector('#create-dialog') as HTMLElement & { show: () => Promise<void> };
document.querySelectorAll('#create-button, #hero-create').forEach((button) => button.addEventListener('hhPress', () => dialog.show()));
document.querySelector('#cancel-dialog')?.addEventListener('hhPress', () => (dialog as HTMLElement & { close: () => Promise<void> }).close());
document.querySelector('#confirm-dialog')?.addEventListener('hhPress', () => (dialog as HTMLElement & { close: () => Promise<void> }).close());

document.querySelector('#theme-toggle')?.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme === 'dark';
  document.documentElement.dataset.theme = dark ? 'light' : 'dark';
});

document.querySelector('#menu-toggle')?.addEventListener('click', () => (document.querySelector('#mobile-drawer') as HTMLElement & { show: () => Promise<void> }).show());
document.querySelector('#open-drawer')?.addEventListener('hhPress', () => (document.querySelector('#mobile-drawer') as HTMLElement & { show: () => Promise<void> }).show());

document.querySelector('#settings-dark')?.addEventListener('hhChange', (event) => {
  const checked = (event as CustomEvent<boolean>).detail;
  document.documentElement.dataset.theme = checked ? 'dark' : 'light';
});

document.querySelector('#demo-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const feedback = document.querySelector('#form-feedback')!;
  feedback.innerHTML = '<hh-alert tone="success" heading="Workspace created">The demo workflow completed successfully.</hh-alert>';
});

document.querySelectorAll('.nav-link, .drawer-nav button').forEach((item) => {
  item.addEventListener('click', () => switchView(item.getAttribute('data-view') as View));
});

document.querySelector('#activity-link')?.addEventListener('hhPress', () => switchView('activity'));

function switchView(view: View) {
  document.querySelectorAll<HTMLElement>('.view').forEach((panel) => { panel.hidden = panel.dataset.panel !== view; });
  document.querySelectorAll('.nav-link').forEach((item) => item.classList.toggle('is-active', item.getAttribute('data-view') === view));
  const title = document.querySelector('#page-title');
  if (title) title.textContent = view[0].toUpperCase() + view.slice(1);
  document.querySelectorAll('.drawer-nav button').forEach((item) => item.classList.toggle('is-active', item.getAttribute('data-view') === view));
}
