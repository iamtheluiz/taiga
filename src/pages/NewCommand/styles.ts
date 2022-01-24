import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 420px;
  width: 100%;

  button {
    height: 36px;
  }

  hr {
    border: 0px;
    height: 2px;
    margin: 2px 0px;
    background-color: #ffffff3b;
  }
`

export const InputControl = styled.div`
  display: flex;
  flex-direction: column;

  label {
    cursor: pointer;
    margin-bottom: 2px;
  }
`

export const Input = styled.input`
  height: 36px;
  padding: 0 16px;
  border-radius: 8px;
`
export const Select = styled.select`
  height: 36px;
  padding: 0 16px;
  border-radius: 8px;
  cursor: pointer;
`
export const File = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  height: 42px;
  padding: 0 16px;
  border-radius: 8px;
  background-color: #8257e6;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`
