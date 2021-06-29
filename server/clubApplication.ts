function clubApplicationId() {
  let lastRecordRow = clubApplicationSheet.getLastRow() + 1;
  let formApplicationDate = new Date();
  let year = formApplicationDate.getFullYear();
  let day = formApplicationDate.getDate();
  let recordId = "id" + year + day + lastRecordRow;
  return recordId;
}
async function setRecordClubEntry(clubId: string | number) {
  let currentClubDetails = getUserCurrentClubDetails();
  let applicationResponse = {
    appliedClubId: clubId,
    received: false,
    recordId: "0",
    formStatus: "closed",
    hasCapacity: false,
    hasPendingClub: false,
    isInClub: false,
    applicationStatus: "rejected",
    processed: false,
  };
  applicationResponse.formStatus = getFormStatus();
  // get the club details for id
  let appliedClubDetails = {
    enrolled: 0,
    capacity: 0,
    name: "",
  };
  appliedClubDetails = getClubDetails(clubId);
  applicationResponse.isInClub = currentClubDetails.isInClub;

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
  return applicationResponse;
}
