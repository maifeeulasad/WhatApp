import { Tray, Menu} from 'electron';
import * as path from 'path';

export function createTray(window, app) {
    const tray = new Tray(path.join(__dirname, '../resources/icon48.png'))
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '@ Front',click(){
                window.show();
            }
        },
        { type: 'separator' },
        {
            label: 'Exit' , click(){
                app.quit();
            }
        }
    ])
    tray.setToolTip('WhatApp')
    tray.setTitle('WhatApp')
    tray.setContextMenu(contextMenu)
}