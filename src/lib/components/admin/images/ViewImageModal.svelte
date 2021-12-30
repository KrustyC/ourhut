<script>
  import BinIcon from "$lib/components/icons/Bin.svelte";
  import Modal from "$lib/components/admin/Modal.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";

  export let image = undefined;

  export let onClose = () => {};
  export let onWantToDeleteImage = () => {};
</script>

{#if image}
  <Modal>
    <div class="w-full flex justify-center">
      <img class="max-w-md" src={image} />
    </div>

    <div class="flex justify-end mt-4">
      <button class="btn-admin" on:click={onClose}> Close </button>

      <button class="btn-admin btn-danger ml-4" on:click={onWantToDeleteImage}>
        Delete Image
      </button>
    </div>
  </Modal>
{/if}
