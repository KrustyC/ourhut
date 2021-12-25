<script lang="ts">
  import TextInput from "$lib/components/admin/FormComponents/TextInput.svelte";
  import ImageSelector from "$lib/components/admin/FormComponents/ImageSelector/ImageSelector.svelte";
  import Editor from "$lib/components/admin/FormComponents/TextEditor/Editor.svelte";
  import DatePicker from "$lib/components/admin/FormComponents/DatePicker.svelte";
  import TimePicker from "$lib/components/admin/FormComponents/TimePicker.svelte";
  import LocationInput from "$lib/components/admin/FormComponents/LocationInput.svelte";
  import { eventSchema } from "./validators";

  export let event = null;
  export let onSaveDraft = () => {};
  export let onPublish = () => {};

  let actionsDisabled = true;
  let validation = true;

  event.subscribe((data) => {
    actionsDisabled = !eventSchema.isValidSync(data);
    
    try {
      validation = eventSchema.validateSync(data);
    } catch (err) {
      console.log(err);
    }
    console.log(validation);
  });
</script>

<div class="flex flex-col">
  <div class="mb-8">
    <TextInput
      bind:value={$event.title}
      label="title"
      name="title"
      placeholder="Event title"
    />
  </div>

  <div class="mb-8">
    <span class="uppercase block text-gray-700 text-sm font-bold mb-2">
      Description
    </span>
    <Editor bind:content={$event.description} />
  </div>

  <div class="mb-8">
    <span class="uppercase block text-gray-700 text-sm font-bold mb-2">
      Image
    </span>
    <ImageSelector bind:image={$event.image} />
  </div>

  <div class="flex mb-8">
    <div class="flex flex-col mr-8">
      <label class="uppercase block text-gray-700 text-sm font-bold mb-3">
        Date
      </label>
      <DatePicker bind:selectedDate={$event.date.day} />
    </div>

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

  <div class="mb-8">
    <label
      class="uppercase block text-gray-700 text-sm font-bold mb-2"
      for="price"
    >
      Price in GBP
      <span class="italic text-xs"> (set it to 0 if the event is free) </span>
    </label>

    <input
      id="price"
      name="price"
      bind:value={$event.price}
      type="text"
      placeholder="20"
      class="w-16 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>

  <div class="mb-8">
    <LocationInput bind:location={$event.location} />
  </div>

  <div class="flex border-t-2 border-slate-300 pt-4">
    <button class="btn-admin btn-primary mr-4" disabled={actionsDisabled}>
      Publish Event
    </button>
    <button class="btn-admin btn-outlined-primary" disabled={actionsDisabled}>
      Create Draft
    </button>
  </div>
</div>
