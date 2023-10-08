import styled from 'styled-components';

export const GameForm = styled.div`
  background-color: #ffffff;
  width: 80%;
  height: 80vh;
  display: flex;
  border-radius: 10px;
  margin: 50px auto 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    margin: 20px auto 0;
  }

  .gameConteiner {
    display: flex;
    flex: 1 1 80%;
    flex-direction: column;
  }

  .title {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    flex: 0 0 10%;
    align-content: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.colors.black};
    font-size: 24px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};

    .back {
      padding: 0px;
      height: fit-content;
    }
  }
`;
