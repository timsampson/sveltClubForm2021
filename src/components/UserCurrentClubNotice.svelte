<script>
  import { onMount } from "svelte";
  import { userDetails } from "../user-store.js";
  onMount(() => {
    google.script.run.withSuccessHandler(updateUserDetails).getUserState();
  });
  function updateUserDetails(updatedUserDetails) {
    $userDetails = updatedUserDetails;
  }
</script>

<div>
  {#if $userDetails.isInClub === undefined}
    <h1
      class="text-center text-white rounded-md p-2 my-2 mx-auto w-3/4 bg-gradient-to-r from-blue-400 to-blue-500"
    >
      Please wait for the club details to load.
    </h1>
  {:else if $userDetails.isInClub}
    <h1
      class="text-center text-white rounded-md p-2 my-2 mx-auto w-3/4 bg-gradient-to-r from-green-400 to-green-500"
    >
      Welcome {$userDetails.name} in {$userDetails.homeroom}, you are currently in the {$userDetails.currentClubName}
      club.
    </h1>
  {:else}
    <h1
      class="text-center text-white rounded-md p-2 my-2 mx-auto w-3/4 bg-gradient-to-r from-green-400 to-green-500"
    >
      Welcome {$userDetails.name} in {$userDetails.homeroom}.
    </h1>
  {/if}
</div>
