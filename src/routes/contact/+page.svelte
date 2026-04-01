<script lang="ts">
  export let data;
</script>

<div class="relative h-32 sm:h-40 md:h-48 mb-6">
  <img
    src={data.image.imageUrl}
    alt={data.image.alt}
    class="absolute inset-0 h-full w-full object-cover"
  />
  <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <h2 class="px-4 text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
      Contact Us
    </h2>
  </div>
</div> 