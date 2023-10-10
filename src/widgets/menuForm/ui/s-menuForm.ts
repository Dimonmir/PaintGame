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
    box-shadow: 2px 0px 36px 0px rgba(34, 60, 80, 0.2);

    .menuHeader{ 
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    .animate-jump {
        transition: transform 0.2s ease-in-out;
    }

    .animate-jump:hover {
        animation: shake 0.3s ease-in-out;
    }

    @keyframes shake {
        0% {
            transform: translateX(0); /* Начальное положение */
        }
        25% {
            transform: translateX(-2px); /* Слегка влево */
        }
        50% {
            transform: translateX(2px); /* Слегка вправо */
        }
        75% {
            transform: translateX(-2px); /* Слегка влево */
        }
        100% {
            transform: translateX(0); /* Возвращаемся в исходное положение */
        }
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