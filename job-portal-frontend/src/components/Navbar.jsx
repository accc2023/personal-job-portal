import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Box,
    Grid,
    Typography,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
  

const Navbar = () => {
    const navigate = useNavigate(); // Initialize navigate here
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [noResults, setNoResults] = useState(false);

    // Function to handle live search input changes
    const handleSearchChange = async (value) => {
        setSearchInput(value);

        if (value.trim().length > 0) {
            try {
                const response = await axios.get(
                    `http://localhost:8080/jobPosts/keyword/${value}`,
                    {
                        auth: {
                            username: "test",
                            password: "test",
                        },
                    }
                );
                const results = response.data;
                setSearchResults(results);
                setShowSearchResults(true);
                setNoResults(results.length === 0);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setSearchResults([]);
                setNoResults(true);
            }
        } else {
            setShowSearchResults(false);
            setSearchResults([]);
            setNoResults(false);
        }
    };

    // Function to handle search when the button is clicked
    const handleSearchButtonClick = async () => {
        if (searchInput.trim().length > 0) {
            try {
                const response = await axios.get(
                    `http://localhost:8080/searchCurrentJobs/${searchInput}`,
                    {
                        auth: {
                            username: "test",
                            password: "test",
                        },
                    }
                );
                const results = response.data;
                navigate(`/search-results`, {
                    state: { keyword: searchInput, results: results },
                });
            } catch (error) {
                console.error("Error fetching data from search button:", error);
                navigate(`/search-results`, {
                    state: { keyword: searchInput, results: [] },
                });
            }
        } else {
            console.warn("Search input is empty.");
        }
    };




  return (
    <div>
      <Grid container spacing={2} sx={{ margin: "2%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ background: '#ADD8E6' }}>
            <Toolbar variant="dense">
              <Typography variant="h4" align='Left' component="div" sx={{ flexGrow: 1, fontFamily:"revert", fontSize:"500", color:"black" }}>
                Personal Job Portal
              </Typography>

              <Box sx={{ m: 0.5, mx: 'auto', width: 80 }}>
                <Button variant="outlined" href='http://localhost:3000'>Home</Button>
               </Box>
              {/*<Box sx={{ m: 0.5, mx: 'auto', width: 100 }}>*/}
              {/*  <Button variant="outlined" href='http://localhost:3000/create'>Add Job</Button>*/}
              {/*</Box>*/}
              <Box sx={{ m: 0.5, mx: 'auto', width: 180 }}>
                <Button variant="outlined" onClick={() => navigate("/hunt-jobs")}>Hunt jobs</Button>
              </Box>

                {/* Search Bar with Button */}
                <Box sx={{m: 0.5, mx: "auto", display: "flex", alignItems: "center", width: 400}}>
                    <TextField
                        variant="outlined"
                        placeholder="Search..."
                        fullWidth
                        size="small"
                        value={searchInput}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        onFocus={() => setShowSearchResults(true)} // Show dropdown on focus
                        onBlur={() => setTimeout(() => setShowSearchResults(false), 200)} // Delay hiding
                    />
                    <Button
                        variant="contained"
                        sx={{ml: 1, background: "#000", color: "#FFF"}}
                        onClick={handleSearchButtonClick}
                    >
                        Search
                    </Button>
                </Box>

        </Toolbar>
      </AppBar>
    </Box>
    </Grid>

        {/* Dropdown for search results */}
        {showSearchResults && (
            <Box
                sx={{
                    position: "absolute",
                    background: "white",
                    zIndex: 10,
                    width: "400px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: "0",
                    right: "0",
                    top: "80px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "4px",
                    maxHeight: "200px",
                    overflowY: "auto",
                }}
            >
                {searchResults.length > 0 ? (
                    <List>
                        {searchResults.map((result) => (
                            <ListItem
                                key={result.id}
                                button
                                component="a"
                                href={`/product/${result.id}`}
                            >
                                <ListItemText primary={result.name} />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    noResults && (
                        <Typography
                            sx={{
                                textAlign: "center",
                                padding: "10px",
                                fontStyle: "italic",
                                color: "gray",
                            }}
                        >
                            No results found.
                        </Typography>
                    )
                )}
            </Box>
        )}




      <Grid item xs={12} sx={12} md={12} lg={12}>
      </Grid>
    </div>
  )
}

export default Navbar
