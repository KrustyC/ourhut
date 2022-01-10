<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { fetchJson } from "$lib/utils/fetch-json";
  import { user } from "$lib/stores/user";
  import PieChartIcon from "$lib/components/icons/PieChart.svelte";
  import ImageCard from "$lib/components/admin/ImageCard.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";
  import DeleteImageModal from "$lib/components/admin/images/DeleteImageModal.svelte";
  import ViewImageModal from "$lib/components/admin/images/ViewImageModal.svelte";
  import UploadImageButton from "$lib/components/admin/images/UploadImageButton/index.svelte";

  let selectedPartnerIndex = undefined;
  let partnerToDeleteIndex = undefined;
  let loading = true;

  let partners = [];

  $: token = $user !== null ? $user.access_token : null;

  onMount(async () => {
    const res = await fetchJson("/admin-partners", { token });

    partners = res.partnerLogos;
    loading = false;
  });

  function onConfirmImageUpload(newImage: string) {
    partners = [...partners, newImage];
  }

  function onSelectPartner(index) {
    selectedPartnerIndex = index;
  }

  function onCancelView() {
    selectedPartnerIndex = undefined;
  }

  function onWantToDeletePartner(index) {
    selectedPartnerIndex = undefined;
    partnerToDeleteIndex = index;
  }

  function onDeleteSuccess() {
    partners = [
      ...partners.slice(0, partnerToDeleteIndex),
      ...partners.slice(partnerToDeleteIndex + 1),
    ];

    partnerToDeleteIndex = undefined;
  }

  function onCancelDelete() {
    partnerToDeleteIndex = undefined;
  }
</script>

<div class="p-4">
  <div class="flex justify-between items-center">
    <h2 class="text-gray-600 font-bold">Partners</h2>
    <UploadImageButton
      actionCopy="Add New Partner"
      folder="partners"
      onConfirm={onConfirmImageUpload}
    />
  </div>

  <p class="text-gray-600">
    In this section you can manage your Partners. Click on any image to view it in
    its full size or delete it.
  </p>

  <div class="grid grid-cols-4 gap-4 mt-4">
    {#if loading}
      <LoadingSpinner />
    {/if}

    {#each partners as partner, index}
      <ImageCard image={partner} onClick={() => onSelectPartner(index)} />
    {/each}
  </div>

  {#if selectedPartnerIndex !== undefined}
    <ViewImageModal
      image={partners[selectedPartnerIndex]}
      onClose={onCancelView}
      onWantToDeleteImage={() => onWantToDeletePartner(selectedPartnerIndex)}
    />
  {/if}

  {#if partnerToDeleteIndex !== undefined}
    <DeleteImageModal
      imageToDelete={partners[partnerToDeleteIndex]}
      onCancel={onCancelDelete}
      onSuccess={onDeleteSuccess}
    />
  {/if}
</div>
