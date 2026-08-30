export default { title: 'HANDHELD/Components/Overlays' };

export const DialogAndDrawer = {
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <hh-button onclick="document.querySelector('hh-dialog').show()">Open dialog</hh-button>
        <hh-button variant="secondary" onclick="document.querySelector('hh-drawer').show()">Open drawer</hh-button>
        <hh-tooltip text="Helpful context"><hh-icon name="info-circle" aria-label="Information"></hh-icon></hh-tooltip>
        <hh-dialog label="Confirm action"><p>This dialog uses the native dialog element and restores focus on close.</p><span slot="footer"><hh-button variant="secondary" onclick="document.querySelector('hh-dialog').close()">Cancel</hh-button><hh-button onclick="document.querySelector('hh-dialog').close()">Confirm</hh-button></span></hh-dialog>
        <hh-drawer label="Navigation"><hh-nav><hh-nav-item active href="#home">Home</hh-nav-item><hh-nav-item href="#settings">Settings</hh-nav-item></hh-nav></hh-drawer>
      </div>`
  })
};
