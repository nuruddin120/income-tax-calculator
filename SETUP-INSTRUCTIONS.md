# Google Sheets Email Collector — Setup নির্দেশনা

## মোট সময়: ৫–৭ মিনিট

---

## ধাপ ১ — Google Sheets তৈরি করুন

1. https://sheets.google.com এ যান
2. নতুন একটা blank spreadsheet তৈরি করুন
3. নাম দিন: **IncoTax Email List**
4. Browser-এর URL থেকে Sheet ID কপি করুন (পরে লাগবে না, তবে রেখে দিন)

---

## ধাপ ২ — Apps Script খুলুন

1. Spreadsheet-এর মেনু থেকে: **Extensions → Apps Script**
2. নতুন একটা window খুলবে
3. বাম দিকে `Code.gs` ফাইলটা দেখবেন

---

## ধাপ ৩ — কোড বসান

1. `Code.gs` ফাইলের সব পুরনো কোড মুছে দিন
2. `google-apps-script.gs` ফাইলের সম্পূর্ণ কোড paste করুন
3. **Ctrl+S** চাপুন (Save)
4. Project-এর নাম দিন: **IncoTax Email Collector**

---

## ধাপ ৪ — Web App হিসেবে Deploy করুন

1. উপরে ডান দিকে **Deploy** বাটনে ক্লিক করুন
2. **New deployment** বেছে নিন
3. Gear আইকনে ক্লিক করে **Web app** বেছে নিন
4. নিচের settings দিন:
   - **Description:** Email Collector v1
   - **Execute as:** Me (আপনার Gmail)
   - **Who has access:** Anyone ← এটা গুরুত্বপূর্ণ!
5. **Deploy** বাটনে ক্লিক করুন
6. Google Permission চাইলে **Authorize access** দিন
7. Deploy হলে একটা **Web app URL** দেখাবে — এটা কপি করুন

URL এরকম দেখাবে:
```
https://script.google.com/macros/s/AKfycb.../exec
```

---

## ধাপ ৫ — Calculator-এ URL বসান

1. `index.html` ফাইলটা খুলুন
2. এই লাইনটা খুঁজুন:
   ```javascript
   const APPS_SCRIPT_URL = 'PASTE_YOUR_APPS_SCRIPT_URL_HERE';
   ```
3. URL-টা বসান:
   ```javascript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
   ```
4. ফাইল সেভ করুন
5. GitHub-এ `index.html` replace করুন

---

## ধাপ ৬ — Test করুন

1. Calculator-এর URL-এ যান
2. Email দিয়ে Submit করুন
3. Google Sheets-এ দেখুন — নতুন row যোগ হয়েছে কিনা

---

## Excel-এ Export করবেন যেভাবে

Google Sheets → **File → Download → Microsoft Excel (.xlsx)**

---

## গুরুত্বপূর্ণ নোট

- একই ব্রাউজার থেকে দ্বিতীয়বার ঢুকলে আর gate দেখাবে না (localStorage-এ সেভ থাকে)
- কেউ incognito mode বা নতুন browser ব্যবহার করলে আবার email দিতে হবে
- Apps Script-এর free limit: প্রতিদিন ২০,০০০ submission — আপনার জন্য যথেষ্ট
