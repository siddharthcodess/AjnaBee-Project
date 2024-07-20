const socket = io();

let username = '';
let interests = '';

const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messages = document.getElementById('messages');

const usernameModal = document.getElementById('usernameModal');
const usernameInput = document.getElementById('usernameInput');
const interestsInput = document.getElementById('interestsInput');
const usernameButton = document.getElementById('usernameButton');
const closeButton = document.getElementsByClassName('close')[0];

usernameButton.addEventListener('click', () => {
  username = usernameInput.value.trim();
  interests = interestsInput.value.trim();
  if (username && interests) {
    usernameModal.style.display = 'none';
    document.querySelector('.container').style.display = 'block';
  } else {
    alert('Username and interests cannot be empty');
  }
});

closeButton.onclick = function() {
  usernameModal.style.display = 'none';
  document.querySelector('.container').style.display = 'block';
};

window.onclick = function(event) {
  if (event.target == usernameModal) {
    usernameModal.style.display = 'none';
    document.querySelector('.container').style.display = 'block';
  }
};

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const message = messageInput.value;
  if (message.trim()) {
    socket.emit('chat message', { username, message });
    messageInput.value = '';
  }
}

socket.on('chat message', (data) => {
  const item = document.createElement('div');
  item.innerHTML = `<strong style="color: ${getUsernameColor(data.username)};">${data.username}</strong>: ${data.message}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

function getUsernameColor(username) {
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#e67e22', '#9b59b6'];
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % colors.length);
  return colors[index];
}
