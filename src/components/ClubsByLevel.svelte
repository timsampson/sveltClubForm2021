<script>
  import { onMount } from "svelte";
  onMount(() => {
    google.script.run.withSuccessHandler(showClubsByLevel).getClubsByLevel();
  });
  let titles = [];
  let rows = [];
  let clubTablesLoaded = false;
  function showClubsByLevel(allClubValues) {
    titles = allClubValues.splice(0, 1)[0];
    rows = allClubValues;
    clubTablesLoaded = true;
  }
</script>

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
