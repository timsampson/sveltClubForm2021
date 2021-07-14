function logClubApplication(application) {
  let formSubmissionDate = new Date();
  let applicationLogRecord = [
    application.recordId,
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
    application.hasCapacity,
    application.canSubmit,
    application.isApproved,
    application.formState,
    application.received,
    application.hasPendingClub,
    application.pendingClubName,
    application.isInClub,
    application.currentClubId,
    application.currentClubName,
    application.applicationStatus,
    application.processed,
    application.userRole,
    application.isStudent,
    application.isModerator,
    application.message
  ];
  clubApplicationSheet.appendRow(applicationLogRecord);
}