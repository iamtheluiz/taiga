import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  padding: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  button {
    margin-top: 24px;
  }
`

export const LeftContent = styled.aside`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const RightContent = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Image = styled.img`
  width: 240px;
  height: 240px;
  border-radius: 50%;
`
