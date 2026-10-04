// DOM Element Selectors
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// Notes Data Array
let notes = [];

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
  render();
}

// Render Notes to DOM
function render() {
  notesList.textContent = "";
  updateCount(notes.length);

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
  render();
  noteInput.value = "";
});
