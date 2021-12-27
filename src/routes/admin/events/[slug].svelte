<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { notifications, NotificationType } from "$lib/stores/notifications";
  import { variables } from "$lib/variables";
  import Panel from "$lib/components/admin/Panel.svelte";
  import EventForm from "$lib/components/admin/Forms/EventForm/EventForm.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";
  import { updateEvent } from "$lib/components/admin/Forms/EventForm/helpers";

  export let ssr = false;
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
      await updateEvent(slug, eventData, status);
      notifications.success(
        {
          title: "Event Updated",
          text: "Your event has been sucessfully updated!",
        },
        3000
      );

      setTimeout(() => {
        goto("/admin/events");
      }, 1000);
    } catch (err) {
      error = true;
      notifications.error(
        {
          title: "An error occurred",
          text: "Your event could not be updated, please try again later or contact the web admin.",
        },
        5000
      );
    }

    pending = false;
    event = null;
  }
</script>

<div class="p-4">
  <div class="flex flex-col sm:w-full xl:w-8/12">
    <div class="flex justify-between items-center w-100">
      <h2 class="text-gray-600 font-bold">Update Event</h2>
      <a href="/admin/events" class="text-black">Go Back</a>
    </div>

    <div class="mt-4 w-100">
      {#if loading}
        <LoadingSpinner />
      {:else if eventData}
        <Panel class="w-100">
          <EventForm {pending} {event} {onSaveEvent} />
        </Panel>
      {/if}
    </div>
  </div>
</div>
