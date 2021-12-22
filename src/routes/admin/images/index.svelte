<script lang="ts">
  import { onMount } from "svelte";
  import { variables } from "$lib/variables";
  import BinIcon from "$lib/components/icons/Bin.svelte";
  import PieChartIcon from "$lib/components/icons/PieChart.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";
  import DeleteImageModal from "./DeleteImageModal.svelte";
  import ViewImageModal from "./ViewImageModal.svelte";
  import UploadImageButton from "./UploadImageButton/index.svelte";

  let selectedImageIndex = undefined;
  let imageToDeleteIndex = undefined;
  let loading = true;

  let images = [];

  onMount(async () => {
    const res = await fetch(`${variables.basePath}/.netlify/functions/images`);
    const json = await res.json();

    images = json.images;
    loading = false;
  });

  function onConfirmImageUpload(newImage: string) {
    images = [...images, newImage];
  }

  function onSelectImage(index) {
    selectedImageIndex = index;
  }

  function onCancelView() {
    selectedImageIndex = undefined;
  }

  function onWantToDeleteImage(index) {
    selectedImageIndex = undefined;
    imageToDeleteIndex = index;
  }

  function onDeleteSuccess() {
    images = [
      ...images.slice(0, imageToDeleteIndex),
      ...images.slice(imageToDeleteIndex + 1),
    ];

    imageToDeleteIndex = undefined;
  }

  function onCancelDelete() {
    imageToDeleteIndex = undefined;
  }
</script>

<div class="p-4">
  <div class="flex justify-between items-center">
    <h2 class="text-gray-600 font-bold">Images</h2>
    <UploadImageButton onConfirm={onConfirmImageUpload} />
  </div>
  <p class="text-gray-600">
    In this section you can manage your Images. Click on any image to view it in
    its full size.
  </p>

  <div class="grid grid-cols-6 gap-4 mt-4">
    {#if loading}
      <LoadingSpinner />
    {/if}

    {#each images as image, index}
      <div class="relative">
        <img
          class="w-full cursor-pointer"
          src={image}
          on:click={() => onSelectImage(index)}
        />
        <button
          class="absolute top-2 right-2 h-6"
          on:click={() => onWantToDeleteImage(index)}
        >
          <BinIcon
            class="fill-current text-admin-danger hover:text-admin-danger-dark top-2 right-2 h-6 cursor-pointer"
          />
        </button>
      </div>
    {/each}
  </div>

  {#if selectedImageIndex !== undefined}
    <ViewImageModal
      image={images[selectedImageIndex]}
      onClose={onCancelView}
      onWantToDeleteImage={() => onWantToDeleteImage(selectedImageIndex)}
    />
  {/if}

  {#if imageToDeleteIndex !== undefined}
    <DeleteImageModal
      imageToDelete={images[imageToDeleteIndex]}
      onCancel={onCancelDelete}
      onSuccess={onDeleteSuccess}
    />
  {/if}
</div>
