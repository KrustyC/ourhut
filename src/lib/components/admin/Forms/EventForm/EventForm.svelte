<script lang="ts">
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";
  import ImageSelector from "$lib/components/admin/FormComponents/ImageSelector/ImageSelector.svelte";
  import Editor from "$lib/components/admin/FormComponents/TextEditor/Editor.svelte";
  import TextInput from "$lib/components/admin/FormComponents/TextInput.svelte";
  import UrlInput from "$lib/components/admin/FormComponents/UrlInput.svelte";
  import DatePicker from "$lib/components/admin/FormComponents/DatePicker/DatePicker.svelte";
  import TimePicker from "$lib/components/admin/FormComponents/TimePicker.svelte";
  import { eventSchema } from "./validators";
  import { saveEvent } from "./helpers";

  export let event = null;
  export let pending = false;
  export let onSaveEvent = (status: "publish" | "draft"): void => {};

  let actionsDisabled = true;
  let validation = true;

  event.subscribe((data) => {
    actionsDisabled = !eventSchema.isValidSync(data);

    try {
      validation = eventSchema.validateSync(data);
    } catch (err) {
      // console.log(err);
    }
  });
</script>

<div class="flex flex-col">
  <div class="flex mb-8">
    <div class="flex flex-col w-1/2">
      <div class="mb-4">
        <TextInput
          bind:value={$event.title}
          label="title"
          name="title"
          placeholder="Event title"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label class="uppercase block text-gray-700 text-sm font-bold mb-3">
          Date
        </label>
        <DatePicker bind:selectedDate={$event.date.day} />
      </div>

      <div class="flex mb-4">
        <div class="flex flex-col mr-8">
          <label class="uppercase block text-gray-700 text-sm font-bold mb-3">
            Start Time
          </label>
          <TimePicker
            name="startTime"
            bind:time={$event.date.startTime.time}
            bind:period={$event.date.startTime.period}
          />
        </div>

        <div class="flex flex-col">
          <label class="uppercase block text-gray-700 text-sm font-bold mb-3">
            End Time
          </label>
          <TimePicker
            name="endTime"
            bind:time={$event.date.endTime.time}
            bind:period={$event.date.endTime.period}
          />
        </div>
      </div>

      <div>
        <UrlInput
          bind:value={$event.eventbriteLink}
          type="url"
          label="Eventbrite Link"
          name="link"
          placeholder="Eventbrite Link"
        />
      </div>
    </div>

    <div class="w-1/2 ml-8">
      <span class="uppercase block text-gray-700 text-sm font-bold mb-2">
        Image
      </span>
      <ImageSelector bind:image={$event.image} />
    </div>
  </div>

  <div class="mb-8">
    <span class="uppercase block text-gray-700 text-sm font-bold mb-2">
      Description
    </span>
    <Editor bind:content={$event.description} />
  </div>

  <div class="flex border-t-2 border-slate-300 pt-4">
    <button
      class="btn-admin btn-primary  mr-4"
      disabled={actionsDisabled | pending}
      on:click={() => onSaveEvent("draft")}
    >
      {#if pending}
        <LoadingSpinner />
      {:else}
        Save Draft
      {/if}
    </button>

    <button
      class="btn-admin btn-outlined-primary"
      disabled={actionsDisabled | pending}
      on:click={() => onSaveEvent("publish")}
    >
      {#if pending}
        <LoadingSpinner />
      {:else}
        Publish Event
      {/if}
    </button>
  </div>
</div>
