function testsetrecord() {
  setRecordClubEntry(2).then((value) => Logger.log(value));
}

function clubApplicationId() {
  let lastRecordRow = clubApplicationSheet.getLastRow() + 1;
  let formApplicationDate = new Date();
  let year = formApplicationDate.getFullYear();
  let day = formApplicationDate.getDate();
  let recordId = "id" + year + day + lastRecordRow;
  return recordId;
}
async function setRecordClubEntry(clubId: string | number) {
  let clubDetails = await getClubDetails(clubId);
  let userState = await getUserState();
  let formStatus = await getFormStatus();
  let clubRecordId = clubApplicationId();

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
    isApproved: false
  };
  // check to see if the club is full
  // approval process
  if (application.hasCapacity) {
    if (application.formStatus == "submit" && !application.isInClub) {
      application.formStatus = "approved";
      application.processed, application.isApproved = true;
    } else if (application.formStatus == "submit" && application.isInClub) {
      application.formStatus = "pending";
      application.processed, application.isApproved = false;
    } else if (application.formStatus == "edit") {
      application.formStatus = "approved";
      application.processed, application.isApproved = true;
    } else if (application.formStatus == "approval") {
      application.formStatus = "pending";
       application.processed, application.isApproved = false;
    } else {
      application.formStatus = "rejected";
       application.processed, application.isApproved = false;
    }
  } else {
    application.formStatus = "rejected";
     application.processed, application.isApproved = false;
  }
  sendapplicationEmail(application);
  logClubApplication(application);
  if (application.formStatus == "approved" && !application.isInClub) {
    // send welcome email  to the club
    // append log to the log record
    // append enrollment to the enrollment record
  } else if (application.formStatus == "approved" && application.isInClub) {
    // send welcome email to the club
    // append log to the log record
    // *edit* enrollment to the enrollment record
  } else if (application.formStatus == "pending") {
    // send email club application is pending
    // append log to the log record
  }
  // write the log

  // if not found, append it

  // if found, update it
  // send email with confirmation the application has been processed

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
  ];
  clubApplicationSheet.appendRow(applicationLogRecord);
}
function sendapplicationEmail(application) {
  const htmlBody = HtmlService.createTemplateFromFile("welcome-mail");
  htmlBody.stuName = application.name;
  htmlBody.clubName = application.appliedClubName;
  htmlBody.clubDetails = application.appliedClubDetails;
  htmlBody.clubModerator = application.appliedclubModerator;
  const emailHtml = htmlBody.evaluate().getContent();
  const email = application.email;
  let welcomeMessage = `Welcome to the ${application.appliedClubName} club!`;
  MailApp.sendEmail({
    // cc: ccEmail,
    htmlBody: emailHtml,
    subject: welcomeMessage,
    to: email,
  });
}
