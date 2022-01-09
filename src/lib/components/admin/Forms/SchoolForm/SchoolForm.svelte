<script lang="ts">
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";
  import Editor from "$lib/components/admin/FormComponents/TextEditor/Editor.svelte";
  import TextInput from "$lib/components/admin/FormComponents/TextInput.svelte";
  import AlertErrorBox from "$lib/components/admin/shared/AlertErrorBox.svelte";
  import { schoolSchema } from "./validators";
  import { saveEvent } from "./helpers";

  export let school = null;
  export let pending = false;
  export let onSaveSchool = (): void => {};

  let error = undefined;

  school.subscribe((data) => {
    try {
      schoolSchema.validateSync(data);
      error = undefined;
    } catch (err) {
      error = err.message;
    }
  });

  $: actionsDisabled = error !== undefined;
</script>

<div class="flex flex-col w-full">
  <div class="flex mb-8 w-full">
    <TextInput
      bind:value={$school.name}
      label="name"
      name="name"
      placeholder="Name"
    />
  </div>

  <div class="flex mb-8">
    <TextInput
      bind:value={$school.postcode}
      label="postcode"
      name="postcode"
      placeholder="Postcode"
      width="w-1/2"
    />
  </div>

  <div class="flex items-center border-t-2 border-slate-300 pt-4 h-24">
    <button
      class="btn-admin btn-primary mr-4"
      disabled={actionsDisabled | pending}
      on:click={onSaveSchool}
    >
      {#if pending}
        <LoadingSpinner />
      {:else}
        Save School
      {/if}
    </button>

    {#if error !== undefined}
      <AlertErrorBox {error} />
    {/if}
  </div>
</div>
