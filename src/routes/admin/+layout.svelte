<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="mb-8 text-3xl font-bold">Admin Dashboard</h1>

  <nav class="mb-8">
    <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <li>
        <a
          href="/admin/users"
          class="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow {($page.url.pathname.startsWith('/admin/users')) ? 'ring-2 ring-primary-500' : ''}"
        >
          <span class="text-lg font-medium text-gray-900">Manage Users</span>
        </a>
      </li>
      <li>
        <a
          href="/admin/news"
          class="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow {($page.url.pathname.startsWith('/admin/news')) ? 'ring-2 ring-primary-500' : ''}"
        >
          <span class="text-lg font-medium text-gray-900">Manage News</span>
        </a>
      </li>
      <li>
        <a
          href="/admin/alumni"
          class="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow {($page.url.pathname.startsWith('/admin/alumni')) ? 'ring-2 ring-primary-500' : ''}"
        >
          <span class="text-lg font-medium text-gray-900">Manage Alumni</span>
        </a>
      </li>
      <li>
        <a
          href="/admin/leaders"
          class="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow {($page.url.pathname.startsWith('/admin/leaders')) ? 'ring-2 ring-primary-500' : ''}"
        >
          <span class="text-lg font-medium text-gray-900">Manage Leaders</span>
        </a>
      </li>
      <li>
        <a
          href="/admin/events"
          class="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow {($page.url.pathname.startsWith('/admin/events')) ? 'ring-2 ring-primary-500' : ''}"
        >
          <span class="text-lg font-medium text-gray-900">Manage Events</span>
        </a>
      </li>
      <li>
        <a
          href="/admin/records"
          class="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow {($page.url.pathname.startsWith('/admin/records')) ? 'ring-2 ring-primary-500' : ''}"
        >
          <span class="text-lg font-medium text-gray-900">Manage Records</span>
        </a>
      </li>
      <li>
        <a
          href="/admin/slideshow"
          class="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow {($page.url.pathname.startsWith('/admin/slideshow')) ? 'ring-2 ring-primary-500' : ''}"
        >
          <span class="text-lg font-medium text-gray-900">Manage Slideshow</span>
        </a>
      </li>
      <li>
        <a
          href="/admin/locations"
          class="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow {($page.url.pathname.startsWith('/admin/locations')) ? 'ring-2 ring-primary-500' : ''}"
        >
          <span class="text-lg font-medium text-gray-900">Manage Locations</span>
        </a>
      </li>
      <li>
        <a
          href="/admin/page-images"
          class="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow {($page.url.pathname.startsWith('/admin/page-images')) ? 'ring-2 ring-primary-500' : ''}"
        >
          <span class="text-lg font-medium text-gray-900">Manage Page Images</span>
        </a>
      </li>
      <li>
        <a
          href="/admin/season-photos"
          class="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow {($page.url.pathname.startsWith('/admin/season-photos')) ? 'ring-2 ring-primary-500' : ''}"
        >
          <span class="text-lg font-medium text-gray-900">Manage Season Photos</span>
        </a>
      </li>
    </ul>
  </nav>

  <slot />
</div>
