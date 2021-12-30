<script>
  import Modal from "$lib/components/admin/Modal.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";

  export let files = undefined;
  export let pending = false;

  export let onConfirm = () => {};
  export let onCancel = () => {};
</script>

{#if files.length > 0}
  <Modal>
    <div>
      <div class="text-center px-5 flex-auto justify-center">
        <h2 class="text-4xl text-admin-primary font-bold py-4 ">
          Confirm Your Choices
        </h2>
        <p class="text-sm text-gray-500 px-8">
          Please check the file name correspond to the image you want to upload.
        </p>
        <div class="mt-4">
          <table class="table-auto divide-y divide-gray-200 w-full">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Size (in kB)
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each files as file}
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-left"
                    >{file.name}</td
                  >
                  <td class="px-6 py-4 whitespace-nowrap text-left"
                    >{file.size}</td
                  >
                  <td class="px-6 py-4 whitespace-nowrap text-left"
                    >{file.type}</td
                  >
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <div class="mt-8 flex justify-end">
          <button class="btn-admin" disabled={pending} on:click={onCancel}
            >Cancel</button
          >
          <button
            class="btn-admin btn-primary"
            disabled={pending}
            on:click={onConfirm}
          >
            {#if pending}
              <LoadingSpinner />
            {:else}
              Upload
            {/if}
          </button>
        </div>
      </div>
    </div>
  </Modal>
{/if}
