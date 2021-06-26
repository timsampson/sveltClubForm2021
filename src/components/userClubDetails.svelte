<script>
  import { onMount } from "svelte";
  import { userDetails } from "../userStores.js";
  onMount(() => {
    google.script.run.withSuccessHandler(updateUserDetails).getUserState();
  });
  function updateUserDetails(updatedUserDetails) {
    $userDetails = updatedUserDetails;
    console.table($userDetails);
  }
</script>

<div>
  {#if $userDetails.isInClub === undefined}
    <h1 class="text-2xl my-2 text-center text-gray-800 ">
      Please wait for the club details to load.
    </h1>
  {:else if $userDetails.isInClub}
    <h1 class="text-2xl my-2 text-center text-gray-800 ">
      Welcome {$userDetails.name} in {$userDetails.homeroom}, you are currently
      in the {$userDetails.currentClubName} club.
    </h1>
  {:else}
    <h1 class="text-2xl my-2 text-center text-gray-800 ">
      Welcome {$userDetails.name} in {$userDetails.homeroom}.
    </h1>
  {/if}
</div>
