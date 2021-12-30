<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { fetchJson } from "$lib/utils/fetch-json";
  import { getImageName } from "$lib/utils/images";
  import { user } from "$lib/stores/user";
  import PieChartIcon from "$lib/components/icons/PieChart.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";
  import DeleteImageModal from "$lib/components/admin/images/DeleteImageModal.svelte";
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
    <UploadImageButton onConfirm={onConfirmImageUpload} />
  </div>

  <p class="text-gray-600">
    In this section you can manage your Images. Click on any image to view it in
    its full size.
  </p>

  <div class="grid grid-cols-4 gap-4 mt-4">
    {#if loading}
      <LoadingSpinner />
    {/if}

    {#each images as image, index}
      <div class="img-card" on:click={() => onSelectImage(index)}>
        <div class="img-container">
          <img src={image} />
        </div>

        <div
          class="img-name flex w-full h-auto bg-white flex justify-center items-center"
        >
          {getImageName(image)}
        </div>
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

<style>
  .img-card {
    dispaly: flex;
    flex-direction: column;
    border: 2px solid rgb(223, 223, 227);
    border-radius: 5px;
    cursor: pointer;
    border-radius: 5px;
    height: 230px;
  }

  .img-container {
    height: 160px;
    background-color: rgb(242, 242, 242);
    background-size: 16px 16px;
    background-position: 0px 0px, 8px 8px;
    background-image: linear-gradient(
        45deg,
        rgb(230, 230, 230) 25%,
        transparent 25%,
        transparent 75%,
        rgb(230, 230, 230) 75%,
        rgb(230, 230, 230)
      ),
      linear-gradient(
        45deg,
        rgb(230, 230, 230) 25%,
        transparent 25%,
        transparent 75%,
        rgb(230, 230, 230) 75%,
        rgb(230, 230, 230)
      );

    border-bottom: 2px solid rgb(223, 223, 227);
  }

  .img-container > img {
    width: 100%;
    height: 160px;
    object-fit: contain;
  }

  .img-name {
    height: 66px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
</style>
