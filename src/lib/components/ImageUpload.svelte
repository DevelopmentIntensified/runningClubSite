<script lang="ts">
  import { upload } from '@vercel/blob/client';

  export let value = '';
  export let name = 'image';
  export let required = false;
  export let label = 'Image';
  export let accept = 'image/jpeg,image/png,image/webp,image/gif';

  let fileInput: HTMLInputElement;
  let dragging = false;
  let uploading = false;
  let error = '';
  let previewUrl = '';

  async function handleFileUpload(file: File) {
    if (!file) return;
    
    error = '';
    uploading = true;

    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/blob/upload'
      });
      value = blob.url;
      previewUrl = blob.url;
    } catch (e) {
      error = e instanceof Error ? e.message : 'Will upload on submit';
      previewUrl = URL.createObjectURL(file);
    } finally {
      uploading = false;
    }
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    dragging = false;
    const file = e.dataTransfer?.files[0];
    if (file) handleFileUpload(file);
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    dragging = true;
  }

  function handleDragLeave() {
    dragging = false;
  }

  function handleInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) handleFileUpload(file);
  }

  function handleClear() {
    value = '';
    previewUrl = '';
    error = '';
    if (fileInput) fileInput.value = '';
  }
</script>

<div>
  <label for={name} class="block text-sm font-medium text-gray-700">{label}</label>
  
  {#if previewUrl}
    <div class="mt-2 relative inline-block">
      <img 
        src={previewUrl} 
        alt="Preview" 
        class="max-h-48 rounded-md border border-gray-300"
      />
      <button
        type="button"
        onclick={handleClear}
        class="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
      >
        ✕
      </button>
    </div>
    {#if value}
      <input type="hidden" name={name} value={value} />
    {/if}
  {:else}
    <div
      class="mt-1 border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors"
      class:border-gray-300={!dragging}
      class:bg-gray-50={!dragging}
      class:border-primary-500={dragging}
      class:bg-primary-50={dragging}
      ondrop={handleDrop}
      ondragover={handleDragOver}
      ondragleave={handleDragLeave}
      onclick={() => fileInput.click()}
      role="button"
      tabindex="0"
    >
      <input
        bind:this={fileInput}
        type="file"
        {name}
        {accept}
        {required}
        class="hidden"
        onchange={handleInputChange}
      />
      {#if uploading}
        <p class="text-sm text-gray-500">Uploading...</p>
      {:else}
        <p class="text-sm text-gray-500">Click or drag image here</p>
      {/if}
    </div>
  {/if}

  {#if error}
    <p class="mt-1 text-sm text-yellow-500">{error}</p>
  {/if}
</div>
