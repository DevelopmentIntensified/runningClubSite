<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  export let value = '';
  export let height = '500px';
  export let placeholder = 'Enter your content here...';

  let editorElement: HTMLElement;
  let quill: any;

  onMount(async () => {
    if (browser) {
      await initQuill();
    }
  });

  async function initQuill() {
    const Quill = (await import('quill')).default;
    await import('quill/dist/quill.snow.css');

    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image']
    ];

    quill = new Quill(editorElement, {
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: placeholder,
      theme: 'snow'
    });

    quill.root.innerHTML = value;

    quill.on('text-change', () => {
      value = quill.root.innerHTML;
    });
  }
</script>

<div class="rich-text-editor">
  {#if browser}
    <div bind:this={editorElement} style="height: {height};"></div>
  {:else}
    <textarea
      bind:value
      rows="10"
      placeholder={placeholder}
      class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
    ></textarea>
  {/if}
</div>

<style>
  .rich-text-editor {
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
  }

  .rich-text-editor :global(.ql-toolbar) {
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
    border-color: #e2e8f0;
    background-color: #f8fafc;
  }

  .rich-text-editor :global(.ql-container) {
    border-bottom-left-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
    border-color: #e2e8f0;
    font-size: 1rem;
  }

  .rich-text-editor :global(.ql-editor) {
    min-height: v-bind(height);
  }

  .rich-text-editor :global(.ql-editor:focus) {
    border-color: var(--primary-500);
    box-shadow: 0 0 0 2px var(--primary-100);
    outline: none;
  }

  .rich-text-editor :global(.ql-snow .ql-stroke) {
    stroke: #4b5563;
  }

  .rich-text-editor :global(.ql-snow .ql-fill) {
    fill: #4b5563;
  }

  .rich-text-editor :global(.ql-snow .ql-picker) {
    color: #4b5563;
  }

  .rich-text-editor :global(.ql-snow .ql-active) {
    color: var(--primary-600);
  }

  .rich-text-editor :global(.ql-snow .ql-active .ql-stroke) {
    stroke: var(--primary-600);
  }

  .rich-text-editor :global(.ql-snow .ql-active .ql-fill) {
    fill: var(--primary-600);
  }
</style> 