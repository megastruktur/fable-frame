<script lang='ts'>
	import { dev } from "$app/environment"
	import { inject } from "@vercel/analytics"
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import { size } from '@floating-ui/dom';
	import { storePopup, type DrawerSettings, Modal, Toast } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow, size });
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';

	import Icon from "svelte-icons-pack";
	import BsGithub from "svelte-icons-pack/bs/BsGithub";
	import BsEnvelope from "svelte-icons-pack/bs/BsEnvelope";

	import { fade } from "svelte/transition"
	import CharacterNotesDrawer from "$lib/components/character-notes/CharacterNotesDrawer.svelte";
	import { rpgSystemBanner } from "$lib/stores"
	import { onDestroy } from "svelte"
	
	const drawerSettings: DrawerSettings = {
		id: 'navbar',
		width: 'w-50',
	};

	// Inject the Analytics functionality
	inject({ mode: dev ? 'development' : 'production' });

	export let data

	rpgSystemBanner.set("")
	let bannerUrl: string = ""
	const unsubscriberpgSystemBanner = rpgSystemBanner.subscribe((banner: string) => {
		bannerUrl = banner
	})

	onDestroy(() => {
		unsubscriberpgSystemBanner()
	})


console.log($rpgSystemBanner)
</script>

<Modal />

<Drawer>
	{#if $drawerStore.id === "navbar"}
	<Sidebar />
	{:else if $drawerStore.id === "character-notes"}
	<CharacterNotesDrawer />
	{/if}
</Drawer>
<!-- App Shell -->
<AppShell regionPage="relative">

	<!-- Sidebar -->
	<svelte:fragment slot="pageHeader">
		<AppBar>
			<svelte:fragment slot="lead">
				<button class="btn btn-sm mr-4" on:click={() => drawerStore.open(drawerSettings)}>
					<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
					</span>
				</button>
				<strong class="text-xl uppercase optima-regular">Fable Frame (WIP) <span class="text-xs text-red-800">v0.4.0</span></strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a href="mailto:astrtomortis@gmail.com" class="btn"><Icon src={BsEnvelope} /></a>
				<a href="https://github.com/megastruktur/fable-frame" class="btn"><Icon src={BsGithub} /></a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Page Route Content -->
	{#key data.pathname}
	<div class="px-4 h-full page-content {bannerUrl ? "bg-surface-900" : "bg-none"} bg-blend-multiply bg-no-repeat bg-cover bg-center" style="background-image: url('{bannerUrl}')"
		in:fade={{ duration: 300, delay: 300 }}
		out:fade={{ duration: 300 }}
		>
		<slot />
	</div>
	{/key}

	<!-- Footer -->
	<svelte:fragment slot="pageFooter">
		<div class="h-24"></div>
	</svelte:fragment>
</AppShell>

<Toast />
