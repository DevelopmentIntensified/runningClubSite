<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="mb-8 text-3xl font-bold">Admin Dashboard</h1>

  <nav class="mb-8">
    <ul class="flex space-x-4">
      <li>
        <a
          href="/admin/users"
          class="text-blue-500 hover:underline"
          class:font-bold={$page.url.pathname.startsWith('/admin/users')}
        >
          Manage users
        </a>
      </li>
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
          href="/admin/alumni"
          class="text-blue-500 hover:underline"
          class:font-bold={$page.url.pathname.startsWith('/admin/alumni')}
        >
          Manage Alumni
        </a>
      </li>
      <li>
        <a
          href="/admin/leaders"
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
          href="/admin/records"
          class="text-blue-500 hover:underline"
          class:font-bold={$page.url.pathname.startsWith('/admin/records')}
        >
          Manage records
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
