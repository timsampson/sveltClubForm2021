<script>
  import { onMount } from "svelte";
  import { userDetails } from "../userStores.js";

  onMount(() => {
    google.script.run.withSuccessHandler(showClubsByLevel).getClubsByLevel();
    google.script.run.withSuccessHandler(updateUserDetails).getUserState();
  });
  let titles = [];
  let rows = [];
  let clubTablesLoaded = false;
  function updateUserDetails(updatedUserDetails) {
    $userDetails = updatedUserDetails;
    console.table($userDetails);
  }
  function showClubsByLevel(allClubValues) {
    titles = allClubValues.splice(0, 1)[0];
    rows = allClubValues;
    clubTablesLoaded = true;
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
{#if clubTablesLoaded}
  <div>
    <table
      class="table table-auto mx-auto my-2 text-sm border-4 border-indigo-800"
    >
      <thead>
        <tr>
          {#each titles as title, i (titles[i])}
            {#if i != 0}
              {#if i != 7}
                <th
                  class="capitalize text-center text-lg bg-indigo-500 text-white px-2 border-b-2 border-indigo-800"
                  >{title}</th
                >
              {/if}
            {/if}
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each rows as row}
          <tr class="odd:bg-gray-200">
            {#each row as cell, c (row[c])}
              {#if c != 0}
                {#if c != 7}
                  <td class="min-w-26  px-2 border border-indigo-800">{cell}</td
                  >
                {/if}
              {/if}
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
