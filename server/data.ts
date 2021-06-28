// school sheet data
const schoolDB = SpreadsheetApp.openById(
  "1xNniCTmFaHzf5yYI5y4sGbpqYO_8VDMaZg3RA52jTK8"
);

// club sheet data
const clubDB = SpreadsheetApp.openById(
  "1yDrguQ8TXGE4OEoam_xPKv4VVir96P7p6cBfVJ2i7j8"
);

const staffSheet = schoolDB.getSheetByName("staff");
let staffValues = staffSheet.getDataRange().getValues();
let staffRecords = sheetToObjArr(staffValues);

const studentSheet = schoolDB.getSheetByName("students");
let studentValues = studentSheet.getDataRange().getValues();
let studentRecords = sheetToObjArr(studentValues);

const homeroomSheet = schoolDB.getSheetByName("homerooms");
let homeroomValues = homeroomSheet.getDataRange().getValues();
let homeroomRecords = sheetToObjArr(homeroomValues);

const hrAssignmentSheet = schoolDB.getSheetByName("hrAssignment2021");
let hrAssignmentValues = hrAssignmentSheet.getDataRange().getValues();
let hrAssignmentRecords = sheetToObjArr(hrAssignmentValues);

const clubSheet = clubDB.getSheetByName("clubs");
let clubValues = clubSheet.getDataRange().getValues();
function getClublist(){
   clubValues = clubSheet.getDataRange().getValues();
   let clubRecords = sheetToObjArr(clubValues);
   return clubRecords;
}

const clubApplicationSheet = clubDB.getSheetByName("club_application");
let clubApplicationValues = clubApplicationSheet.getDataRange().getDisplayValues();
let clubApplicationRecords = sheetToObjArr(clubApplicationValues);

const clubEnrollmentSheet = clubDB.getSheetByName("club_enrollment");
let clubEnrollmentValues = clubEnrollmentSheet.getDataRange().getDisplayValues();
let clubEnrollmentRecords = sheetToObjArr(clubEnrollmentValues);

const moderatorSheet = clubDB.getSheetByName("moderators");
let moderatorValues = moderatorSheet.getDataRange().getValues();
let moderatorRecords = sheetToObjArr(moderatorValues);

const adminSheet = clubDB.getSheetByName("admins");
let adminValues = adminSheet.getDataRange().getValues();
let adminRecords = sheetToObjArr(adminValues);

// club sheet value for sheet status
const formStatusSheet = clubDB.getSheetByName("formstatus");
let formStatus = formStatusSheet.getRange(2, 1).getValue();

function getFormStatus(){
  formStatus = formStatusSheet.getRange(2, 1).getValue();
  return formStatus;
}
function getClubApplicationData() {
  return clubApplicationValues.slice();
}
function getClubApplicationRecords(){
   clubApplicationValues = clubSheet.getDataRange().getValues();
   let clubRecords = sheetToObjArr(clubApplicationValues);
   return clubRecords;
}
function sheetToObjArr(data: any[]) {
  // get key values from first row or original array
  var header = data.shift();
  var arrayOfObjects = data.map(function (values) {
    return header.reduce(function (
      o: { [x: string]: any; },
      k: string | number,
      i: string | number
    ) {
      o[k] = values[i];
      return o;
    },
    {});
  });
  // put back key values from first row or original array
  data.unshift(header);
  return arrayOfObjects;
}
