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
  {#if $userDetails.isInClub}
    <h1 class="text-2xl my-2 text-center text-gray-800 ">
      Available clubs for {$userDetails.name} in {$userDetails.homeroom}.
    </h1>
  {:else}
    <h1 class="text-2xl my-2 text-center text-gray-800 ">
      Please wait a moment for the available clubs.
    </h1>
  {/if}
</div>
