<script lang="ts">
  import * as topojson from 'topojson-client';
  import { scaleThreshold } from 'd3-scale';
  import { geoPath, geoAlbersUsa } from 'd3-geo';
  import { stateNames } from '$lib/data/stateNames';
  import usStates from '$lib/data/us-states.json';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let stats: Record<string, { total: number; firstYear: number }> = data.stats;
  let years: string[] = data.years;
  let selectedYear = $state('all');
  let selectedState = $state('');
  let stateSearch = '';
  let stateDropdownOpen = false;
  let hoveredState: { abbr: string; total: number; firstYear: number } | null = $state(null);
  let mouseX = $state(0);
  let mouseY = $state(0);

  const stateList = Object.entries(stateNames)
    .sort((a, b) => a[1].localeCompare(b[1]))
    .map(([abbr, name]) => ({ abbr, name }));

  $: filteredStates = stateSearch === ''
    ? stateList
    : stateList.filter(s => s.name.toLowerCase().includes(stateSearch.toLowerCase()));

  $: selectedStateName = selectedState
    ? stateNames[selectedState] || selectedState
    : 'All States';

  function selectState(abbr: string) {
    selectedState = abbr;
    stateSearch = '';
    stateDropdownOpen = false;
    fetchStats();
  }

  function handleStateInput(e: Event) {
    stateSearch = (e.target as HTMLInputElement).value;
    stateDropdownOpen = true;
  }

  function handleStateBlur() {
    setTimeout(() => { stateDropdownOpen = false; }, 200);
  }

  const colorScale = scaleThreshold()
    .domain([1, 6, 21, 51])
    .range(['#fee0d2', '#fc9272', '#ef4444', '#b91c1c', '#7f1d1d']);

  function getColor(abbr: string): string {
    const count = stats[abbr]?.total || 0;
    if (selectedState && abbr !== selectedState) return '#e5e7eb';
    return count === 0 ? '#d1d5db' : colorScale(count);
  }

  function getStrokeWidth(abbr: string): number {
    return selectedState && abbr === selectedState ? 3 : 1;
  }

  async function fetchStats() {
    const params = new URLSearchParams();
    if (selectedYear !== 'all') params.set('year', selectedYear);
    if (selectedState) params.set('state', selectedState);
    const res = await fetch(`/api/stats?${params}`);
    const json = await res.json();
    stats = json.data;
  }

  function clearStateFilter() {
    selectedState = '';
    stateSearch = '';
    fetchStats();
  }

  const stateFipsToAbbr: Record<string, string> = {
    '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA',
    '08': 'CO', '09': 'CT', '10': 'DE', '11': 'DC', '12': 'FL',
    '13': 'GA', '15': 'HI', '16': 'ID', '17': 'IL', '18': 'IN',
    '19': 'IA', '20': 'KS', '21': 'KY', '22': 'LA', '23': 'ME',
    '24': 'MD', '25': 'MA', '26': 'MI', '27': 'MN', '28': 'MS',
    '29': 'MO', '30': 'MT', '31': 'NE', '32': 'NV', '33': 'NH',
    '34': 'NJ', '35': 'NM', '36': 'NY', '37': 'NC', '38': 'ND',
    '39': 'OH', '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI',
    '45': 'SC', '46': 'SD', '47': 'TN', '48': 'TX', '49': 'UT',
    '50': 'VT', '51': 'VA', '53': 'WA', '54': 'WV', '55': 'WI',
    '56': 'WY'
  };

  const geojson = topojson.feature(usStates, usStates.objects.states as any);
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
    <div class="text-center mb-8">
      <h1 class="text-3xl font-extrabold text-gray-900">Where We're From</h1>
      <p class="mt-2 text-gray-600">Our members have joined from across the country.</p>
    </div>

    <div class="flex justify-center items-center gap-4 mb-6 flex-wrap">
      <div class="relative">
        <button
          on:click={() => stateDropdownOpen = !stateDropdownOpen}
          class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm hover:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 min-w-[180px] justify-between"
        >
          <span class="truncate">{selectedStateName}</span>
          <svg class="w-4 h-4 flex-shrink-0 transition-transform" class:rotate-180={stateDropdownOpen} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {#if stateDropdownOpen}
          <div class="absolute z-50 mt-2 w-64 rounded-lg bg-white py-2 shadow-xl border border-gray-200">
            <div class="px-3 pb-2">
              <input
                type="text"
                placeholder="Search states..."
                value={stateSearch}
                on:input={handleStateInput}
                on:focus={() => stateDropdownOpen = true}
                on:blur={handleStateBlur}
                class="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div class="max-h-60 overflow-y-auto">
              <button
                class="w-full text-left px-4 py-2 text-sm hover:bg-primary-50 {!selectedState ? 'bg-primary-100 text-primary-700 font-medium' : 'text-gray-700'}"
                on:click={() => { clearStateFilter(); stateDropdownOpen = false; }}
              >
                All States
              </button>
              {#each filteredStates as state}
                <button
                  class="w-full text-left px-4 py-2 text-sm hover:bg-primary-50 {selectedState === state.abbr ? 'bg-primary-100 text-primary-700 font-medium' : 'text-gray-700'}"
                  on:click={() => selectState(state.abbr)}
                >
                  {state.name}
                </button>
              {/each}
            </div>
          </div>
        {/if}
      </div>

      <select
        bind:value={selectedYear}
        onchange={fetchStats}
        class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
      >
        <option value="all">All Years</option>
        {#each years as year}
          <option value={year}>{year}</option>
        {/each}
      </select>

      {#if selectedState}
        <button
          on:click={clearStateFilter}
          class="text-sm text-primary-600 hover:text-primary-800 font-medium"
        >
          Clear filter
        </button>
      {/if}
    </div>

    <div class="bg-white rounded-2xl shadow-xl p-6">
      <svg viewBox="0 0 975 610" class="w-full">
        {#each svgPaths as path}
          <path
            d={path.d}
            fill={getColor(path.abbr)}
            stroke={selectedState && path.abbr === selectedState ? '#1e40af' : '#fff'}
            stroke-width={getStrokeWidth(path.abbr)}
            class="cursor-pointer transition-opacity hover:opacity-80"
            onmouseenter={(e) => {
              const total = stats[path.abbr]?.total || 0;
              const firstYear = stats[path.abbr]?.firstYear || 0;
              hoveredState = { abbr: path.abbr, total, firstYear };
              mouseX = e.clientX;
              mouseY = e.clientY;
            }}
            onmousemove={(e) => {
              mouseX = e.clientX;
              mouseY = e.clientY;
            }}
            onmouseleave={() => { hoveredState = null; }}
          />
        {/each}
      </svg>

      <div class="flex justify-center items-center gap-3 mt-6 text-sm text-gray-600">
        <span>Fewer</span>
        <div class="flex rounded overflow-hidden">
          <div class="w-8 h-4" style="background: #d1d5db"></div>
          <div class="w-8 h-4" style="background: #fee0d2"></div>
          <div class="w-8 h-4" style="background: #fc9272"></div>
          <div class="w-8 h-4" style="background: #ef4444"></div>
          <div class="w-8 h-4" style="background: #b91c1c"></div>
          <div class="w-8 h-4" style="background: #7f1d1d"></div>
        </div>
        <span>More</span>
      </div>
    </div>

    {#if hoveredState}
      <div
        class="fixed z-50 pointer-events-none bg-gray-900 text-white rounded-lg px-4 py-3 shadow-lg text-sm"
        style="left: {mouseX + 12}px; top: {mouseY + 12}px;"
      >
        <p class="font-semibold">{stateNames[hoveredState.abbr] || hoveredState.abbr}</p>
        <p>{hoveredState.total} total member{hoveredState.total !== 1 ? 's' : ''}</p>
        {#if hoveredState.firstYear}
          <p class="text-gray-300">First member: {hoveredState.firstYear}</p>
        {/if}
      </div>
    {/if}
  </div>
</div>
