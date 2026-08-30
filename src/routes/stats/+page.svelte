<script lang="ts">
  import * as topojson from 'topojson-client';
  import { scaleThreshold } from 'd3-scale';
  import { format } from 'd3-format';
  import { geoPath, geoAlbersUsa } from 'd3-geo';
  import { stateNames } from '$lib/data/stateNames';
  import usStates from '$lib/data/us-states.json';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let stats: Record<string, { total: number; firstYear: number }> = $state(data.stats);
  let totalMembers = $state(data.totalMembers);
  let years: string[] = data.years;
  let selectedYear = $state('all');
  let hoveredState: { abbr: string; total: number; pct: number; firstYear: number } | null =
    $state(null);
  let mouseX = $state(0);
  let mouseY = $state(0);

  const pctFormat = format('.1%');

  function pct(count: number): number {
    return totalMembers > 0 ? count / totalMembers : 0;
  }

  const colorScale = scaleThreshold<number, string>()
    .domain([0.01, 0.05, 0.1, 0.2])
    .range(['#fee0d2', '#fc9272', '#ef4444', '#b91c1c', '#7f1d1d']);

  function getColor(abbr: string): string {
    const count = stats[abbr]?.total || 0;
    if (count === 0) return '#d1d5db';
    return colorScale(pct(count));
  }

  function getStateLabel(abbr: string): string {
    const name = stateNames[abbr] || abbr;
    const total = stats[abbr]?.total || 0;
    return `${name}: ${total} member${total !== 1 ? 's' : ''}`;
  }

  async function fetchStats() {
    try {
      const params = new URLSearchParams();
      if (selectedYear !== 'all') params.set('year', selectedYear);
      const res = await fetch(`/api/stats?${params}`);
      if (!res.ok) throw new Error('Failed to load stats');
      const json = await res.json();
      stats = json.data;
      totalMembers = json.totalMembers;
    } catch (e) {
      console.error('Failed to load stats', e);
    }
  }

  const stateFipsToAbbr: Record<string, string> = {
    '01': 'AL',
    '02': 'AK',
    '04': 'AZ',
    '05': 'AR',
    '06': 'CA',
    '08': 'CO',
    '09': 'CT',
    '10': 'DE',
    '11': 'DC',
    '12': 'FL',
    '13': 'GA',
    '15': 'HI',
    '16': 'ID',
    '17': 'IL',
    '18': 'IN',
    '19': 'IA',
    '20': 'KS',
    '21': 'KY',
    '22': 'LA',
    '23': 'ME',
    '24': 'MD',
    '25': 'MA',
    '26': 'MI',
    '27': 'MN',
    '28': 'MS',
    '29': 'MO',
    '30': 'MT',
    '31': 'NE',
    '32': 'NV',
    '33': 'NH',
    '34': 'NJ',
    '35': 'NM',
    '36': 'NY',
    '37': 'NC',
    '38': 'ND',
    '39': 'OH',
    '40': 'OK',
    '41': 'OR',
    '42': 'PA',
    '44': 'RI',
    '45': 'SC',
    '46': 'SD',
    '47': 'TN',
    '48': 'TX',
    '49': 'UT',
    '50': 'VT',
    '51': 'VA',
    '53': 'WA',
    '54': 'WV',
    '55': 'WI',
    '56': 'WY'
  };

  const geojson = topojson.feature(usStates as any, (usStates as any).objects.states as any);
  const projection = geoAlbersUsa().fitSize([975, 610], geojson);
  const pathGen = geoPath().projection(projection);
  const features = (geojson as any).features;

  const svgPaths = features.map((f: any) => ({
    d: pathGen(f) || '',
    abbr: stateFipsToAbbr[f.id] || '',
    id: f.id
  }));
</script>

<svelte:head>
  <title>Where We're From - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-5xl">
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">Where We're From</h1>
      <p class="mt-2 text-gray-600">Our members have joined from across the country.</p>
      <p class="mt-1 text-xs text-gray-400">
        Note: Members who joined before the site launched in 2025 appear under 2025 in the year
        filter.
      </p>
    </div>

    <div class="mb-6 flex justify-center">
      <select
        bind:value={selectedYear}
        onchange={fetchStats}
        class="focus:border-primary-500 focus:ring-primary-500/20 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:ring-2 focus:outline-none"
      >
        <option value="all">All Years</option>
        {#each years as year}
          <option value={year}>{year}</option>
        {/each}
      </select>
    </div>

    <div class="rounded-2xl bg-white p-6 shadow-xl">
      <svg viewBox="0 0 975 610" class="w-full">
        {#each svgPaths as path}
          <path
            d={path.d}
            fill={getColor(path.abbr)}
            stroke="#fff"
            stroke-width="1"
            role="img"
            tabindex="0"
            aria-label={getStateLabel(path.abbr)}
            class="cursor-pointer transition-opacity hover:opacity-80 focus:opacity-80 focus:outline-none"
            onmouseenter={(e) => {
              const total = stats[path.abbr]?.total || 0;
              const firstYear = stats[path.abbr]?.firstYear || 0;
              hoveredState = { abbr: path.abbr, total, pct: pct(total), firstYear };
              mouseX = e.clientX;
              mouseY = e.clientY;
            }}
            onmousemove={(e) => {
              mouseX = e.clientX;
              mouseY = e.clientY;
            }}
            onmouseleave={() => {
              hoveredState = null;
            }}
            onfocus={(e) => {
              const total = stats[path.abbr]?.total || 0;
              const firstYear = stats[path.abbr]?.firstYear || 0;
              hoveredState = { abbr: path.abbr, total, pct: pct(total), firstYear };
              const rect = (e.currentTarget as SVGPathElement).getBoundingClientRect();
              mouseX = rect.left + rect.width / 2;
              mouseY = rect.top + rect.height / 2;
            }}
            onblur={() => {
              hoveredState = null;
            }}
          >
            <title>{getStateLabel(path.abbr)}</title>
          </path>
        {/each}
      </svg>

      <div class="mt-6 flex items-center justify-center gap-3 text-sm text-gray-600">
        <span>0%</span>
        <div class="flex overflow-hidden rounded">
          <div class="h-4 w-8" style="background: #d1d5db"></div>
          <div class="h-4 w-8" style="background: #fee0d2"></div>
          <div class="h-4 w-8" style="background: #fc9272"></div>
          <div class="h-4 w-8" style="background: #ef4444"></div>
          <div class="h-4 w-8" style="background: #b91c1c"></div>
          <div class="h-4 w-8" style="background: #7f1d1d"></div>
        </div>
        <span>20%+</span>
      </div>
    </div>

    {#if hoveredState}
      <div
        class="pointer-events-none fixed z-50 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg"
        style="left: {mouseX + 12}px; top: {mouseY + 12}px;"
      >
        <p class="font-semibold">{stateNames[hoveredState.abbr] || hoveredState.abbr}</p>
        <p>
          {hoveredState.total} member{hoveredState.total !== 1 ? 's' : ''} ({pctFormat(
            hoveredState.pct
          )})
        </p>
        {#if hoveredState.firstYear}
          <p class="text-gray-300">First member: {hoveredState.firstYear}</p>
        {/if}
      </div>
    {/if}
  </div>
</div>
