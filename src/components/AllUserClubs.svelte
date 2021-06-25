<script>
  google.script.run.withSuccessHandler(showClubValues).getClubApplicationData();
  export let titles = [];
  export let rows = [];
  function showClubValues(allClubValues) {
    titles = allClubValues.splice(0, 1)[0];
    rows = allClubValues;
  }
</script>

<div class="mt-2 mx-auto p-4">
  <div class="sm:text-center lg:text-left">
    <h1
      class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
    >
      <span>Club Record</span>
    </h1>
  </div>
  <table class="table table-auto mx-auto text-sm border-blue-800 border-4">
    <thead>
      <tr>
        {#each titles as title, i (titles[i])}
          {#if i != 0}
            {#if i != 6}
              {#if i != 8}
                {#if i != 10}
                  <th class="capitalize bg-blue-600 text-white px-2 border"
                    >{title}</th
                  >
                {/if}
              {/if}
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
              {#if c != 6}
                {#if c != 8}
                  {#if c != 10}
                    <td class="min-w-26  px-2 border border-blue-800">{cell}</td
                    >
                  {/if}
                {/if}
              {/if}
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
