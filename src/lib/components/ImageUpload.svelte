<script lang="ts">
  export let value = '';
  export let name = 'image';
  export let required = false;
  export let label = 'Image';
  export let accept = 'image/jpeg,image/png,image/webp,image/gif';

  let fileInput: HTMLInputElement;
  let dragging = false;
  let error = '';
  let previewUrl = '';

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    dragging = false;
    const file = e.dataTransfer?.files[0];
    if (file) handleFile(file);
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    dragging = true;
  }

  function handleDragLeave() {
    dragging = false;
  }

  function handleFile(file: File) {
    if (!file) return;
    previewUrl = URL.createObjectURL(file);
  }

  function handleInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) handleFile(file);
  }

  function handleClear() {
    value = '';
    previewUrl = '';
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
      <p class="text-sm text-gray-500">Click or drag image here</p>
    </div>
  {/if}

  {#if error}
    <p class="mt-1 text-sm text-red-500">{error}</p>
  {/if}
</div>
