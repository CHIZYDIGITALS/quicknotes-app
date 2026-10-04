// DOM Element Selectors
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

// Notes Data Array
let notes = [];

// Render Notes to DOM
function render() {
  notesList.textContent = "";

  notes.forEach((note) => {
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

    li.appendChild(contentDiv);
    notesList.appendChild(li);
  });
}

// Add Note Form Event Listener
noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = noteInput.value.trim();

  if (!text) return;

  const newNote = {
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.unshift(newNote);
  render();
  noteInput.value = "";
});
