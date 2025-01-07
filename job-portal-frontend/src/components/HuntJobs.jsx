import React, { useState } from "react";
import {
    Typography,
    TextField,
    Button,
    Paper,
    Box,
    Grid,
    Card,
    IconButton,
} from "@mui/material";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add"; // Import the Add icon

const HuntJobs = () => {
    const [form, setForm] = useState({
        search: "",
        country: "",
        location: "",
        salary_min: "",
        company: "",
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [addedJobs, setAddedJobs] = useState([]); // Track added jobs

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Construct the API URL using form values
        const { search, country, location, salary_min, company } = form;
        const apiUrl = `http://localhost:8080/importJobs?country=${country}&what=${search}&resultsPerPage=10&where=${location}&salary_min=${salary_min}&company=${company}&content-type=application/json`;

        try {
            const response = await axios.get(apiUrl, {
                auth: {
                    username: "test", // Replace with your actual username
                    password: "test", // Replace with your actual password
                },
            });
            setResults(response.data); // Update results with API response
        } catch (err) {
            setError("Failed to fetch jobs. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAdd = async (result) => {
        try {
            const response = await axios.post(`http://localhost:8080/jobPost`, result, {
                auth: {
                    username: 'test', // Replace with actual username
                    password: 'test', // Replace with actual password
                },
            });
            // Add the job ID to `addedJobs` state
            setAddedJobs((prev) => [...prev, result.postId]);
            console.log("Added Post:", response.data);
        } catch (error) {
            console.error("Error adding post:", error);
        }
    };

    return (
        <Paper sx={{ padding: "2%", margin: "2%" }} elevation={3}>
            <Typography align="center" variant="h5" sx={{ marginBottom: "2%" }}>
                Hunt Jobs
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* Search Field */}
                    <TextField
                        required
                        name="search"
                        label="Search"
                        variant="outlined"
                        value={form.search}
                        onChange={handleChange}
                    />
                    {/* Country Field */}
                    <TextField
                        required
                        name="country"
                        label="Country (e.g., nl, sg)"
                        variant="outlined"
                        value={form.country}
                        onChange={handleChange}
                    />
                    {/* Location Field */}
                    <TextField
                        name="location"
                        label="Location (in country)"
                        variant="outlined"
                        value={form.location}
                        onChange={handleChange}
                    />
                    {/* Salary Field */}
                    <TextField
                        type="number"
                        name="salary_min"
                        label="Salary (Minimum)"
                        variant="outlined"
                        value={form.salary_min}
                        onChange={handleChange}
                    />
                    {/* Company Field */}
                    <TextField
                        name="company"
                        label="Company"
                        variant="outlined"
                        value={form.company}
                        onChange={handleChange}
                    />
                    {/* Submit Button */}
                    <Button type="submit" variant="contained" color="primary">
                        Search
                    </Button>
                </Box>
            </form>

            {/* Results Section */}
            {loading ? (
                <Typography align="center" sx={{ marginTop: "2%" }}>
                    Loading results...
                </Typography>
            ) : error ? (
                <Typography align="center" color="error" sx={{ marginTop: "2%" }}>
                    {error}
                </Typography>
            ) : results.length > 0 ? (
                <Grid container spacing={2} sx={{ marginTop: "2%" }}>

                    {results.map((result, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                            {/*padding: "2%", backgroundColor:"#ADD8E6"*/}
                            <Card sx={{ padding: "3%", overflow: "hidden", width: "84%", backgroundColor:"#ADD8E6", cursor: "pointer"}}
                                  // Note: when you open to "blank", longer computation time
                                  onClick={() => window.open(result.redirectUrl, "blank")} // Make the entire card clickable
                            >
                                <Typography variant="h6">{result.company}</Typography>
                                <Typography
                                    variant="h5"
                                    sx={{fontSize: "1.75rem", fontWeight: "600", fontFamily: "sans-serif"}}
                                >
                                    {result.postProfile}
                                </Typography>

                                <Typography sx={{color: "#585858", marginTop: "2%", fontFamily: "cursive"}}
                                            variant="body">
                                    {result.postDesc}
                                </Typography>

                                <br/>
                                <br/>

                                <Typography variant="h6" sx={{ fontFamily: "unset", fontSize: "400" }}>
                                    Salary:{" "}
                                    {result.salary > 0 ? (
                                        result.salaryMax > 0
                                            ? `€ ${result.salary.toLocaleString()} - ${result.salaryMax.toLocaleString()}`
                                            : `€ ${result.salary.toLocaleString()}(+)`
                                    ) : "Not specified"}
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

                                <Box sx={{ marginTop: "2%", textAlign: "center" }}>
                                {/* Add Icon with Typography */}
                                    <IconButton
                                        color="primary"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent card click
                                            handleAdd(result)
                                            // <Typography()
                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                    {addedJobs.includes(result.postId) && (
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: "green",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Added
                                        </Typography>
                                    )}
                            </Box>

                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography align="center" sx={{ marginTop: "2%" }}>
                    No results found.
                </Typography>
            )}
        </Paper>
    );
};

export default HuntJobs;
