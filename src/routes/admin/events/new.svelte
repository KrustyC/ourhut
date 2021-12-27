<script lang="ts">
  import { writable } from "svelte/store";
  import Panel from "$lib/components/admin/Panel.svelte";
  import EventForm from "$lib/components/admin/Forms/EventForm/EventForm.svelte";
  import { createEvent } from "$lib/components/admin/Forms/EventForm/helpers";
  import { goto } from "$app/navigation";
  import { notifications, NotificationType } from "$lib/stores/notifications";

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

  async function onCreateEvent(status: "publish" | "draft") {
    pending = true;
    try {
      await createEvent(eventData, status);

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
      console.log(err);
      pending = false;
      notifications.error(
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
