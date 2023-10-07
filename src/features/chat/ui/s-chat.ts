import styled from "styled-components"

export const SChat = styled.div`
    flex: 1 1 20%;
    display: flex;
    flex-direction: column;
    
    
    & .headerContainer {
        flex: 0 0 10%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
    }
    & .chatContainer {
        flex: 1 1 92%;
        display: flex;
        flex-direction: column;
        padding-top: 10px;
    }
    
    & .chatDialog {
        flex: 1 1 90%;
        gap: 10px;
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: flex-start;
    }
    & .chatSendMessage {
        padding: 0 20px 0 10px;
        border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
        flex: 1 1 8%;
        display: flex;
        align-items: center;
    }

    & .sendMessageBtn {
        font-size: xx-small;
        height: max-content;
        width: max-content;
        min-width: unset;
        padding: 8px;
    }

    & .empty{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`