async function getUserState() {
  let userState = {
    email: getUserEmail(),
    name: undefined,
    school: undefined,
    grade: undefined,
    homeroom: undefined,
    userRole: undefined,
    isStudent: undefined,
    isInClub: undefined,
    hasPendingClub: undefined,
    currentClubName: undefined,
    currentClubId: undefined,
    isModerator: undefined,
  };
  let userClubDetails = await getUserCurrentClubDetails();
  let userDetails = await getStudentInfo();
  let homeroomDetails = await getUserHRDetails();
  if (userDetails) {
    userState.isStudent = true;
  }
  userState.name = userDetails.full_name;
  userState.homeroom = homeroomDetails.homeroom;
  userState.school = homeroomDetails.school;
  userState.grade = homeroomDetails.grade;
  if (userClubDetails) {
    userState.currentClubName = userClubDetails.club_name;
    userState.currentClubId = userClubDetails.club_id;
    userState.isInClub = true;
  }
  let hasPendingClub = getPendingClubsForUser();
  if (hasPendingClub.length > 0) {
    userState.hasPendingClub = true;
  } else {
    userState.hasPendingClub = false;
  }

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
function getUserCurrentClubDetails() {
  let currentClubHRDetails = clubEnrollmentRecords.filter(function (student) {
    return student.email == getUserEmail();
  });
  return currentClubHRDetails[0];
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
      if (
        element == homeroomDetails.grade ||
        element == homeroomDetails.level
      ) {
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
  let filteredClubEnrollmentRecords = clubApplicationRecords.filter(function (
    application
  ) {
    return application.email == getUserEmail();
  });
  return filteredClubEnrollmentRecords;
}
function currentUser(value: { name: string }) {
  return value.name == getUserEmail();
}
function setRecordClubEntry() {
  return 1;
}
