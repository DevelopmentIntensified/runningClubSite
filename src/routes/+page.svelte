<script>
	import { onMount } from 'svelte';
	import formalImg from '$lib/assets/images/social/formal.jpeg';
	import nircaImg from '$lib/assets/images/nirca/nircameet.jpeg';
	import runningImg from '$lib/assets/images/nirca/nircacoleracing.jpeg';
	import flamesFlagImg from '$lib/assets/images/nirca/flamesflag.jpeg';
	import halfImg from '$lib/assets/images/otherraces/deephollow.jpeg';

	let currentSlide = 0;
	const slides = [
		{ image: nircaImg, alt: 'runners in line for team picture' },
		{ image: flamesFlagImg, alt: 'Runner with team flag' },
		{ image: runningImg, alt: 'runner running in race' },
		{ image: formalImg, alt: 'formal team picture' },
		{ image: halfImg, alt: 'runners team picture after half marathon' },
	];

	onMount(() => {
		const interval = setInterval(() => {
			currentSlide = (currentSlide + 1) % slides.length;
			console.log(currentSlide);
		}, 3500);

		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>Liberty Running Club - Running for God's Glory</title>
</svelte:head>

<div class="relative h-screen">
	{#each slides as slide, i}
		<div
			class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
			class:opacity-100={i === currentSlide}
			class:opacity-0={i !== currentSlide}
		>
			<img src={slide.image} alt={slide.alt} class="h-full w-full object-cover" />
		</div>
	{/each}

	<div
		class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white"
	>
		<h1 class="mb-4 text-5xl font-bold">Liberty Running Club</h1>
		<p class="mb-8 text-2xl">Running and Glorifying God through every step</p>
		<a
			href="/about"
			class="rounded bg-red-600 px-4 py-2 font-bold text-white transition duration-300 hover:bg-red-700"
		>
			Learn More
		</a>

		<div class="mt-12 flex space-x-4">
			<a
				href="https://instagram.com/libertyrunningclub"
				target="_blank"
				rel="noopener noreferrer"
				class="text-white transition duration-300 hover:text-red-400"
			>
				Instagram
			</a>
			<a
				href="https://groupme.com/join_group/12345678/abcdefgh"
				target="_blank"
				rel="noopener noreferrer"
				class="text-white transition duration-300 hover:text-red-400"
			>
				GroupMe
			</a>
		</div>
	</div>
</div>
