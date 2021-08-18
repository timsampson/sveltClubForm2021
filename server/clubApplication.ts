function applicationId(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
  let lastRecordRow = sheet.getLastRow() + 1;
  let formApplicationDate = new Date();
  let year = formApplicationDate.getFullYear();
  let day = formApplicationDate.getDate();
  let recordId = "id" + year + day + lastRecordRow + Math.floor(Math.random() * 10);
  return recordId;
}

async function setRecordClubApplicationEntry(clubId: string | number) {
  let clubDetails = await getClubDetails(clubId);
  let userState = await getUserState();
  let formState = await getFormState();
  let clubRecordId = applicationId(clubApplicationSheet);

  let application = {
    email: getUserEmail(),
    appliedClubId: clubId,
    appliedClubName: clubDetails.name,
    appliedClubDetails: clubDetails.description,
    appliedClubLocation: clubDetails.location,
    appliedclubModerator: clubDetails.moderator,
    location: clubDetails.location,
    received: true,
    recordId: clubRecordId,
    formState: formState,
    hasCapacity: clubDetails.enrolled < clubDetails.capacity,
    hasPendingClub: userState.hasPendingClub,
    isInClub: userState.isInClub,
    applicationStatus: "",
    processed: false,
    name: userState.name,
    grade: userState.grade,
    school: userState.school,
    homeroom: userState.homeroom,
    userRole: undefined,
    isStudent: userState.isStudent,
    pendingClubName: userState.pendingClubName,
    currentClubName: userState.currentClubName,
    currentClubId: userState.currentClubId,
    isModerator: undefined,
    canSubmit: userState.canSubmit,
    isApproved: false,
    message: "",
  };
  // check to see if the club is full
  // approval process
  if (application.hasCapacity) {
    if (application.formState == "submit" && !application.isInClub) {
      application.applicationStatus = "approved";
      application.processed, (application.isApproved = true);
      application.message = `Your application for the ${application.appliedClubName} club has been approved.`;
    } else if (application.formState == "submit" && application.isInClub) {
      application.applicationStatus = "pending";
      application.processed, (application.isApproved = false);
      application.message = `Your application for the ${application.appliedClubName} club has not been approved. 
        You currently are in a club, and changes are not currently allowed. `;
    } else if (application.formState == "edit") {
      application.applicationStatus = "approved";
      application.processed, (application.isApproved = true);
      application.message = `Your application for the ${application.appliedClubName} club has been approved.`;
    } else if (application.formState == "approval") {
      application.applicationStatus = "pending";
      application.processed, (application.isApproved = false);
      application.message = `Your application for the ${application.appliedClubName} club is pending review by the club administrator.`;
    } else {
      application.applicationStatus = "rejected";
      application.processed, (application.isApproved = false);
      application.message = `Your application for the ${application.appliedClubName} club has not been approved.  
        Please contact the club administrator.`;
    }
  } else {
    application.formState = "rejected";
    application.processed, (application.isApproved = false);
    application.message = `Your application for the ${application.appliedClubName} club has not been approved.  
        Please contact the club administrator.`;
  }
  application.message = `${application.message} Your application id for your records is ${application.recordId}.`;
  sendApplicationEmail(application);
  processEnrollment(application);
  return application;
}
