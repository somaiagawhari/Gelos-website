// Simple Chatbot for Gelos website
// This script creates a floating chat button and chat window.

// Immediately invoked function expression to avoid polluting global scope
(function () {
  // Inject basic CSS styles for chat widget
  const style = document.createElement('style');
  style.textContent = `
    #chatbot-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #007BFF;
      color: #ffffff;
      border: none;
      cursor: pointer;
      font-size: 14px;
      z-index: 1000;
    }
    #chatbot-container {
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 300px;
      height: 400px;
      background-color: #ffffff;
      border: 1px solid #ccc;
      border-radius: 8px;
      display: none;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      z-index: 1000;
      font-family: sans-serif;
    }
    #chatbot-header {
      padding: 8px 12px;
      background-color: #007BFF;
      color: #ffffff;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    #chatbot-header button {
      background: transparent;
      border: none;
      color: #ffffff;
      font-size: 16px;
      cursor: pointer;
    }
    #chatbot-messages {
      flex: 1;
      padding: 10px;
      overflow-y: auto;
      font-size: 14px;
    }
    .chatbot-message {
      margin-bottom: 8px;
      line-height: 1.4;
    }
    .chatbot-message.bot {
      color: #333333;
    }
    .chatbot-message.user {
      text-align: right;
      color: #007BFF;
    }
    #chatbot-input {
      display: flex;
      border-top: 1px solid #ccc;
    }
    #chatbot-input input {
      flex: 1;
      padding: 8px;
      border: none;
      outline: none;
      font-size: 14px;
    }
    #chatbot-input button {
      background-color: #007BFF;
      color: #ffffff;
      border: none;
      padding: 8px 12px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // Function to generate bot response based on simple rules
  function getBotResponse(message) {
    const msg = message.toLowerCase();
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return 'Hello! How can I help you today?';
    }
    if (msg.includes('product') || msg.includes('services')) {
      return 'You can find more information about our offerings under the Offerings section of the website.';
    }
    if (msg.includes('contact')) {
      return 'Please visit our Contact Us page for ways to get in touch with us.';
    }
    return "I’m sorry, I am a simple assistant and may not understand everything. Please try another query or use the Contact Us page.";
  }

  // Create chat container elements
  const container = document.createElement('div');
  container.id = 'chatbot-container';
  container.setAttribute('aria-label', 'Chatbot');
  container.setAttribute('role', 'dialog');

  const header = document.createElement('div');
  header.id = 'chatbot-header';
  header.textContent = 'Chat';
  const closeBtn = document.createElement('button');
  closeBtn.setAttribute('aria-label', 'Close chat');
  closeBtn.textContent = '×';
  header.appendChild(closeBtn);
  container.appendChild(header);

  const messages = document.createElement('div');
  messages.id = 'chatbot-messages';
  container.appendChild(messages);

  const inputWrapper = document.createElement('div');
  inputWrapper.id = 'chatbot-input';
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('aria-label', 'Type your message');
  inputWrapper.appendChild(input);
  const sendBtn = document.createElement('button');
  sendBtn.textContent = 'Send';
  sendBtn.setAttribute('aria-label', 'Send message');
  inputWrapper.appendChild(sendBtn);
  container.appendChild(inputWrapper);

  // Append chatbot container to body
  document.body.appendChild(container);

  // Create toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'chatbot-toggle';
  toggleBtn.setAttribute('aria-label', 'Open chat');
  toggleBtn.textContent = 'Chat';
  document.body.appendChild(toggleBtn);

  // Helper to append user/bot messages
  function appendMessage(text, sender) {
    const msgEl = document.createElement('div');
    msgEl.classList.add('chatbot-message');
    msgEl.classList.add(sender);
    msgEl.textContent = text;
    messages.appendChild(msgEl);
    messages.scrollTop = messages.scrollHeight;
  }

  // Send user message and generate bot response
  function sendMessage() {
    const userMsg = input.value.trim();
    if (!userMsg) return;
    appendMessage(userMsg, 'user');
    input.value = '';
    setTimeout(() => {
      const response = getBotResponse(userMsg);
      appendMessage(response, 'bot');
    }, 500);
  }

  // Event listeners
  toggleBtn.addEventListener('click', () => {
    const isOpen = container.style.display === 'flex';
    if (isOpen) {
      container.style.display = 'none';
      toggleBtn.setAttribute('aria-label', 'Open chat');
    } else {
      container.style.display = 'flex';
      toggleBtn.setAttribute('aria-label', 'Close chat');
    }
  });

  closeBtn.addEventListener('click', () => {
    container.style.display = 'none';
    toggleBtn.setAttribute('aria-label', 'Open chat');
  });

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
})();
