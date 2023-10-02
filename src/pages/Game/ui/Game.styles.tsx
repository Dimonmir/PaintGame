import styled from 'styled-components';

export const GameForm = styled.div`
  background-color: #ffffff;
  width: 80%;
  height: 80vh;
  display: flex;
  border-radius: 10px;
  margin: 50px auto 0;

  .canvas {
    flex: 1 1 80%;
    border-right: 1px solid ${({ theme }) => theme.colors.black};
  }
`;
