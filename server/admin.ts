function getClubsForApproval(){
    let filteredClubsForApprovalRecords = clubApplicationRecords.filter(function (application) {
    return application.formStatus == 'pending';
  });
  return filteredClubsForApprovalRecords;
}