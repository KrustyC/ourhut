<script>
  import { onMount } from "svelte";
  import { variables } from "$lib/variables";
  import SummaryCard from "$lib/components/admin/SummaryCard.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";
  import { user } from "./store.js";

  export let ssr = false;

  let stats = {
    news: 0,
    projects: 0,
    events: 0,
  };

  onMount(async () => {
    const res = await fetch(
      `${variables.basePath}/.netlify/functions/admin-stats`
    );
    const { news, events, projects } = await res.json();

    stats = { news, events, projects };
  });

  $: username = $user !== null ? $user.username : null;
</script>

<div class="p-4">
  <h2 class="text-gray-600 font-bold">Welcome back {username}</h2>
  <p class="text-gray-600">
    This is your admin panel, where you can handle everything about events,
    news, projects and images.
  </p>

  <div class="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    <SummaryCard
      title={`${stats.news} News`}
      link={{ path: "/admin/news", copy: "Manage News" }}
    />
    <SummaryCard
      title={`${stats.projects} Projects`}
      link={{ path: "/admin/projects", copy: "Manage Projects" }}
    />
    <SummaryCard
      title={`${stats.events} Events`}
      link={{ path: "/admin/events", copy: "Manage Events" }}
    />
  </div>
</div>
