<script lang="ts">
  import { parse, format } from "date-fns";
  import PriceIcon from "$lib/components/icons/PriceIcon.svelte";
  import LinkIcon from "$lib/components/icons/LinkIcon.svelte";
  import { formatPriceBrowser } from "$lib/utils/price";

  export let product = {};
  export let onWantToRemoveProduct = () => {};
</script>

<div class="bg-white shadow rounded-lg p-4 ">
  <div class="flex flex-col">
    <span class="text-xl font-bold text-gray-900">
      {product.name}
    </span>

    <div class="flex mb-2">
      <div class="flex items-end mr-4">
        <div class="icon-wrapper">
          <LinkIcon height="h-4" width="w-4" />
        </div>
        <span class="ml-1 text-sm text-gray-600">
          <a class="text-admin-link" href={product.etsyLink} target="_blank">
            Etsy Link
          </a>
        </span>
      </div>

      <div class="flex items-end mt-1">
        <div class="icon-wrapper">
          <PriceIcon height="h-4" width="w-4" />
        </div>
        <span class="ml-1 text-sm text-gray-600">
          {formatPriceBrowser(product.price)}
        </span>
      </div>
    </div>

    <div class="flex items-end justify-end mt-2 w-100">
      <div>
        <a
          href={`/admin/products/${product._id}`}
          class="btn-admin btn-primary btn-sm text-base uppercase mr-2"
        >
          Edit
        </a>

        <button
          class="btn-admin btn-danger btn-sm text-base uppercase"
          on:click={onWantToRemoveProduct}
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  .icon-wrapper {
    margin-bottom: 2px;
  }
</style>
