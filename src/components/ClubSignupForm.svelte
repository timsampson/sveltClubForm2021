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
    alertPrimary.set(true);
    google.script.run.withSuccessHandler(setClubSignupList).getClubsFilteredByLevel();
    google.script.run.withSuccessHandler(updateUserDetails).getUserState();
  });
  function closeTheForm() {
    closeTheForm();
  }
  function handleSubmit() {
    $userDetails.formSubmitted = true;
    google.script.run
      .withSuccessHandler(clubSubmissionResponse)
      .setRecordClubApplicationEntry(selected.id);
    notice.set(`Your application for the ${selected.name} club is being processed. `);
    closeTheForm();
  }
  function updateFormMessage() {
    if ($userDetails.formSubmitted) {
      notice.set(
        `You have submitted an application for the ${selected.name} club. Please check your email for confirmation.`
      );
      closeTheForm();
    } else if (!$userDetails.canSubmit) {
      closeTheForm();
      if ($userDetails.isInClub) {
        notice.set(
          `You are already in the ${$userDetails.currentClubName} club and changes are not currently permitted.`
        );
      }
      if ($userDetails.hasPendingClub) {
        notice.set(`You have a pending approval for ${$userDetails.pendingClubName}.`);
      }
    } else if ($userDetails.formStatus === "view" || $userDetails.formStatus === "closed") {
      formClosed = true;
      notice.set(
        `We are not currently accepting club applications, the form status is ${$userDetails.formStatus}.`
      );
    } else if ($userDetails.formStatus === "submit") {
      if (!$userDetails.isInClub) {
        formClosed = false;
        notice.set(`Please select a club from the list.`);
      } else {
        notice.set(
          `You are already enrolled in the  ${$userDetails.currentClubName}. The form is currently closed.`
        );
        closeTheForm();
      }
    } else if ($userDetails.formStatus === "approval") {
      if (!$userDetails.isInClub) {
        closeTheForm();
      } else {
        notice.set(`Please select a club from the list.`);
        formClosed = false;
      }
    } else if ($userDetails.formStatus === "edit") {
      formClosed = false;
      if ($userDetails.isInClub) {
        notice.set(
          ` You are currently enrolled a club. Submitting at the time will cancel your current enrollment in the 
          ${$userDetails.currentClubName} club.`
        );
      } else {
        notice.set(`Please select a club from the list.`);
      }
    } else {
      closeTheForm();
      notice.set(`Please contact the club administrator.`);
    }
  }
  function updateUserDetails(updatedUserDetails) {
    userDetails.set(updatedUserDetails);
    console.log("userDetails");
    console.table($userDetails);
    updateFormMessage();
  }
  function setClubSignupList(clubSignupList) {
    clubsLoaded = true;
    notice.set(`Please select a club from the list below.`);
    clubs = clubSignupList;
    updateFormMessage();
  }
  function clubSubmissionResponse(response) {
    formResponseReceived = true;
    approvalResponse = response;
    console.table(approvalResponse);
    resetAlerts();
    if (response.processed && response.status == "approved") {
      notice.set(
        `Your response has been received and approved for the ${response.appliedClubName} club.`
      );
      alertSuccess.set(true);
    } else if (!response.hasCapacity) {
      notice.set(`{$notice} Sorry the club you've chosen is full.`);
      alertDanger.set(true);
    } else if (response.status == "pending") {
      notice.set(
        `Your response has been received and is pending approval for the ${response.appliedClubName} club.`
      );
      alertDanger.set(true);
    } else {
      notice.set(`Please check your email for confimation of enrollment.`);
      alertDanger.set(true);
    }
  }
  function updateOnDropdownChange() {
    updateFormMessage();
    if (!formClosed) {
      alertSuccess.set(true);
      notice.set(`You have selected the ${selected.name} club.`);
      $alertPrimary = true;
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
    {#if formClosed && $userDetails.formStatus !== undefined && !$userDetails.formSubmitted}
      {#if $userDetails.formStatus === "view"}
        <br />
        <span class="text-blue-900 italic"
          >{`The form status is ${$userDetails.formStatus} only.`}</span
        >
      {:else if $userDetails.formStatus === "submit" && $userDetails.isInClub}
        <br />
        <span class="text-blue-900 italic"
          >{`The form is only accepting enrolments for students not yet in clubs.`}</span
        >
      {:else}
        <br />
        <span class="text-blue-900 italic">{`The form status is ${$userDetails.formStatus}.`}</span>
      {/if}
    {/if}
  </form>
</div>
