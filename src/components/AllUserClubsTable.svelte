<script>
  google.script.run.withSuccessHandler(showUserClubRecord).getClubRecords();
  google.script.run.withSuccessHandler(showClubValues).getClubApplicationRecords();
  export let titles = ["Club Name", "Enrolled", "Capacity", "Level", "Location", "Moderator"];
  export let records = [];
  function showUserClubRecord(allClubValues) {
    records = allClubValues;
  }
</script>

<div class="mt-2 mx-auto p-4">
  <div class="sm:text-center lg:text-left">
    <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
      <span>Club Record</span>
    </h1>
  </div>
  <table class="table table-auto mx-auto text-sm border-blue-800 border-4">
    <thead>
      <tr>
        {#each titles as title}
          <th class="capitalize bg-blue-600 text-white px-2 border">{title}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each records as record}
        <tr class="odd:bg-gray-200">
          <td class="min-w-26 px-2 border border-blue-800">{record.name}</td>
          <td class="min-w-26 px-2 border border-blue-800">{record.enrolled}</td>
          <td class="min-w-26 px-2 border border-blue-800">{record.capacity}</td>
          <td class="min-w-26 px-2 border border-blue-800">{record.level}</td>
          <td class="min-w-26 px-2 border border-blue-800">{record.location}</td>
          <td class="min-w-26 px-2 border border-blue-800">{record.moderator}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
