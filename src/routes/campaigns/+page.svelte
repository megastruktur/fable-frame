<!-- Campaigns Page -->
<script lang="ts">
	import { receive, send } from '$lib/animation';
	import CampaignCard from '$lib/components/campaign/CampaignCard.svelte';
  import type { CampaignsResponse } from '$lib/pocketbase-types';
	import { toastShow } from '$lib/toast';
	import { getGMCampaigns, getCharacterCampaigns, deleteCampaign } from '$models/campaign';
	import { ProgressRadial, type PopupSettings, popup, type ModalSettings, getModalStore, getToastStore } from '@skeletonlabs/skeleton';
  import Icon from "svelte-icons-pack";
  
	import BsPlus from 'svelte-icons-pack/bs/BsPlus';
	import { flip } from 'svelte/animate';

  const modalStore = getModalStore()
  const toastStore = getToastStore()

  let gmCampaigns: CampaignsResponse[]
  let characterCampaigns: CampaignsResponse[]
  let operationsOnCampaignId: string = ""

  const campaignOperationsPopup: PopupSettings = {
		event: 'focus-click',
		target: "campaignOperationsPopup",
		placement: 'bottom',
		closeQuery: '.list-option'
	};

  async function getData() {
    characterCampaigns = await getCharacterCampaigns()
    gmCampaigns = await getGMCampaigns()
  }

  function deleteCampaignPrompt() {

    const campaign = gmCampaigns.find(c => c.id === operationsOnCampaignId)

    if (campaign !== undefined) {

      const modal: ModalSettings = {
        type: 'confirm',
        title: 'Please Confirm',
        body: `Are you sure you want to remove campaign <span class="text-error-900">${campaign.name}</span>? This action cannot be undone.`,
        response: async (r: boolean) => {
          if (r === true) {
  
            await deleteCampaign(campaign.id)
            gmCampaigns = gmCampaigns.filter(c => c.id !== campaign.id)
            characterCampaigns = characterCampaigns.filter(c => c.id !== campaign.id)
  
            toastShow(`Campaign <span class="text-error-900">${campaign.name}</span> has been removed`, toastStore)
  
          }
        }
      };
      modalStore.trigger(modal);
    }
  }

</script>

<div class="flex flex-col">
	<h1 class="text-3xl m-auto my-6">Your Campaigns</h1>

	{#await getData()}
    <div class="flex items-center">
      <ProgressRadial value={undefined} />
    </div>
	{:then}
    <h2 class="h2 text-center my-6">Game Master in</h2>
    <div class="flex flex-wrap justify-center">
      {#if gmCampaigns.length > 0}

        {#each gmCampaigns as gc(gc.id)}
          <div class="relative"
            animate:flip
            in:receive={{ key: gc.id }}
            out:send={{ key: gc.id }}
          >
            <CampaignCard campaign={gc} classes="m-3" />

            <!-- Campaign Operations -->
            <button
              class="btn-icon variant-ghost-secondary absolute right-2 top-2"
              on:click={() => operationsOnCampaignId = gc.id}
              use:popup={campaignOperationsPopup}
            >⋮</button>

          </div>
        {/each}
      {/if}
      <a
        class="card w-96 shadow-xl card-hover overflow-hidden bg-contain h-96 m-3 flex items-center justify-center"
        href="/campaigns/create">
        <Icon className="flex" size="100" color="" src={BsPlus} />
      </a>
    </div>


    {#if characterCampaigns.length > 0}
      <h2 class="h2 text-center my-6">Play in</h2>

      <div class="flex flex-wrap justify-center">
        {#each characterCampaigns as cc(cc.id)}
        <div
					animate:flip
					in:receive={{ key: cc.id }}
					out:send={{ key: cc.id }}
          >
          <CampaignCard campaign={cc} classes="m-3" />
        </div>
        {/each}
      </div>
    {/if}
	{/await}

  <!-- Operations Popup -->
  <div class="card w-48 shadow-xl py-2" data-popup="campaignOperationsPopup">
    <ul class="list-nav px-2">
      <li class="mb-2"><a href="/campaigns/{operationsOnCampaignId}/edit">Edit</a></li>
      <li>
        <a class="bg-error-900" href="/" on:click|preventDefault={deleteCampaignPrompt}>Remove</a></li>
    </ul>
    <div class="arrow bg-surface-100-800-token" />
  </div>
</div>
