function getClubsForApproval(){
    let filteredClubsForApprovalRecords = clubApplicationRecords.filter(function (application) {
     return application.formStatus == 'pending' && !(application.processed === 'TRUE');
  });
  return filteredClubsForApprovalRecords;
}