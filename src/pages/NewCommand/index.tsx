import { FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { OpenDialogReturnValue } from 'electron/main'
import { useCommand } from '../../contexts/command'

import { Button } from '../../components/Button'

import { FaFileUpload } from 'react-icons/fa'
import { Container, File, Form, Input, InputControl, Select } from './styles'

export function NewCommand() {
  const navigate = useNavigate()
  const { socket, newCommand, setNewCommand } = useCommand()

  useEffect(() => {
    socket.on(
      'electron:dialog-selected-file',
      (selectedFile: OpenDialogReturnValue) => {
        // @ts-ignore
        setNewCommand((oldNewCommand: any) => {
          return {
            ...oldNewCommand,
            content: selectedFile.filePaths[0] || oldNewCommand.content,
          }
        })
      }
    )
  }, [])

  async function handleGetProgram() {
    socket.emit('electron:open-dialog')
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    socket.emit('command:create', newCommand)

    navigate('/main_window')
  }

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <h1>New Command</h1>
        <InputControl>
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            id="name"
            name="name"
            value={newCommand.name}
            onChange={event =>
              setNewCommand({
                ...newCommand,
                name: event.currentTarget.value,
              })
            }
          />
        </InputControl>
        <InputControl>
          <label htmlFor="type">Type</label>
          <Select
            id="text"
            name="type"
            value={newCommand.type}
            onChange={event =>
              setNewCommand({
                ...newCommand,
                // @ts-ignore
                type: event.currentTarget.value,
              })
            }
          >
            <option value="shell">Shell</option>
            <option value="program">Program</option>
            <option value="website">Website</option>
          </Select>
        </InputControl>
        {['shell', 'website'].includes(newCommand.type) && (
          <InputControl>
            <label htmlFor="content">Content</label>
            <Input
              type="text"
              id="content"
              name="content"
              value={newCommand.content}
              onChange={event =>
                setNewCommand({
                  ...newCommand,
                  content: event.currentTarget.value,
                })
              }
            />
          </InputControl>
        )}
        {newCommand.type === 'program' && (
          <InputControl onClick={handleGetProgram}>
            <File>
              <FaFileUpload size={20} />
              {newCommand.content === ''
                ? 'Selecione um programa'
                : newCommand.content.split('\\').pop()}
            </File>
          </InputControl>
        )}
        <hr />
        <Button type="submit">Enviar</Button>
        <Button
          onClick={() => navigate('main_window')}
          style={{ backgroundColor: 'red' }}
        >
          Voltar
        </Button>
      </Form>
    </Container>
  )
}
