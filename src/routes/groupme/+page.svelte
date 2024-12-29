<script lang="ts">
	import GroupmeIcon from '$lib/components/GroupmeIcon.svelte';
</script>

<svelte:head>
	<title>Join Our GroupMe - Liberty Running Club</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-primary-100 to-primary-200 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-3xl mx-auto">
		<div class="bg-white shadow-xl rounded-lg overflow-hidden">
			<div class="bg-primary-600 py-6 px-4 sm:px-6">
				<h2 class="text-center text-3xl font-extrabold text-white">
					Join Our GroupMe
				</h2>
			</div>
			<div class="p-6 sm:p-8">
				<p class="text-xl text-center text-gray-700 mb-8">
					Stay updated on events and join the social shenanigans!
				</p>
				<div class="flex flex-col items-center">
					<a
						href="https://groupme.com/join_group/86746915/q0pqDpY8"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition duration-150 ease-in-out mb-8"
					>
						Join GroupMe
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
						</svg>
					</a>
					<div class="w-48 h-48 sm:w-64 sm:h-64">
						<GroupmeIcon class="w-full h-full text-primary-600" />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

