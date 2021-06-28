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
    formSubmitted,
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
    $notice = `Please wait while your choices load`;
    $alertInfo = true;
    google.script.run
      .withSuccessHandler(setClubSignupList)
      .getClubsFilteredByLevel();
    google.script.run.withSuccessHandler(setFormState).getFormStatus();
    google.script.run.withSuccessHandler(updateUserDetails).getUserState();
  });
  function handleSubmit() {
    formSubmitted = true;
    google.script.run
      .withSuccessHandler(clubSubmissionResponse)
      .setRecordClubEntry(selected.id);
    $notice = `Thanks for your application for ${selected.name} club`;
    resetAlerts();
    $alertInfo = true;
  }
  function updateUserDetails(updatedUserDetails) {
    $userDetails = updatedUserDetails;
    if (userDetails.hasPendingClub) {
      $notice = `You cannot signup at this time because you have a pending club approval.`;
      resetAlerts();
      $alertDanger = true;
    }
    console.table($userDetails);
  }
  function setClubSignupList(clubSignupList) {
    if (formClosed || formSubmitted) {
      $notice = `The form is not currently taking applications`;
      formClosed = true;
      resetAlerts();
      $alertDanger = true;
    } else {
      clubsLoaded = true;
      clubs = clubSignupList;
      $notice = `Please select a club from the list`;
      resetAlerts();
      $alertPrimary = true;
    }
    clubs = clubSignupList;
  }
  function setFormState(formState) {
    if (formState === "closed" || formState === "view") {
      $notice = `The form is not currently taking applications`;
      formClosed = true;
      resetAlerts();
      $alertDanger = true;
    } else {
      formClosed = false;
    }
  }
  function clubSubmissionResponse(response) {
    console.log("Approval Response");
    console.table(response);
    formResponseReceived = true;
    approvalResponse = response;
    resetAlerts();
    if (approvalResponse.isApproved) {
      $notice = `Your response has been approved for the ${approvalResponse.clubName} club`;
      $alertSuccess = true;
    } else if (!approvalResponse.capacity) {
      $notice = `Sorry the club you've chosen is full.`;
      $alertDanger = true;
    } else {
      $notice = `Sorry your response cannot be approved at this time.`;
      $alertDanger = true;
    }
  }
  function updateOnDropdownChange() {
    resetAlerts();
    if (formClosed) {
      $notice = `The form is not currently taking applications`;
      formClosed = true;
      $alertDanger = true;
    } else if (formSubmitted) {
      $notice = `The form has been submitted`;
      formClosed = true;
      $alertDanger = true;
    } else {
      $notice = `You've chosen the ${selected.name} club`;
      $alertPrimary = true;
    }
  }
</script>

<div
  class="mx-auto bg-blue-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-4 p-4"
>
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
</div>
