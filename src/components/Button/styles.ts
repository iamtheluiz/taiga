import styled from 'styled-components'

import { ButtonProps } from '.'

export const Container = styled.button<ButtonProps>`
  width: ${props => (props.fullWidth === true ? '100%' : 'auto')};
  height: 42px;
  padding: 0 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #8257e6;
  border-radius: 8px;
  border: 0;

  color: #fff;
  font-size: 16px;
  font-weight: bold;

  cursor: pointer;

  transition: all 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.7);
  }
`
