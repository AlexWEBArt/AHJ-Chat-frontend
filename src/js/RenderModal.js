import Chat from "./Chat";

export default class RenderModal {
    constructor(container, port) {
        this.container = container;
        this.port = port;
    }

    enterUser() {
        const modalContainer = document.createElement('DIV');
        const titleModal = document.createElement('H1');
        const formModal = document.createElement('FORM');
        const inputModal = document.createElement('INPUT');
        const buttonModal = document.createElement('BUTTON');
        
        modalContainer.classList.add('modal-container');
        titleModal.classList.add('modal-title');
        formModal.classList.add('modal-form')
        inputModal.classList.add('modal-input');
        buttonModal.classList.add('modal-button');
        
        titleModal.textContent = 'Выберите псевдоним';
        buttonModal.textContent = 'Продолжить';
        
        this.container.appendChild(modalContainer);
        modalContainer.append(titleModal);
        formModal.append(inputModal);
        formModal.append(buttonModal);
        modalContainer.append(formModal);

        formModal.addEventListener('submit', (e) => {
            e.preventDefault();

            const nickname = inputModal.value;
            
            const chat = new Chat(this.container, this.port, nickname);
            
            window.api.add( { nickname } ).then(result => {
                if (result) {
                    modalContainer.classList.add('display-none');
                    chat.renderChat()
                }
            })

        })
    }
}