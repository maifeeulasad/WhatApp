const { app , screen, BrowserWindow } = require('electron')
const url = 'https://web.whatsapp.com/';

function whatApp() {
    const window = new BrowserWindow({
        width: screen.width,
        height: screen.height,
        webPreferences: {
            devTools: false,
        },
    });
    window.setMenuBarVisibility(false);

    window.loadURL(url).then();

    return window;
}

app.on('ready', whatApp);
app.on('window-all-closed', () => app.quit());