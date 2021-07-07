function logEnrollment(application){ 
  let formSubmissionDate = new Date();
  let logRecord = [
    formSubmissionDate,
    application.email,
    application.name,
    application.school,
    application.grade,
    application.homeroom,
    application.appliedClubId,
    application.appliedClubName,
    application.appliedclubModerator,
    application.appliedClubDescription,
  ];
  let recordId = applicationId(clubApplicationSheet);
  logRecord.unshift(recordId);
  clubApplicationSheet.appendRow(logRecord);
}