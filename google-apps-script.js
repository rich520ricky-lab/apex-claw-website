/**
 * Google Apps Script for Apex Claw Waitlist
 * 
 * Setup Instructions:
 * 1. Open Google Sheets → create a new spreadsheet
 * 2. Name it "Apex Claw Waitlist"
 * 3. In row 1, add headers: Timestamp | Email | Role | Language
 * 4. Go to Extensions → Apps Script
 * 5. Paste this entire code and save
 * 6. Click "Deploy" → "New deployment"
 * 7. Select type: "Web app"
 * 8. Set "Execute as": Me
 * 9. Set "Who has access": Anyone
 * 10. Click "Deploy" and copy the URL
 * 11. Replace 'REPLACE_WITH_YOUR_APPS_SCRIPT_URL' in index.html with this URL
 *
 * IMPORTANT: After updating this code, you must redeploy:
 * Deploy → Manage deployments → Edit (pencil icon) → Version: New version → Deploy
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Read from form parameters (application/x-www-form-urlencoded)
    var timestamp = e.parameter.timestamp || new Date().toISOString();
    var email = e.parameter.email;
    var role = e.parameter.role;
    var lang = e.parameter.lang;

    // Fallback: try JSON body if form parameters are empty
    if (!email && e.postData && e.postData.contents) {
      var data = JSON.parse(e.postData.contents);
      timestamp = data.timestamp || timestamp;
      email = data.email;
      role = data.role;
      lang = data.lang;
    }

    if (!email) {
      throw new Error("No email received");
    }

    sheet.appendRow([timestamp, email, role, lang]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Also support GET requests with query parameters
  if (e.parameter && e.parameter.email) {
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      sheet.appendRow([
        e.parameter.timestamp || new Date().toISOString(),
        e.parameter.email,
        e.parameter.role,
        e.parameter.lang
      ]);
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Apex Claw Waitlist API' }))
    .setMimeType(ContentService.MimeType.JSON);
}
