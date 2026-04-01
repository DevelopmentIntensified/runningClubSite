<script lang="ts">
  import { enhance } from '$app/forms';
  import type { Snippet } from 'svelte';

  interface Action {
    href?: string;
    label: string;
    variant?: 'primary' | 'danger';
    formAction?: string;
    formMethod?: 'POST' | 'DELETE';
    hiddenInput?: { name: string; value: string | number };
  }

  interface Column<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    render?: (row: T) => string;
    image?: boolean;
    imageAlt?: (row: T) => string;
    badge?: (row: T) => { text: string; class: string };
    actions?: Action[];
  }

  interface Props<T> {
    title: string;
    data: T[];
    columns: Column<T>[];
    searchPlaceholder?: string;
    searchKeys?: (keyof T)[];
    addHref?: string;
    addLabel?: string;
    defaultSort?: (a: T, b: T) => number;
  }

  let { 
    title, 
    data, 
    columns, 
    searchPlaceholder = 'Search...', 
    searchKeys = [],
    addHref, 
    addLabel = 'Add New',
    defaultSort
  }: Props<any> = $props();

  let searchTerm = $state('');
  let sortKey = $state('');
  let sortDir = $state<'asc' | 'desc'>('asc');

  function handleSearch() {
    if (!searchKeys.length || !searchTerm) return data;
    return data.filter((row: any) => 
      searchKeys.some(key => {
        const value = row[key];
        return value && String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }

  function handleSort(key: string) {
    if (sortKey === key) {
      sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey = key;
      sortDir = 'asc';
    }
  }

  let filteredData = $derived.by(() => {
    let result = [...data];
    
    if (searchTerm && searchKeys.length) {
      result = result.filter((row: any) => 
        searchKeys.some(key => {
          const value = row[key];
          return value && String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }
    
    if (sortKey) {
      result.sort((a: any, b: any) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (defaultSort) {
      result.sort(defaultSort);
    }
    
    return result;
  });
</script>

<div class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
  <div class="border-b border-slate-200 bg-slate-50/50 px-6 py-4">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-xl font-semibold text-slate-800">{title}</h2>
      
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        {#if searchKeys.length > 0}
          <div class="relative">
            <input
              type="text"
              bind:value={searchTerm}
              placeholder={searchPlaceholder}
              class="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 sm:w-64"
            />
            <svg class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        {/if}
        
        {#if addHref}
          <a
            href={addHref}
            class="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            {addLabel}
          </a>
        {/if}
      </div>
    </div>
  </div>

  {#if filteredData.length === 0}
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <svg class="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <p class="mt-4 text-sm text-slate-500">No items found</p>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-200 bg-slate-50/50">
            {#each columns as column}
              <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                {column.label}
              </th>
            {/each}
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each filteredData as row (row.id)}
            <tr class="hover:bg-slate-50/50 transition-colors">
              {#each columns as column}
                {@const value = row[column.key as keyof typeof row]}
                <td class="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                  {#if column.image && value}
                    <img src={value} alt={column.imageAlt ? column.imageAlt(row) : ''} class="h-12 w-16 rounded-lg object-cover shadow-sm" />
                  {:else if column.badge}
                    {@const badge = column.badge(row)}
                    <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {badge.class}">
                      {badge.text}
                    </span>
                  {:else if column.render}
                    {@html column.render(row)}
                  {:else}
                    {value ?? '-'}
                  {/if}
                </td>
              {/each}
              {#if columns.some(c => c.actions)}
                <td class="whitespace-nowrap px-6 py-4 text-sm">
                  <div class="flex items-center gap-2">
                    {#each columns as column}
                      {#if column.actions}
                        {#each column.actions as action}
                          {#if action.formAction}
                            <form action={action.formAction} method={action.formMethod || 'POST'} use:enhance class="inline">
                              {#if action.hiddenInput}
                                <input type="hidden" name={action.hiddenInput.name} value={action.hiddenInput.value} />
                              {/if}
                              <button 
                                type="submit" 
                                class="inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors {action.variant === 'danger' ? 'text-red-600 hover:bg-red-50' : 'text-primary-600 hover:bg-primary-50'}"
                              >
                                {action.label}
                              </button>
                            </form>
                          {:else if action.href}
                            <a 
                              href={action.href}
                              class="inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors {action.variant === 'danger' ? 'text-red-600 hover:bg-red-50' : 'text-primary-600 hover:bg-primary-50'}"
                            >
                              {action.label}
                            </a>
                          {/if}
                        {/each}
                      {/if}
                    {/each}
                  </div>
                </td>
              {/if}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>