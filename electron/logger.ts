import { app, dialog } from 'electron'
import fs from 'fs'
import electronLog from 'electron-log'
import { logFilePath } from './config/config'

electronLog.transports.file.resolvePath = () => logFilePath

// Reset log on development env
if (process.env.NODE_ENV !== 'production') {
  if (fs.existsSync(logFilePath)) {
    fs.unlinkSync(logFilePath)
  }
}

electronLog.catchErrors({
  showDialog: false,
  onError(error, versions, submitIssue) {
    dialog
      .showMessageBox({
        title: 'An error occurred',
        message: error.message,
        detail: error.stack,
        type: 'error',
        buttons: ['Ignore', 'Report', 'Exit'],
      })
      .then(result => {
        if (result.response === 1 && error && versions && submitIssue) {
          submitIssue('https://github.com/iamtheluiz/taiga/issues/new', {
            title: `Error report for ${versions.app}`,
            body:
              'Error:\n```' + error.stack + '\n```\n' + `OS: ${versions.os}`,
          })
          return
        }

        if (result.response === 2) {
          app.quit()
        }
      })
  },
})

export const log = electronLog
