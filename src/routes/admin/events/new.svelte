<script lang="ts">
  import { writable } from "svelte/store";
  import Panel from "$lib/components/admin/Panel.svelte";
  import EventForm from "$lib/components/admin/Forms/EventForm/EventForm.svelte";
  import { createEvent } from "$lib/components/admin/Forms/EventForm/helpers";

  export let srr = false;
  let eventData = null;
  let pending = false;
  let error = false;

  export let event = writable({
    title: "",
    description: "",
    image: "",
    price: null,
    date: {
      day: "",
      startTime: {
        time: undefined,
        period: "AM",
      },
      endTime: {
        time: undefined,
        period: "AM",
      },
    },
    location: {
      address: {
        addressLine: undefined,
        postcode: undefined,
        city: undefined,
      },
      coordinates: {
        lat: null,
        lng: null,
      },
    },
  });

  event.subscribe((data) => {
    eventData = data;
  });

  async function onSaveEvent(status: "publish" | "draft") {
    pending = true;
    try {
      await createEvent(eventData, "draft");
    } catch (err) {
      error = true;
    }

    pending = false;
    event = null;
  }
</script>

<div class="p-4">
  <div class="flex justify-between items-center">
    <h2 class="text-gray-600 font-bold">Create Event</h2>
  </div>

  <div class="flex justify-between w-100 mt-4">
    <Panel class="mr-4 sm:w-full xl:w-8/12 ">
      <EventForm {pending} {event} {onSaveEvent} />
    </Panel>
  </div>
</div>
