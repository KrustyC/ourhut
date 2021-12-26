<script>
  import { onMount } from "svelte";
  import { variables } from "$lib/variables";
  import EventCard from "$lib/components/admin/EventCard.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";

  let loading = false;
  let events = [];

  onMount(async () => {
    const res = await fetch(
      `${variables.basePath}/.netlify/functions/admin-events`
    );
    const json = await res.json();

    events = json.events;
    loading = false;
  });
</script>

<div class="p-4">
  <div class="flex justify-between items-center">
    <h2 class="text-gray-600 font-bold">Events</h2>
    <a class="btn-admin btn-dark" href="/admin/events/new">Create Event</a>
  </div>
  <p class="text-gray-600">In this section you can manage your Events.</p>
  <div>
    {#if loading}
      <LoadingSpinner />
    {:else}
      <div
        class="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        {#each events as event}
          <EventCard {event} />
        {/each}
      </div>
    {/if}
  </div>
</div>
