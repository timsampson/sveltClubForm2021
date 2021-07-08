<script>
  import { onMount } from "svelte";
  let records = [];
  let approvals = [];
  let approved = [];
  onMount(() => {
    google.script.run.withSuccessHandler(showUserClubRecord).getClubsForApproval();
  });
  updateApprovalList();
  function updateApprovalList() {
    google.script.run.withSuccessHandler(showUserClubRecord).getClubsForApproval();
  }
  function showUserClubRecord(allUserApplicationRecords) {
    records = allUserApplicationRecords;
    console.table(records);
  }
  function handleSubmit() {
    approvals = document.forms["approvalForm"].elements["approvals[]"];
    for (var i = 0, len = approvals.length; i < len; i++) {
      if (approvals[i].checked) {
        approved.push(approvals[i].value);
      }
    }
    console.table(approved);
    google.script.run
      .withSuccessHandler(clubApprovalResponse)
      .processApprovedClubApplications(approved);
  }
  function clubApprovalResponse() {
    alert("Approvals Processed");
  }
</script>

<div class="mt-2 mx-auto p-4">
  <h2>Records for approval</h2>
  {#if records.length > 0}
    <form on:submit|preventDefault={handleSubmit} id="approvalForm">
      <fieldset>
        <ul>
          {#each records as record}
            <li class="ml-2 py-1 ">
              <input
                class="mr-2 border-2 border-blue-800 rounded"
                type="checkbox"
                name="approvals[]"
                value={record.recordId}
                id={record.recordId}
              />
              <label
                class:text-red-500={!record.hasCapacity}
                class:italic={!record.hasCapacity}
                for={record.recordId}
              >
                {record.name} in homeroom {record.homeroom} grade
                {record.grade} would like to join the
                <strong>{record.hasCapacity ? "" : "full"}</strong>
                {record.appliedClubName} club.
              </label>
            </li>
          {/each}
        </ul>
        <br />
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          <span>Submit</span>
        </button>
      </fieldset>
    </form>
  {:else}
    <p>No records needing approval</p>
  {/if}
</div>
