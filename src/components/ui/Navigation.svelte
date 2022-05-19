<script>
  export let userEmail = "Loading...";
  export let emailLoaded;
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { userDetails } from "../../user-store";

  emailLoaded = false;
  onMount(() => {
    google.script.run.withSuccessHandler(setProfileEmail).getUserEmail();
    getUpdatedUserDetails();
  });
  function setProfileEmail(email) {
    userEmail = email;
  }
  function getUpdatedUserDetails() {
    google.script.run.withSuccessHandler(updateUserDetails).getUserState();
  }
  function updateUserDetails(updatedUserDetails) {
    userDetails.set(updatedUserDetails);
  }
</script>

<nav
  class="flex items-center justify-between flex-wrap rounded-sm bg-gradient-to-r from-blue-500 to-blue-600 px-12 py-3"
>
  <div class="flex-initial">
    <div>
      <a
        href="#/signup"
        class="hover:text-gray-300 mx-2 text-sm text-white"
        on:click={getUpdatedUserDetails}>Sign up</a
      >
      <a
        href="#/home/"
        class="hover:text-gray-300 mx-2 text-sm text-white"
        on:click={getUpdatedUserDetails}>Home</a
      >
      <a href="#/dashboard/" class="hover:text-gray-300 mx-2 text-sm text-white">Dashboard</a>
      {#if $userDetails.isTeacher && $userDetails.isTeacher !== undefined}
        <a
          in:fade={{ duration: 1000 }}
          on:click={getUpdatedUserDetails}
          href="#/merit/"
          class="hover:text-gray-300 mx-2 text-sm text-white">Merit</a
        >
      {/if}
      {#if $userDetails.isAdmin && $userDetails.isAdmin !== undefined}
        <a
          in:fade={{ duration: 1000 }}
          on:click={getUpdatedUserDetails}
          href="#/admin/"
          class="hover:text-gray-300 rounded-full mx-2 py-1 px-2 text-sm text-white border border-gray-300"
          >Admin</a
        >
      {/if}
    </div>
  </div>
  <div>
    {#key userEmail}
      <div
        in:fade={{ duration: 1000 }}
        class="rounded-full py-1 px-6 bg-blue-700 text-sm text-gray-300 border border-gray-300"
      >
        {userEmail.slice(0, userEmail.indexOf("@"))}
      </div>
    {/key}
  </div>
</nav>
<h1
  class="m-4 mx-auto max-w-2xl rounded p-2 font-mono text-xl text-transparent text-white bg-gradient-to-r from-green-400 to-blue-500 text-center underline"
>
  This is a Draft Club Form, not the real one!
</h1>
