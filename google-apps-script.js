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
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.email,
      data.role,
      data.lang
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

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Apex Claw Waitlist API' }))
    .setMimeType(ContentService.MimeType.JSON);
}
