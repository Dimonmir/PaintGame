import styled from "styled-components"

export const SCanvas = styled.canvas`
    width: 80%;
    height: 100%;
    border-right: 1px solid ${({ theme }) => theme.colors.lightGray};
`