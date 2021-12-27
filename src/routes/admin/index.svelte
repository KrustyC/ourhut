<script>
  import { onMount } from "svelte";
  import { fetchJson } from "$lib/utils/fetch-json";
  import { user } from "$lib/stores/user";
  import SummaryCard from "$lib/components/admin/SummaryCard.svelte";
  import LoadingSpinner from "$lib/components/shared/LoadingSpinner.svelte";

  export const ssr = false;

  let stats = {
    news: 0,
    projects: 0,
    events: 0,
  };

  $: username = $user !== null ? $user.username : null;
  $: token = $user !== null ? $user.access_token : null;

  onMount(async () => {
    const { news, events, projects } = await fetchJson("/admin-stats", {
      token,
    });

    stats = { news, events, projects };
  });
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
