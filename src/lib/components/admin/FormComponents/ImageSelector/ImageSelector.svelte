<script lang="ts">
  import ImageSelectorModal from "./ImageSelectorModal.svelte";

  export let image;
  let showModal = false;

  function onDisplayModal() {
    showModal = true;
  }

  function onCloseModal() {
    showModal = false;
  }

  function onSelectImage(selectedImage: string) {
    image = selectedImage;
    showModal = false;
  }
</script>

<div>
  {#if image}
    <img src={image} class="h-96 w-96 object-contain border-2 border-slate-300" />
  {:else}
    <div
      class="h-96 w-96 flex justify-center items-center border-2 border-slate-300 bg-gray-200"
    >
      <p class="uppercase text-gray-800">No image selected</p>
    </div>
  {/if}

  <button class="btn-admin btn-primary btn-sm mt-2" on:click={onDisplayModal}>
    {image ? "Update" : "Choose"} From Gallery
  </button>
  {#if showModal}
    <ImageSelectorModal {onSelectImage} {onCloseModal} />
  {/if}
</div>
