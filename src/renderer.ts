import { renderApp } from "./components";
import { loadMarkdownParser } from './pyodide';
import {mountPreview} from "./preview";

import './menu';

const app = renderApp();

document.getElementById('app').appendChild(app);

loadMarkdownParser().then(() => {
    mountPreview(window.model)
});

window.__setTheme = () => {
    console.log("HERE1")
    if (window.monaco) {
        if (window.localStorage.getItem('osTheme') === 'dark') {
            console.log("HERE2")
            window.monaco.editor.setTheme('github-dark');
        } else {
            console.log("HERE3")
            window.monaco.editor.setTheme('github-light');
        }
    }
}
