<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { fetchJson } from "$lib/utils/fetch-json";
  import { user } from "$lib/stores/user";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { notifications } from "$lib/stores/notifications";
  import Panel from "$lib/components/admin/Panel.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";
  import ProductForm from "$lib/components/admin/Forms/ProductForm/ProductForm.svelte";
  import { updateProduct } from "$lib/components/admin/Forms/ProductForm/helpers";

  let productData = null;
  let loading = false; // track the initial load
  let pending = false; // track the product update
  const id = $page.params.id;
  let error = false;

  let product = writable();

  $: token = $user !== null ? $user.access_token : null;

  onMount(async () => {
    const res = await fetchJson(`/admin-products?id=${id}`, { token });

    product.set(res.product);
    loading = false;
  });

  product.subscribe((data) => {
    productData = data;
  });

  async function onSaveProduct() {
    pending = true;
    try {
      await updateProduct({ id, productData, status, token });
      notifications.success(
        {
          title: "Product Updated",
          text: "Your product has been sucessfully updated!",
        },
        3000
      );

      setTimeout(() => {
        goto("/admin/products");
      }, 500);
    } catch (err) {
      error = true;
      notifications.danger(
        {
          title: "An error occurred",
          text: "Your product could not be updated, please try again later or contact the web admin.",
        },
        5000
      );
    }

    pending = false;
    product = null;
  }
</script>

<div class="p-4">
  <div class="flex flex-col sm:w-full xl:w-8/12">
    <div class="flex justify-between items-center w-100">
      <h2 class="text-gray-600 font-bold">Update Product</h2>
      <a href="/admin/products" class="text-black">Go Back</a>
    </div>

    <div class="mt-4 w-100">
      {#if loading}
        <LoadingSpinner />
      {:else if productData}
        <Panel class="w-100">
          <ProductForm {pending} {product} {onSaveProduct} />
        </Panel>
      {/if}
    </div>
  </div>
</div>
