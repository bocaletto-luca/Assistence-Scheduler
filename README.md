# Assistence Scheduler | WebAPP
#### Author: Bocaletto Luca

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com)
[![FullCalendar](https://img.shields.io/badge/FullCalendar-3788D8?style=for-the-badge&logo=fullcalendar&logoColor=white)](https://fullcalendar.io)

---

## Description

**Assistence Scheduler** is a complete web application for managing appointments and a client agenda. The app enables you to:

- **Manage Events in Three Views:**
  - **Calendar View:** An interactive calendar (powered by FullCalendar) where you can add, edit, and delete events by clicking on a day.  
  - **List View:** Events are displayed as cards and can be filtered via a search field.  
  - **Year View:** Displays 12 mini-calendars (one per month) showing a full grid of days. If multiple events exist on a day, clicking the day opens a modal with the list of events and provides an option to add a new event for that day.

- **Manage Client Agenda:**
  - Add, edit, and delete clients.
  - Each client has: **Client Name**, **Phone Number**, **Address**, and an **Extra** field.
  - The Agenda tab also includes a search field to filter clients.

- **Global Toolbar for Events:**
  - **Add Event**
  - **Export Events** (in JSON and CSV formats)
  - **Import Events** (from JSON)
  - **Print**
  - **Refresh**

- **Local Persistence:**
  - All data—including Events and Agenda—is saved in `localStorage`.

---

## Features

### Event Management
- **Add, Edit, Delete Events:**  
  Use modals to create, update, or remove events.
- **Event Data:**  
  Each event stores a date, appointment time, title, description, and (optionally) client details (if selected from the Agenda).
- **Multiple Views:**  
  Enjoy an interactive Calendar View, a filtered List View, and a visual Year View.

### Client Management (Agenda)
- **Full Client CRUD:**  
  Add, edit, delete, and search your clients.
- **Automatic Client Details:**  
  When creating an event, select a client from a dropdown (populated from your Agenda) so that the client’s phone and address auto-fill.

### Search Functionality
- **Events Search:**  
  Filter events in the List View by title or description.
- **Clients Search:**  
  Filter clients in the Agenda by name, phone number, address, or extra field.

### Import/Export
- **Events and Agenda:**  
  Easily export and import events and client data in both JSON and CSV formats.

### Technologies Used
- **HTML5**
- **CSS3**
- **JavaScript**
- **Bootstrap**
- **FullCalendar**

---

## Installation and Usage

1. **Clone this repository:**
   ```bash
   git clone https://github.com/bocaletto-luca/assistence-scheduler.git
2. Start webserver and open page in browserweb

#### Wnjoy WEBAPP | By Bocaletto Luca
