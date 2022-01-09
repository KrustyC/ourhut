<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import SchoolCard from "$lib/components/admin/Cards/SchoolCard.svelte";
  import DeleteItemModal from "$lib/components/admin/shared/DeleteItemModal.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";
  import AdminIndexLayout from "$lib/components/admin/AdminIndexLayout.svelte";

  let loading = false;
  let fetchResult = undefined;
  let schools = [];
  let schoolToRemoveIndex = -1;

  function onWantToRemoveSchool(index: number) {
    schoolToRemoveIndex = index;
  }

  function onRemoveConfirmed() {
    schools = [
      ...schools.slice(0, schoolToRemoveIndex),
      ...schools.slice(schoolToRemoveIndex + 1),
    ];
    schoolToRemoveIndex = -1;
  }

  function onRemoveCancelled() {
    schoolToRemoveIndex = -1;
  }

  $: {
    if (fetchResult !== undefined) {
      schools = fetchResult.schools;
    }
  }
</script>

<AdminIndexLayout
  title="Schools"
  subtitle="In this section you can manage your Schools."
  itemName="School"
  fetchUrlPath={"/admin-schools"}
  createItemPath={"/admin/schools/new"}
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
        {#each schools as school, index (school._id)}
          <SchoolCard
            {school}
            onWantToRemoveSchool={() => onWantToRemoveSchool(index)}
          />
        {/each}
      </div>
    {/if}
  </div>

  {#if schoolToRemoveIndex > -1}
    <DeleteItemModal
      itemGenericName="school"
      itemToDelete={schools[schoolToRemoveIndex]}
      questionItem={schools[schoolToRemoveIndex].name}
      deletePath={`/admin-schools?id=${schools[schoolToRemoveIndex]._id}`}
      onSuccess={onRemoveConfirmed}
      onCancel={onRemoveCancelled}
    />
  {/if}
</AdminIndexLayout>
