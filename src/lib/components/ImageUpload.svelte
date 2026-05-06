<script lang="ts">
  import { onMount } from 'svelte';

  export let value = '';
  export let name = 'image';
  export let required = false;
  export let label = 'Image';
  export let accept = 'image/jpeg,image/png,image/webp,image/gif';
  export let idealAspect: number | null = null;
  export let aspectTolerance = 0.3;

  let fileInput: HTMLInputElement;
  let dropArea: HTMLDivElement;
  let dragging = false;
  let previewUrl = value || '';
  let aspectWarning = '';

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    dragging = false;
    const file = e.dataTransfer?.files[0];
    if (file) {
      previewUrl = URL.createObjectURL(file);
      checkAspectRatio(file);
    }
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
    if (file) {
      previewUrl = URL.createObjectURL(file);
      checkAspectRatio(file);
    }
  }

  function handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          previewUrl = URL.createObjectURL(file);
          checkAspectRatio(file);
        }
        break;
      }
    }
  }

  function checkAspectRatio(file: File) {
    aspectWarning = '';
    if (!idealAspect || !file.type.startsWith('image/')) return;

    const img = new Image();
    img.onload = () => {
      const actual = img.width / img.height;
      const ratio = actual / idealAspect;
      if (ratio < (1 - aspectTolerance) || ratio > (1 + aspectTolerance)) {
        const idealRatio = idealAspect < 1
          ? `1:${Math.round(1 / idealAspect)}`
          : `${Math.round(idealAspect)}:1`;
        aspectWarning = `Ideal aspect ratio is ${idealRatio}. Image may appear cropped.`;
      }
    };
    img.src = URL.createObjectURL(file);
  }

  function handleClear() {
    previewUrl = '';
    aspectWarning = '';
    if (fileInput) fileInput.value = '';
  }

  onMount(() => {
    if (dropArea) {
      dropArea.addEventListener('paste', handlePaste);
    }
    return () => {
      if (dropArea) {
        dropArea.removeEventListener('paste', handlePaste);
      }
    };
  });
</script>

<div>
  <label for={name} class="block text-sm font-medium text-gray-700">{label}</label>
  
  <input
    bind:this={fileInput}
    type="file"
    {name}
    {accept}
    {required}
    class="hidden"
    onchange={handleInputChange}
  />
  
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
    {#if aspectWarning}
      <p class="mt-2 text-sm text-amber-600">⚠ {aspectWarning}</p>
    {/if}
    <input type="hidden" name="imageUrl" value={value} />
  {/if}
  
  {#if !previewUrl}
    <div
      bind:this={dropArea}
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
      <p class="text-sm text-gray-500">Click, drag, or paste image here</p>
    </div>
  {/if}
</div>
