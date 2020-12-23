const { ipcRenderer } = require('electron');

/**
 * Toolbar button events
 */
document.getElementById('minimizeProgramButton').addEventListener('click', (event) => {
    ipcRenderer.send('minimizeProgram');
});

const maximizeProgramButton = document.getElementById('maximizeProgramButton');
maximizeProgramButton.addEventListener('click', (event) => {
    ipcRenderer.send('maximizeProgram');
});

document.getElementById('closeProgramButton').addEventListener('click', (event) => {
    ipcRenderer.send('closeProgram');
});

ipcRenderer.on('setMaximizeWindowIcon', (e, windowMaximized) => {
    maximizeProgramButton.innerHTML = windowMaximized ? "&#128470;&#xFE0E;" : "&#128471;&#xFE0E;";
});

/**
 * Tab events
 */
const selectGameTabContent = document.getElementById('select-game-tab-content');
const saveProjectTabContent = document.getElementById('save-project-tab-content');


const selectGameTab = document.getElementById('select-game-tab');
selectGameTab.addEventListener('click', (event) => {
    hideTabContent();
    selectGameTabContent.classList.remove('content-hidden');
});

const saveProjectTab = document.getElementById('save-project-tab');
saveProjectTab.addEventListener('click', (event) => {
    hideTabContent();
    saveProjectTabContent.classList.remove('content-hidden');
});

function hideTabContent() {
    selectGameTabContent.classList.add('content-hidden');

    saveProjectTabContent.classList.add('content-hidden');
}

/**
 * Game select tab events
 */
const gameFolderSelected = false;

const selectGameFolderButton = document.getElementById('select-game-folder-button');
selectGameFolderButton.addEventListener('click', (event) => {
    ipcRenderer.send('setGameFolder');
});

const removeGameFolderButton = document.getElementById('remove-game-folder-button');
removeGameFolderButton.addEventListener('click', (event) => {
    if (!removeGameFolderButton.classList.contains('button-disabled')) {
        gameFolderPathLabel.innerHTML = "No game folder selected."
        gameFolderPath.innerHTML = ""
        setElementState(gameFolderPath, false);
        setButtonHideState(removeGameFolderButton, false);
        ipcRenderer.send('removeGameFolder');
    }
});

const decryptDataFilesButton = document.getElementById('decrypt-data-files-button')
decryptDataFilesButton.addEventListener('click', (event) => {
    if (!decryptDataFilesButton.classList.contains('button-disabled')) {
        ipcRenderer.send('decryptDataFiles');
    }
});


const gameFolderPathLabel = document.getElementById('game-folder-path-label');
const gameFolderPath = document.getElementById('game-folder-path');
ipcRenderer.on('setGameFolderPath', (event, path) => {
    if (path) {
        gameFolderPathLabel.innerHTML = "Selected game folder: ";
        gameFolderPath.innerHTML = path;
        setElementState(gameFolderPath, true);
        setButtonHideState(removeGameFolderButton, true);
    }
});

function setElementState(element, state) {
    if (element) {
        if (state) {
            if (element.classList.contains('content-hidden')) {
                element.classList.remove('content-hidden');
            }
        } else {
            if (!element.classList.contains('content-hidden')) {
                element.classList.add('content-hidden');
            }
        }
    }
}

function setButtonHideState(element, state) {
    if (element && element.classList.contains('button')) {
        if (state) {
            if (element.classList.contains('button-disabled')) {
                element.classList.remove('button-disabled');
            }
        } else {
            if (!element.classList.contains('button-disabled')) {
                element.classList.add('button-disabled');
            }
        }
    }
}