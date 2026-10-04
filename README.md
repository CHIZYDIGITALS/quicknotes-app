# QuickNotes

QuickNotes is a responsive, browser-based note-taking application designed to help users capture, organize, and search their thoughts efficiently. Built with clean semantic HTML5, modern CSS, and vanilla JavaScript, the app allows users to create notes assigned to specific categories (Personal, Work, Study), search through existing entries dynamically, track overall note counts, and persist data across browser sessions.

## Features

- Create notes with custom category tags (Personal, Work, Study).
- Real-time client-side input validation (limits entries to 200 characters).
- Instant live search filtering based on note text.
- Dynamic note counter and individual note deletion.
- Persistent local storage retention across page reloads.
- Clear All notes feature with browser confirmation prompts.
- Fully responsive design optimized for mobile and desktop viewports.

## How to Run Locally

1. Clone this repository to your local machine:
   ```bash
   git clone (https://github.com/CHIZYDIGITALS/quicknotes-app.git)
   2   Navigate into the project directory:
   cd quicknotes-app
   3   Open index.html directly in your web browser, or launch it using VS Code's Live Server extension.
   ```

What I Learned

1. DOM Manipulation & Safety: Learned how to safely construct and append elements dynamically using document.createElement() and textContent to avoid cross-site scripting (XSS) risks.

2. State & LocalStorage Synchronization: Mastered maintaining state consistency by syncing array data operations in JavaScript memory directly with browser localStorage.

3. Event Handling & User Feedback: Implemented structured event listeners to provide immediate UI updates, custom validation messaging, and action confirmations.
