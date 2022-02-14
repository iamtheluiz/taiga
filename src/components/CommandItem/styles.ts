import styled from 'styled-components'
import { Command } from '../../../types'

export const Container = styled.div<{ command: Command }>`
  display: flex;
  align-items: center;
  gap: 6px;

  width: 100%;
  padding: 12px;
  border-radius: 12px;
  background-color: ${props =>
    props.command.default ? '#ffffff20' : '#ffffff40'};
`
