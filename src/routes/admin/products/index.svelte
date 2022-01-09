<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";
  import AdminIndexLayout from "$lib/components/admin/AdminIndexLayout.svelte";
  import ProductCard from "$lib/components/admin/products/ProductCard.svelte";
  import DeleteItemModal from "$lib/components/admin/shared/DeleteItemModal.svelte";

  let loading = false;
  let fetchResult = undefined;
  let products = [];
  let productToRemoveIndex = -1;

  function onWantToRemoveProduct(index: number) {
    productToRemoveIndex = index;
  }

  function onRemoveConfirmed() {
    products = [
      ...products.slice(0, productToRemoveIndex),
      ...products.slice(productToRemoveIndex + 1),
    ];
    productToRemoveIndex = -1;
  }

  function onRemoveCancelled() {
    productToRemoveIndex = -1;
  }

  $: {
    if (fetchResult !== undefined) {
      products = fetchResult.products;
    }
  }

  $: console.log(productToRemoveIndex);
</script>

<AdminIndexLayout
  title="Shop"
  subtitle="In this section you can manage all you sellable products."
  itemName="Product"
  fetchUrlPath={"/admin-products"}
  createItemPath={"/admin/products/new"}
  bind:fetchResult
  bind:loading
>
  <div class="flex flex-wrap">
    {#if loading}
      <LoadingSpinner />
    {:else}
      <div
        class="mt-4 w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {#each products as product, index (product._id)}
          <ProductCard
            {product}
            onWantToRemoveProduct={() => onWantToRemoveProduct(index)}
          />
        {/each}
      </div>
    {/if}
  </div>

  {#if productToRemoveIndex > -1}
    <DeleteItemModal
      itemGenericName="product"
      itemToDelete={products[productToRemoveIndex]}
      questionItem={products[productToRemoveIndex].name}
      deletePath={`/admin-products?id=${products[productToRemoveIndex]._id}`}
      onSuccess={onRemoveConfirmed}
      onCancel={onRemoveCancelled}
    />
  {/if}
</AdminIndexLayout>
