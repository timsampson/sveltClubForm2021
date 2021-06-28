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
  user.currentClubName = 'Chess';
  return user;
}
function getUserEmail() {
  return getEmail();
}
function getUserHRDetails() {
  let filteredHRDetails = hrAssignmentRecords.filter(function (student) {
      return (student.email) == getUserEmail();
    });
  
  return filteredHRDetails[0];
}
function getStudentInfo(){
  let filteredStudentInfo = studentRecords.filter(function (student) {
      return (student.email) == getUserEmail();
    });
    return filteredStudentInfo[0];
}

function getClubsFilteredByLevel() {
    // need student details
    // need available clubs
    // filter the availabe clubs by matches with student details.
    let homeroomDetails = getUserHRDetails();
    let allclubs = getClublist();
    function isMatch(levelOptions) {
        let isMatch = false;
        levelOptions.forEach(element => {
            if (element == homeroomDetails.grade  || element == homeroomDetails.level){
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
    return (application.email) == getUserEmail();
  });
  return filteredClubEnrollmentRecords;
}
function currentUser(value: { name: string }) {
  return value.name == getUserEmail();
}
function setRecordClubEntry() {
  return 1;
}
