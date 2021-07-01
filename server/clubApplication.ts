function testsetrecord(){
    setRecordClubEntry(2).then((value) => Logger.log(value))
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
  let application = {
    email: "",
    appliedClubId: clubId,
    appliedClubName: "",
    appliedClubDetails: "",
    appliedclubModerator: "",
    received: false,
    recordId: "0",
    formStatus: "closed",
    hasCapacity: false,
    hasPendingClub: false,
    isInClub: false,
    applicationStatus: "rejected",
    processed: false,
    name: undefined,
    grade: undefined,
    school: undefined,
    homeroom: undefined,
    userRole: undefined,
    isStudent: undefined,
    pendingClubName: undefined,
    currentClubName: undefined,
    currentClubId: undefined,
    isModerator: undefined,
    canSubmit: undefined,
  };
  let userState = await getUserState();
  let applicationResponse = { ...application, ...userState };
  applicationResponse.formStatus = await getFormStatus();
  // get the club details for id
  let appliedClubDetails = {
    enrolled: 0,
    capacity: 0,
    name: "",
  };
  appliedClubDetails = await getClubDetails(clubId);
  // check to see if the club is full
  applicationResponse.received = true;
  if (appliedClubDetails.enrolled < appliedClubDetails.capacity) {
    applicationResponse.hasCapacity = true;
  } else {
    applicationResponse.hasCapacity = false;
  }
  // approval process
  if (applicationResponse.formStatus == "submit" && !applicationResponse.isInClub) {
    applicationResponse.formStatus = "approved";
    applicationResponse.processed = true;
  } else if (applicationResponse.formStatus == "submit" && applicationResponse.isInClub) {
    applicationResponse.formStatus = "pending";
    applicationResponse.processed = false;
  } else if (applicationResponse.formStatus == "edit") {
    applicationResponse.formStatus = "approved";
    applicationResponse.processed = true;
  } else if (applicationResponse.formStatus == "approval") {
    applicationResponse.formStatus = "pending";
    applicationResponse.processed = false;
  } else {
    applicationResponse.formStatus = "rejected";
    applicationResponse.processed = false;
  }
  if (applicationResponse.formStatus == "approved" && !applicationResponse.isInClub) {
    // send welcome email  to the club
    // append log to the log record
    // append enrollment to the enrollment record
  } else if (applicationResponse.formStatus == "approved" && applicationResponse.isInClub) {
    // send welcome email to the club
    // append log to the log record
    // *edit* enrollment to the enrollment record
  } else if (applicationResponse.formStatus == "pending") {
    // send email club application is pending
    // append log to the log record
  }
  // write the log
  applicationResponse.recordId = clubApplicationId();

  // if not found, append it

  // if found, update it

  // send email with confirmation the application has been processed
  function sendApplicationResponseEmail(applicationResponse) {
    const htmlBody = HtmlService.createTemplateFromFile("welcome-mail");
    htmlBody.stuName = applicationResponse.name;
    htmlBody.clubName = applicationResponse.appliedClubName;
    htmlBody.clubDetails = applicationResponse.appliedClubDetails;
    htmlBody.clubModerator = applicationResponse.appliedclubModerator;
    const emailHtml = htmlBody.evaluate().getContent();
    const email = applicationResponse.email;
    let welcomeMessage = `Welcome to the ${applicationResponse.appliedClubName} club!`;
    MailApp.sendEmail({
      // cc: ccEmail,
      htmlBody: emailHtml,
      subject: welcomeMessage,
      to: email,
    });
  }
  return applicationResponse;
}
