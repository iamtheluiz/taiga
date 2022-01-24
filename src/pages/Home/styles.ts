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
  cursor: pointer;
`

export const LeftContent = styled.div`
  width: 360px;
  height: 100%;
  padding: 16px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button, strong {
    text-align: center;
    margin-top: 12px;
  }
  strong {
    font-size: 20px;
  }
`;
export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px;
  flex: 1;
  height: 100%;
`;

export const CommandsContainer = styled.div`
  flex: 1;
  width: 100%;  
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CommandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  width: 100%;
  padding: 12px;
  border-radius: 12px;
  background-color: #ffffff40;
`

