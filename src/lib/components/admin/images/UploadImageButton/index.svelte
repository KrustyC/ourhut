<script lang="ts">
  import { variables } from "$lib/variables";
  import { uploadFileToS3 } from "$lib/utils/upload-file";
  import Modal from "$lib/components/admin/Modal.svelte";
  import ImagesUploadPreviewModal from "./ImagesUploadPreviewModal.svelte";

  let files, fileinput;
  export let onConfirm = (newImage: string) => {};

  function onWantToUpload() {
    fileinput.click();
  }

  async function onUploadToS3() {
    const file = files[0];
    const newImage = await uploadFileToS3(files[0]);

    onConfirm(newImage);

    files = undefined;
  }

  function onCancel() {
    files = undefined;
  }
</script>

<div>
  <button class="btn-admin btn-primary btn-sm" on:click={onWantToUpload}>
    Upload Image
  </button>
  <input
    style="display:none"
    type="file"
    accept=".jpg, .jpeg, .png"
    bind:files
    bind:this={fileinput}
  />

  {#if files}
    <ImagesUploadPreviewModal {files} onConfirm={onUploadToS3} {onCancel} />
  {/if}
</div>
