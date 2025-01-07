import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
    Card,
    Grid,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const SearchResults = () => {
    const location = useLocation();
    const { keyword } = location.state || { keyword: "" }; // Retrieve the keyword from the search input
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch search results from API
    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/searchCurrentJobs/${keyword}`,
                    {
                        auth: {
                            username: "test",
                            password: "test",
                        },
                    }
                );
                setResults(response.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setLoading(false);
            }
        };

        if (keyword) {
            fetchSearchResults();
        }
    }, [keyword]);

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:8080/jobPost/${postId}`, {
                auth: {
                    username: "test",
                    password: "test",
                },
            });
            setResults((prevResults) =>
                prevResults.filter((result) => result.postId !== postId)
            );
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div>
            <Grid container spacing={2} sx={{ margin: "2%" }}>
                {loading ? (
                    <Typography variant="h5" sx={{ margin: "2%" }}>
                        Loading results for "{keyword}"...
                    </Typography>
                ) : results.length > 0 ? (
                    results.map((result) => (
                        <Grid key={result.id} item xs={12} md={6} lg={4}>
                            <Card
                                sx={{
                                    padding: "3%",
                                    overflow: "hidden",
                                    width: "84%",
                                    backgroundColor: "#ADD8E6",
                                    cursor: "pointer",
                                }}
                                onClick={() => window.open(result.redirectUrl, "result.redirectUrl")}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: "1.25rem",
                                        fontWeight: "500",
                                        fontFamily: "Roboto",
                                        color: "#333",
                                    }}
                                >
                                    {result.company || "Not specified"}
                                </Typography>

                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontSize: "2rem",
                                        fontWeight: "600",
                                        fontFamily: "sans-serif",
                                    }}
                                >
                                    {result.postProfile}
                                </Typography>
                                <Typography
                                    sx={{color: "#585858", marginTop: "2%", fontFamily: "cursive"}}
                                    variant="body"
                                >
                                    {result.postDesc}
                                </Typography>

                                <br/>
                                <br/>


                                <Typography
                                    variant="h6"
                                    sx={{fontFamily: "unset", fontSize: "400"}}
                                >
                                    Salary:{" "}
                                    {result.salary > 0
                                        ? result.salaryMax > 0
                                            ? `€ ${result.salary.toLocaleString()} - ${result.salaryMax.toLocaleString()}`
                                            : `€ ${result.salary.toLocaleString()}(+)`
                                        : "Not specified"}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{ color: "#585858", marginTop: "1%", fontFamily: "cursive" }}
                                >
                                    Location: {result.location || "Not specified"}
                                </Typography>

                                {/* Post Date */}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: "0.9rem",
                                        fontStyle: "italic",
                                        color: "#585858",
                                        marginTop: "0.5%",
                                    }}
                                >
                                    Posted on: {new Date(result.postDate).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                                </Typography>

                                <DeleteIcon
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent the click event from propagating to the parent
                                        handleDelete(result.postId); // Call the delete function
                                    }}
                                />
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h5" sx={{ margin: "2%" }}>
                        No results found for "{keyword}".
                    </Typography>
                )}
            </Grid>
        </div>
    );
};

export default SearchResults;
