import styled from "styled-components";

export const DashBoardWrapper = styled.div`
    background-color: #f8f8f8;
    margin: 20px 0px;
`;
export const DashBoardContent = styled.div`
    display: flex;
    max-width: 1366px;
    margin: 0 auto;
    padding: 15px 10px;
    align-items: center;
    justify-content: space-between;
    div {
        display: flex;
        font-size: 14px;
        div {
            color: red;
            :hover {
                cursor: pointer;
            }
        }
    }
    a {
        text-decoration: none;
        color: red;
    }
    span {
        padding-left: 10px;
    }
    span::before {
        display: inline-block;
        padding-right: 10px;
        color: #3c3c3c;
        content: "/";
    }
`;
