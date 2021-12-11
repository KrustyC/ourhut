<script>
  import { page } from "$app/stores";

  export let href = "";
  export let label = "";

  $: isActive = $page.path === href || $page.path + "/" === href;
</script>

<a
  {href}
  class={`text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group ${
    isActive ? "bg-gray-100" : ""
  }`}
  class:active={$page.path === href || $page.path + "/" === href}
>
  <slot />

  <span class="ml-3">{label}</span>
</a>
