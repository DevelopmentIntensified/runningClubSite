<script lang="ts">
  import { page } from '$app/stores';
  import '../app.css';
</script>

<header class="bg-primary-600 text-white">
  <nav class="container mx-auto px-4 py-4">
    <ul class="flex space-x-4">
      <li><a href="/" class="hover:text-secondary-400" class:font-bold={$page.url.pathname === '/'}>Home</a></li>
      <li><a href="/about" class="hover:text-secondary-400" class:font-bold={$page.url.pathname === '/about'}>About</a></li>
      <li><a href="/news" class="hover:text-secondary-400" class:font-bold={$page.url.pathname === '/news'}>News</a></li>
      <li><a href="/schedule" class="hover:text-secondary-400" class:font-bold={$page.url.pathname === '/schedule'}>Schedule</a></li>
      <li><a href="/records" class="hover:text-secondary-400" class:font-bold={$page.url.pathname === '/records'}>Records</a></li>
      <li><a href="/alumni" class="hover:text-secondary-400" class:font-bold={$page.url.pathname === '/alumni'}>Alumni</a></li>
      <li><a href="/contact" class="hover:text-secondary-400" class:font-bold={$page.url.pathname === '/contact'}>Contact</a></li>
    </ul>
  </nav>
</header>

<main>
  <slot />
</main>

<footer class="bg-gray-100 text-center py-4 mt-12">
  <p>&copy; {new Date().getFullYear()} Liberty Running Club. All rights reserved.</p>
</footer>

