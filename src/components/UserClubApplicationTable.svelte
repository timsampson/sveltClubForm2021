<script>
  import { fade } from "svelte/transition";
  google.script.run.withSuccessHandler(showUserClubRecord).getAppliedClubsForUser();
  export let titles = [
    "name",
    "moderator",
    "description",
    "club Id",
    "club Name",
    "status",
    "approved",
  ];
  export let records = [];
  function showUserClubRecord(allUserApplicationRecords) {
    records = allUserApplicationRecords;
  }
</script>

<div class="mt-2 mx-auto p-4">
  <h1 class="text-2xl text-center text-blue-900">
    {#if records.length > 0}
      Your Application Record
    {:else}
      Please wait for the available clubs to load.
    {/if}
  </h1>
  {#if records.length > 0}
    <table
      in:fade={{ duration: 1000 }}
      class="table table-auto mx-auto text-sm border-blue-800 border-4"
    >
      <thead>
        <tr>
          {#each titles as title, i (titles[i])}
            <th class="capitalize bg-blue-600 text-white px-2 border">{title}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each records as record}
          <tr class="odd:bg-gray-200">
            <td class="min-w-26 px-2 border border-blue-800">{record.name}</td>
            <td class="min-w-26 px-2 border border-blue-800">{record.moderator}</td>
            <td class="min-w-26 px-2 border border-blue-800">{record.description}</td>
            <td class="min-w-26 px-2 border border-blue-800">{record.clubid}</td>
            <td class="min-w-26 px-2 border border-blue-800">{record.clubname}</td>
            <td class="min-w-26 px-2 border border-blue-800">{record.approved}</td>
            <td class="min-w-26 px-2 border border-blue-800">{record.status}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
