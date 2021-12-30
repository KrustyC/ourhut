<script>
  import { notifications } from "$lib/stores/notifications";
  import { user } from "$lib/stores/user";
  import { fetchJson } from "$lib/utils/fetch-json";
  import Modal from "$lib/components/admin/Modal.svelte";
  import { getImageName } from "$lib/utils/images";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";

  export let imageToDelete = undefined;

  export let onCancel = () => {};
  export let onSuccess = () => {};

  let deleting = false;

  $: token = $user !== null ? $user.access_token : null;

  async function onDeleteImage() {
    deleting = true;
    const fileName = getImageName(imageToDelete);

    try {
      await fetchJson(`/admin-images?name=${fileName}`, {
        method: "DELETE",
        token,
      });

      onSuccess();

      notifications.success(
        {
          title: "Image Succesfully Deleted",
          text: `The image "${fileName}" has been sucessfully deleted!`,
        },
        3000
      );
    } catch (err) {
      notifications.danger(
        {
          title: "An error occurred",
          text: "The image could not be deleted, please try again later or contact the web admin.",
        },
        5000
      );
    }
    deleting = false;
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

        <div class="mt-4 w-full flex justify-center">
          <img class="max-w-md" src={imageToDelete} />
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
