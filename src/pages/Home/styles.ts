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

export const LeftContent = styled.div`
  width: 360px;
  height: 100%;
  padding: 16px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button,
  strong {
    text-align: center;
    margin-top: 12px;
  }
  strong {
    font-size: 20px;
  }
`
export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px;
  flex: 1;
  height: 100%;
`

export const CommandList = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 6px;
`
