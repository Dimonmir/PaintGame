import styled from "styled-components"

export const BoxAuth = styled('div')`
    width: 20%;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
    box-shadow: 0px 4px 8px 2px rgba(34, 60, 80, 0.2);
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -30%);
    border-radius: 10px;
    .authHeader{ 
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    @media (max-width: 576px) {
        width: 80%;
    }
`