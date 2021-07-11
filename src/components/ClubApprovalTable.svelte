<script>
  import { onMount } from "svelte";
  let records = [];
  let approvals = [];
  let approved = [];
  let rejects = [];
  let rejected = [];
  onMount(() => {
    google.script.run.withSuccessHandler(showApprovalRecords).getClubsForApproval();
  });
  function showApprovalRecords(allUserApplicationRecords) {
    records = allUserApplicationRecords;
  }
  function handleClick() {
    approvals = document.getElementsByName("approvals");
    rejects = document.getElementsByName("rejects");
    if (approvals.length > 0 || rejects.length > 0) {
      for (var i = records.length - 1; i >= 0; i--) {
        if (!(approvals[i].checked && rejects[i].checked)) {
          if (approvals[i].checked || rejects[i].checked) {
            if (approvals[i].checked) {
              approved.push(records[i]);
              approvals[i].checked = false;
            }
            if (rejects[i].checked) {
              rejected.push(records[i]);
              rejects[i].checked = false;
            }
            records.splice(i, 1);
            records = records;
          }
        } else {
          approvals[i].checked = false;
          rejects[i].checked = false;
          // tbd add notice that it wasn't processed because both were selected.
        }
      }
    }
    console.log("approved");
    approved.forEach((app) => console.log(app.recordId));
    console.log("rejected");
    rejected.forEach((app) => console.log(app.recordId));
    console.log("records");
    console.table(records);
  }
</script>

<div class="mt-2 mx-auto p-4 w-3/4">
  <h1 class="text-2xl text-blue-800">Records for Processing</h1>
  <p class="my-2 p-2 border border-blue-800 rounded-md mx-auto ">
    Please select the <span class="text-red-500 font-bold">red checkbox </span>to reject the
    application, or the <span class="text-green-700 font-bold">green checkbox</span> to approve an
    application. If an applied club is full, the entry will be in italics and have include the text:
    <strong class="text-red-500 italic">full</strong>
  </p>
  <ul class="p-2 mx-auto">
    {#each records as record}
      <li class="border-b-2 border-blue-200 pt-2 pb-1">
        <input
          type="checkbox"
          class="{record.recordId} text-green-500 rounded border-2 border-green-500 focus:ring-green-500 mr-2"
          name="approvals"
        />
        <input
          type="checkbox"
          class="{record.recordId} text-red-500 border-2 rounded border-red-500 focus:ring-red-500"
          name="rejects"
        />
        <label for={record.recordId} class="ml-2 py-1 text-sm" class:italic={!record.hasCapacity}
          >{record.name} in homeroom {record.homeroom} grade
          {record.grade} would like to join the
          <strong class="text-red-500">{record.hasCapacity ? "" : "full"}</strong>
          {record.appliedClubName} club.</label
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
    <span class="ml-2">Submit</span>
  </button>
</div>
