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
      <a href="#/" class="hover:text-gray-500 mx-2 text-sm text-white"
        >Sign up</a
      >
      <a href="#/home/" class="hover:text-gray-500 mx-2 text-sm text-white"
        >Home</a
      >
      <a href="#/dashboard/" class="hover:text-gray-500 mx-2 text-sm text-white"
        >Dashboard</a
      >
    </div>
  </div>
  <div>
    {#if !emailLoaded}
      <p
        class="rounded-full py-1 px-6 bg-blue-700 text-gray-300 text-sm border border-gray-300"
      >
        Signin
      </p>
    {:else}
      <p
        class="rounded-full py-1 px-6 bg-blue-700 text-white text-sm border border-gray-300	"
      >
        {userEmail.slice(0, userEmail.indexOf("@"))}
      </p>
    {/if}
  </div>
</nav>
