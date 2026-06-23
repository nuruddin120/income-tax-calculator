// ════════════════════════════════════════════════════════
//  IncoTax Solutions — PDF Email Sender + Email Tracker
//  Google Apps Script কোড
//  কাজ: ইমেইলে পিডিএফ পাঠায় এবং Google Sheets-এ ট্র্যাক করে
// ════════════════════════════════════════════════════════

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // প্রথমবার হলে header row বানাও
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Email', 'তারিখ ও সময় (BD)', 'Source URL']);
      sheet.getRange(1,1,1,3)
        .setFontWeight('bold')
        .setBackground('#0b3d2e')
        .setFontColor('#ffffff');
      sheet.setColumnWidth(1,260);
      sheet.setColumnWidth(2,200);
      sheet.setColumnWidth(3,300);
    }

    const data = JSON.parse(e.postData.contents);

    // Bangladesh time
    const bdTime = new Date(data.timestamp || new Date()).toLocaleString('en-BD', {
      timeZone: 'Asia/Dhaka',
      year:'numeric', month:'2-digit', day:'2-digit',
      hour:'2-digit', minute:'2-digit', second:'2-digit'
    });

    // Sheets-এ সেভ করো
    sheet.appendRow([data.email || '', bdTime, data.source || '']);

    // PDF ইমেইলে পাঠাও
    if (data.pdfBase64 && data.email) {
      const pdfBytes = Utilities.base64Decode(data.pdfBase64);
      const filename = data.filename || 'income-tax-report.pdf';
      const pdfBlob  = Utilities.newBlob(pdfBytes, 'application/pdf', filename);

      GmailApp.sendEmail(
        data.email,
        'আপনার আয়কর হিসাব — IncoTax Solutions',
        'আস-সালামু আলাইকুম,\n\n' +
        'আপনার অনুরোধ করা বিস্তারিত আয়কর হিসাব (AY 2026-27 ও 2027-28) এই ইমেইলের সাথে পিডিএফ হিসেবে সংযুক্ত করা হলো।\n\n' +
        'আয়কর রিটার্ন দাখিলে সহায়তার জন্য যোগাযোগ করুন:\n' +
        'WhatsApp: https://wa.me/8801521222707\n' +
        'LinkedIn: https://www.linkedin.com/in/nmahmudcu/\n\n' +
        'ধন্যবাদ,\n' +
        'Md. Nur Uddin Mahmud\n' +
        'Income Tax Practitioner | IncoTax Solutions',
        {
          attachments: [pdfBlob],
          name: 'IncoTax Solutions'
        }
      );
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
