const { app , screen, BrowserWindow } = require('electron')

const url = 'https://web.whatsapp.com/';
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36';

export function createWindow() {
    const window = new BrowserWindow({
        width: screen.width,
        height: screen.height,
        webPreferences: {
            devTools: false,
        },
    });
    window.setMenuBarVisibility(false);
    window.maximize();

    window.loadURL(url,{userAgent}).then();

    return window;
}