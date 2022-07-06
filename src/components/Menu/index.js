import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SubNav from "../SubNav";
import "./menu.css";
import { Spinner } from "react-bootstrap";
export default function Menu() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(
        url.searchParams.get("page") == null ? 1 : url.searchParams.get("page")
    );
    const [datasPerPage] = useState(4);
    const [totalData, setTotalData] = useState();
    // Define the product link
    const endPoint =;

    const indexOfLastData = currentPage * datasPerPage;
    const indexOfFirstData = indexOfLastData - datasPerPage;

    // Set the current page of pagination
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`/Menu?page=${pageNumber}`);
    };

    // Transfer the value by using the navigate function
    let navigate = useNavigate();

    // Read the product table
    useEffect(() => {
        fetch(endPoint)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setData(data.categories);
                setTotalData(data.totalCategories);
                setIsLoading(false);
            })
            .catch((error) => window.alert(error));
    }, [currentPage]);

   

    return (
        <>
            <SubNav content="Menu"></SubNav>

            <div className="App">
                {isLoading ? (
                    <div
                        style={{
                            textAlign: "center",
                            padding: "200px 0px",
                            zIndex: "999",
                            width: "100%",
                        }}
                    >
                        <Spinner
                            animation="border"
                            role="status"
                            style={{ width: "200px", height: "200px", color: "black" }}
                        >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <>
                        <div className="row">
                            {/* Print out all products */}
                            {data.map((el) => (
                                <div className="categoryColumn">
                                    <div className="card" key={el.menuId}>
                                        
                                        <p className="name">{el.main}</p>
                                        <p className="name">{el.side}</p>
                                        <p className="name">{el.dessert}</p>
                                        <br />
                                    </div>
                                    <br />
                                </div>
                            ))}
                        </div>
                        
                    </>
                )}
            </div>
        </>
    );
}
