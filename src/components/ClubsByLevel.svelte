<script>
  google.script.run.withSuccessHandler(showAvailableClubs).getClubsFilteredByLevel();
  let titles = [];
  let clubs = {};
  function showAvailableClubs(clubList) {
    titles = ["Club Name", "Enrolled", "Capacity", "Details", "Moderator"];
    clubs = clubList;
  }
  import { fade } from "svelte/transition";
</script>

<div class="mt-2 mx-auto p-4">
  <h1 class="text-2xl text-center text-gray-900">
    <span>Below are the clubs currently available.</span>
  </h1>

  {#if titles.length > 0}
    <table
      in:fade={{ duration: 1000 }}
      class="table table-auto mx-auto text-sm border-blue-800 border-4"
    >
      <thead>
        <tr class="bg-gradient-to-r from-blue-500 to-blue-600">
          {#each titles as title, i (titles[i])}
            <th class="capitalize text-white px-2 border border-blue-800">{title}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each clubs as club}
          <tr class="odd:bg-gray-200" class:club-full={club.enrolled >= club.capacity}>
            <td class="mx-2 px-2 border border-blue-800">{club.name}</td>
            <td class="px-2 border border-blue-800 text-center">{club.enrolled}</td>
            <td class="px-2 border border-blue-800 text-center">{club.capacity}</td>
            <td class="mx-2  px-2 border border-blue-800">{club.description}</td>
            <td class="mx-2 px-2 border border-blue-800">{club.moderator}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<style lang="postcss">
  @layer components {
    .club-full {
      @apply italic text-red-500 font-bold;
    }
  }
</style>
