<script lang="ts">
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";
  import Editor from "$lib/components/admin/FormComponents/TextEditor/Editor.svelte";
  import TextInput from "$lib/components/admin/FormComponents/TextInput.svelte";
  import PriceInput from "$lib/components/admin/FormComponents/PriceInput.svelte";
  import ImageSelector from "$lib/components/admin/FormComponents/ImageSelector/ImageSelector.svelte";
  import AlertErrorBox from "$lib/components/admin/shared/AlertErrorBox.svelte";
  import UrlInput from "$lib/components/admin/FormComponents/UrlInput.svelte";
  import { productSchema } from "./validators";
  import { saveProduct } from "./helpers";

  export let product = null;
  export let pending = false;
  export let onSaveProduct = (): void => {};

  let error = undefined;

  product.subscribe((data) => {
    try {
      validation = productSchema.validateSync(data);
      error = undefined;
    } catch (err) {
      error = err.message;
    }
  });

  $: actionsDisabled = error !== undefined;
</script>

<div class="flex flex-col">
  <div class="flex mb-8">
    <div class="flex flex-col w-1/2">
      <div class="mb-4">
        <TextInput
          bind:value={$product.name}
          label="name"
          name="name"
          placeholder="Product name"
        />
      </div>

      <div class="mb-4">
        <PriceInput
          bind:value={$product.price}
          label="price"
          name="price"
          placeholder="Product price"
        />
      </div>

      <div>
        <UrlInput
          bind:value={$product.etsyLink}
          type="url"
          label="Etsy Link"
          name="link"
          placeholder="Etsy Link"
        />
      </div>
    </div>

    <div class="w-1/2 ml-8">
      <span class="uppercase block text-gray-700 text-sm font-bold mb-2">
        Image
      </span>
      <ImageSelector bind:image={$product.image} />
    </div>
  </div>

  <div class="mb-8">
    <span class="uppercase block text-gray-700 text-sm font-bold mb-2">
      Description
    </span>
    <Editor bind:content={$product.description} />
  </div>

  <div class="flex items-center border-t-2 border-slate-300 pt-4 h-24">
    <button
      class="btn-admin btn-primary mr-4"
      disabled={actionsDisabled | pending}
      on:click={onSaveProduct}
    >
      {#if pending}
        <LoadingSpinner />
      {:else}
        Save Product
      {/if}
    </button>

    {#if error !== undefined}
      <AlertErrorBox {error} />
    {/if}
  </div>
</div>
