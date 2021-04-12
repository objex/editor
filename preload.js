const {remote} = require('electron');


function setOSTheme() {
    window.localStorage.osTheme = remote.nativeTheme.shouldUseDarkColors ? 'dark' : 'light'

    if (window.__setTheme) {
        window.__setTheme();
    }
}

remote.nativeTheme.addListener('updated', setOSTheme);
setOSTheme();
