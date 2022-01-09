<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import EventCard from "$lib/components/admin/Cards/EventCard.svelte";
  import DeleteItemModal from "$lib/components/admin/shared/DeleteItemModal.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";
  import AdminIndexLayout from "$lib/components/admin/AdminIndexLayout.svelte";

  let loading = false;
  let events = [];
  let fetchResult = undefined;
  let eventToRemoveIndex = -1;

  function onWantToRemoveEvent(index: number) {
    eventToRemoveIndex = index;
  }

  function onRemoveConfirmed() {
    events = [
      ...events.slice(0, eventToRemoveIndex),
      ...events.slice(eventToRemoveIndex + 1),
    ];
    eventToRemoveIndex = -1;
  }

  function onRemoveCancelled() {
    eventToRemoveIndex = -1;
  }

  $: {
    if (fetchResult !== undefined) {
      events = fetchResult.events;
    }
  }
</script>

<AdminIndexLayout
  title="Events"
  subtitle="Here you can manage your events."
  itemName="Event"
  fetchUrlPath={"/admin-events"}
  createItemPath={"/admin/events/new"}
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
        {#each events as event, index (event._id)}
          <EventCard
            {event}
            onWantToRemoveEvent={() => onWantToRemoveEvent(index)}
          />
        {/each}
      </div>
    {/if}
  </div>

  {#if eventToRemoveIndex > -1}
    <DeleteItemModal
      itemGenericName="event"
      itemToDelete={events[eventToRemoveIndex]}
      questionItem={events[eventToRemoveIndex].title}
      deletePath={`/admin-events?slug=${events[eventToRemoveIndex].slug}`}
      onSuccess={onRemoveConfirmed}
      onCancel={onRemoveCancelled}
    />
  {/if}
</AdminIndexLayout>
