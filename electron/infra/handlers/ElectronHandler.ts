import { dialog } from 'electron'

import { CommunicationProvider } from '../../providers/CommunicationProvider'

export function registerElectronHandlers(
  communicationProvider: CommunicationProvider
) {
  communicationProvider.onMessage('electron:open-dialog', handleOpenDialog)

  async function handleOpenDialog() {
    const selectedFile = await dialog.showOpenDialog({
      properties: ['openFile'],
    })

    communicationProvider.sendMessage(
      'electron:dialog-selected-file',
      selectedFile
    )
  }
}
