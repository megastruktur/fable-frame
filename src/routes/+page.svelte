<script lang="ts">
	import logo from "$lib/assets/FF_Logo.svg?raw"
</script>

<svelte:head>
    <title>Fable Frame - an online TTRPG Character Sheet storage</title>
		<meta name="description" content="Fable Frame is a simple project that allows you to create Tabletop RPG Character sheets online and use them during your game.">
</svelte:head>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center w-96">
		<figure class="w-72">
			{@html logo}
		</figure>
		<!-- <h2 class="h2">Welcome!</h2> -->
		<p class="">
			Fable Frame is a simple project that allows you to create <span class="text-primary-400">Tabletop RPG Character sheets</span> online and use them during your game.
		</p>
		<p>
			This is currently a <span class="text-primary-400">Work In Progress</span>. If you are interested - please follow up on <a class="btn btn-sm variant-filled" href="https://github.com/megastruktur/fable-frame">Github</a>
		</p>
	</div>
</div>
