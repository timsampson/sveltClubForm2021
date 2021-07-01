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
    formStatus: undefined,
    canSubmit: undefined,
  };
  let userClubDetails = await getUserCurrentClubDetails();
  let userDetails = await getStudentInfo();
  let homeroomDetails = await getUserHRDetails();
  userState.formStatus = getFormStatus();
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
  }
  else {
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
    (userState.formStatus === "submit" && !userState.isInClub) ||
    userState.formStatus === "approval" ||
    userState.formStatus === "edit";
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
  let allclubs = getClublist();
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
function getAppliedClubsForUser() {
  let filteredClubEnrollmentRecords = clubApplicationRecords.filter(function (application) {
    return application.email == getUserEmail();
  });
  return filteredClubEnrollmentRecords;
}
function currentUser(value: { name: string }) {
  return value.name == getUserEmail();
}
