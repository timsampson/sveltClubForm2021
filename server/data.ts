// school sheet data
const schoolDB = SpreadsheetApp.openById(
  "1xNniCTmFaHzf5yYI5y4sGbpqYO_8VDMaZg3RA52jTK8"
);
const staffSheet = schoolDB.getSheetByName("staff");
let staffValues = staffSheet.getDataRange().getValues();
const studentSheet = schoolDB.getSheetByName("students");
let studentValues = studentSheet.getDataRange().getValues();
const placement2020Sheet = schoolDB.getSheetByName("placement2020");
let placement2020Values = placement2020Sheet.getDataRange().getValues();

// club sheet data
const clubDB = SpreadsheetApp.openById(
  "1yDrguQ8TXGE4OEoam_xPKv4VVir96P7p6cBfVJ2i7j8"
);
const clubSheet = clubDB.getSheetByName("clubs");
let clubValues = clubSheet.getDataRange().getValues();
const clubApplicationSheet = clubDB.getSheetByName("club_application");
let clubApplicationValues = clubApplicationSheet.getDataRange().getDisplayValues();
const clubEnrollmentSheet = clubDB.getSheetByName("club_enrollment");
let clubEnrollmentValues = clubEnrollmentSheet.getDataRange().getDisplayValues()
const moderatorSheet = clubDB.getSheetByName("moderators");
let moderatorValues = moderatorSheet.getDataRange().getValues();
const adminSheet = clubDB.getSheetByName("admins");
let adminValues = adminSheet.getDataRange().getValues();

// club sheet value for sheet status
const formStatusSheet = clubDB.getSheetByName("formstatus");
let formStatus = formStatusSheet.getRange(2, 1).getValue();

function getFormStatus(){
  formStatus = formStatusSheet.getRange(2, 1).getValue();
  return formStatus;
}
function getClubApplicationData() {
  let clubApplicationRecords = clubApplicationValues.slice();
  // Need to remove Date object, or return will be null :-(
  let clubApplicationData = clubApplicationRecords.map(function (table) {
    table.splice(1, 1);
    return table.slice();
  });
  return clubApplicationData;
}
