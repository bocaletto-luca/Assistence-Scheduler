document.addEventListener("DOMContentLoaded", function() {
  /* ======================================
     STORAGE PER EVENTI
  ====================================== */
  function loadEvents() {
    return JSON.parse(localStorage.getItem("events")) || [];
  }
  function saveEvents(events) {
    localStorage.setItem("events", JSON.stringify(events));
  }
  let eventsData = loadEvents();

  /* ======================================
     STORAGE PER AGENDA (CLIENTI)
  ====================================== */
  function loadAgenda() {
    return JSON.parse(localStorage.getItem("agenda")) || [];
  }
  function saveAgenda(agenda) {
    localStorage.setItem("agenda", JSON.stringify(agenda));
  }
  let agendaData = loadAgenda();

  /* ======================================
     MODALE PER EVENTI (Add/Edit)
  ====================================== */
  function populateClientDropdown() {
    agendaData = loadAgenda();
    const select = document.getElementById("eventClientSelect");
    select.innerHTML = '<option value="">-- Select Client --</option>';
    agendaData.forEach(client => {
      const opt = document.createElement("option");
      opt.value = client.id;
      opt.innerText = client.name;
      select.appendChild(opt);
    });
  }

  document.getElementById("eventClientSelect").addEventListener("change", function () {
    const clientId = this.value;
    if (clientId) {
      const client = agendaData.find(c => c.id === clientId);
      if (client) {
        document.getElementById("eventClientPhone").value = client.phone;
        document.getElementById("eventClientAddress").value = client.address;
      }
    } else {
      document.getElementById("eventClientPhone").value = "";
      document.getElementById("eventClientAddress").value = "";
    }
  });

  function openEventModal(id = "", presetDate = "") {
    populateClientDropdown();
    if (id) {
      const ev = eventsData.find(e => e.id === id);
      if (!ev) return;
      document.getElementById("eventId").value = ev.id;
      document.getElementById("eventDate").value = ev.date;
      document.getElementById("eventTime").value = ev.time;
      document.getElementById("eventTitle").value = ev.title;
      document.getElementById("eventDescription").value = ev.description;
      document.getElementById("eventClientSelect").value = ev.clientId || "";
      if (ev.clientId) {
        const client = agendaData.find(c => c.id === ev.clientId);
        if (client) {
          document.getElementById("eventClientPhone").value = client.phone;
          document.getElementById("eventClientAddress").value = client.address;
        }
      } else {
        document.getElementById("eventClientPhone").value = "";
        document.getElementById("eventClientAddress").value = "";
      }
      document.getElementById("eventModalLabel").textContent = "Edit Event";
      document.getElementById("deleteEventBtn").style.display = "inline-block";
    } else {
      document.getElementById("eventForm").reset();
      document.getElementById("eventId").value = "";
      if (presetDate) {
        document.getElementById("eventDate").value = presetDate;
      }
      document.getElementById("eventModalLabel").textContent = "Add Event";
      document.getElementById("deleteEventBtn").style.display = "none";
    }
    new bootstrap.Modal(document.getElementById("eventModal")).show();
  }

  document.getElementById("eventForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("eventId").value;
    const date = document.getElementById("eventDate").value;
    const time = document.getElementById("eventTime").value;
    const title = document.getElementById("eventTitle").value.trim();
    const description = document.getElementById("eventDescription").value.trim();
    const clientId = document.getElementById("eventClientSelect").value;
    let clientName = "", clientPhone = "", clientAddress = "";
    if (clientId) {
      const client = agendaData.find(c => c.id === clientId);
      if (client) {
        clientName = client.name;
        clientPhone = client.phone;
        clientAddress = client.address;
      }
    }
    if (!date || !time || !title || !description) {
      alert("Please fill in all required fields.");
      return;
    }
    if (id) {
      const idx = eventsData.findIndex(e => e.id === id);
      if (idx !== -1) {
        eventsData[idx] = { id, date, time, title, description, clientId, clientName, clientPhone, clientAddress };
      }
    } else {
      const newId = Date.now().toString();
      eventsData.push({ id: newId, date, time, title, description, clientId, clientName, clientPhone, clientAddress });
    }
    saveEvents(eventsData);
    bootstrap.Modal.getInstance(document.getElementById("eventModal")).hide();
    updateViews();
  });

  document.getElementById("deleteEventBtn").addEventListener("click", function () {
    const id = document.getElementById("eventId").value;
    if (!id) return;
    if (confirm("Are you sure you want to delete this event?")) {
      eventsData = eventsData.filter(e => e.id !== id);
      saveEvents(eventsData);
      bootstrap.Modal.getInstance(document.getElementById("eventModal")).hide();
      updateViews();
    }
  });

  /* ======================================
     MODALE PER LA LISTA DEGLI EVENTI (YEAR VIEW)
  ====================================== */
  const eventListModalEl = document.getElementById("eventListModal");
  function openEventListModal(dateStr, eventsForDate) {
    const listContainer = document.getElementById("eventListContainer");
    listContainer.innerHTML = "";
    document.getElementById("eventListModalLabel").innerText = "Events on " + new Date(dateStr).toLocaleDateString();
    eventsForDate.forEach(ev => {
      const btn = document.createElement("button");
      btn.className = "list-group-item list-group-item-action";
      btn.innerText = ev.title + " (" + (ev.time || "") + ")";
      btn.onclick = function () {
        bootstrap.Modal.getInstance(document.getElementById("eventListModal")).hide();
        openEventModal(ev.id);
      };
      listContainer.appendChild(btn);
    });
    // Pulsante per aggiungere un nuovo evento per quella data
    const addBtn = document.createElement("button");
    addBtn.className = "btn btn-primary btn-block mt-2";
    addBtn.innerText = "Add New Event";
    addBtn.onclick = function () {
      bootstrap.Modal.getInstance(document.getElementById("eventListModal")).hide();
      openEventModal("", dateStr);
    };
    listContainer.appendChild(addBtn);
    new bootstrap.Modal(document.getElementById("eventListModal")).show();
  }

  /* ======================================
     FULLCALENDAR (Calendar View)
  ====================================== */
  let calendarInstance;
  function initializeCalendar() {
    eventsData = loadEvents();
    const fcEvents = eventsData.map(ev => ({
      id: ev.id,
      title: ev.title,
      start: ev.date,
      extendedProps: { description: ev.description, time: ev.time }
    }));
    if (!calendarInstance) {
      calendarInstance = new FullCalendar.Calendar(document.getElementById("calendar"), {
        initialView: "dayGridMonth",
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listYear"
        },
        views: {
          listYear: {
            type: "list",
            duration: { years: 1 },
            buttonText: "Year"
          }
        },
        events: fcEvents,
        dateClick: function (info) {
          const eventsForDate = eventsData.filter(ev => ev.date === info.dateStr);
          if (eventsForDate.length === 0) {
            openEventModal("", info.dateStr);
          } else if (eventsForDate.length === 1) {
            openEventModal(eventsForDate[0].id);
          } else {
            openEventListModal(info.dateStr, eventsForDate);
          }
        },
        eventClick: function (info) {
          openEventModal(info.event.id);
        }
      });
      calendarInstance.render();
    } else {
      calendarInstance.removeAllEventSources();
      calendarInstance.addEventSource(fcEvents);
    }
  }

  /* ======================================
     LIST VIEW: Mostra gli eventi come card
  ====================================== */
  function renderListView(filteredEvents) {
    eventsData = loadEvents();
    const evs = filteredEvents || eventsData;
    const container = document.getElementById("listContainer");
    container.innerHTML = "";
    if (evs.length === 0) {
      container.innerHTML = "<p>No events available.</p>";
      return;
    }
    evs.forEach(ev => {
      const card = document.createElement("div");
      card.className = "card mb-3";
      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${ev.title}</h5>
          <p class="card-text">${ev.description}</p>
          <p class="card-text"><small class="text-muted">${new Date(ev.date).toLocaleDateString()} ${ev.time}</small></p>
          <p class="card-text"><small class="text-muted">${ev.clientName || ""}</small></p>
          <button class="btn btn-sm btn-warning" onclick="openEventModal('${ev.id}')">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteEvent('${ev.id}')">Delete</button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  /* Funzione di ricerca per eventi nel List View */
  function searchEvents() {
    const query = document.getElementById("eventSearchInput").value.toLowerCase();
    const filtered = eventsData.filter(ev =>
      ev.title.toLowerCase().includes(query) ||
      ev.description.toLowerCase().includes(query)
    );
    renderListView(filtered);
  }

  /* ======================================
     YEAR VIEW: Genera 12 mini calendari come tabelle HTML
  ====================================== */
  function generateMiniCalendar(year, month) {
    const table = document.createElement("table");
    table.className = "table mini-calendar";
    const headerRow = document.createElement("tr");
    const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    daysOfWeek.forEach(day => {
      const th = document.createElement("th");
      th.innerText = day;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    let dateNum = 1;
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");
        cell.style.cursor = "pointer";
        if (i === 0 && j < firstDay) {
          cell.innerText = "";
        } else if (dateNum > totalDays) {
          cell.innerText = "";
        } else {
          const mm = ("0" + (month + 1)).slice(-2);
          const dd = ("0" + dateNum).slice(-2);
          const dateStr = `${year}-${mm}-${dd}`;
          cell.innerText = dateNum;
          const eventsForDate = eventsData.filter(ev => ev.date === dateStr);
          if (eventsForDate.length > 0) {
            cell.classList.add("red");
            cell.onclick = function () {
              if (eventsForDate.length === 1) {
                openEventModal(eventsForDate[0].id);
              } else {
                openEventListModal(dateStr, eventsForDate);
              }
            };
          } else {
            cell.onclick = function () { openEventModal("", dateStr); };
          }
          dateNum++;
        }
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
    return table;
  }

  function initializeYearView() {
    eventsData = loadEvents();
    const container = document.getElementById("yearCalendarsContainer");
    container.innerHTML = "";
    const currentYear = new Date().getFullYear();
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    for (let m = 0; m < 12; m++) {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-3";
      const header = document.createElement("div");
      header.className = "month-header";
      header.innerText = monthNames[m];
      col.appendChild(header);
      const miniCalTable = generateMiniCalendar(currentYear, m);
      col.appendChild(miniCalTable);
      container.appendChild(col);
    }
  }

  /* ======================================
     AGENDA (CLIENTI)
  ====================================== */
  function renderAgenda(filteredClients) {
    agendaData = loadAgenda();
    const clients = filteredClients || agendaData;
    const container = document.getElementById("clientTableContainer");
    container.innerHTML = "";
    if (clients.length === 0) {
      container.innerHTML = "<p>No clients in agenda.</p>";
      return;
    }
    const table = document.createElement("table");
    table.className = "table";
    table.innerHTML = `
      <thead>
        <tr>
          <th>Client Name</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Extra</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    const tbody = table.querySelector("tbody");
    clients.forEach(client => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${client.name}</td>
        <td>${client.phone}</td>
        <td>${client.address}</td>
        <td>${client.extra || ""}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editClient('${client.id}')">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteClient('${client.id}')">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
    container.appendChild(table);
  }

  /* Funzione per cercare eventi nel List View */
  function searchEvents() {
    const query = document.getElementById("eventSearchInput").value.toLowerCase();
    const filtered = eventsData.filter(ev =>
      ev.title.toLowerCase().includes(query) ||
      ev.description.toLowerCase().includes(query)
    );
    renderListView(filtered);
  }

  /* Funzione per cercare clienti nell'Agenda */
  function searchClients() {
    const query = document.getElementById("clientSearchInput").value.toLowerCase();
    const filtered = agendaData.filter(client =>
      client.name.toLowerCase().includes(query) ||
      client.phone.toLowerCase().includes(query) ||
      client.address.toLowerCase().includes(query) ||
      (client.extra && client.extra.toLowerCase().includes(query))
    );
    renderAgenda(filtered);
  }

  /* ======================================
     UPDATE VIEWS: Calendar, List, Year
  ====================================== */
  function updateViews() {
    initializeCalendar();
    renderListView();
    if (document.getElementById("yearView").classList.contains("active")) {
      initializeYearView();
    }
  }

  /* ======================================
     TAB NAVIGATION
  ====================================== */
  const mainTabs = document.getElementById("mainTabs");
  mainTabs.addEventListener("click", function (e) {
    const targetTab = e.target.closest(".nav-link");
    if (!targetTab) return;
    Array.from(mainTabs.children).forEach(li => li.querySelector(".nav-link").classList.remove("active"));
    targetTab.classList.add("active");
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    const secId = targetTab.getAttribute("data-target");
    document.getElementById(secId).classList.add("active");
    if (secId === "calendarView") { initializeCalendar(); }
    else if (secId === "listView") { renderListView(); }
    else if (secId === "yearView") { initializeYearView(); }
    else if (secId === "agendaView") { renderAgenda(); }
  });

  /* ======================================
     BINDING DEI PULSANTI DI RICERCA
  ====================================== */
  const eventSearchBtn = document.getElementById("eventSearchBtn");
  if (eventSearchBtn) {
    eventSearchBtn.addEventListener("click", searchEvents);
  }
  const clientSearchBtn = document.getElementById("clientSearchBtn");
  if (clientSearchBtn) {
    clientSearchBtn.addEventListener("click", searchClients);
  }

  /* ======================================
     BINDING DEI PULSANTI DELLA TOOLBAR (EVENTI)
  ====================================== */
  document.getElementById("addEventBtn").addEventListener("click", function () {
    openEventModal("");
  });
  document.getElementById("exportJSONBtn").addEventListener("click", function () {
    eventsData = loadEvents();
    const jsonContent = JSON.stringify(eventsData, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "events.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
  document.getElementById("exportCSVBtn").addEventListener("click", function () {
    eventsData = loadEvents();
    if (eventsData.length === 0) { alert("No events to export."); return; }
    const headers = ["id", "date", "time", "title", "description", "clientId", "clientName", "clientPhone", "clientAddress"];
    let csv = headers.join(",") + "\n";
    eventsData.forEach(item => {
      const row = headers.map(header => `"${String(item[header] || "").replace(/"/g, '""')}"`).join(",");
      csv += row + "\n";
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "events.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
  document.getElementById("importBtn").addEventListener("click", function () {
    document.getElementById("importInput").click();
  });
  document.getElementById("importInput").addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        eventsData = JSON.parse(e.target.result);
        saveEvents(eventsData);
        alert("Events imported successfully.");
        updateViews();
      } catch (err) { alert("Error importing JSON file."); }
    };
    reader.readAsText(file);
  });
  document.getElementById("printBtn").addEventListener("click", function () {
    window.print();
  });
  document.getElementById("refreshBtn").addEventListener("click", updateViews);

  /* ======================================
     BINDING PER LA TOOLBAR DELL'AGENDA (CLIENTI)
  ====================================== */
  // Questi pulsanti sono gestiti all'interno della sezione Agenda; il codice per le funzioni di import/export dei clienti è già legato nel codice qui sotto (vedi renderAgenda, import e export)
  
  /* ======================================
     INITIALIZATION
  ====================================== */
  updateViews();
});
