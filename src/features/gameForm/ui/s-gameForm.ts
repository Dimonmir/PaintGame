import { Form } from "antd"
import styled from "styled-components"

export const SForm = styled(Form)`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .authItem {
        margin: 0;
    }
    .authInput {
        width: 100%;
        margin: 0;
    }
    .authButton {
        width: 100%;
    }
    .error {
        text-align: center;
    }
    .reg {
        text-align: right;
    }
`