const socket = io();

const nameInput = document.getElementById("nameInput");
const joinBtn = document.getElementById("joinBtn");

const chatArea = document.getElementById("chatArea");
const messagesDiv = document.getElementById("messages");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");

let username = "";

joinBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (!name) {
    alert("Please enter your name.");
    return;
  }
  username = name;
  chatArea.classList.remove("hidden");
  document.querySelector(".join").classList.add("hidden");
  messageInput.focus();
});

// Send message
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = messageInput.value.trim();
  if (!msg) return;

  socket.emit("chatMessage", { name: username, message: msg });
  messageInput.value = "";
});

// Receive message
socket.on("chatMessage", (data) => {
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `<strong>${escapeHtml(data.name)}:</strong> ${escapeHtml(data.message)}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

function escapeHtml(str) {
  return str.replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[m],
  );
}
