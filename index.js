import { app as application } from 'electron';
import { createWindow } from './src/window';
import { createTray } from './src/tray';

const app = application

function start(){
    createWindow().then((window)=>{
        createTray(window,app)
    })
}

app.on('ready', start);
app.on('window-all-closed', () => app.quit());