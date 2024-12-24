<script lang="ts">
	import { page } from '$app/stores';
	import logoUrl from '$lib/assets/images/logos/logo.png';

	const data = $page.data;
	const isAdmin = data.isAdmin;

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/schedule', label: 'Schedule' },
		{ href: '/locations', label: 'Locations' },
		// { href: '/alumni', label: 'Alumni' },
		{ href: '/records', label: 'Records' },
		{ href: '/contact', label: 'Contact' }
		// { href: '/news', label: 'News' }
	];

	const adminItems = [{ href: '/admin/news', label: 'Manage News' }];
	console.log(logoUrl);
</script>

<nav class="bg-primary text-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center">
				<a href="/" class="flex-shrink-0" aria-label="logo button">
					<img class="h-16 w-16" src={logoUrl} alt="Liberty Running Club" />
				</a>
				<div class="hidden md:block">
					<div class="ml-10 flex items-baseline space-x-4">
						{#each navItems as item}
							<a
								href={item.href}
								class="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-600 {$page.url
									.pathname === item.href
									? 'bg-primary-700'
									: ''}"
							>
								{item.label}
							</a>
						{/each}
						{#if isAdmin}
							{#each adminItems as item}
								<a
									href={item.href}
									class="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-700 {$page.url
										.pathname === item.href
										? 'bg-primary-700'
										: ''}"
								>
									{item.label}
								</a>
							{/each}
						{/if}
					</div>
				</div>
			</div>
			<div class="hidden md:block">
				<div class="ml-4 flex items-center md:ml-6">
					{#if data.user}
						<form action="/api/logout" method="POST">
							<button
								type="submit"
								class="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-700">Logout</button
							>
						</form>
					{:else}
						<!-- <a href="/login" class="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-700" -->
						<!-- 	>Login</a -->
						<!-- > -->
						<!-- <a -->
						<!-- 	href="/register" -->
						<!-- 	class="rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-700">Register</a -->
						<!-- > -->
					{/if}
				</div>
			</div>
		</div>
	</div>
</nav>
