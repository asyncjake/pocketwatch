const { app, BrowserWindow, session, globalShortcut } = require('electron');
const path = require('node:path');

function setupWindow() {
  // Shortcuts (global) for hotkeys
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
      contextIsolation: true
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
