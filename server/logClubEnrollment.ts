function logClubEnrollment(application) {
  // id	updateTime	email	student_name	school	grade	homeroom	club_id	club_name	moderator	description
  let formSubmissionDate = new Date();
  let enrollmentLogRecord = [
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
    application.appliedClubLocation,
  ];
  clubEnrollmentSheet.appendRow(enrollmentLogRecord);
}
