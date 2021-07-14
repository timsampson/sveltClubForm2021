<script>
  import { fade } from "svelte/transition";
  google.script.run.withSuccessHandler(showUserClubRecord).getClubApplicationRecordsForUser();
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
      Please wait for your Application Record to load.
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
            <td class="min-w-26 px-2 border border-blue-800">{record.appliedclubModerator}</td>
            <td class="min-w-26 px-2 border border-blue-800">{record.appliedClubDetails}</td>
            <td class="min-w-26 px-2 border border-blue-800">{record.appliedClubId}</td>
            <td class="min-w-26 px-2 border border-blue-800">{record.appliedClubName}</td>
            <td class="min-w-26 px-2 border border-blue-800">{record.formState}</td>
            <td class="min-w-26 px-2 border border-blue-800">{record.isApproved}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
