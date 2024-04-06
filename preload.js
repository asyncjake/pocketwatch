const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('pocketwatch', {
  // EXAMPLE FROM DOCS FOR MAIN -> RENDERER (global hotkeys, consumed by design! sick!)
  //    Expose a func that takes a cb and listens to a message, then runs the callback
  //    Define the callback in renderer like window.pocketwatch.onUpdateCounter((val) => doThings())
  //    Fire the message from main using appWindow.webContents.send('update-counter', 1)
  // onUpdateCounter: (callback) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),
  onStartKey: (callback) => ipcRenderer.on('startKey', (_event, value) => callback(value)),
  onPauseKey: (callback) => ipcRenderer.on('pauseKey', (_event, value) => callback(value)),
  onFinishKey: (callback) => ipcRenderer.on('finishKey', (_event, value) => callback(value)),
  onLapKey: (callback) => ipcRenderer.on('lapKey', (_event, value) => callback(value)),
  // EXAMPLE FOR RENDERER->MAIN
  //    renderer can await window.pocketwatch.saveTimes(), main can listen with ipcMain.handle('dialog:saveTimes', asyncClosure)
  // saveTimes: () => ipcRenderer.invoke('dialog:saveTimes')
});
console.log('preload complete!');