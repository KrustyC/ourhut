<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { variables } from "$lib/variables";
  import Panel from "$lib/components/admin/Panel.svelte";
  import EventForm from "$lib/components/admin/Forms/EventForm/EventForm.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";
  import { updateEvent } from "$lib/components/admin/Forms/EventForm/helpers";

  export let srr = false;
  let eventData = null;
  let loading = false; // track the initial load
  let pending = false; // track the event update
  const slug = $page.params.slug;
  let error = false;

  let event = writable();

  onMount(async () => {
    const res = await fetch(
      `${variables.basePath}/.netlify/functions/admin-events?slug=${slug}`
    );
    const json = await res.json();

    event.set(json.event);
    loading = false;
  });

  event.subscribe((data) => {
    eventData = data;
  });

  async function onSaveEvent(status: "publish" | "draft") {
    pending = true;
    try {
      await updateEvent(slug, eventData, "draft");
    } catch (err) {
      error = true;
    }

    pending = false;
    event = null;
  }
</script>

<div class="p-4">
  <div class="flex justify-between items-center">
    <h2 class="text-gray-600 font-bold">Update Event</h2>
  </div>

  <div class="flex justify-between w-100 mt-4">
    {#if loading}
      <LoadingSpinner />
    {:else if eventData}
      <Panel class="mr-4 sm:w-full xl:w-8/12 ">
        <EventForm {pending} {event} {onSaveEvent} />
      </Panel>
    {/if}
  </div>
</div>
