const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const messagesContainer = document.getElementById("chat-messages");

if (form && input && messagesContainer) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    // For now, just add it as a new user bubble.
    const row = document.createElement("div");
    row.className = "message-row user";

    const bubble = document.createElement("div");
    bubble.className = "message-bubble user-bubble";
    bubble.innerHTML = `<p>${text}</p>`;

    row.appendChild(bubble);
    // Fake avatar for now
    const avatar = document.createElement("div");
    avatar.className = "avatar avatar-user-small";
    avatar.textContent = "M";
    row.appendChild(avatar);

    messagesContainer.appendChild(row);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    input.value = "";
  });
}