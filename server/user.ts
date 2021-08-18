function testuser(){
  getUserState().then( (value) => Logger.log(value));
  getClubsFilteredByLevel().then((value) => Logger.log(value));
}
async function getUserState() {
  let userState = {
    email: getUserEmail(),
    isInClub: false,
    name: undefined,
    school: undefined,
    homeroom: undefined,
    grade: undefined,
    userRole: undefined,
    isStudent: undefined,
    hasPendingClub: undefined,
    pendingClubName: undefined,
    currentClubName: undefined,
    currentClubId: undefined,
    isModerator: undefined,
    formState: undefined,
    canSubmit: undefined,
    isAdmin: undefined,
    isTeacher: undefined,
  };
  let userClubDetails = await getUserCurrentClubDetails();
  let userDetails = await getStudentInfo();
  userState.name = userDetails.full_name;
  userState.grade = userDetails.grade;
  userState.school = userDetails.school;
  userState.homeroom = userDetails.homeroom;
  userState.isAdmin = await checkIsAdmin();
  userState.isTeacher = await checkIsTeacher();
  userState.formState = await getFormState();
  if (userDetails) {
    userState.isStudent = true;
  }
  if (userClubDetails.isInClub === true) {
    userState.currentClubName = userClubDetails.club_name;
    userState.currentClubId = userClubDetails.club_id;
    userState.isInClub = true;
  } else {
    userState.isInClub = false;
  }
  let pendingClub = await getPendingClubsForUser();
  if (pendingClub.length > 0) {
    userState.hasPendingClub = true;
    userState.pendingClubName = pendingClub[0].clubname;
  } else {
    userState.hasPendingClub = false;
  }
  userState.canSubmit =
    ((userState.formState === "submit" && !userState.isInClub) && (userState.formState === "submit" && !userState.hasPendingClub))  ||
    (userState.formState === "edit") || 
    (userState.formState === "approval" && !userState.hasPendingClub) ||
    (userState.formState === "request" && userState.isInClub) ||
    (userState.formState === "request" && !userState.isInClub );
  return userState;
}
function getUserEmail() {
  return getEmail();
}
async function getStudentInfo() {
  let filteredStudentInfo = studentRecords.filter(function (student) {
    return student.email == getUserEmail();
  });
  return filteredStudentInfo[0];
}
async function getClubApplicationRecordsForUser() {
  clubApplicationRecords = await getClubApplicationRecords();
  let filteredClubEnrollmentRecords = clubApplicationRecords.filter(function (application) {
    return application.email == getUserEmail();
  });
  return filteredClubEnrollmentRecords;
}
async function getClubEnrollmentRecordsForUser() {
  clubApplicationRecords = await getClubEnrollmentRecords();
  let filteredClubEnrollmentRecords = clubApplicationRecords.filter(function (application) {
    return application.email == getUserEmail();
  });
  return filteredClubEnrollmentRecords;
}
async function getUserCurrentClubDetails() {
  let currentClubDetails = clubEnrollmentRecords.filter(function (student) {
    return student.email == getUserEmail();
  });
  let clubDetails = { isInClub: false, club_name: "", club_id: 0 };
  if (currentClubDetails.length > 0) {
    clubDetails = { ...currentClubDetails[0] };
    clubDetails.isInClub = true;
  }
  return clubDetails;
}
async function getPendingClubsForUser() {
  let pendingClubsForUser = clubApplicationRecords.filter(function (record) {
    return record.email == getUserEmail() && record.status == "pending";
  });
  return pendingClubsForUser;
}
async function getClubsFilteredByLevel() {
  // need student details
  let userInfo = await getStudentInfo();
  // need available clubs
  // filter the availabe clubs by matches with student details.
  let allclubs = await getClubRecords();
  function isMatch(levelOptions) {
    let isMatch = false;
    levelOptions.forEach((element) => {
      if (element == userInfo.grade || element == userInfo.school || element == userInfo.homeroom) {
        isMatch = true;
      }
    });
    return isMatch;
  }
  let clubsByLevel = allclubs.filter(function (club) {
    // split club levels into array
    let levelOptions = club.level.split(",");
    return isMatch(levelOptions);
  });
  return clubsByLevel;
}

async function currentUser(value: { name: string }) {
  return value.name == getUserEmail();
}
async function checkIsAdmin() {
  let filterdClubAdminsRecords = clubAdminsRecords.filter(function (admins) {
    return admins.email === getUserEmail();
  });
  return filterdClubAdminsRecords.length > 0;
}
async function checkIsTeacher() {
  let filterdTeacherRecords = staffRecords.filter(function (teachers) {
    return teachers.email === getUserEmail();
  });
  return filterdTeacherRecords.length > 0;
}
