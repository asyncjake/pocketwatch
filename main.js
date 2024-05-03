const { app, BrowserWindow, session, globalShortcut } = require('electron/main');
const path = require('node:path');

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
  const win98 = new BrowserWindow({
    width: 420, // prod
    height: 269, // prod
    // width: 1300, // debug
    // height: 600, // debug
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });
  win98.loadFile('index.html');

  // Register a global shortcut for laps
  let [lapKey, lapSignal] = ['MediaNextTrack', 'lapKey'];
  globalShortcut.register(lapKey, () => {
    win98.webContents.send(lapSignal);
    console.log(`main: ${lapKey} sent ${lapSignal}`);
  });
  // and a global to start tracking
  let [startKey, startSignal] = ['MediaPreviousTrack', 'startKey'];
  globalShortcut.register(startKey, () => {
    win98.webContents.send(startSignal);
    console.log(`main: ${startKey} sent ${startSignal}`);
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
