// DOM Element Selectors
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all-btn");

// Notes Data Array
let notes = [];

// Load Notes from localStorage on App Load
function loadNotes() {
  const stored = localStorage.getItem("quicknotes_data");
  if (stored) {
    notes = JSON.parse(stored);
  }
  render();
}

// Save Notes to localStorage
function saveNotes() {
  localStorage.setItem("quicknotes_data", JSON.stringify(notes));
}

// Update Note Counter Display
function updateCount(count) {
  if (count === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (count === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}

// Delete Individual Note
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render(searchInput.value);
}

// Clear All Notes with Confirmation (Bonus Feature)
function clearAllNotes() {
  if (notes.length === 0) return;

  const confirmed = confirm("Delete all notes?");
  if (confirmed) {
    notes = [];
    saveNotes();
    render();
  }
}

// Render Notes to DOM
function render(searchTerm = "") {
  notesList.textContent = "";

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );

  updateCount(notes.length);

  if (filteredNotes.length === 0 && searchTerm.trim() !== "") {
    const noResultsLi = document.createElement("li");
    noResultsLi.style.color = "#6b7280";
    noResultsLi.style.padding = "1rem 0";
    noResultsLi.textContent = "No notes match your search.";
    notesList.appendChild(noResultsLi);
    return;
  }

  filteredNotes.forEach((note) => {
    const li = document.createElement("li");
    li.className = `note-card category-${note.category.toLowerCase()}`;

    const contentDiv = document.createElement("div");

    const catSpan = document.createElement("div");
    catSpan.className = "category-tag";
    catSpan.textContent = note.category;

    const textP = document.createElement("p");
    textP.textContent = note.text;

    const dateSpan = document.createElement("div");
    dateSpan.className = "note-date";
    dateSpan.textContent = note.createdAt;

    contentDiv.appendChild(catSpan);
    contentDiv.appendChild(textP);
    contentDiv.appendChild(dateSpan);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });
}

// Add Note Form Event Listener
noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = noteInput.value.trim();

  // Validation
  if (!text) {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const newNote = {
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.unshift(newNote);
  saveNotes();
  render(searchInput.value);
  noteInput.value = "";
});

// Search Input Listener
searchInput.addEventListener("input", (e) => {
  render(e.target.value);
});

// Clear All Button Listener
clearAllBtn.addEventListener("click", clearAllNotes);

// App Initialization
document.addEventListener("DOMContentLoaded", loadNotes);
