function processEnrollment(application) {
  if (application.formStatus == "approved") {
    logClubApplication(application);
    logClubEnrollment(application);
  } else {
    logClubApplication(application);
  }
}

async function processReviewedClubApplications(records) {
  if (records.approved.length > 0) {
    records.approved.forEach((record: any) => processReviewedClubApplication(record, "approved"));
  }
  if (records.rejected.length > 0) {
    records.rejected.forEach((record: any) => processReviewedClubApplication(record, "rejected"));
  }
  return true;
}

async function processReviewedClubApplication(record, status) {
  let originalRecordID = record.recordId;
  let clubDetails = await getClubDetails(record.appliedClubId);
  let formStatus = await getFormStatus();
  let updatedRecordId = applicationId(clubApplicationSheet);

  let application = {
    email: record.email,
    appliedClubId: record.appliedClubId,
    appliedClubName: clubDetails.name,
    appliedClubDetails: clubDetails.description,
    appliedclubModerator: clubDetails.moderator,
    received: true,
    recordId: updatedRecordId,
    formStatus: formStatus,
    hasCapacity: clubDetails.enrolled < clubDetails.capacity,
    hasPendingClub: record.hasPendingClub,
    isInClub: record.isInClub,
    applicationStatus: status,
    processed: true,
    name: record.name,
    grade: record.grade,
    school: record.school,
    homeroom: record.homeroom,
    userRole: undefined,
    isStudent: record.isStudent,
    pendingClubName: "",
    currentClubName: "",
    currentClubId: "",
    isModerator: undefined,
    canSubmit: record.canSubmit,
    isApproved: undefined,
    message: "",
  };

  if (status == "approved") {
    application.message = `Your application for the ${application.appliedClubName} club has been approved. `;
    application.isApproved = true;
    application.applicationStatus = "approved";
  } else {
    application.message = `Your application for the ${application.appliedClubName} club has not been approved.`;
    application.isApproved = true;
    application.applicationStatus = "rejected";
  }
  application.message = `${application.message} Your application id for your records is ${application.recordId}.`;

  await updateOriginalApplicationEntry(originalRecordID);
  processEnrollment(application);
  sendApplicationEmail(application);
}
async function changeCurrentClub(application) {
  // get index for the row and delete the row.
  let oldRecordRowIndex = clubEnrollmentRecords.findIndex(
    (record) => record.email == application.email
  );
  clubEnrollmentSheet.deleteRow(oldRecordRowIndex + 1);
}

async function updateOriginalApplicationEntry(approvalId) {
  let id = approvalId;
  // Logger.log(`id: ${id}`)
  let rowIndex = -1;
  let colIndex = clubApplicationValues[0].indexOf("processed");
  // Logger.log(`colIndex: ${colIndex}`)
  for (let row = 1; row < clubApplicationValues.length; row++) {
    // Logger.log(`Values in cell ${clubApplicationValues[row][0] }`)
    if (clubApplicationValues[row][0] === id) {
      rowIndex = row;
      Logger.log("found it");
      break;
    } else {
      rowIndex = -1;
    }
    //Logger.log(`values: ${rowIndex} ${colIndex} ${clubApplicationValues[row][colIndex]}`);
  }
  Logger.log(`rowIndex: ${rowIndex}`);
  // Logger.log(`colIndex: ${colIndex}`)
  clubApplicationSheet.getRange(rowIndex + 1, colIndex + 1).setValue(true);
}
