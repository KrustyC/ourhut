<script lang="ts">
  import { writable } from "svelte/store";
  import Panel from "$lib/components/admin/Panel.svelte";
  import EventForm from "$lib/components/admin/Forms/EventForm.svelte";

  let eventData = null;

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
      address: "",
      coordinates: {
        lat: null,
        lng: null,
      },
    },
  });

  event.subscribe((data) => {
    eventData = data;
  });

  function onSaveDraft() {
    console.log("onSaveDraft");
  }

  function onPublish() {
    console.log("onPublish");
  }

  $: console.log(eventData);
</script>

<div class="p-4">
  <div class="flex justify-between items-center">
    <h2 class="text-gray-600 font-bold">Create Event</h2>
  </div>

  <div class="flex justify-between w-100 mt-4">
    <Panel class="mr-4 w-8/12">
      <EventForm {event} {onPublish} {onSaveDraft} />
    </Panel>
  </div>
</div>
