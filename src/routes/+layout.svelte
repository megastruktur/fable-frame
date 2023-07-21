<script lang='ts'>
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup, type DrawerSettings } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
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
	
	const drawerSettings: DrawerSettings = {
		id: 'navbar',
		width: 'w-[170px]',
	};
</script>

<Drawer>
	<h2 class="h2 p-4">Navigation</h2>
	<hr />
	<Sidebar />
</Drawer>
<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-56">
	<svelte:fragment slot="sidebarLeft">
    <Sidebar />
	</svelte:fragment>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<button class="lg:hidden btn btn-sm mr-4" on:click={() => drawerStore.open(drawerSettings)}>
					<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
					</span>
				</button>
				<strong class="text-xl uppercase">Fable Frame (WIP)</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a href="mailto:astrtomortis@gmail.com" class="btn"><Icon src={BsEnvelope} /></a>
				<a href="https://github.com/megastruktur/fable-frame" class="btn"><Icon src={BsGithub} /></a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<div class="px-4 h-full">
		<slot />
	</div>
</AppShell>
