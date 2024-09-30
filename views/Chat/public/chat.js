const socket = io.connect(window.location.href);

const sendButton = document.getElementById('send');
const handle = document.getElementById('handle');
const message = document.getElementById('message');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// Send message to the server
sendButton.addEventListener('click', (e) => {
    if (message.value.trim() === "") return; // Prevent empty messages from being sent
    socket.emit('chat', {
        'handle': handle.value,
        'message': message.value
    });
    message.value = ""; // Clear the input field after sending
    scrollToBottom(); // Auto-scroll to the latest message
});

// Notify server that the user is typing
message.addEventListener('keypress', (e) => {
    socket.emit('typing', {
        'handle': handle.value,
    });
});

// Clear typing feedback when the message is empty
message.addEventListener('change', (e) => {
    if (message.value.trim() === '') {
        socket.emit('clearFeedBack');
    }
});

// Listen for incoming messages from the server
socket.on('chatData', (data) => {
    clearFeedBack();
    // If the message is from you, show it on the right, otherwise on the left
    const isCurrentUser = (data.handle === handle.value);
    output.innerHTML += `<p class="${isCurrentUser ? 'sent' : 'received'}"><strong>${data.handle}: </strong>${data.message}</p>`;
    scrollToBottom(); // Auto-scroll to the latest message
});

// Display typing feedback
socket.on('typingData', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' ..</em></p>';
});

// Clear typing feedback
socket.on('clearFeedBack', () => {
    clearFeedBack();
});

// Function to clear the feedback area
function clearFeedBack() {
    feedback.innerHTML = '';
}

// Scroll to the bottom of the chat window
function scrollToBottom() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
