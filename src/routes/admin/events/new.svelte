<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import { writable } from "svelte/store";
  import { goto } from "$app/navigation";
  import { user } from "$lib/stores/user";
  import { notifications } from "$lib/stores/notifications";
  import Panel from "$lib/components/admin/Panel.svelte";
  import EventForm from "$lib/components/admin/Forms/EventForm/EventForm.svelte";
  import { createEvent } from "$lib/components/admin/Forms/EventForm/helpers";

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

  $: token = $user !== null ? $user.access_token : null;

  async function onCreateEvent(status: "publish" | "draft") {
    pending = true;
    try {
      await createEvent({ eventData, status, token });

      notifications.success(
        {
          title: "Event Succesfully Created",
          text: `Your event has been sucessfully created ${
            status === "publish" ? "and published" : "as draft"
          }.`,
        },
        3000
      );

      pending = false;
      setTimeout(() => {
        goto("/admin/events");
      }, 1000);
    } catch (err) {
      pending = false;
      notifications.danger(
        {
          title: "An error occurred",
          text: "Your event could not be updated, please try again later or contact the web admin.",
        },
        5000
      );
    }
  }
</script>

<div class="p-4">
  <div class="flex justify-between items-center">
    <h2 class="text-gray-600 font-bold">Create Event</h2>
  </div>

  <div class="flex justify-between w-100 mt-4">
    <Panel class="mr-4 sm:w-full xl:w-8/12 ">
      <EventForm {pending} {event} onSaveEvent={onCreateEvent} />
    </Panel>
  </div>
</div>
