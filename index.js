const { app } = require('electron')
import { createWindow } from './src/window';
import {createTray} from './src/tray';

function start(){
    createWindow().then((window)=>{
        createTray(window,app)
    })
}

app.on('ready', start);
app.on('window-all-closed', () => app.quit());