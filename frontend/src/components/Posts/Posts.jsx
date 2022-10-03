import React from 'react'
import Post from './Post/Post';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);

    console.log(posts);
  return (
    !posts.length ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={3}>
            {posts.map((post) =>  (
                <Grid key={post._id} item xs={12} sm={6}>
                    <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    )
  )
}

export default Posts