import { app as application } from 'electron';
import { createWindow } from './src/window';
import { createTray } from './src/tray';

function init() {
    const app = application

    app.on('ready', ()=>{
        createWindow().then((window)=>{
            createTray(window,app)
        })
    });
    app.on('window-all-closed', () => app.quit());
}

init()