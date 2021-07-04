<script>
  export let userEmail = "Loading...";
  export let emailLoaded;
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { userDetails } from "../userStores.js";

  emailLoaded = false;
  onMount(() => {
    google.script.run.withSuccessHandler(setEmail).getUserEmail();
  });
  function setEmail(email) {
    userEmail = email;
  }
</script>

<nav
  class="flex items-center justify-between flex-wrap rounded-sm bg-gradient-to-r from-blue-500 to-blue-600 px-12 py-3"
>
  <div class="flex-initial">
    <div>
      <a href="#/" class="hover:text-gray-300 mx-2 text-sm text-white">Sign up</a>
      <a href="#/home/" class="hover:text-gray-300 mx-2 text-sm text-white">Home</a>
      <a href="#/dashboard/" class="hover:text-gray-300 mx-2 text-sm text-white">Dashboard</a>
      {#if $userDetails.isAdmin && $userDetails.isAdmin !== undefined}
        <a href="#/admin/" class="hover:text-gray-300 mx-2 text-sm text-white">Admin</a>
      {/if}
    </div>
  </div>
  <div>
    {#key userEmail}
      <div
        in:fade={{ duration: 1000 }}
        class="rounded-full py-1 px-6 bg-blue-700 text-gray-300 text-sm border border-gray-300"
      >
        {userEmail.slice(0, userEmail.indexOf("@"))}
      </div>
    {/key}
  </div>
</nav>
