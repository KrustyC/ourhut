<script>
  import Modal from "$lib/components/admin/Modal.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";

  export let imageToDelete = undefined;

  export let onCancel = () => {};
  export let onSuccess = () => {};

  let deleting = false;

  function onDeleteImage() {
    deleting = true;
    setTimeout(() => {
      onSuccess();
      deleting = false;
    }, 1500);
    // fetch(`/api/images/${imageToDelete}`, {
    //   method: "DELETE",
    // }).then(() => {
    //   onSuccess();
    // });
  }
</script>

{#if imageToDelete}
  <Modal>
    <div>
      <div class="text-center px-5 flex-auto justify-center">
        <h2 class="text-4xl text-admin-primary font-bold py-4 ">
          Are you sure?
        </h2>
        <p class="text-sm text-gray-500 px-8">
          Do you really want to delete this image? <br />This process cannot be
          undone
        </p>
        <div class="mt-4">
          <img class="w-full" src={imageToDelete} />
        </div>
      </div>

      <div class="p-3 mx-2 text-right space-x-4">
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

