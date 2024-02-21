<script lang="ts">
	import "../app.postcss";
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { size } from '@floating-ui/dom';
	import { initializeStores, storePopup, Modal, Toast, getDrawerStore, Drawer } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow, size });
	// The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { fade } from "svelte/transition"
	import CharacterNotesDrawer from "$lib/components/character-notes/CharacterNotesDrawer.svelte";
	import { headerBanner, pageName } from "$lib/stores"
	import { onDestroy } from "svelte"
	import CampaignCharactersDrawer from "$lib/components/characters/CampaignCharactersDrawer.svelte";
	import CampaignNotesDrawer from "$lib/components/campaign/CampaignNotesDrawer.svelte";
	import CampaignChatWindow from "$lib/components/campaign-chat/CampaignChatWindow.svelte";
	import ScenesManager from "$lib/components/scenes/ScenesManager.svelte";
	import CampaignRequests from "$lib/components/campaign/CampaignRequests.svelte";
	import CampaignEditDrawer from "$lib/components/campaign/CampaignEditDrawer.svelte";
	import NavigationButtons from "$lib/components/global/NavigationButtons.svelte";
	import { browser } from "$app/environment";

	let routeName: string = ""

	initializeStores()

	const drawerStore = getDrawerStore()

	export let data
	let bannerUrl: string

	const unsubscribeheaderBanner = headerBanner.subscribe((banner: string) => {
		bannerUrl = banner
	})

	const unsubscribePageName = pageName.subscribe((pageName: string) => {
		routeName = pageName
	})
	
	function nav_back() {
		if (browser) window.history.back();
	}

	onDestroy(() => {
		unsubscribeheaderBanner()
		unsubscribePageName()
	})

	$: data.pathname, headerBanner.set("")
</script>

<Modal />

<Drawer rounded="rounded-none">
	{#if $drawerStore.id === "character-notes"}
		<CharacterNotesDrawer characterId={$drawerStore.meta.characterId} />
	{:else if $drawerStore.id === "campaign-character-list"}
		<CampaignCharactersDrawer
			characters={$drawerStore.meta.characters}
			campaign={$drawerStore.meta.campaign}
			rpgSystem={$drawerStore.meta.rpgSystem}
			/>
	{:else if $drawerStore.id === "scenes-manager"}
		<ScenesManager scenes={$drawerStore.meta.scenes} campaign={$drawerStore.meta.campaign} />
	{:else if $drawerStore.id === "campaign-notes-list"}
		<CampaignNotesDrawer campaignId={$drawerStore.meta.campaignId} />
	{:else if $drawerStore.id === "campaign-requests"}
		<CampaignRequests characters={$drawerStore.meta.characters} campaignId={$drawerStore.meta.campaignId} />
	{:else if $drawerStore.id === "campaign-chat"}
		<CampaignChatWindow campaign={$drawerStore.meta.campaignWithCharacters} />
	{:else if $drawerStore.id === "campaign-edit"}
		<CampaignEditDrawer campaign={$drawerStore.meta.campaign} />
	{/if}
</Drawer>
<!-- App Shell -->

<div class="w-full relative h-full {bannerUrl ? "bg-surface-900" : "bg-none"} bg-blend-multiply bg-no-repeat bg-cover bg-top bg-fixed" style="background-image: url('{bannerUrl}')">
	<AppShell regionPage="relative">
	
		<svelte:fragment slot="pageHeader">
	
			<AppBar
				background="bg-surface-800/40"
				spacing="space-y-3 md:space-y-0 mb-3 z-10 relative"
				>
				<svelte:fragment slot="lead">
					<button class="btn btn-sm" on:click={nav_back}>
						<i class="i-[material-symbols--arrow-back] text-3xl"></i>
					</button>
				</svelte:fragment>

				<svelte:fragment slot="headline">
					<h2 class="h2 md:hidden font-bold text-center uppercase optima-regular">{routeName}</h2>
				</svelte:fragment>
				<h2 class="h2 hidden md:block font-bold uppercase optima-regular">{routeName}</h2>
				
				<svelte:fragment slot="trail">
					<NavigationButtons />
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>
	
		<!-- Page Route Content -->
		{#key data.pathname}
			<div class="pb-5 h-full page-content"
				in:fade={{ duration: 300, delay: 300 }}
				out:fade={{ duration: 300 }}
				>
				<slot />
			</div>
		{/key}
	</AppShell>
</div>

<Toast></Toast>
