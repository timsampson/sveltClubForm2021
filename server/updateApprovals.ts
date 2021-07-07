async function updateApprovedClubApplications(approved) {
  // loop through the approved clubs ids
  // for each id, get record,
  approved.forEach((approvalId) => processApproval(approvalId));

  return approved;
}
async function processApproval(approvalId) {
  let updatedClubDetails = await logApproval(approvalId);
  await updateOriginalEntry(approvalId);
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
  filteredClubApplicationRecord.recordId = clubApplicationId();
  filteredClubApplicationRecord.processed = true;
  filteredClubApplicationRecord.isApproved = true;
  filteredClubApplicationRecord.formStatus = "approved";
  logClubApplication(filteredClubApplicationRecord);
  return filteredClubApplicationRecord;
}
async function updateOriginalEntry(approval) {
  Logger.log(approval);
  let id = approval;
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
