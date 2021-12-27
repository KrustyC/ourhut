<script lang="ts">
  import { parse, format } from "date-fns";
  import MarkerIcon from "$lib/components/icons/MarkerIcon.svelte";
  import Calendar from "$lib/components/icons/Calendar.svelte";
  import { getAddressText } from "$lib/utils/address";

  export let event = {};
  export let onWantToRemoveEvent = () => {};

  $: bgColor = event.isPublished ? "bg-green-500" : "bg-yellow-300";
  $: fontColor = event.isPublished ? "text-white" : "text-black";
  $: copy = event.isPublished ? "published" : "draft";

  function formatDate(day: string): string {
    return format(parse(day, "dd/MM/yyyy", new Date()), "dd MMM yyyy");
  }
</script>

<div class="bg-white shadow rounded-lg p-4 ">
  <div class="flex flex-col">
    <span class="text-xl font-bold text-gray-900">
      {event.title}
    </span>

    <div class="flex items-end mt-3 mb-2">
      <div class="marker-wrapper">
        <Calendar height="h-4" width="w-4" />
      </div>
      <span class="ml-2 text-sm text-gray-600">
        {formatDate(event.date.day)} /
        {#if event.date.startTime}
          <b>from</b>
          {event.date.startTime.time}{" "}{event.date.startTime.period}
          {#if event.date.endTime}
            <b>to</b>
            {event.date.endTime.time}{" "}{event.date.endTime.period}
          {/if}
        {/if}
      </span>
    </div>

    <div class="flex items-end mb-2">
      <div class="marker-wrapper">
        <MarkerIcon height="h-4" width="w-4" />
      </div>
      <span class="ml-2 text-sm text-gray-600">
        {getAddressText(event.location)}
      </span>
    </div>

    <div class="flex items-end justify-between mt-2 w-100">
      <div>
        <span
          class={`${bgColor} ${fontColor} inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none rounded-full uppercase`}
        >
          {copy}
        </span>
      </div>

      <div>
        <a
          href={`/admin/events/${event.slug}`}
          class="btn-admin btn-primary btn-sm text-base uppercase mr-2"
        >
          Edit
        </a>

        <button
          class="btn-admin btn-danger btn-sm text-base uppercase"
          on:click={onWantToRemoveEvent}
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .marker-wrapper {
    margin-bottom: 3px;
  }
</style>
