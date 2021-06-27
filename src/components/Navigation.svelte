<script>
  export let userEmail;
  export let emailLoaded;
  import { onMount } from "svelte";
  emailLoaded = false;
  onMount(() => {
    google.script.run.withSuccessHandler(setEmail).getUserEmail();
  });
  function setEmail(email) {
    emailLoaded = true;
    userEmail = email;
  }
</script>

<nav
  class="flex items-center justify-between flex-wrap rounded-sm bg-gradient-to-r from-blue-500 to-blue-600 px-12 py-3"
>
  <div class="flex-initial">
    <div>
      <a href="#/" class="hover:text-gray-500 mx-2 text-sm">Sign up</a>
      <a href="#/home/" class="hover:text-gray-500 mx-2 text-sm">Home</a>
      <a href="#/dashboard/" class="hover:text-gray-500 mx-2 text-sm"
        >Dashboard</a
      >
    </div>
  </div>
  <div>
    {#if !emailLoaded}
      <p class="rounded-full py-1 px-6 bg-indigo-500 text-white text-sm	">
        Signin
      </p>
    {:else}
      <p class="rounded-full py-1 px-6 bg-indigo-600 text-white text-sm	">
        Logged in as: {userEmail.slice(0, userEmail.indexOf("@"))}
      </p>
    {/if}
  </div>
</nav>
