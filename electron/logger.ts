import { app, dialog } from 'electron'
import path from 'path'
import fs from 'fs'
import electronLog from 'electron-log'

// Log config
const logPath = path.join(
  process.env.NODE_ENV === 'production'
    ? process.resourcesPath
    : app.getAppPath()
  , 'logs/main.log'
)
electronLog.transports.file.resolvePath = () => logPath;

// Reset log on development env
if (process.env.NODE_ENV !== 'production') {
  if (fs.existsSync(logPath)) {
    fs.unlinkSync(logPath)
  }
}

electronLog.catchErrors({
  showDialog: false,
  onError(error, versions, submitIssue) {
    dialog.showMessageBox({
      title: 'An error occurred',
      message: error.message,
      detail: error.stack,
      type: 'error',
      buttons: ['Ignore', 'Report', 'Exit'],
    })
      .then((result) => {
        if (result.response === 1 && error && versions && submitIssue) {
          submitIssue('https://github.com/iamtheluiz/taiga/issues/new', {
            title: `Error report for ${versions.app}`,
            body: 'Error:\n```' + error.stack + '\n```\n' + `OS: ${versions.os}`
          });
          return;
        }

        if (result.response === 2) {
          app.quit();
        }
      });
  }
});

export const log = electronLog