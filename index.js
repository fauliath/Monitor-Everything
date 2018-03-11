// this is the entry point of the application
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

// global window
let win;

function createWindow() {
    // create new window
    win = new BrowserWindow({
        width: 800,
        height: 600
    });

    // open index.html
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    // open tools
    // win.webContents.openDevTools();

    // when the window closes
    win.on('close', () => {
        win = null;
    });
}

// run
app.on('ready', createWindow);

// close on Windows
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
