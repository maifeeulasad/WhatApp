const {app} = require('electron')
const {createWindow} = require('./src/window')
const {createTray}  = require('./src/tray')

const start = () => {
    createWindow().then((window)=>{
        createTray(window,app)
    })
}

app.on('ready', start)
app.on('window-all-closed', () => app.quit())
