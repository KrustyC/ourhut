<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Hero from "$lib/components/home/Hero.svelte";

  onMount(() => {
    const hash = window.location.hash;

    if (hash.startsWith("#access_token")) {
      goto(`/admin${hash}`);
    }
  });
</script>

<div class="max-w-screen-lg m-auto flex flex-col">
  <Hero />

  <h1 class="text-accent font-bold mb-20">Work in progress... stay tuned</h1>
</div>
