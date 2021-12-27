<script lang="ts">
  import { onMount } from "svelte";
  import { fetchJson } from "$lib/utils/fetch-json";
  import { user } from "$lib/stores/user";
  import Modal from "$lib/components/admin/Modal.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";

  let loading = true;
  let images = [];
  export let onCloseModal = () => {};
  export let onSelectImage = (image: string) => {};

  $: token = $user !== null ? $user.access_token : null;

  onMount(async () => {
    const res = await fetchJson("/admin-images", { token });

    images = res.images;
    loading = false;
  });

  function onChooseImage(index: number) {
    onSelectImage(images[index]);
  }
</script>

<Modal>
  <div>
    <div class="text-left px-5 flex-auto justify-center">
      <h2 class="text-2xl text-admin-primary font-bold py-4">
        Choose an image
      </h2>
      <p class="text-left text-sm text-gray-500">
        Select an image from your gallery. If you can't find the image you are
        looking for, <a href="/admin/images" target="_blank">click here</a> to open
        the images loading page (in a new tab). Once you have added your image, please
        close and re-open this modal.
      </p>
    </div>

    {#if loading}
      <div class="h-24 flex align-center justify-center">
        <LoadingSpinner />
      </div>
    {:else}
      <div class="grid grid-cols-4 gap-4 mt-4 px-5">
        {#each images as image, index}
          <div class="relative border-2 border-slate-300">
            <img class="w-full cursor-pointer" src={image} />
            <button
              class="btn-admin btn-outlined-primary btn-sm absolute bottom-2 right-2"
              on:click={() => onChooseImage(index)}
            >
              Choose
            </button>
          </div>
        {/each}
      </div>
    {/if}

    <div class="text-right mt-8 pt-3 border-t-2 justify-end">
      <button class="btn-admin btn-danger" on:click={onCloseModal}>
        Cancel
      </button>
    </div>
  </div>
</Modal>
