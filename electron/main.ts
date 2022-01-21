import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { spawn } from 'child_process';

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

const assetsPath =
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath()

function createWindow () {
  mainWindow = new BrowserWindow({
    icon: path.join(assetsPath, 'assets', 'icon.ico'),
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    frame: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners () {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })
}

// Taiga Recognition
const executablePath =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, 'TaigaRecognition', 'TaigaRecognition.exe')
    : path.join(__dirname, '..', '..', 'TaigaRecognition', 'bin', 'Release', 'net6.0', 'TaigaRecognition.exe')

const ipc = spawn(executablePath)
ipc.stdin.setDefaultEncoding("utf8")

ipc.stdout.on('data', function (data) {
  const out = data.toString().split('Recognized text: ')[1].replace(/(\r\n|\n|\r)/gm, "");
  console.log(`You: ${out}`);

  if (out === "hey taiga") {
    console.log("Taiga: hello!");
  }
});

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  ipc.kill();
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
