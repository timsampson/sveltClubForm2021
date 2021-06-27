<script>
  import postcss from "postcss";

  google.script.run.withSuccessHandler(showAvailableClubs).getClublist();
  export let titles = [
    "Club Name",
    "Enrolled",
    "Capacity",
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
  <h1 class="text-2xl text-center text-gray-900">
    <span>Club Choices</span>
  </h1>
  <table class="table table-auto mx-auto text-sm border-blue-800 border-4">
    <thead>
      <tr class="bg-gradient-to-r from-blue-500 to-blue-600">
        {#each titles as title, i (titles[i])}
          <th class="capitalize text-white px-2 border border-blue-800"
            >{title}</th
          >
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each clubs as club}
        <tr
          class="odd:bg-gray-200"
          class:club-full={club.enrolled >= club.capacity}
        >
          <td class="min-w-26 px-2 border border-blue-800">{club.name}</td>
          <td class="min-w-26 px-2 border border-blue-800">{club.enrolled}</td>
          <td class="min-w-26 px-2 border border-blue-800">{club.capacity}</td>
          <td class="min-w-26 px-2 border border-blue-800"
            >{club.description}</td
          >
          <td class="min-w-26 px-2 border border-blue-800">{club.moderator}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style lang="postcss">
  @layer components {
    .club-full {
      @apply italic text-red-500 font-bold;
    }
  }
</style>
