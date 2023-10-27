<script lang="ts">
	import "../app.postcss";
    import { dev } from "$app/environment"
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import { size } from '@floating-ui/dom';
    import { initializeStores, storePopup, type DrawerSettings, Modal, Toast, getDrawerStore, Drawer } from '@skeletonlabs/skeleton';
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow, size });
    // The ordering of these imports is critical to your app working properly
    // import '@skeletonlabs/skeleton/themes/theme-crimson.css';
    // Most of your app wide CSS should be put in this file
    import '../app.postcss';
    import { AppShell, AppBar } from '@skeletonlabs/skeleton';
    import Sidebar from '$lib/components/Sidebar.svelte';

		// @ts-ignore
    import Icon from "svelte-icons-pack";
    import BsGithub from "svelte-icons-pack/bs/BsGithub";
    import BsEnvelope from "svelte-icons-pack/bs/BsEnvelope";

    import { fade } from "svelte/transition"
    import CharacterNotesDrawer from "$lib/components/character-notes/CharacterNotesDrawer.svelte";
    import { headerBanner } from "$lib/stores"
    import { onDestroy } from "svelte"
		import CampaignCharactersDrawer from "$lib/components/characters/CampaignCharactersDrawer.svelte";
		import CampaignNotesDrawer from "$lib/components/campaign/CampaignNotesDrawer.svelte";
		import { page } from "$app/stores";
	import CampaignChatWindow from "$lib/components/campaign-chat/CampaignChatWindow.svelte";

		let fullscreen = false

		// If $page.data.pathname string contains "scenes" - set fullscreen to true
		if ($page.data.pathname.includes("scenes")) {
			fullscreen = true
		}

    initializeStores()

    const drawerStore = getDrawerStore()

    const drawerSettings: DrawerSettings = {
			id: 'navbar',
			width: 'w-50',
		};

    export let data
    let bannerUrl: string

    const unsubscribeheaderBanner = headerBanner.subscribe((banner: string) => {
		bannerUrl = banner
	})

    onDestroy(() => {
		unsubscribeheaderBanner()
	})

	$: data.pathname, headerBanner.set("")
</script>

<Modal />

<Drawer>
	{#if $drawerStore.id === "navbar"}
		<Sidebar />
	{:else if $drawerStore.id === "character-notes"}
		<CharacterNotesDrawer characterId={$drawerStore.meta.characterId} />
	{:else if $drawerStore.id === "campaign-character-list"}
		<CampaignCharactersDrawer characterIds={$drawerStore.meta.campaignCharactersIds} />
	{:else if $drawerStore.id === "campaign-notes-list"}
		<CampaignNotesDrawer campaignId={$drawerStore.meta.campaignId} />
	{:else if $drawerStore.id === "campaign-chat"}
		<CampaignChatWindow campaign={$drawerStore.meta.campaignWithCharacters} />
	{/if}
</Drawer>
<!-- App Shell -->

<div class="w-full relative {fullscreen ? "h-screen" : "h-full"} {bannerUrl ? "bg-surface-900" : "bg-none"} bg-blend-multiply bg-no-repeat bg-cover bg-top bg-fixed" style="background-image: url('{bannerUrl}')">
	<AppShell regionPage="relative">
	
		<!-- Sidebar -->
		<svelte:fragment slot="pageHeader">
	
			<AppBar background="bg-surface-800/40">
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
					<strong class="text-xl uppercase optima-regular">Fable Frame (WIP) <span class="text-xs text-red-800">v0.7.3</span></strong>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<a href="mailto:astrtomortis@gmail.com" class="btn"><Icon src={BsEnvelope} /></a>
					<a href="https://github.com/megastruktur/fable-frame" class="btn"><Icon src={BsGithub} /></a>
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
