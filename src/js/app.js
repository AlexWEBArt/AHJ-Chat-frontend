import RenderModal from './RenderModal';

import background from '../img/cell.jpg';

document.querySelector('body').style.backgroundImage = `url(${background})`;

const container = document.querySelector('.app-container');
const render = new RenderModal(container);

render.enterUser();
