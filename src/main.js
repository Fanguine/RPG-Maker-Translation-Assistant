const { app, dialog, ipcMain } = require('electron');
const Window = require('./window.js');

ipcMain.on('selectGameFolder', (event) => {
    const gameFolderPath = dialog.showOpenDialogSync({ properties: ['openDirectory', 'dontAddToRecent'] })[0];
    if (gameFolderPath) {
        event.sender.send('setGameFolderPathLabel', gameFolderPath);
    }
});

function main () {
    const mainWindow = new Window({
        file: './public/index.html'
    });
};

app.whenReady().then(main);

app.on('window-all-closed', () => {
    app.quit();
});