<script>
	const locations = [
		{
			name: 'Liberty Mountain Trail System',
			description:
				"A network of trails on Liberty University's campus, offering various terrains and distances.",
			mapUrl:
				'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.3586853264544!2d-79.18069668469528!3d37.352355779836535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b2e28b2dcf2d49%3A0x71778d02b600c10e!2sLiberty%20Mountain%20Trail%20System!5e0!3m2!1sen!2sus!4v1620764429548!5m2!1sen!2sus'
		},
		{
			name: 'Blackwater Creek Trail',
			description: 'A paved trail along Blackwater Creek, perfect for long runs and recovery jogs.',
			mapUrl:
				'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.011762626522!2d-79.15699468469504!3d37.41141927982709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b2d1f14f87c1e7%3A0x3df28a505dbf9a76!2sBlackwater%20Creek%20Trail!5e0!3m2!1sen!2sus!4v1620764507175!5m2!1sen!2sus'
		},
		{
			name: 'Peaks View Park',
			description:
				'A large park with a mix of paved paths and trails, great for interval training and tempo runs.',
			mapUrl:
				'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.035569146989!2d-79.2209496846943!3d37.43589077982328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b2d0f8b9a70f0d%3A0xb124a935b6f706bb!2sPeaks%20View%20Park!5e0!3m2!1sen!2sus!4v1620764569175!5m2!1sen!2sus'
		}
	];
</script>

<svelte:head>
	<title>Running Locations - Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
	<h1 class="mb-8 text-center text-4xl font-bold">Running Locations</h1>

	<div class="space-y-12">
		{#each locations as location}
			<div class="overflow-hidden rounded-lg bg-white shadow-md">
				<div class="p-6">
					<h2 class="mb-2 text-2xl font-semibold">{location.name}</h2>
					<p class="mb-4 text-gray-600">{location.description}</p>
				</div>
				<div class="aspect-w-16 aspect-h-9">
					<iframe
						src={location.mapUrl}
						width="600"
						height="450"
						style="border:0;"
						allowfullscreen=""
						loading="lazy"
						title={`Map of ${location.name}`}
					></iframe>
				</div>
			</div>
		{/each}
	</div>
</div>
