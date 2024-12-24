<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>

  <nav class="mb-8">
    <ul class="flex space-x-4">
      <li>
        <a 
          href="/admin/news" 
          class="text-blue-500 hover:underline" 
          class:font-bold={$page.url.pathname.startsWith('/admin/news')}
        >
          Manage News
        </a>
      </li>
      <li>
        <a 
          href="/admin/alumni/add" 
          class="text-blue-500 hover:underline" 
          class:font-bold={$page.url.pathname.startsWith('/admin/alumni')}
        >
          Manage Alumni
        </a>
      </li>
      <li>
        <a 
          href="/admin/leaders/add" 
          class="text-blue-500 hover:underline" 
          class:font-bold={$page.url.pathname.startsWith('/admin/leaders')}
        >
          Manage Leaders
        </a>
      </li>
      <li>
        <a 
          href="/admin/events" 
          class="text-blue-500 hover:underline" 
          class:font-bold={$page.url.pathname.startsWith('/admin/events')}
        >
          Manage Events
        </a>
      </li>
      <li>
        <a 
          href="/admin/locations" 
          class="text-blue-500 hover:underline" 
          class:font-bold={$page.url.pathname.startsWith('/admin/locations')}
        >
          Manage Locations
        </a>
      </li>
    </ul>
  </nav>

  <slot />
</div>

