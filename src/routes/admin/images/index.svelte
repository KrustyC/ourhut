<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { fetchJson } from "$lib/utils/fetch-json";
  import { user } from "$lib/stores/user";
  import PieChartIcon from "$lib/components/icons/PieChart.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";
  import ImageCard from "$lib/components/admin/ImageCard.svelte";
  import DeleteImageModal from "$lib/components/admin/images/DeleteImageModal.svelte";
  import { getImageName } from "$lib/utils/images";
  import ViewImageModal from "$lib/components/admin/images/ViewImageModal.svelte";
  import UploadImageButton from "$lib/components/admin/images/UploadImageButton/index.svelte";

  let selectedImageIndex = undefined;
  let imageToDeleteIndex = undefined;
  let loading = true;

  let images = [];

  $: token = $user !== null ? $user.access_token : null;

  onMount(async () => {
    const res = await fetchJson("/admin-images", { token });

    images = res.images;
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
    <UploadImageButton
      actionCopy="Upload Image"
      folder="images"
      onConfirm={onConfirmImageUpload}
    />
  </div>

  <p class="text-gray-600">
    In this section you can manage your Images. Click on any image to view it in
    its full size or delete it.
  </p>

  <div class="grid grid-cols-4 gap-4 mt-4">
    {#if loading}
      <LoadingSpinner />
    {/if}

    {#each images as image, index}
      <ImageCard {image} onClick={() => onSelectImage(index)} />
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
