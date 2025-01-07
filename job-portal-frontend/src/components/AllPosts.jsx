// REMOVE the header titles? (Location, Posted on:)??
// Make page where you can fill in form to search for jobs and outputs jobs (or regex search?)
// Make database for your "favourite" jobs and display on welcome
// search bar for current jobs?
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Card,
    Grid,
    Typography,
  } from "@mui/material";
  import axios from "axios";
  import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

const handleEdit = (id) => {
  navigate("/edit",{state:{id}});
}

    useEffect(() => {
        const fetchInitialPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/jobPosts', {
                    auth: {
                        username: 'test', // Replace with the actual username
                        password: 'test', // Replace with the actual password
                    },
                });
                console.log("API Response:", response.data); // Debugging
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error); // Log the error for debugging
            }
        };

        fetchInitialPosts();
      }, []);

      // const handleDelete = (id) => {
      //   async function deletePost() {
      //     await axios.delete(`http://localhost:8080/jobPost/${id}`);
      //     console.log("Delete")
      // }
      // deletePost();
      // window.location.reload();
      // }

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:8080/jobPost/${postId}`, {
                auth: {
                    username: 'test', // Replace with actual username
                    password: 'test', // Replace with actual password
                },
            });
            setPost((prevPosts) => prevPosts.filter((p) => p.postId !== postId));
            console.log("Deleted Post:", postId);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };




    return (
    <>
      <Grid container spacing={2} sx={{ margin: "2%" }}>
      <Grid item xs={12} sx={12} md={12} lg={12}>
      </Grid>
      {post &&
        post.map((p) => {
          return (
            <Grid key={p.id} item xs={12} md={6} lg={4}>
              <Card sx={{ padding: "3%", overflow: "hidden", width: "84%", backgroundColor:"#ADD8E6", cursor: "pointer", // cursor changes to pointer on hover
                  }}
                    onClick={() => window.open(p.redirectUrl, "blank")} // Redirect entire card
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
                      {p.company || "Not specified"}
                  </Typography>


                  <Typography
                  variant="h5"
                  sx={{ fontSize: "2rem", fontWeight: "600", fontFamily:"sans-serif" }}
                >
             {p.postProfile}
                </Typography>
                <Typography  sx={{ color: "#585858", marginTop:"2%", fontFamily:"cursive" }} variant="body" >
                  {p.postDesc}
                </Typography>
                <br />
                <br />
                {/*<Typography variant="h6" sx={{ fontFamily:"unset", fontSize:"400"}}>*/}
                {/*  /!*Experience: {p.reqExperience} years*!/*/}
                {/*</Typography>*/}

                  <Typography variant="h6" sx={{ fontFamily: "unset", fontSize: "400" }}>
                      Salary:{" "}
                      {p.salary > 0 ? (
                          p.salaryMax > 0
                              ? `€ ${p.salary.toLocaleString()} - ${p.salaryMax.toLocaleString()}`
                              : `€ ${p.salary.toLocaleString()}(+)`
                      ) : "Not specified"}
                  </Typography>

                  <Typography
                      variant="body1"
                      sx={{ color: "#585858", marginTop: "1%", fontFamily: "cursive" }}
                  >
                      Location: {p.location || "Not specified"}
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
                      Posted on: {new Date(p.postDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                  })}
                  </Typography>



                  {/*<Typography sx={{fontFamily:"serif",fontSize:"400"}} gutterBottom  variant="body">Skills : </Typography>*/}
                {/*{p.postTechStack.map((s, i) => {*/}
                {/*  return (*/}
                {/*    <Typography variant="body" gutterBottom key={i}>*/}
                {/*      {s} .*/}
                {/*      {` `}*/}
                {/*    </Typography>*/}
                {/*  );*/}
                {/*})}*/}
               {/*<DeleteIcon onClick={() => handleDelete(p.postId)} />*/}

                  <DeleteIcon
                      onClick={(e) => {
                          e.stopPropagation(); // Prevent the click event from propagating to the parent
                          handleDelete(p.postId); // Call the delete function
                      }}
                  />


                  {/*<EditIcon onClick={() => handleEdit(p.postId)} />*/}
              </Card>
            </Grid>
          );
        })}
    </Grid>
    </>

  )
}

export default Search