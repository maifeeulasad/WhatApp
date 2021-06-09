import { app } from 'electron'
import { createWindow } from './src/Window';

app.on('ready', createWindow);
app.on('window-all-closed', () => app.quit());