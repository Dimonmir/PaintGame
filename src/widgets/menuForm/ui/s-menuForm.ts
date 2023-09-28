import styled from "styled-components"

export const BoxMenu = styled('div')`
    width: 20%;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
    background-color: ${({theme}) => theme.colors.white};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    .menuHeader{ 
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    @media (max-width: 576px) {
        width: 80%;
    }

    .menuButton {
        display: flex;
        flex-direction: column;
        gap: 30px;
        & * {
            font-size: 20px;
            line-height: inherit;
        }
    }
`