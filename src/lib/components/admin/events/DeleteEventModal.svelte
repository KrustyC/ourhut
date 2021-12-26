<script>
  import { variables } from "$lib/variables";
  import Modal from "$lib/components/admin/Modal.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";

  export let eventToDelete = undefined;

  export let onCancel = () => {};
  export let onSuccess = () => {};

  let deleting = false;

  async function onDeleteImage() {
    deleting = true;

    const url = `${variables.basePath}/.netlify/functions/admin-events?slug=${eventToDelete.slug}`;
    const res = await fetch(url, { method: "DELETE" });

    if (res.status === 200) {
      onSuccess();
    } else {
      onCancel();
      console.log("ERRROR"); // Implement error toasts
    }

    deleting = false;
  }
</script>

{#if eventToDelete}
  <Modal width="w-5/12">
    <div>
      <div class="text-left px-2">
        <h2 class="text-4xl text-admin-primary font-bold py-4 ">
          Are you sure?
        </h2>
        <p class="text-left text-gray-500">
          Do you really want to delete the event <b>"{eventToDelete.title}"</b>?
          <br />
          This action is irreversible.
        </p>
      </div>

      <div
        class="p-3 mx-2 text-right space-x-4 border-t-2 border-slate-300 mt-4 pt-4"
      >
        <button disabled={deleting} class="btn-admin" on:click={onCancel}>
          Cancel
        </button>
        <button
          disabled={deleting}
          class="btn-admin btn-danger"
          on:click={onDeleteImage}
        >
          {#if deleting}
            <LoadingSpinner color="bg-admin-danger-dark" />
          {:else}
            Delete
          {/if}
        </button>
      </div>
    </div>
  </Modal>
{/if}
