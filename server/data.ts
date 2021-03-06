// school sheet data
const schoolDB = SpreadsheetApp.openById("1V83ac_K6nzg-yFI-AjUxh2DXJq9WQZxtVaqh8iOeBag");

// club sheet data
const clubDB = SpreadsheetApp.openById("1XndqsxVbLgO3KTFpzManNSH0QRwBh_0GokZckYpHBLs");

const staffSheet = schoolDB.getSheetByName("staff");
let staffValues = staffSheet.getDataRange().getValues();
let staffRecords = sheetToObjArr(staffValues);

const studentSheet = schoolDB.getSheetByName("students");
let studentValues = studentSheet.getDataRange().getValues();
let studentRecords = sheetToObjArr(studentValues);

const studenthrSheet = schoolDB.getSheetByName("studenthr");
let studenthrValues = studenthrSheet.getDataRange().getValues();
let studenthrRecords = sheetToObjArr(studenthrValues);

function getStudenthrValues(){
  return studenthrRecords;
}

const clubAdminsSheet = clubDB.getSheetByName("admins");
let clubAdminsValues = clubAdminsSheet.getDataRange().getValues();
let clubAdminsRecords = sheetToObjArr(clubAdminsValues);

const clubSheet = clubDB.getSheetByName("clubs");
let clubValues = clubSheet.getDataRange().getValues();
let clubRecords = sheetToObjArr(clubValues);
function getClubRecords() {
  clubValues = clubSheet.getDataRange().getValues();
  clubRecords = sheetToObjArr(clubValues);
  return clubRecords;
}
const clubApplicationSheet = clubDB.getSheetByName("club_application");
let clubApplicationValues = clubApplicationSheet.getDataRange().getDisplayValues();
let clubApplicationRecords = sheetToObjArr(clubApplicationValues);

async function getClubApplicationRecords() {
  clubApplicationValues = clubApplicationSheet.getDataRange().getDisplayValues();
  clubApplicationRecords = sheetToObjArr(clubApplicationValues);
  return clubApplicationRecords;
}
const clubEnrollmentSheet = clubDB.getSheetByName("club_enrollment");
let clubEnrollmentValues = clubEnrollmentSheet.getDataRange().getDisplayValues();
let clubEnrollmentRecords = sheetToObjArr(clubEnrollmentValues);

async function getClubEnrollmentRecords() {
  clubEnrollmentValues = clubEnrollmentSheet.getDataRange().getDisplayValues();
  clubEnrollmentRecords = sheetToObjArr(clubEnrollmentValues);
  return clubEnrollmentRecords;
}
const moderatorSheet = clubDB.getSheetByName("moderators");
let moderatorValues = moderatorSheet.getDataRange().getValues();
let moderatorRecords = sheetToObjArr(moderatorValues);

const adminSheet = clubDB.getSheetByName("admins");
let adminValues = adminSheet.getDataRange().getValues();
let adminRecords = sheetToObjArr(adminValues);

// club sheet value for sheet status
const formStatusSheet = clubDB.getSheetByName("formstate");
let formState = formStatusSheet.getRange(2, 1).getValue();

function getFormState() {
  formState = formStatusSheet.getRange(2, 1).getValue();
  return formState;
}
function getClubApplicationData() {
  return clubApplicationValues.slice();
}

function getClubDetails(clubId: string | number) {
  let filteredHRDetails = clubRecords.filter(function (club) {
    return club.id == clubId;
  });
  return filteredHRDetails[0];
}
function clubHasCapacity(clubId){
    let clubDetails = getClubDetails(clubId);
    return clubDetails.enrolled < clubDetails.capacity
}
function sheetToObjArr(data: any[]) {
  // get key values from first row or original array
  var header = data.shift();
  var arrayOfObjects = data.map(function (values) {
    return header.reduce(function (
      o: { [x: string]: any },
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
