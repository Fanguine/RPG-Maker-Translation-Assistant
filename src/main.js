const { app, dialog, ipcMain } = require('electron');
const fs = require('fs');
const Window = require('./window.js');

ipcMain.on('selectGameFolder', (event) => {
    const gameFolderPath = dialog.showOpenDialogSync({ properties: ['openDirectory', 'dontAddToRecent'] });
    if (gameFolderPath) {
        const dataFolderPath = gameFolderPath[0] + '/www/data';
        if (fs.existsSync(dataFolderPath)) {
            const dataFilePaths = fs.readdirSync(dataFolderPath);
            if (dataFilePaths.length > 0) {
                event.sender.send('setGameFolderPathLabel', gameFolderPath);
            }
        }
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