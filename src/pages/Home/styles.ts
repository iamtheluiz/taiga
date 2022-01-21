import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  button {
    margin-top: 24px;
  }
`

export const ModalBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  justify-items: center;
  gap: 16px;
`

export const Image = styled.div`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
`

export const LeftContent = styled.div``;
export const RightContent = styled.div``;
