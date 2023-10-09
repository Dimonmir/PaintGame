import styled from 'styled-components';

export const SContainer = styled.div`
  box-sizing: content-box;
  display: flex;
  padding: 8px;
  gap: 6px;
  flex-direction: column;
  justify-content: center;
`;

export const SContainerItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: break-all;
  padding: 8px 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  gap: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.orange};

  .ant-message-custom-content {
    word-wrap: break-word;
  }
`;
