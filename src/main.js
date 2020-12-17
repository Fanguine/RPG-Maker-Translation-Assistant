const { app, dialog, ipcMain, BrowserWindow } = require('electron');

ipcMain.on('selectGameFolder', (event) => {
    const gameFolderPath = dialog.showOpenDialogSync({ properties: ['openDirectory', 'dontAddToRecent'] })[0];
    event.sender.send('setGameFolderPathLabel', gameFolderPath);
});

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('./public/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    app.quit();
});