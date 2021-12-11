<script context="module">
  export const ssr = false;
</script>

<script>
  import { onMount } from "svelte";
  import netlifyIdentity from "netlify-identity-widget";
  import Sidebar from "$lib/components/admin/Sidebar/index.svelte";
  import Navbar from "$lib/components/admin/Navbar.svelte";
  // import SummaryCard from "$lib/components/SummaryCard.svelte";
  import { user, redirectURL } from "./store.js";

  $: isLoggedIn = !!$user;

  onMount(() => {
    netlifyIdentity.init();
  });

  function onLoginOrSignup(action) {
    netlifyIdentity.open(action);
    netlifyIdentity.on(action, (u) => {
      console.log("user logged in", u);
      user.login(u);
      netlifyIdentity.close();
      if ($redirectURL !== "") {
        navigate($redirectURL);
        redirectURL.clearRedirectURL();
      }
    });
  }

  function onLogout() {
    // navigate("/");
    // netlifyIdentity.open("logout");
    user.logout();
    netlifyIdentity.logout();
  }
</script>

<div class="h-screen bg-admin-grey">
  {#if isLoggedIn}
    <div>
      <Navbar />

      <div class="flex overflow-hidden bg-white pt-16">
        <Sidebar />
        <div
          class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
          id="sidebarBackdrop"
        />
        <div
          id="main-content"
          class="h-full w-full bg-admin-grey relative overflow-y-auto lg:ml-64"
        >
          <main>
            <slot />
          </main>
        </div>
      </div>
    </div>
  {:else}
    <div
      class="h-screen flex flex-col items-center justify-center bg-admin-grey text-gray-700"
    >
      <h1 class="text-gray-400 font-bold">Our Hut</h1>

      <button
        class="px-4 py-3 rounded-md mt-8 font-bold bg-gray-800 text-white"
        on:click={() => onLoginOrSignup("login")}
        >Log In with Netlify Identity</button
      >
      <p class="mt-4">This is a private area. Please log in to view.</p>
    </div>
  {/if}
</div>
