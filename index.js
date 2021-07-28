const {app, Notification} = require('electron')
const path = require('path')

const {createWindow} = require('./src/window')
const {createTray}  = require('./src/tray')

const lock = app.requestSingleInstanceLock()

let windowSingleton

const start = () => {
    createWindow().then((window)=>{
        if(!lock){
            showNotification()
        }
        windowSingleton = window
        createTray(window,app)
        preventDestroy(window)
    })
}

const showNotification = () => {
    let icon = path.join(__dirname, './resources/icon48.png')
    let title = "WhatApp"
    let body = "Couldn't achieve SingleInstanceLock,\n" +
        "so there may be more than one instance created!\n" +
        "In that case, you have to close them manually"
    const notification={
        title,
        body,
        icon
    }
    new Notification(notification).show()
}

const preventDestroy = (window) => {
    window.on('close', function (event) {
        event.preventDefault()
        window.hide()
        return false
    })
}

app.on('ready', start)
app.on('second-instance', () => {
    if(windowSingleton){
        windowSingleton.focus()
    }
})
app.on('window-all-closed', () => app.quit())
