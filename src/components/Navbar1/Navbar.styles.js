import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
    background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
    align-items: center;
    color: white;
    .dropdown-menu {
        inset: 12px auto auto 0px !important;
        transform: translate(-50px, 40px) !important;
    }
    justify-content: center;
    /* width:100%fit- */
    /* flex-wrap: wrap; */
    /* min-width: 992px; */
    /* width: 100vw; */
`;

export const Content = styled.div`
    display: flex;
    max-width: 1370px;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 15px 0px;
`;
export const LeftNavItem = styled(Link)`
    display: flex;
    align-items: center;
    color: white;
    img {
        width: 70px;
        padding: 0 10px;
    }
    &::after {
        content: "${({ content }) => content}";
        cursor: pointer;
    }
    &:hover {
        color: white;
    }
    font-size: 18pt;
    font-weight: 700;
    margin-right: auto;
`;
export const RightNav = styled.ul`
    margin: 0;
    display: flex;
    list-style: none;
    a {
        text-decoration: none;
        color: white;
    }
    /* font-weight: bold; */
    .account {
        display: flex;
        align-items: center;
        cursor: pointer;
        .btn {
            /* background-color: #263394; */
            background-color: darkgrey;
            border-color: darkgrey;
        }
        li:hover {
            background-color: lightgray;
        }
        * {
            margin: 0 5px;
        }
    }
    svg {
        vertical-align: unset;
    }
    .image {
        /* padding: 0px !important;
        width: 35px !important;
        background-color: white;
        border-radius: 50%;
        cursor: pointer;
        @media (max-width: 1100px) {
            width: 35px !important;
            height: 35px;
        } */
    }
`;

export const RightNavItem = styled.li`
    cursor: pointer;
    font-weight: bold;
    padding: 12px 25px 12px 25px;
    align-items: center;
`;
