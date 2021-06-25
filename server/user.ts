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
    formStatus: undefined,
    email: undefined,
    name: undefined,
    school: undefined,
    grade: undefined,
    homeroom: "5-1",
    userRole: undefined,
    isStudent: undefined,
    isInClub: undefined,
    hasPendingClub: undefined,
    currentClubName: undefined,
    currentClubId: undefined,
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
  let filteredClubEnrollmentObjValues = clubEnrollmentObjects.filter(function (enrollment) {
    return (enrollment.email) == getUserEmail();
  });
  return filteredClubEnrollmentObjValues;
}
function currentUser(value: { name: string }) {
  return value.name == getUserEmail();
}
function setRecordClubEntry() {
  return 1;
}
