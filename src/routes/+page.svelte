<script lang="ts">
	import logo from "$lib/assets/FF_Logo.svg?raw"
	import { pageName } from "$lib/stores";
	import { ProgressBar } from "@skeletonlabs/skeleton";
	import { marked } from "marked"

	const title = "Fable Frame - an online TTRPG Character Sheet storage"
	const description = "Fable Frame is a simple project that allows you to create Tabletop RPG Character sheets</span> online and use them during your game"
	const url = "https://fable-frame.online/"
	
	async function getParsedChangelogMD() {
		// Fetch the CHANGELOG.md by /CHANGELOG.md url
		const response = await fetch('/CHANGELOG.md');
		const text = await response.text();
		// Parse the markdown to html
		const html = marked(text);
		return html;
	}
	
	pageName.set("About")
</script>

<svelte:head>
    <title>{title}</title>
		<meta name="description" content="Fable Frame is a simple project that allows you to create Tabletop RPG Character sheets online and use them during your game.">

		<!-- OG and Twitter -->
		<meta property="og:site_name" content="Fable Frame" />
		<meta property="og:type" content="website" />
		<meta property="og:title" content="{title}" />
		<meta property="og:description" content="{description}" />
		<meta property="og:url" content="{url}" />
		<meta property="og:image" content="https://images.example.com/example.png" />

		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content="{title}" />
		<meta name="twitter:description" content="{description}" />
		<meta name="twitter:url" content="{url}" />
		<meta name="twitter:image" content="https://images.example.com/example.png" />
</svelte:head>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<div class="space-y-5 text-center flex flex-col items-center w-96">
		<figure class="w-72">
			{@html logo}
		</figure>
		<span class="text-red-800">v0.9.0</span>
		<!-- <h2 class="h2">Welcome!</h2> -->
		<p class="">
			Fable Frame is a simple project that allows you to create <span class="text-primary-400">Tabletop RPG Character sheets</span> online and use them during your game.
		</p>
		<p>
			This is currently a <span class="text-primary-400">Work In Progress</span>. If you are interested - please follow up on <a class="btn btn-sm variant-filled" href="https://github.com/megastruktur/fable-frame">Github</a>
		</p>
	</div>
	
	<div class="flex flex-col items-center mt-5 mx-3">

		<h2 class="h2">Changelog</h2>
	
		<article class="prose lg:prose-xl prose-code:bg-purple-500 dark:prose-invert">
			{#await getParsedChangelogMD()}
				<ProgressBar />
			{:then html}
				{@html html}
			{/await}
		</article>
	
	</div>
</div>
