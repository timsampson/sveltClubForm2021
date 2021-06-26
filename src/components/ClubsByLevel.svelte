<script>
  google.script.run.withSuccessHandler(showAvailableClubs).getClublist();
  export let titles = [
    "Club Name",
    "Enrolled",
    "Capacity",
    "Level",
    "Details",
    "Moderator",
  ];
  let clubs = {};
  function showAvailableClubs(clubList) {
    clubs = clubList;
    console.table(clubList);
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
          <th class="capitalize bg-blue-600 text-white px-2 border">{title}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each clubs as club}
        <tr class="odd:bg-gray-200">
          <td class="min-w-26 px-2 border border-blue-800">{club.name}</td>
          <td class="min-w-26 px-2 border border-blue-800">{club.enrolled}</td>
          <td class="min-w-26 px-2 border border-blue-800">{club.capacity}</td>
          <td class="min-w-26 px-2 border border-blue-800">{club.level}</td>
          <td class="min-w-26 px-2 border border-blue-800"
            >{club.description}</td
          >
          <td class="min-w-26 px-2 border border-blue-800">{club.moderator}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
