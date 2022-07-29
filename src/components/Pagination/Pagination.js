// reference: https://www.youtube.com/watch?v=IYCa1F-OWmk
import React, { useState } from "react";
import "./Pagination.css";

export const Pagination = ({ datasPerPage, totalDatas, paginate, currentPage }) => {
    const pageNumbers = [];

    // Set the array of pages
    for (let i = 1; i <= Math.ceil(totalDatas / datasPerPage); i++) {
        pageNumbers.push(i);
    }

    const [state, setState] = useState(1);

    function toggleActiveStyles(index) {
        if (state === index) {
            return "activeBtn";
        } else {
            return "inactiveBtn";
        }
    }

    return (
        <div className="pagination">
            {/* Create the button leads top the previous page */}
            <a
                onClick={() => {
                    paginate(state === 1 ? state : state - 1);
                    setState(state === 1 ? state : state - 1);
                }}
            >
                &laquo;
            </a>
            {pageNumbers.map((number) => (
                <a
                    className={toggleActiveStyles(number)}
                    onClick={() => {
                        paginate(number);
                        setState(number);
                    }}
                >
                    {number}
                </a>
            ))}
            {/* Create the button leads top the next page */}
            <a
                onClick={() => {
                    paginate(state === Math.ceil(totalDatas / datasPerPage) ? state : state + 1);
                    setState(state === Math.ceil(totalDatas / datasPerPage) ? state : state + 1);
                }}
            >
                &raquo;
            </a>
        </div>
    );
};
