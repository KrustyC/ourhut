<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import TrusteeCard from "$lib/components/admin/trustees/TrusteeCard.svelte";
  import DeleteItemModal from "$lib/components/admin/shared/DeleteItemModal.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";
  import AdminIndexLayout from "$lib/components/admin/AdminIndexLayout.svelte";

  let loading = false;
  let fetchResult = undefined;
  let trustees = [];
  let trusteeToRemoveIndex = -1;

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

  $: {
    if (fetchResult !== undefined) {
      trustees = fetchResult.trustees;
    }
  }
</script>

<AdminIndexLayout
  title="Trustees"
  subtitle="In this section you can manage your Trustees."
  itemName="Trustee"
  fetchUrlPath={"/admin-trustees"}
  createItemPath={"/admin/trustees/new"}
  bind:fetchResult
  bind:loading
>
  <div class="flex flex-wrap">
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

  {#if trusteeToRemoveIndex > -1}
    <DeleteItemModal
      itemGenericName="trustee"
      itemToDelete={trustees[trusteeToRemoveIndex]}
      questionItem={trustees[trusteeToRemoveIndex].name}
      deletePath={`/admin-trustees?id=${trustees[trusteeToRemoveIndex]._id}`}
      onSuccess={onRemoveConfirmed}
      onCancel={onRemoveCancelled}
    />
  {/if}
</AdminIndexLayout>
