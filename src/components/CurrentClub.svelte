<script>
  export let userCurrentClub = [];
  import { onMount } from "svelte";
  onMount(() => {
    google.script.run
      .withSuccessHandler(setCurrentClubNotice)
      .getUserCurrentClub();
  });

  function setCurrentClubNotice(currentClub) {
    userCurrentClub = currentClub[0];
  }
</script>

<div>
  {#if userCurrentClub.length < 1}
    <p class="rounded-full py-1 px-6">
      Please wait while your current club loads
    </p>
  {:else}
    <p
      class="rounded-full mx-auto py-1 px-6 w-36 bg-blue-800 text-white text-sm	"
    >
      Your current Club is: {userCurrentClub}
    </p>
  {/if}
</div>
