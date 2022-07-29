import styled from "styled-components";

export const Wrapper = styled.div`
    max-width: 85%;
    margin: 35px auto;
    padding: 20px 5px;
    display: flex;
    border: 1px solid rgba(38, 56, 150, 0.1411764705882353);
    box-shadow: 0 4px 12px 0 rgb(34 41 47 / 12%);
    border-radius: 10px;

    flex-direction: row;
    background-color: ${(props) => props.background};
    color: white;
    gap: 10px;
    height: 100vh;
    .ant-pagination-item-link {
        color: ${(props) => props.textPage};
        background-color: ${(props) => props.backgroundPage};
    }
    .ant-pagination-item {
        color: ${(props) => props.textPage};
        background-color: ${(props) => props.backgroundPage};
    }
    .ant-pagination-item-active {
        background-color: ${(props) => props.activePage};
        border: ${(props) => props.borderPage};
    }
    .ant-pagination-prev:focus-visible .ant-pagination-item-link,
    .ant-pagination-next:focus-visible .ant-pagination-item-link,
    .ant-pagination-prev:hover .ant-pagination-item-link,
    .ant-pagination-next:hover .ant-pagination-item-link {
        color: ${(props) => props.textPage};
        /* border-color: rgb(158, 129, 245); */
    }
    .searchAndFilterWrapper {
        display: flex;
        flex-direction: row;
        justify-content: right;
        align-items: center;
        vertical-align: center;
        gap: 10px;
        div {
            padding: 0px !important;
        }
    }
    .add-button {
        color: white !important;
    }
`;
