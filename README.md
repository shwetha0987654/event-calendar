# event-calendar
# 📅 Custom Event Calendar – React Assignment

## 🚀 Overview

This is a fully functional, interactive **Event Calendar** web application built using **React**. The application allows users to **add, edit, delete, and manage events**, including support for **recurring events**, **drag-and-drop rescheduling**, **conflict detection**, **event filtering**, **responsive design**, and **persistent localStorage-based storage**.

It was created as part of a frontend assessment and includes **commit history that reflects a real-world development process**.

---

## 🧠 Project Motivation

The goal was to build a dynamic and interactive calendar from scratch that doesn't just look good—but is fully functional, extensible, and meets real-world use cases like scheduling tasks, managing meetings, and supporting repeated patterns like daily standups, weekly reviews, or monthly reminders.

---

## 🔧 Technologies Used

- React (with Hooks)
- date-fns (for date and time handling)
- react-beautiful-dnd (for drag-and-drop)
- react-datepicker (for date/time selection)
- classnames (for dynamic class handling)
- localStorage (for persistent events)
- Google Fonts + Font Awesome (for better visuals)
- CSS Transitions and Animations

---

## 🗂️ Project Structure

event-calendar/
├── public/
│ └── index.html
├── src/
│ ├── assets/ (optional for icons/images)
│ ├── components/
│ │ ├── Calendar.jsx
│ │ ├── DayCell.jsx
│ │ ├── EventItem.jsx
│ │ ├── EventForm.jsx
│ │ └── FilterBar.jsx
│ ├── context/
│ │ └── CalendarContext.jsx
│ ├── styles/
│ │ └── styles.css
│ ├── App.jsx
│ └── index.js
└── README.md

markdown
Copy
Edit

---

## ✨ Features Implemented

### ✅ Core Features
- ✅ **Monthly calendar view**
- ✅ **Add/Edit/Delete events**
- ✅ **Recurrence Support**:
  - Daily
  - Weekly
  - Monthly
  - Custom
- ✅ **Drag and Drop Rescheduling**
- ✅ **Conflict detection**
- ✅ **Persist data using `localStorage`**

### ✅ Bonus / Optional Features
- ✅ Event search and filtering (by title/category)
- ✅ Responsive Design for mobile/tablet
- ✅ Use of icons, modern fonts, and transitions
- ✅ Proper file structuring and modular code

---

## 🔎 How to Use the App

1. Click on a date to **create a new event**.
2. Fill in the event title, time, description, recurrence, and category.
3. Submit to save. Events appear on the calendar.
4. Click on any existing event to **edit or delete**.
5. **Drag and drop** events to other days to reschedule.
6. Use the **search bar** or **filters** to narrow down visible events.

---

## 🧪 How to View and Run the App Locally

### 1. Clone the Repository
```bash
git clone https://github.com/shwetha0987654/event-calendar.git
cd event-calendar
2. Install Dependencies
bash
Copy
Edit
npm install
3. Run the App
bash
Copy
Edit
npm start
This will start a dev server at http://localhost:3000.

🌐 Deployment Instructions
✅ GitHub Pages Deployment
Install GitHub Pages:

bash
Copy
Edit
npm install --save gh-pages
Add this to package.json:

json
Copy
Edit
"homepage": "https://shwetha0987654.github.io/event-calendar",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
Deploy:

bash
Copy
Edit
npm run deploy
Your app will be live at:

🔗 https://shwetha0987654.github.io/event-calendar

✅ Netlify Deployment (Optional)
Go to Netlify.

Click "Add new site" > "Import from GitHub".

Select your repo and choose these settings:

Build Command: npm run build

Publish Directory: build/

Click "Deploy".

🧾 Commit Journey (Tracked & Structured)
✅ Initial Setup: Created base project using Create React App

✅ Calendar UI: Built monthly calendar with date handling

✅ Event Management: Add/edit/delete with modal forms

✅ Recurrence Logic: Implemented rule-based recurrence generation

✅ Drag and Drop: Integrated react-beautiful-dnd with full support

✅ Search and Filter: Live filter by title/category

✅ Mobile View: Fully responsive and tested on mobile

✅ UI Polish: Added animations, font icons, calendar day-buttons

📸 Screenshots
(Include screenshots here if needed)

📦 Future Improvements
Weekly and daily views toggle

iCalendar (.ics) export

Backend database & login support

Sync with Google Calendar

