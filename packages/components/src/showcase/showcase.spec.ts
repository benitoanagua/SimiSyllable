import { newSpecPage } from '@stencil/core/testing';
import { HhMetricCard } from './metric-card';
import { HhStatus } from './status';
import { HhAlert } from './alert';
import { HhEmptyState } from './empty-state';
import { HhDataTable } from './data-table';
import { HhToolbar } from './toolbar';

describe('showcase components', () => {
  it('renders the compositional set', async () => {
    const page = await newSpecPage({ components: [HhMetricCard, HhStatus, HhAlert, HhEmptyState, HhDataTable, HhToolbar], html: '<hh-metric-card label=Users value=42></hh-metric-card>' });
    expect(page.root).toBeTruthy();
  });
});
