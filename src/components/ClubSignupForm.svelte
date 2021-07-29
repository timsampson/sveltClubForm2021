<script>
  import { onMount } from "svelte";
  import { userDetails } from "../user-store.js";
  import {
    notice,
    alertInfo,
    alertDanger,
    alertPrimary,
    alertSuccess,
    resetAlerts,
  } from "../message-store.js";
  let clubsLoaded,
    formResponseReceived = false;
  let formClosed = true;
  let approvalResponse = {};
  // club lists
  let clubs = [];
  let selected = {
    id: 0,
    name: "",
  };
  onMount(() => {
    openTheForm();
    notice.set(`Please wait while your choices load. `);
    google.script.run.withSuccessHandler(setClubSignupList).getClubsFilteredByLevel();
    google.script.run.withSuccessHandler(updateUserDetails).getUserState();
  });
  function closeTheForm() {
    formClosed = true;
    resetAlerts();
    alertDanger.set(true);
  }
  function openTheForm() {
    formClosed = false;
    resetAlerts();
    alertPrimary.set(true);
  }
  function handleSubmit() {
    closeTheForm();
    $userDetails.formSubmitted = true;
    google.script.run
      .withSuccessHandler(clubSubmissionResponse)
      .setRecordClubApplicationEntry(selected.id);
    notice.set(
      `Your application for the ${selected.name} club is being processed. Please check your email for further details.`
    );
  }
  function updateFormMessage() {
    if ($userDetails.formSubmitted) {
      closeTheForm();
      notice.set(
        `You have submitted an application for the ${selected.name} club. Please check your email for confirmation.`
      );
    } else if ($userDetails.formState === "view" || $userDetails.formState === "closed") {
      closeTheForm();
      notice.set(`We are not currently accepting club applications.`);
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
    } else if (selected.enrolled >= selected.capacity) {
      notice.set(`Sorry the ${selected.name} club is currently full, please select another club.`);
      formClosed = true;
      resetAlerts();
      alertDanger.set(true);
    } else if ($userDetails.formState === "submit") {
      if ($userDetails.isInClub) {
        closeTheForm();
        notice.set(
          `You are already enrolled in the  ${$userDetails.currentClubName}. The form is currently closed.`
        );
      } else {
        openTheForm();
        if (selected.name.length > 0) {
          notice.set(`You have selected the ${selected.name} club.`);
        } else {
          closeTheForm();
          notice.set(`Please choose a club from the list below.`);
        }
      }
    } else if ($userDetails.formState === "edit") {
      openTheForm();
      if ($userDetails.isInClub) {
        if (selected.name.length > 0) {
          notice.set(
            `You have selected the ${selected.name} club. Submitting at the time will cancel your current enrollment in the 
          ${$userDetails.currentClubName} club.`
          );
        } else {
          notice.set(
            `Please choose a club from the list below. Submitting at the time will cancel your current enrollment in the 
          ${$userDetails.currentClubName} club.`
          );
        }
      } else {
        notice.set(`Please select a club from the list below.`);
      }
    } else if ($userDetails.formState === "approval") {
      openTheForm();
      if (selected.name.length > 0) {
        if ($userDetails.isInClub) {
          notice.set(
            `You have selected the ${selected.name} club and our records indicate that you are currently enrolled in the ${$userDetails.currentClubName} club. 
          If you make an application, you need to wait for your club appllicatin to be processed. Please allow up to a week and check your email for notification.
          Continue to attend your current club until your application has been approved.`
          );
        } else if ($userDetails.hasPendingClub) {
          notice.set(
            `You currently have a pending club, the ${$userDetails.pendingClubName} club.`
          );
        } else {
          notice.set(`You have selected the ${selected.name} club. 
        If you make an application, you need to wait for your club to be approved. Please allow up to a week and check your email for notification.`);
        }
      } else {
        notice.set(`Please select a club from the list below.`);
      }
    } else {
      closeTheForm();
      notice.set(`Please contact the club administrator.`);
    }
  }
  function updateUserDetails(updatedUserDetails) {
    userDetails.set(updatedUserDetails);
    updateFormMessage();
  }
  function setClubSignupList(clubSignupList) {
    clubsLoaded = true;
    clubs = clubSignupList;
  }
  function clubSubmissionResponse(response) {
    formResponseReceived = true;
    approvalResponse = response;
    resetAlerts();
    if (response.processed && response.status == "approved") {
      notice.set(
        `Your response has been received and approved for the ${response.appliedClubName} club.`
      );
      alertSuccess.set(true);
    } else if (!response.hasCapacity) {
      notice.set(`Sorry the club you've chosen, the ${response.appliedClubName} club, is full.`);
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
      class="inline-flex items-center my-4 py-2 px-4 font-bold text-white transition-colors duration-150 
      hover:bg-blue-700 rounded-lg focus:shadow-outline disabled:opacity-50 disabled:bg-blue-300"
      class:bg-blue-500={selected.name.length > 1 && !userDetails.formSubmitted && !formClosed}
      class:bg-blue-300={selected.name.length < 1 || userDetails.formSubmitted || formClosed}
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
    {#if formClosed && $userDetails.formState !== undefined && !$userDetails.formSubmitted}
      {#if $userDetails.formState === "view"}
        <br />
        <span class="text-blue-900 italic"
          >{`The form status is ${$userDetails.formState} only.`}</span
        >
      {:else if $userDetails.formState === "submit" && $userDetails.isInClub}
        <br />
        <span class="text-blue-900 italic"
          >{`The form is only accepting enrollments for students not yet in clubs.`}</span
        >
      {:else}
        <br />
        <span class="text-blue-900 italic">{`The form status is ${$userDetails.formState}.`}</span>
      {/if}
    {/if}
  </form>
</div>
