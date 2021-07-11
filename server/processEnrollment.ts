// if the application has a current club and if form status is edit, changeCurrentClub

function processEnrollment(application) {
  if (application.isInClub && application.formStatus === "edit") {
  }
}

async function processApprovedClubApplications(records) {
  // approvedApplications.forEach((approvalId: string) => processApprovedClubApplication(approvalId));
  // approvedApplications.forEach((approvalId: string) => processApprovedClubApplication(approvalId));

  records.approved.forEach((record) => logClubApplication(record));
  records.rejected.forEach((record) => logClubApplication(record));
  return true;
}
async function processApprovedClubApplication(approvalId) {
  let updatedClubDetails = await logApproval(approvalId);
  await updateOriginalApplicationEntry(approvalId);
  await changeCurrentClub(updatedClubDetails);
}

async function changeCurrentClub(updatedClubDetails) {
  // to be implimented
}
async function logApproval(approvalId) {
  let filteredClubApplicationRow = clubApplicationRecords.filter(function (application) {
    return application.recordId == approvalId;
  });
  let filteredClubApplicationRecord = filteredClubApplicationRow[0];
  filteredClubApplicationRecord.recordId = applicationId(clubApplicationSheet);
  filteredClubApplicationRecord.processed = true;
  filteredClubApplicationRecord.isApproved = true;
  filteredClubApplicationRecord.formStatus = "approved";
  logClubApplication(filteredClubApplicationRecord);
  return filteredClubApplicationRecord;
}
async function updateOriginalApplicationEntry(approvalId) {
  Logger.log(approvalId);
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
