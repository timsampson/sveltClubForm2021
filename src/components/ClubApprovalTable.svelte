<script>
  let records = [];
  let approvals = [];
  let approved = [];
  let rejects = [];
  let rejected = [];
  let completed = false;
  google.script.run.withSuccessHandler(showApprovalRecords).getClubsForApproval();
  function showApprovalRecords(allUserApplicationRecords) {
    records = allUserApplicationRecords;
  }
  function handleClick() {
    completed = false;
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
        }
      }
    }
    google.script.run
      .withSuccessHandler(approvalResponse)
      .processReviewedClubApplications({ approved, rejected });
  }
  function approvalResponse(isCompleted) {
    completed = isCompleted;
  }
  function completedIsFalse(i) {
    completed = false;
    let a = i + "approve";
    let r = i + "reject";
    let checkboxA = document.getElementById(a);
    let checkboxR = document.getElementById(r);
    if (checkboxA.checked == true && checkboxR.checked == true) {
      console.log("change");
      checkboxA.checked = false;
      checkboxR.checked = false;
    }
  }
</script>

<div class="mt-2 mx-auto p-4 w-auto">
  <h1 class="text-2xl text-blue-800">Records for Processing</h1>
  <p class="my-2 p-2 border border-blue-800 rounded-md mx-auto ">
    Please select the <span class="text-red-500 font-bold">red checkbox</span> to reject an
    application, or the <span class="text-green-700 font-bold">green checkbox</span> to approve an
    application. If an applied club is full, the entry will be in italics and have include the text:
    <strong class="text-red-500 italic">full</strong>
  </p>
  {#if records.length > 0}
    <ul class="p-2 mx-auto">
      {#each records as record, i (record.recordId)}
        <li id={record.recordId} class="border-b-2 border-blue-200 pt-2 pb-1">
          <input
            on:click={completedIsFalse.bind(this, i)}
            id={i + "approve"}
            type="checkbox"
            class="text-green-500 rounded border-2 border-green-500 focus:ring-green-500 mr-2"
            name="approvals"
          />
          <input
            on:click={completedIsFalse.bind(this, i)}
            id={i + "reject"}
            type="checkbox"
            class=" text-red-500 border-2 rounded border-red-500 focus:ring-red-500"
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
    <div class="inline-flex">
      <button
        on:click={handleClick}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center mt-4 mr-2"
        class:bg-green-500={completed}
      >
        {#if completed}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        {/if}
        <span class="ml-2">Submit</span>
      </button>
    </div>
  {:else}
    <h1 class="text-2xl text-blue-800">No records awaiting approval</h1>
  {/if}
</div>
