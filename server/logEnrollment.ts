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
    application.appliedClubDetails,
    application.appliedClubLocation,
  ];
  let recordId = applicationId(clubEnrollmentSheet);
  logRecord.unshift(recordId);
  clubEnrollmentSheet.appendRow(logRecord);
}