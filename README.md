# Assistence Scheduler | WebAPP
#### Author: Bocaletto Luca

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com)
[![FullCalendar](https://img.shields.io/badge/FullCalendar-3788D8?style=for-the-badge&logo=fullcalendar&logoColor=white)](https://fullcalendar.io)

Assistence Scheduler è un'applicazione web completa per la gestione di appuntamenti ed agenda clienti. L'app consente di:
  
- **Gestire gli eventi** in tre visualizzazioni:
  - **Calendar View**: Un calendario interattivo (basato su FullCalendar) in cui è possibile aggiungere, modificare ed eliminare eventi.
  - **List View**: Gli eventi sono visualizzati come card e possono essere filtrati tramite un campo di ricerca.
  - **Year View**: Vengono generati 12 mini-calendari (uno per ciascun mese) che mostrano la griglia completa dei giorni; se in un giorno sono presenti più eventi, cliccandolo si apre un modal che mostra la lista degli eventi e consente di aggiungere uno nuovo per quel giorno.
  
- **Gestire l'agenda clienti**:
  - Aggiungi, modifica ed elimina clienti.
  - Ogni cliente possiede: **Client Name, Phone Number, Address,** e un campo **Extra**.
  - Il tab Agenda include anche un campo di ricerca per filtrare i clienti.
  
- **Toolbar globale per gli eventi**:
  - Aggiungi Event
  - Export Events (JSON e CSV)
  - Import Events (JSON)
  - Print
  - Refresh
  
- **Persistenza locale**: Tutti i dati (Eventi e Agenda) vengono salvati in `localStorage`.

---

## Caratteristiche

- **Event Management**
  - Aggiunta, modifica ed eliminazione degli eventi tramite modali.
  - Gli eventi includono data, orario, titolo, descrizione e, opzionalmente, dati del cliente (se selezionato dall'agenda).
  - Interfaccia interattiva con tre visualizzazioni: Calendar View, List View e Year View.

- **Client Management (Agenda)**
  - Gestione completa dei clienti: aggiunta, modifica, eliminazione e ricerca.
  - I clienti vengono utilizzati per compilare automaticamente i dettagli nel modulo per gli eventi.
  
- **Ricerca**
  - Campo di ricerca nella List View per filtrare gli eventi.
  - Campo di ricerca nel tab Agenda per filtrare i clienti.

- **Import/Export**
  - Esportazione ed importazione degli eventi in formato JSON e CSV.
  - Esportazione ed importazione dei clienti (agenda) in formato JSON e CSV.

- **Tecnologie Utilizzate**
  - HTML5, CSS3, JavaScript
  - [Bootstrap](https://getbootstrap.com)
  - [FullCalendar](https://fullcalendar.io)

---

## Installazione e Uso

1. **Clona il repository**
   ```bash
   git clone https://github.com/bocaletto-luca/assistence-scheduler.git
2. Start Webserver and open page in BrowserWeb

#### Enjoy WebAPP | By Bocaletto Luca
