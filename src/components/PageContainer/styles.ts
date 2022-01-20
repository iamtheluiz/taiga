import styled from "styled-components";

import { headerHeight } from "../Header/styles";

export const Container = styled.div`
    width: 100%;
    max-height: calc(100vh - ${headerHeight}px);
    height: calc(100vh - ${headerHeight}px);
    padding: 16px;
    overflow: auto;
`;