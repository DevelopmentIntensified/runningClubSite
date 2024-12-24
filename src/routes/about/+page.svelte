<script>
	import teamPhoto from '$lib/assets/images/social/shraptop.jpeg';
	import GroupmeIcon from '$lib/components/GroupmeIcon.svelte';
	import InstagramIcon from '$lib/components/InstagramIcon.svelte';
	import eventCoordinatorImg from '$lib/assets/images/leaders/eventCoordinator.jpeg';
	import nircaDirectorImg from '$lib/assets/images/leaders/nircaDirector.jpeg';
	import coachImg from '$lib/assets/images/leaders/coach.jpeg';
	import presidentImg from '$lib/assets/images/leaders/president.jpeg';
	import vicePresidentImg from '$lib/assets/images/leaders/vicePresident.jpeg';
	import treasurerImg from '$lib/assets/images/leaders/treasurer.jpeg';
	import mediaManagerImg from '$lib/assets/images/leaders/mediaManager.jpeg';
	import chaplainImg from '$lib/assets/images/leaders/chaplain.jpeg';
	import advisorImg from '$lib/assets/images/leaders/advisor.jpeg';
	import headOfLogisticsImg from '$lib/assets/images/leaders/headOfLogistics.jpeg';

	const leaders = [
		{
			name: 'Cole Schwartz',
			image: presidentImg,
			position: 'Club President',
			description:
				""
		},
		{
			name: 'Kyle Moore',
			image: vicePresidentImg,
			position: 'Vice President',
			description:
				""
		},
		{
			name: 'Leah kelley',
			image: treasurerImg,
			position: 'Treasurer',
			description:
				""
		},
		{
			name: 'Collin Rose',
			image: mediaManagerImg,
			position: 'Social Media Coordinator',
			description:
				'Collin is a second-year student from Sunny Orlando, Florida, who loves middle and long-distance events, is a running shoe connoisseur, and a master on the Aux.'
		},
		{
			name: 'Joshua Harden',
			image: coachImg,
			position: 'Coach',
			description: ''
		},
		{
			name: 'Jesse Harrell',
			image: chaplainImg,
			position: 'Club Chaplain',
			description:
				""
		},
		{
			name: 'Jadyn Talley',
			image: eventCoordinatorImg,
			position: 'Team Mom/Female Captain/Event Coordinator',
			description:
				""
		},
		{
			name: 'Skylar Waechter',
			image: advisorImg,
			position: 'Advisory Board Member',
			description:
				""
		},
		{
			name: 'Matthew Petke',
			image: headOfLogisticsImg,
			position: 'Head of Logistics',
			description:
				""
		},
		{
			name: 'George Crowder',
			image: nircaDirectorImg,
			position: 'NIRCA Coordinator',
			description:
				'George Crowder is a first-year student at Liberty University from Winchester, Virginia. He is pursuing a degree in strength and conditioning with a concentration on coaching. George loves middle-distance events and enjoys mountain biking, rock climbing, caving and hiking.'
		}
	];
</script>

<svelte:head>
	<title>About Liberty Running Club</title>
</svelte:head>

<div class="container mx-auto px-4 py-12">
	<h1 class="mb-8 text-center text-4xl font-bold">About Liberty Running Club</h1>

	<div class="mb-12 grid gap-12 md:grid-cols-2">
		<div>
			<img
				src={teamPhoto}
				alt="Liberty Running Club Team"
				class="h-auto w-full rounded-lg shadow-lg"
			/>
		</div>
		<div>
			<h2 class="mb-4 text-2xl font-semibold">Our Mission</h2>
			<p class="mb-4">
				Liberty Running Club is dedicated to fostering a community of runners who seek to glorify
				God through their passion for running. We believe that every stride we take is an
				opportunity to honor our Creator and inspire others.
			</p>
			<h2 class="mb-4 text-2xl font-semibold">What We Do</h2>
			<ul class="mb-4 list-inside list-disc">
				<li>Weekly group runs for all levels</li>
				<li>Monthly devotional and prayer meetings</li>
				<li>Participation in local and regional races through NIRCA</li>
				<li>Community outreach through running-related service projects</li>
			</ul>
			<h2 class="mb-4 text-2xl font-semibold">Join Us</h2>
			<p class="mb-4">
				Whether you're a seasoned runner or just starting out, we welcome you to join our community.
				Together, we can encourage one another, improve our physical health, and grow in our faith.
			</p>
			<div class="flex space-x-4">
				<a
					href="https://instagram.com/libertyrunningclub"
					target="_blank"
					rel="noopener noreferrer"
					class="text-gray-800 transition duration-300 hover:text-primary-600"
				>
					<InstagramIcon class="h-6 w-6" />
				</a>
				<a
					href="https://groupme.com/join_group/12345678/abcdefgh"
					target="_blank"
					rel="noopener noreferrer"
					class="text-gray-800 transition duration-300 hover:text-primary-600"
				>
					<GroupmeIcon class="h-6 w-6" />
				</a>
			</div>
		</div>
	</div>

	<h2 class="mb-6 text-center text-3xl font-semibold">Our Leadership Team</h2>
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each leaders as leader}
			<div class="overflow-hidden rounded-lg bg-white shadow-lg">
				<img src={leader.image} alt={leader.name} class="h-64 w-full object-cover" />
				<div class="p-6">
					<h3 class="mb-2 text-xl font-semibold">{leader.name}</h3>
					<p class="mb-2 text-primary-600">{leader.position}</p>
					<p class="text-gray-700">{leader.description}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
