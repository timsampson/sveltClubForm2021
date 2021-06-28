<script>
  google.script.run
    .withSuccessHandler(showUserClubRecord)
    .getAppliedClubsForUser();
  export let titles = [
    "id",
    "name",
    "moderator",
    "description",
    "club Id",
    "club Name",
    "approved",
  ];
  export let records = [];
  function showUserClubRecord(allUserApplicationRecords) {
    records = allUserApplicationRecords;
    console.table(records);
  }
</script>

<div class="mt-2 mx-auto p-4">
  <div class="sm:text-center lg:text-left">
    <h1 class="text-2xl text-center text-gray-900">
      <span>Your Application Record</span>
    </h1>
  </div>
  <table class="table table-auto mx-auto text-sm border-blue-800 border-4">
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
          <td class="min-w-26 px-2 border border-blue-800">{record.id}</td>
          <td class="min-w-26 px-2 border border-blue-800">{record.name}</td>
          <td class="min-w-26 px-2 border border-blue-800"
            >{record.moderator}</td
          >
          <td class="min-w-26 px-2 border border-blue-800"
            >{record.description}</td
          >
          <td class="min-w-26 px-2 border border-blue-800">{record.clubid}</td>
          <td class="min-w-26 px-2 border border-blue-800">{record.clubname}</td
          >
          <td class="min-w-26 px-2 border border-blue-800">{record.approved}</td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</div>
