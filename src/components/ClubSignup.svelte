<script>
  import { onMount } from "svelte";
  import { userDetails } from "../userStores.js";
  import {
    notice,
    alertInfo,
    alertDanger,
    alertPrimary,
    alertSuccess,
    resetAlerts,
  } from "../messageStores.js";
  let clubsLoaded,
    formResponseReceived,
    formClosed = false;
  let approvalResponse = {};
  // club lists
  let clubs = [];
  let selected = {
    id: 0,
    name: "",
  };
  onMount(() => {
    notice.set(`Please wait while your choices load. `);
    resetAlerts();
    alertInfo.set(true);
    google.script.run.withSuccessHandler(setClubSignupList).getClubsFilteredByLevel();
    google.script.run.withSuccessHandler(updateUserDetails).getUserState();
  });
  function handleSubmit() {
    userDetails.formSubmitted = true;
    google.script.run.withSuccessHandler(clubSubmissionResponse).setRecordClubEntry(selected.id);
    notice.set(`Thanks for your application for ${selected.name} club. `);
    resetAlerts();
    alertInfo.set(true);
  }
  function updateUserDetails(updatedUserDetails) {
    $userDetails = updatedUserDetails;
    console.log("userDetails");
    console.table($userDetails);
    if ($userDetails.formStatus === "closed" || $userDetails.formStatus === "view") {
      notice.set(`The form is not currently taking applications`);
      console.log("formStatus");
      formClosed = true;
      resetAlerts();
      alertDanger.set(true);
    } else {
      formClosed = false;
    }
    if ($userDetails.hasPendingClub) {
      notice.set(`You cannot signup at this time because you have a pending club approval. `);
      resetAlerts();
      alertDanger.set(true);
    }
  }
  function setClubSignupList(clubSignupList) {
    if (formClosed || userDetails.formSubmitted) {
      notice.set(`The form is not currently taking applications. `);
      formClosed = true;
      resetAlerts();
      alertDanger.set(true);
    } else {
      clubsLoaded = true;
      clubs = clubSignupList;
      notice.set(`Please select a club from the list`);
      resetAlerts();
      alertPrimary.set(true);
    }
    clubs = clubSignupList;
  }
  function clubSubmissionResponse(response) {
    formResponseReceived = true;
    approvalResponse = response;
    resetAlerts();
    if (approvalResponse.processed) {
      notice.set(`Your response has been received for the ${approvalResponse.clubName} club.`);
      alertSuccess.set(true);
    }
    if (!approvalResponse.hasCapacity) {
      notice.set(`{$notice} Sorry the club you've chosen is full.`);
      alertDanger.set(true);
    } else {
      notice.set(`${$notice} Please check your email for confimation of enrollment.`);
      alertDanger.set(true);
    }
  }
  function updateOnDropdownChange() {
    resetAlerts();
    if (formClosed) {
      notice.set(`The form is not currently taking applications.`);
      formClosed = true;
      alertDanger.set(true);
    } else if (userDetails.formSubmitted) {
      notice.set(`The form has been submitted.`);
      formClosed = true;
      $alertDanger.set(true);
    } else {
      notice.set(`You've chosen the ${selected.name} club.`);
      alertPrimary.set(true);
    }
    if ($userDetails.hasPendingClub) {
      resetAlerts();
      notice.set(
        `${$notice} You cannot signup at this time because you have a pending club approval. `
      );
      alertDanger.set(true);
    }
  }
</script>

<div class="mx-auto bg-blue-100 rounded-xl shadow-md w-3/4 mt-2 p-4">
  <h2 class="text-lg ml-6 mb-1">Club Choices</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="w-1/2">
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
      class:bg-indigo-600={selected.name.length > 1 && !userDetails.formSubmitted && !formClosed}
      class:bg-indigo-400={selected.name.length < 1 || userDetails.formSubmitted || formClosed}
      disabled={!clubsLoaded ||
        formClosed ||
        userDetails.formSubmitted ||
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
</div>
