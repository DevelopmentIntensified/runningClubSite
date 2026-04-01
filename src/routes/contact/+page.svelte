<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="container mx-auto px-4 py-12">
  <div class="relative mb-6 h-48 overflow-hidden rounded-2xl sm:h-64 md:h-80">
    <img
      src={data.image.imageUrl}
      alt={data.image.alt}
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/40 to-black/60">
      <div class="px-4 text-center">
        <h2 class="text-3xl font-bold text-white sm:text-4xl md:text-5xl">Contact Us</h2>
        <p class="mt-2 text-sm text-white/90 sm:text-base">Questions? We’ll get back to you quickly.</p>
      </div>
    </div>
  </div>
</div>
