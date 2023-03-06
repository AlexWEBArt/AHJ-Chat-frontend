import getCreationDate from "./getCreationDate";

export default class Chat {
    constructor(container, port, activeUser) {
        this.container = container;
        this.port = port;
        this.activeUser = activeUser;
    }

    renderConnectionUser(user) {
        const connectionContainer = document.querySelector('.connection-container');

        const connectionRaw = document.createElement('UL')
        const liPreview = document.createElement('LI')
        const connectionPreview = document.createElement('DIV');
        const liUser = document.createElement('LI');
        const connectionUser = document.createElement('P');

        
        connectionRaw.classList.add('connection-raw');
        connectionPreview.classList.add('connection-prewiew');
        connectionUser.classList.add('connection-user');

        if (user === this.activeUser) {
          connectionUser.classList.add('you');
          connectionUser.textContent = user + ' (You)';
        } else {
          connectionUser.textContent = user;
        }

        connectionContainer.appendChild(connectionRaw);
        connectionRaw.append(liPreview);
        liPreview.append(connectionPreview);
        connectionRaw.append(liUser);
        liUser.append(connectionUser);
    }

    renderChat() {
        const connectionContainer = document.createElement('DIV');

        const chatContainer = document.createElement('DIV');
        const chat = document.createElement('DIV');
        const chatSend = document.createElement('FORM');
        const chatMessage = document.createElement('INPUT');

        chatContainer.classList.add('chat-container');
        chat.classList.add('chat');
        chatSend.classList.add('chat-send');
        chatMessage.classList.add('chat-message');

        chatMessage.placeholder = 'Type some text'

        this.container.appendChild(chatContainer);
        chatContainer.append(chat);
        chatSend.append(chatMessage)
        chatContainer.append(chatSend);

        connectionContainer.classList.add('connection-container');
        this.container.appendChild(connectionContainer);

        this.messaging();

        window.api.activeUser().then(result => {
          if (result) {
              result.forEach(item => {
                  this.renderConnectionUser(item.nickname)
              })
          }
        })

        this.gettingUsers();
    }

    renderMessage(autor, text) {
      const chat = document.querySelector('.chat');

      const boxMessage = document.createElement('DIV');
      const information = document.createElement('SPAN');
      const message = document.createElement('P');

      boxMessage.classList.add('message-container');
      information.classList.add('message-information');
      message.classList.add('message-text');

      const dateCreate = getCreationDate();

      if (autor === this.activeUser) {
        boxMessage.classList.add('right-align')
        information.classList.add('you')
        information.textContent = autor + ' (You)' + ', ' + dateCreate;
        message.textContent = text;
      } else {
        information.textContent = autor + ', ' + dateCreate;
        message.textContent = text;
      }

      chat.appendChild(boxMessage);
      boxMessage.append(information);
      boxMessage.append(message);
    }

    gettingUsers() {
      const eventSource = new EventSource(`http://localhost:${this.port}/sse`);

      eventSource.addEventListener('open', (e) => {
        console.log(e);
  
        console.log('sse open');
      });

      eventSource.addEventListener('error', (e) => {
        console.log(e);
  
        console.log('sse error');
      });

      eventSource.addEventListener('message', (e) => {
        console.log(e);
        
        const { nickname } = JSON.parse(e.data);

        this.renderConnectionUser(nickname)

        console.log('sse message');
      });
    }

    messaging() {
        const ws = new WebSocket(`ws://localhost:${this.port}/ws`);

        const chatMessage = document.querySelector('.chat-message');
        const chatSend = document.querySelector('.chat-send');

        chatSend.addEventListener('submit', (e) => {
          e.preventDefault();

          let message = {};
          
          message.autor = this.activeUser
          message.text = chatMessage.value

          if (!message) return;
          
          ws.send(JSON.stringify(message));
          
          chatMessage.value = '';
        });
        
        ws.addEventListener('open', (e) => {
          console.log(e);
          
          console.log('ws open');
        });
        
        ws.addEventListener('close', (e) => {
          console.log(e);

          console.log('ws close');
        });
        
        ws.addEventListener('error', (e) => {
          console.log(e);
          
          console.log('ws error');
        });
        
        ws.addEventListener('message', (e) => {
          const data = JSON.parse(e.data);
          const { chat: messages } = data;

          messages.forEach(message => {
            const autor = JSON.parse(message).autor;
            const text = JSON.parse(message).text;

            this.renderMessage(autor, text);
          });
          
          console.log('ws message');
        });
    }
}