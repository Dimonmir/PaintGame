import styled from "styled-components"

export const SCanvas = styled.canvas`
    flex: 1 1 80%;
    border-right: 1px solid ${({theme}) => theme.colors.lightGray};
`