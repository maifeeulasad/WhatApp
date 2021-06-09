const { app } = require('electron')
import { createWindow } from './src/window';
import {createTay} from './src/tray';

function start(){
    createWindow().then((window)=>{
        createTay(window,app)
    })
}

app.on('ready', start);
app.on('window-all-closed', () => app.quit());