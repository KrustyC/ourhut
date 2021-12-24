<script lang="ts">
  import TextInput from "$lib/components/admin/FormComponents/TextInput.svelte";
  import Editor from "$lib/components/admin/FormComponents/TextEditor/Editor.svelte";
  import DatePicker from "$lib/components/admin/FormComponents/DatePicker.svelte";
  import TimePicker from "$lib/components/admin/FormComponents/TimePicker.svelte";

  export let event = null;
  export let onSaveDraft = () => {};
  export let onPublish = () => {};
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
      type="text"
      placeholder="20"
      class="w-16 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>

  <div class="mb-8">
    <!-- <label
              class="uppercase block text-gray-700 text-sm font-bold mb-2"
              
            >
              Location
            </label> -->
    <TextInput
      label="Location"
      name="Location"
      placeholder="Insert a full address (ex. 4, Wilberforce Mews, SW4 6BL, London)"
    />
  </div>

  <div class="flex">
    <button class="btn-admin btn-primary mr-4">Publish Event</button>
    <button class="btn-admin btn-outlined-primary">Create Draft</button>
  </div>
</div>
