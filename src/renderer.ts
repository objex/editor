import {renderApp} from "./components";

const app = renderApp();

document.getElementById('app').appendChild(app);

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
