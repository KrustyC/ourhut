<!-- <script>
  import { onMount } from "svelte";
  import { variables } from "$lib/variables";

  let projects = [];
  let pending = true;

  const url = `${variables.basePath}/.netlify/functions/admin-projects`;
  onMount(async () => {
    const res = await fetch(url);
    const json = await res.json();
    projects = json.projects;
    pending = false;
  });
</script> -->

<div class="p-4">
  <h2 class="text-gray-600 font-bold">Projects</h2>
  <p class="text-gray-600">In this section you can manage your projects.</p>

  <!-- {#if pending}
    <h2 class="text-gray-700">Loading...</h2>
  {:else}
    <ul>
      {#each projects as project}
        <li>
          <a href="/admin/projects/edit">
            <h4 class="text-gray-700">- {project.title}</h4>
          </a>
        </li>
      {/each}
    </ul>
  {/if} -->
</div>
