const { app, dialog, ipcMain } = require('electron');
const fs = require('fs');
const Window = require('./window.js');

let mainWindow = null;
let gameFolderPath = null;
let dataFolderPath = null;

ipcMain.on('minimizeProgram', (event) => {
    mainWindow.minimize();
});

ipcMain.on('maximizeProgram', (event) => {
    const windowIsMaximized = mainWindow.isMaximized();
    if (windowIsMaximized) {
        mainWindow.unmaximize();
    } else {
        mainWindow.maximize();
    }
    event.sender.send('setMaximizeWindowIcon', windowIsMaximized);
});

ipcMain.on('closeProgram', (event) => {
    app.quit();
});

ipcMain.on('selectGameFolder', (event) => {
    gameFolderPath = dialog.showOpenDialogSync({ properties: ['openDirectory', 'dontAddToRecent'] });
    if (gameFolderPath) {
        dataFolderPath = gameFolderPath[0] + '/www/data';
        if (fs.existsSync(dataFolderPath)) {
            const dataFilePaths = fs.readdirSync(dataFolderPath);
            if (dataFilePaths.length > 0) {
                event.sender.send('setGameFolderPathLabel', "Selected game folder: " + gameFolderPath);
            }
        }
    }
});

ipcMain.on('removeGameFolder', (event) => {
    gameFolderPath = null;
    dataFolderPath = null;
});

ipcMain.on('decryptDataFiles', (event) => {
    const decryptionKey = getDecryptionKey();
    console.log(decryptionKey);
});


function getDecryptionKey() {

};

function main () {
    mainWindow = new Window({
        file: './public/index.html'
    });
};

app.whenReady().then(main);