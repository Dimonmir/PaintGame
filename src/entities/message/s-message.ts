import styled from "styled-components"

export const SMessage = styled.div`
    display: grid;
    padding: 5px;
    grid-gap: 5px;
    max-width: 70%;
    grid-template-columns: max-content auto;
    height: max-content;
    background-color: #FFFFFF;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.darkGray};
    
    & .message{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: left;
    }

    & .messageAutor{
        color: ${({ theme }) => theme.colors.darkGray};
    }

    & .messageText{
        overflow-wrap: anywhere;
    }
`