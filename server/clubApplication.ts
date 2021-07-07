function applicationId(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
  let lastRecordRow = sheet.getLastRow() + 1;
  let formApplicationDate = new Date();
  let year = formApplicationDate.getFullYear();
  let day = formApplicationDate.getDate();
  let recordId = "id" + year + day + lastRecordRow;
  return recordId;
}
async function setRecordClubApplicationEntry(clubId: string | number) {
  let clubDetails = await getClubDetails(clubId);
  let userState = await getUserState();
  let formStatus = await getFormStatus();
  let clubRecordId = applicationId(clubApplicationSheet);

  let application = {
    email: getUserEmail(),
    appliedClubId: clubId,
    appliedClubName: clubDetails.name,
    appliedClubDetails: clubDetails.description,
    appliedclubModerator: clubDetails.moderator,
    received: true,
    recordId: clubRecordId,
    formStatus: formStatus,
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
    pendingClubName: undefined,
    currentClubName: userState.currentClubName,
    currentClubId: undefined,
    isModerator: undefined,
    canSubmit: userState.canSubmit,
    isApproved: false,
    message: "",
  };
  // check to see if the club is full
  // approval process
  if (application.hasCapacity) {
    if (application.formStatus == "submit" && !application.isInClub) {
      application.formStatus = "approved";
      application.processed, (application.isApproved = true);
      application.message = `Your application for the ${application.appliedClubName} has been approved.`;
    } else if (application.formStatus == "submit" && application.isInClub) {
      application.formStatus = "pending";
      application.processed, (application.isApproved = false);
      application.message = `Your application for the ${application.appliedClubName} has not been approved. 
        You currently are in a club, and changes are not currently allowed. `;
    } else if (application.formStatus == "edit") {
      application.formStatus = "approved";
      application.processed, (application.isApproved = true);
      application.message = `Your application for the ${application.appliedClubName} has been approved.`;
    } else if (application.formStatus == "approval") {
      application.formStatus = "pending";
      application.processed, (application.isApproved = false);
      application.message = `Your application for the ${application.appliedClubName} is pending approval `;
    } else {
      application.formStatus = "rejected";
      application.processed, (application.isApproved = false);
      application.message = `Your application for the ${application.appliedClubName} has not been approved.  
        Please contact the club administrator.`;
    }
  } else {
    application.formStatus = "rejected";
    application.processed, (application.isApproved = false);
    application.message = `Your application for the ${application.appliedClubName} has not been approved.  
        Please contact the club administrator.`;
  }
  sendapplicationEmail(application);
  logEnrollment(application);
  logClubApplication(application);
  return application;
}
function logClubApplication(application) {
  let formSubmissionDate = new Date();
  let applicationLogRecord = [
    application.recordId,
    formSubmissionDate,
    application.email,
    application.name,
    application.school,
    application.grade,
    application.homeroom,
    application.appliedClubId,
    application.appliedClubName,
    application.appliedclubModerator,
    application.appliedClubDetails,
    application.hasCapacity,
    application.canSubmit,
    application.isApproved,
    application.formStatus,
    application.received,
    application.hasPendingClub,
    application.pendingClubName,
    application.isInClub,
    application.currentClubId,
    application.currentClubName,
    application.applicationStatus,
    application.processed,
    application.userRole,
    application.isStudent,
    application.isModerator,
    application.message
  ];
  clubApplicationSheet.appendRow(applicationLogRecord);
}
