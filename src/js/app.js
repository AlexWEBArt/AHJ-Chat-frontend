import SubscriptionApi from "./SubscriptionApi";

import RenderModal from "./RenderModal";

const port = 7070;

window.api = new SubscriptionApi(`http://localhost:${port}/`);

const container = document.querySelector('.app-container');
const render = new RenderModal(container, port);

render.enterUser();
