<script>
  import { onMount } from "svelte";
  let records = [];
  let approvals = [];
  let approved = [];
  onMount(() => {
    google.script.run.withSuccessHandler(showApprovalRecords).getClubsForApproval();
  });
  function showApprovalRecords(allUserApplicationRecords) {
    records = allUserApplicationRecords;
  }

  function handleClick() {
    approvals = document.getElementsByName("approvals");
    console.table(approvals);
    console.log(approvals.length);
    for (var i = approvals.length - 1; i >= 0; i--) {
      console.log(`approvals ${i} is checked: ${approvals[i].checked}`);
      if (approvals[i].checked) {
        console.log(records[i]);
        console.log(approvals[i]);
        records.splice(i, 1);
        approved.push(records[i]);
        approvals[i].checked = false;
      }
      records = records;
    }
    console.log("approved");
    console.table(approved);
  }
</script>

<div class="mt-2 mx-auto p-4">
  <ul>
    {#each records as record}
      <li>
        <input type="checkbox" id={record.recordId} name="approvals" />
        <label for={record.recordId} class="ml-2 py-1 "
          >Record for {record.name} apply to {record.appliedClubName}</label
        >
      </li>
    {/each}
  </ul>
  <button
    on:click={handleClick}
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center mt-4"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clip-rule="evenodd"
      />
    </svg>
    <span class="ml-2">Remove first thing </span>
  </button>
</div>
