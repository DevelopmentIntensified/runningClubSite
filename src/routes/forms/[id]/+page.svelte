<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  const { form } = data;

  function getEmbedUrl(url: string): string {
    if (url.includes('docs.google.com/forms')) {
      return url.replace('/viewform', '/embed');
    }
    return '';
  }
</script>

<svelte:head>
  <title>{form.title} - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-4xl">
    <div class="mb-8">
      <a href="/admin/forms" class="text-primary-600 hover:text-primary-900 text-sm">
        ← Back to Forms
      </a>
    </div>
    
    <div class="overflow-hidden rounded-lg bg-white shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-900">{form.title}</h1>
        {#if form.description}
          <p class="mt-2 text-gray-600">{form.description}</p>
        {/if}
      </div>
      
      <div class="p-6">
        {#if form.embed}
          {@const embedUrl = getEmbedUrl(form.externalUrl)}
          {#if embedUrl}
            <iframe 
              src={embedUrl}
              class="w-full min-h-[600px] border-0"
              title={form.title}
            ></iframe>
          {:else}
            <div class="text-center py-8">
              <a
                href={form.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
              >
                Open Form
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          {/if}
        {:else}
          <div class="text-center py-8">
            <a
              href={form.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
            >
              Open Form
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>