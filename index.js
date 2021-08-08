const {app, Notification, session} = require('electron')
const path = require('path')

const {createWindow} = require('./src/window')
const {createTray}  = require('./src/tray')

const lock = app.requestSingleInstanceLock()

let windowSingleton

//console.log(process.versions);

const dnt = "1";
const secChUa = "Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"";
const secChUaMobile = "?0";
const upgradeInsecureRequests = "1";

const overrideHeaders = () => {
    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['DNT'] = dnt;
        details.requestHeaders['sec-ch-ua'] = secChUa;
        details.requestHeaders['sec-ch-ua-mobile'] = secChUaMobile;
        details.requestHeaders['Upgrade-Insecure-Requests'] = upgradeInsecureRequests;
    
        callback({cancel: false, requestHeaders: details.requestHeaders});
    });
}

const start = () => {
    createWindow().then((window)=>{
        overrideHeaders()
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
