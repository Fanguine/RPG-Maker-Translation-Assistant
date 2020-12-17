const { ipcRenderer } = require('electron');

const gameFolderPathLabel = document.getElementById('gameFolderPathLabel');

document.getElementById('selectGameFolderButton').onclick = (event) => {
    ipcRenderer.send('selectGameFolder');
};

ipcRenderer.on('setGameFolderPathLabel', (event, gameFolderPath) => {
    gameFolderPathLabel.innerHTML = gameFolderPath;
});