function getClubsForApproval(){
  clubApplicationRecords = getClubApplicationRecords();
    let filteredClubsForApprovalRecords = clubApplicationRecords.filter(function (application) {
    return application.formStatus == 'pending' && !application.process;
  });
  return filteredClubsForApprovalRecords;
}