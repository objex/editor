const {remote} = require('electron');


function setOSTheme() {
    let theme = remote.nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
    window.localStorage.osTheme = theme

    if (window.__setTheme) {
        window.__setTheme();
    }
}

remote.nativeTheme.addListener('updated', setOSTheme);
setOSTheme();
