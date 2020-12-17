const { ipcRenderer } = require('electron');

// Toolbar events
const minimizeProgramButton = document.getElementById('minimizeProgramButton');
minimizeProgramButton.addEventListener('click', function (e) {
    ipcRenderer.send('minimizeProgram');
});

const maximizeProgramButton = document.getElementById('maximizeProgramButton');
maximizeProgramButton.addEventListener('click', function (e) {
    ipcRenderer.send('maximizeProgram');
});

const closeProgramButton = document.getElementById('closeProgramButton');
closeProgramButton.addEventListener('click', function (e) {
    ipcRenderer.send('closeProgram');
});

// Game select content events
const removeGameFolderButton = document.getElementById('removeGameFolderButton');
removeGameFolderButton.addEventListener('click', function (e) {
    if (removeGameFolderButton.classList.contains('button')) {
        gameFolderPathLabel.innerHTML = "Please select the folder of the game."
        removeGameFolderButton.classList.remove('button');
        removeGameFolderButton.classList.add('button-disabled');
        ipcRenderer.send('removeGameFolder');
    }
});

document.getElementById('selectGameFolderButton').onclick = (event) => {
    ipcRenderer.send('selectGameFolder');
};

document.getElementById('decryptDataFilesButton').onclick = (event) => {
    ipcRenderer.send('decryptDataFiles');
};

ipcRenderer.on('setMaximizeWindowIcon', (event, windowIsMaximized) => {
    maximizeProgramButton.innerHTML = windowIsMaximized ? "&#128470;&#xFE0E;" : "&#128471;&#xFE0E;";
});

const gameFolderPathLabel = document.getElementById('gameFolderPathLabel');
ipcRenderer.on('setGameFolderPathLabel', (event, path) => {
    gameFolderPathLabel.innerHTML = path;
    removeGameFolderButton.classList.remove('button-disabled');
    removeGameFolderButton.classList.add('button');
});