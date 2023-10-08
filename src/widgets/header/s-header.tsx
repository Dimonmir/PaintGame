import styled from 'styled-components';

export const Container = styled('div')`
  padding: 20px 40px;
  display: flex;
  flex-grow: 100%;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.main};
  .headerText {
    color: white;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.oldDesktop}px) {
    padding: 2% 2%;
    .headerText {
      font-size: 20px;
      margin: 0 !important;
    }
  }
  @media (max-width: 576px) {
    padding: 2% 2%;
    .headerText {
      font-size: 20px;
      margin: 0 !important;
    }
  }
`;
