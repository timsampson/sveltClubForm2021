<script>
  export let userEmail = "Loading...";
  export let emailLoaded;
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { userDetails } from "../../user-store";

  emailLoaded = false;
  onMount(() => {
    google.script.run.withSuccessHandler(setEmail).getUserEmail();
    getUpdatedUserDetails();
  });
  function setEmail(email) {
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
  <div class="flex-initia">
    <div>
      <h1 class="font-bold text-2xl text-blue-200 font-serif">DIS 2021 Club Signup Form</h1>
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
