<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  onMount(() => {
    google.script.run.withSuccessHandler(showUserClubRecord).getClubsForApproval();
  });

  export let titles = [
    "Approve",
    "Reject",
    "name",
    "moderator",
    "description",
    "club Id",
    "club Name",
    "status",
  ];
  export let records = [];
  let approval = {
    id: "",
    approved: false,
  };
  function showUserClubRecord(allUserApplicationRecords) {
    records = allUserApplicationRecords;
    console.table(records);
  }
  function handleSubmit() {
    console.log("submitted");
    console.table(values);
    //google.script.run.withSuccessHandler(clubSubmissionResponse).setRecordClubEntry(selected.id);
  }
</script>

<div class="mt-2 mx-auto p-4">
  <h1 class="text-2xl text-center text-blue-900">
    {#if records.length > 0}
      Here are the clubs for Approval
    {:else}
      Please wait for the clubs needing Approval.
    {/if}
  </h1>
  {#if records.length > 0}
    <form on:submit|preventDefault={handleSubmit}>
      <fieldset>
        <table
          in:fade={{ duration: 1000 }}
          class="table table-auto mx-auto text-sm border-blue-800 border-4"
        >
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
                <td class="border border-blue-800">
                  <input
                    value={record.id + "approved"}
                    type="checkbox"
                    name={record.id + "approved"}
                    class="ml-4 rounded bg-green-200 checked:border-green-800 checked:bg-green-600 text-green-600 border-green-600 border-2 checked:border-transparent"
                  />
                </td>
                <td class="border border-blue-800">
                  <input
                    value="{record.id + 'rejected'}}"
                    type="checkbox"
                    name={record.id + "rejected"}
                    class="m-2 rounded bg-red-200 checked:border-red-800 checked:bg-red-600 text-red-600 border-red-600 border-2 checked:border-transparent"
                  />
                </td>
                <td class="px-2 border border-blue-800">{record.name}</td>
                <td class="px-2 border border-blue-800">{record.moderator}</td>
                <td class="px-2 border border-blue-800">{record.description}</td>
                <td class="px-2 border border-blue-800">{record.clubid}</td>
                <td class="px-2 border border-blue-800">{record.clubname}</td>
                <td class="px-2 border border-blue-800">{record.formStatus}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </fieldset>
    </form>
    <button
      type="submit"
      class="inline-flex items-center my-4 py-2 px-4 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline"
    >
      Submit
    </button>
  {/if}
</div>
