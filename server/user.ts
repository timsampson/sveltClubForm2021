function getUserCurrentClub() {
  let currentClub = "Dancing";
  return currentClub;
}
function fetchClubList() {
  let clubList = [{ name: "hats" }, { name: "chess" }, { name: "frisby" }];
  return clubList;
}
function getUserState() {
  let user = {
    formStatus: '',
    email: '',
    name: '',
    school: '',
    grade: 0,
    homeroom: "5-1",
    userRole: undefined,
    isStudent: undefined,
    isInClub: undefined,
    hasPendingClub: false,
    currentClubName: '',
    currentClubId: 0,
    isModerator: undefined,
  };
  user.name = "fred";
  user.isInClub = true;
  return user;
}
function getUserEmail() {
  return getEmail();
}
function getUserClubLevel() {
  let clubLevel = "hs";
  return clubLevel;
}

function getClubsByLevel() {
  let clubsByLevel = clubValues;
  return clubsByLevel;
}
function getAppliedClubForUser() {
  let filteredClubEnrollmentRecords = clubEnrollmentRecords.filter(function (enrollment) {
    return (enrollment.email) == getUserEmail();
  });
  return filteredClubEnrollmentRecords;
}
function currentUser(value: { name: string }) {
  return value.name == getUserEmail();
}
function setRecordClubEntry() {
  return 1;
}
