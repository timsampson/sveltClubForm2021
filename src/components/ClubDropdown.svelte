<script>
  import { onMount } from "svelte";
  onMount(() => {
    $alertInfo = true;
    google.script.run.withSuccessHandler(setClubSignupList).fetchClubList();
  });
</script>

<h2 class="text-lg ml-6 mb-1">Club Choices</h2>
<form on:submit|preventDefault={handleSubmit}>
  <div class="md:w-1/2">
    <!-- svelte-ignore a11y-no-onchange -->
    <select
      required
      bind:value={selected}
      on:change={() => updateOnDropdownChange()}
      class="w-full border rounded-lg focus:shadow-outline"
    >
      <option value={() => (selected.name = "")} />
      {#each clubs as club}
        <option value={club}>
          {club.name}
        </option>
      {/each}
    </select>
  </div>
  <button
    type="submit"
    class="inline-flex items-center my-4 py-2 px-4 text-indigo-100 transition-colors duration-150 bg-indigo-400 rounded-lg focus:shadow-outline disabled:opacity-50"
    class:bg-indigo-600={selected.name.length > 1 &&
      !formSubmitted &&
      !formClosed}
    class:bg-indigo-400={selected.name.length < 1 ||
      formSubmitted ||
      formClosed}
    disabled={!clubsLoaded ||
      formClosed ||
      formSubmitted ||
      selected.name.length < 1 ||
      userDetails.hasPendingClub}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
    <span>Submit</span>
  </button>
</form>
