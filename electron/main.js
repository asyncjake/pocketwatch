const { app, BrowserWindow, session, globalShortcut, ipcMain } = require('electron');
const path = require('node:path');

function setupWindow() {
  // Shortcuts (global) for hotkeys
  globalShortcut.register('j', () => {
    // const lapButton = document.getElementById('lap');
    // lapButton.click();
    // Send event to renderer process
    BrowserWindow.getFocusedWindow().webContents.send('starttimer');
    console.log('Lap!')
  })
  /*
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const finishButton = document.getElementById('finish');
const copyButton = document.getElementById('copyButton');
const showLapsButton = document.getElementById('showlaps');
   */
  globalShortcut.register('Alt+CommandOrControl+O', () => {
    showModal();
    console.log('Electron loves global shortcuts!')
  })
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
  const win = new BrowserWindow({
    width: 420,
    height: 269,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
      nodeIntegration: true
    }
  });
  win.loadFile('index.html');
};

app.whenReady().then(setupWindow);

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
