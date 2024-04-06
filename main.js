const { app, BrowserWindow, session, globalShortcut } = require('electron/main');
const path = require('node:path');

let appWindow = undefined;

app.whenReady().then(() => {
  // CSP setup
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["script-src 'self'"]
      }
    })
  });
  // Build actual window
  appWindow = new BrowserWindow({
    // width: 420, // prod
    // height: 269, // prod
    width: 1000, // debug
    height: 600, // debug
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });
  appWindow.loadFile('index.html');

  // Register a global shortcut for the - key
  globalShortcut.register('-', () => {
    appWindow.webContents.send('lapKey'),
    console.log('main: lapkey sent');
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('will-quit', () => {
  // Unregister all shortcuts
  globalShortcut.unregisterAll()
})
