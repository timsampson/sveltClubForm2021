function doGet(e) {
  return HtmlService.createTemplateFromFile("index").evaluate();
}
function getScriptURL() {
  return ScriptApp.getService().getUrl();
}
function getEmail() {
  return Session.getActiveUser().getEmail();
}
