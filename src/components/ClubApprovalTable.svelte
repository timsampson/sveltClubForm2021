<script>
  import Button from "./Button.svelte";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  let records = [];
  let approvals = [];
  let approved = [];
  let rejects = [];
  let rejected = [];
  let submitted = false;
  google.script.run.withSuccessHandler(showApprovalRecords).getClubsForApproval();
  function showApprovalRecords(allUserApplicationRecords) {
    records = allUserApplicationRecords;
  }
  function handleSubmit() {
    submitted = false;
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
  function approvalResponse(isSubmitted) {
    submitted = isSubmitted;
  }
  function completedIsFalse(i) {
    submitted = false;
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
        <li
          id={record.recordId}
          class="border-b-2 border-blue-200 pt-2 pb-1"
          transition:slide={{ delay: 250, duration: 300, easing: quintOut }}
        >
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
      <Button {submitted} on:click={handleSubmit}>Submit</Button>
    </div>
  {:else}
    <h1 class="text-2xl text-blue-800">No records awaiting approval</h1>
  {/if}
</div>
