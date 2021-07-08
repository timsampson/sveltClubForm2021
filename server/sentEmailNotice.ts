function sendapplicationEmail(application) {
  const htmlBody = HtmlService.createTemplateFromFile("welcome-mail");
  htmlBody.stuName = application.name;
  htmlBody.clubName = application.appliedClubName;
  htmlBody.clubDetails = application.appliedClubDetails;
  htmlBody.clubModerator = application.appliedclubModerator;
  htmlBody.message = application.message;
  const emailHtml = htmlBody.evaluate().getContent();
  const email = application.email;
  let welcomeMessage = `Notice for your application to the ${application.appliedClubName} club!`;
  MailApp.sendEmail({
    // cc: ccEmail,
    htmlBody: emailHtml,
    subject: welcomeMessage,
    to: email,
  });
}
