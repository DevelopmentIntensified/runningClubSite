<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  export let data;

  let mapElement: HTMLElement;
  let map: google.maps.Map;
  let infoWindow: google.maps.InfoWindow;

  onMount(() => {
    if (browser) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      window.initMap = initMap;
    }
  });

  function initMap() {
    const libertyUniversity = { lat: 37.3526, lng: -79.1771 };
    map = new google.maps.Map(mapElement, {
      zoom: 11,
      center: libertyUniversity,
    });

    infoWindow = new google.maps.InfoWindow();

    data.locations.forEach((location) => {
      const marker = new google.maps.Marker({
        position: { lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) },
        map: map,
        title: location.name,
      });

      marker.addListener('click', () => {
        infoWindow.setContent(`<h3>${location.name}</h3><p>${location.description || ''}</p>`);
        infoWindow.open(map, marker);
      });
    });
  }
</script>

<svelte:head>
  <title>Running Locations - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Running Locations</h1>

  <div class="mb-8">
    <div bind:this={mapElement} class="w-full h-[600px]"></div>
  </div>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each data.locations as location}
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-semibold mb-2">{location.name}</h2>
          <p class="text-gray-600 mb-4">{location.description || 'No description available.'}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

