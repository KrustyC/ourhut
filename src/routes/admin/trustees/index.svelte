<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { fetchJson } from "$lib/utils/fetch-json";
  import { user } from "$lib/stores/user";
  import TrusteeCard from "$lib/components/admin/trustees/TrusteeCard.svelte";
  import DeleteTrusteeModal from "$lib/components/admin/trustees/DeleteTrusteeModal.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";

  let loading = false;
  let trustees = [];
  let trusteeToRemoveIndex = -1;

  $: token = $user !== null ? $user.access_token : null;

  onMount(async () => {
    const res = await fetchJson("/admin-trustees", { token });

    trustees = res.trustees;
    loading = false;
  });

  function onWantToRemoveTrustee(index: number) {
    trusteeToRemoveIndex = index;
  }

  function onRemoveConfirmed() {
    trustees = [
      ...trustees.slice(0, trusteeToRemoveIndex),
      ...trustees.slice(trusteeToRemoveIndex + 1),
    ];
    trusteeToRemoveIndex = -1;
  }

  function onRemoveCancelled() {
    trusteeToRemoveIndex = -1;
  }
</script>

<div class="p-4">
  <div class="flex justify-between items-center">
    <h2 class="text-gray-600 font-bold">Trustees</h2>

    <a
      href="/admin/trustees/new"
      class="btn-admin btn-primary btn-sm text-base"
    >
      Add New Trustee
    </a>
  </div>
  <p class="text-gray-600">In this section you can manage your Trustees.</p>
  <div>
    {#if loading}
      <LoadingSpinner />
    {:else}
      <div
        class="mt-4 w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {#each trustees as trustee, index (trustee._id)}
          <TrusteeCard
            {trustee}
            onWantToRemoveTrustee={() => onWantToRemoveTrustee(index)}
          />
        {/each}
      </div>
    {/if}
  </div>
</div>

{#if trusteeToRemoveIndex > -1}
  <DeleteTrusteeModal
    trusteeToDelete={trustees[trusteeToRemoveIndex]}
    onSuccess={onRemoveConfirmed}
    onCancel={onRemoveCancelled}
  />
{/if}
