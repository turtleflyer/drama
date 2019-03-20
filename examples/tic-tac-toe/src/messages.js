/* eslint-env browser */
const messageContainerStyle = {
  height: '3em',
};

const textMessageStyle = {
  'line-height': '2em',
  'font-style': 'italic',
  color: 'Red',
  'font-size': '1.5em',
};

export const messageContainer = document.createElement('div');
Object.assign(messageContainer.style, messageContainerStyle);

function clearMessages() {
  while (messageContainer.firstChild) {
    messageContainer.removeChild(messageContainer.firstChild);
  }
}

function postTextMessage(str) {
  const message = document.createElement('div');
  message.appendChild(document.createTextNode(str));
  Object.assign(message.style, textMessageStyle);
  clearMessages();
  messageContainer.appendChild(message);
  window.setTimeout(clearMessages, 1500);
}

export default postTextMessage;
