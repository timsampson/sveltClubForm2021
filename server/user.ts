async function getUserState() {
  let userState = {
    email: getUserEmail(),
    isInClub: false,
    name: undefined,
    grade: undefined,
    school: undefined,
    homeroom: undefined,
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
  };
  let userClubDetails = await getUserCurrentClubDetails();
  let userDetails = await getStudentInfo();
  let homeroomDetails = await getUserHRDetails();
  userState.isAdmin = checkIsAdmin();
  userState.formState = getFormStatus();
  if (userDetails) {
    userState.isStudent = true;
  }
  userState.name = userDetails.full_name;
  userState.homeroom = homeroomDetails.homeroom;
  userState.school = homeroomDetails.level;
  userState.grade = homeroomDetails.grade;
  if (userClubDetails.isInClub === true) {
    userState.currentClubName = userClubDetails.club_name;
    userState.currentClubId = userClubDetails.club_id;
    userState.isInClub = true;
  } else {
    userState.isInClub = false;
  }
  let pendingClub = getPendingClubsForUser();
  if (pendingClub.length > 0) {
    userState.hasPendingClub = true;
    userState.pendingClubName = pendingClub[0].clubname;
  } else {
    userState.hasPendingClub = false;
  }
  userState.canSubmit =
    (userState.formState === "submit" && !userState.isInClub && userState.formState === "submit" && !userState.hasPendingClub)  ||
    userState.formState === "edit" || (userState.formState === "approval" && !userState.hasPendingClub);
  return userState;
}
function getUserEmail() {
  return getEmail();
}
function getUserHRDetails() {
  let filteredHRDetails = hrAssignmentRecords.filter(function (student) {
    return student.email == getUserEmail();
  });
  return filteredHRDetails[0];
}
function getStudentInfo() {
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

function getPendingClubsForUser() {
  let pendingClubsForUser = clubApplicationRecords.filter(function (record) {
    return record.email == getUserEmail() && record.status == "pending";
  });
  return pendingClubsForUser;
}
function getClubsFilteredByLevel() {
  // need student details
  // need available clubs
  // filter the availabe clubs by matches with student details.
  let homeroomDetails = getUserHRDetails();
  let allclubs = getClubRecords();
  function isMatch(levelOptions) {
    let isMatch = false;
    levelOptions.forEach((element) => {
      if (element == homeroomDetails.grade || element == homeroomDetails.level) {
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

function currentUser(value: { name: string }) {
  return value.name == getUserEmail();
}
function checkIsAdmin() {
  let filterdClubAdminsRecords = clubAdminsRecords.filter(function (admins) {
    return admins.email === getUserEmail();
  });
  return filterdClubAdminsRecords.length > 0;
}
