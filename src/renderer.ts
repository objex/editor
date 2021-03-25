import {mountTabs, renderAppBar, addTab} from "./components";

const tabs$ = mountTabs();
const app = renderAppBar({tabs$});

document.getElementById('app').appendChild(app);

tabs$.subscribe();
addTab({name: "Home", closable: false});
