import { FormEvent, useEffect, useState } from 'react'
import { OpenDialogReturnValue } from 'electron/main'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'

import { Container, File, Form, Input, InputControl, Select } from './styles'
import { FaFileUpload } from 'react-icons/fa'

export function NewCommand() {
  const [name, setName] = useState('')
  const [type, setType] = useState('shell')
  const [content, setContent] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    window.Main.on('open-dialog-response', (data: OpenDialogReturnValue) => {
      if (!data.canceled) {
        setContent(data.filePaths[0])
      }
    })
  }, [])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    window.Main.send('add-new-command', {
      command: {
        name,
        type,
        content,
      },
    })

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
            value={name}
            onChange={event => setName(event.currentTarget.value)}
          />
        </InputControl>
        <InputControl>
          <label htmlFor="type">Type</label>
          <Select
            id="text"
            name="type"
            value={type}
            onChange={event => setType(event.currentTarget.value)}
          >
            <option value="shell">Shell</option>
            <option value="program">Program</option>
            <option value="website">Website</option>
          </Select>
        </InputControl>
        {['shell', 'website'].includes(type) && (
          <InputControl>
            <label htmlFor="content">Content</label>
            <Input
              type="text"
              id="content"
              name="content"
              value={content}
              onChange={event => setContent(event.currentTarget.value)}
            />
          </InputControl>
        )}
        {type === 'program' && (
          <InputControl onClick={() => window.Main.send('open-dialog', null)}>
            <File>
              <FaFileUpload size={20} />
              {content === ''
                ? 'Selecione um programa'
                : content.split('\\').pop()}
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
