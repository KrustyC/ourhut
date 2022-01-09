<script lang="ts">
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";
  import Editor from "$lib/components/admin/FormComponents/TextEditor/Editor.svelte";
  import TextInput from "$lib/components/admin/FormComponents/TextInput.svelte";
  import AlertErrorBox from "$lib/components/admin/shared/AlertErrorBox.svelte";
  import { trusteeSchema } from "./validators";
  import { saveEvent } from "./helpers";

  export let trustee = null;
  export let pending = false;
  export let onSaveTrustee = (): void => {};

  let error = undefined;

  trustee.subscribe((data) => {
    try {
      trusteeSchema.validateSync(data);
      error = undefined;
    } catch (err) {
      error = err.message;
    }
  });

  $: actionsDisabled = error !== undefined;
</script>

<div class="flex flex-col">
  <div class="flex mb-8">
    <TextInput
      bind:value={$trustee.name}
      label="name"
      name="name"
      placeholder="Name"
    />
  </div>

  <div class="mb-8">
    <span class="uppercase block text-gray-700 text-sm font-bold mb-2">
      Description
    </span>
    <Editor bind:content={$trustee.description} />
  </div>

  <div class="flex items-center border-t-2 border-slate-300 pt-4 h-24">
    <button
      class="btn-admin btn-primary mr-4"
      disabled={actionsDisabled | pending}
      on:click={onSaveTrustee}
    >
      {#if pending}
        <LoadingSpinner />
      {:else}
        Save Trustee
      {/if}
    </button>

    {#if error !== undefined}
      <AlertErrorBox {error} />
    {/if}
  </div>
</div>
