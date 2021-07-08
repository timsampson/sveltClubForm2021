function getClubsForApproval(){
    let filteredClubsForApprovalRecords = clubApplicationRecords.filter(function (application) {
     return application.formStatus == 'pending' && !(application.processed === 'TRUE');
  });
  filteredClubsForApprovalRecords.forEach(club => {
    // check club capacity and update.
     club.hasCapacity = clubHasCapacity(club.appliedClubId);
  });
  return filteredClubsForApprovalRecords;
}