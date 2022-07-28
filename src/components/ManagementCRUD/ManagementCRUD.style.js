import styled from "styled-components";

export const Item = styled.div`
    display: flex;
`;

export const LeftContent = styled.div`
    img {
        width: 350px;
        height: 350px;
    }
`;

export const RightContent = styled.div`
    padding: 20px 20px;
    margin: 0 auto;
    h6 {
        font-weight: normal;
        font-size: 13px;
    }
    .price {
        font-weight: bold;
    }
    .description {
        font-size: 13px;
    }
`;

export const Wrapper = styled.div``;
export const Text = styled.span`
    :hover {
        color: red;
    }
`;

export const ReportForm = styled.div`
    padding: 20px;
    background-color: ${(props) => props.backgroundColor};
    .header {
        display: flex;

        flex-direction: column;
        justify-content: center;
        h4 {
            font-weight: bold;
            color: ${(props) => props.textColor};
        }
        h6 {
            color: rgb(170, 170, 170);
        }
        .user-img {
            width: 80px;
            height: 80px;
            margin-bottom: 20px;
        }
        align-items: center;
    }
    .body {
        display: flex;
        flex-direction: column;
        padding: 10px 30px;

        .title {
            font-weight: bold;
            padding-bottom: 10px;
            color: ${(props) => props.titleColor};
        }
        .content {
            padding-bottom: 18px;
        }
        .contentTitle {
            color: rgb(170, 170, 170);
            font-size: 12px;
        }
        .detail {
            color: ${(props) => props.textColor};
        }
        select {
            width: fit-content;
            border: 2px solid #9a7fe2;
            border-radius: 5px;
            outline: none;
            background-color: ${(props) => props.selectBackground};
            color: ${(props) => props.textColor};
        }
        .confirm-button {
            text-align: center;
        }
    }

    .pending {
        width: 30px;
    }
`;
