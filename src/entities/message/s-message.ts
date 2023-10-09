import styled, { css } from "styled-components"

interface ISMessage {
    $myMessage: boolean
}

export const SMessage = styled.div<ISMessage>`
    display: grid;
    padding: 5px;
    grid-gap: 5px;
    max-width: 70%;
    grid-template-columns: max-content auto;
    height: max-content;
    background-color: #FFFFFF;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.darkGray};
    
    ${(props)=> 
        props.$myMessage &&
        css`
        align-self: center;
        `
    }

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