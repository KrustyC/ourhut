<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { fetchJson } from "$lib/utils/fetch-json";
  import { user } from "$lib/stores/user";
  import EventCard from "$lib/components/admin/events/EventCard.svelte";
  import DeleteEventModal from "$lib/components/admin/events/DeleteEventModal.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";

  let loading = false;
  let events = [];
  let eventToRemoveIndex = -1;

  $: token = $user !== null ? $user.access_token : null;

  onMount(async () => {
    const res = await fetchJson("/admin-events", { token });

    events = res.events;
    loading = false;
  });

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
</script>

<div class="p-4">
  <div class="flex justify-between items-center">
    <h2 class="text-gray-600 font-bold">Events</h2>

    <a
      href="/admin/events/new"
      class="btn-admin btn-primary btn-sm text-base"
    >
      Add New Event
    </a>
  </div>
  <p class="text-gray-600">In this section you can manage your Events.</p>
  <div>
    {#if loading}
      <LoadingSpinner />
    {:else}
      <div
        class="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        {#each events as event, index (event.slug)}
          <EventCard
            {event}
            onWantToRemoveEvent={() => onWantToRemoveEvent(index)}
          />
        {/each}
      </div>
    {/if}
  </div>
</div>

{#if eventToRemoveIndex > -1}
  <DeleteEventModal
    eventToDelete={events[eventToRemoveIndex]}
    onSuccess={onRemoveConfirmed}
    onCancel={onRemoveCancelled}
  />
{/if}
