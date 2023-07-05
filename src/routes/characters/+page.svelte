<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import type { RpgSystemsResponse } from '$lib/pocketbase-types';
	import { getAllRpgSystems } from '$models/rpg_system';
	import type { PageData } from './$types';

	export let data: PageData;

	const enabledSystemsPromise = getAllRpgSystems({ status: true });
	function getRpgSystemImage(dbRecord: RpgSystemsResponse) {
		return pb.files.getUrl(dbRecord, dbRecord.image, { thumb: '100x100' });
	}
</script>

<div class="flex flex-col items-center">
	<h1 class="text-3xl m-auto my-3">Your Characters</h1>

	<!-- Create Character section -->
	<div class="flex flex-col border-opacity-50 lg:w-9/12 md:w-full">
		<div class="grid h-20 card bg-slate-700 rounded-box place-items-center">
			You have no characters
		</div>
		<div class="divider">OR</div>
		<div class="grid card py-3 bg-slate-700 rounded-box place-items-center">
			{#await enabledSystemsPromise}
				Loading RPG Systems...
			{:then rpgSystems}
				{#each rpgSystems as rpgSystem}
	
				<div class="card w-52 bg-base-100 shadow-xl image-full">
					<figure><img src={getRpgSystemImage(rpgSystem)} alt={rpgSystem.name} /></figure>
					<div class="card-body">
						<h2 class="card-title">{rpgSystem.name}</h2>
						<p>{rpgSystem.description}</p>
						<div class="card-actions justify-end">
							<button class="btn btn-primary">Create</button>
						</div>
					</div>
				</div>
				{/each}
			{/await}
		</div>
	</div>
</div>
