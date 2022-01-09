<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { fetchJson } from "$lib/utils/fetch-json";
  import { user } from "$lib/stores/user";

  export let fetchUrlPath = "";
  export let createItemPath = "";
  export let title = "";
  export let subtitle = "";
  export let itemName = "";
  export let fetchResult = [];
  export let loading = false;

  $: token = $user !== null ? $user.access_token : null;

  onMount(async () => {
    loading = true;
    const res = await fetchJson(fetchUrlPath, { token });

    fetchResult = res;
    loading = false;
  });
</script>

<div class="p-4">
  <div class="flex justify-between items-center">
    <h2 class="text-gray-600 font-bold">{title}</h2>

    <a href={createItemPath} class="btn-admin btn-primary btn-sm text-base">
      Add New {itemName}
    </a>
  </div>
  <p class="text-gray-600">{subtitle}</p>
  <div>
    <slot />
  </div>
</div>
