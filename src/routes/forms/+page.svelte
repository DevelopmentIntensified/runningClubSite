<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

  function getEmbedUrl(url: string): string {
    if (url.includes('docs.google.com/forms')) {
      return url.replace('/viewform', '/embed');
    }
    return '';
  }
</script>

<svelte:head>
  <title>Forms - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900">Forms</h1>
      <p class="mt-4 text-lg text-gray-600">
        Access club forms and registrations. Login required.
      </p>
    </div>

    <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {#each data.forms as form}
        <div class="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-lg">
          <div class="p-6">
            <h2 class="text-xl font-semibold text-gray-900">{form.title}</h2>
            {#if form.description}
              <p class="mt-2 text-sm text-gray-600">{form.description}</p>
            {/if}
            
            {#if form.embed}
              {@const embedUrl = getEmbedUrl(form.externalUrl)}
              {#if embedUrl}
                <div class="mt-4">
                  <iframe 
                    src={embedUrl}
                    class="w-full min-h-[500px] border-0"
                    title={form.title}
                  ></iframe>
                </div>
              {:else}
                <div class="mt-4">
                  <a
                    href={form.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center text-primary-600 hover:text-primary-900"
                  >
                    Open Form
                    <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              {/if}
            {:else}
              <div class="mt-4">
                <a
                  href={form.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-primary-600 hover:text-primary-900"
                >
                  Open Form
                  <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            {/if}
          </div>
        </div>
      {/each}
      
      {#if data.forms.length === 0}
        <div class="col-span-full text-center py-12">
          <p class="text-gray-500">No forms available at this time.</p>
        </div>
      {/if}
    </div>
  </div>
</div>