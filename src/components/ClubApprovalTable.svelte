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
    approvals = document.forms["approvalForm"].elements["approvals[]"];
  }
  function handleSubmit() {
    for (var i = 0, len = approvals.length; i < len; i++) {
      if (approvals[i].checked) {
        approved.push(approvals[i].value);
      }
    }
    console.table(approved);
    google.script.run
      .withSuccessHandler(clubApprovalResponse)
      .updateApprovedClubApplications(approved);
  }
  function clubApprovalResponse() {
    alert("Approvals Processed");
  }
</script>

<div class="mt-2 mx-auto p-4">
  <h2>Records for approval</h2>
  <form on:submit|preventDefault={handleSubmit} id="approvalForm">
    <fieldset>
      <ul>
        {#each records as record}
          <li class="mt-2">
            <label for={record.recordId}>
              <input
                type="checkbox"
                name="approvals[]"
                value={record.recordId}
                id={record.recordId}
              />
              {record.name} in {record.homeroom}
              {record.grade} would like to join the {record.appliedClubName} club.
            </label>
          </li>
        {:else}
          <li>All Done!</li>
        {/each}
      </ul>
      <br />
      <input type="submit" value="Submit now" />
    </fieldset>
  </form>
</div>
