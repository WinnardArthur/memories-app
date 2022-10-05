import React, { useEffect } from 'react';
import { Paper, Typography, Divider, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import { getSinglePost } from '../../actions/posts';

const PostDetails = () => {
    const { posts, post, isLoading } = useSelector(state => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getSinglePost(id))
    }, [id])

    if(!post) return null;

    if(isLoading) {
        return <Paper elevation={6}>
            <CircularProgress size="7em" />
        </Paper>
    }

    console.log((post.tags));
    return (
        <Paper elevation={6} style={{padding: '20px', borderRadius: '15px' }}>
            <div>
                <div>
                    <Typography variant='h3' component='h2'>{post.title}</Typography>
                    <Typography gutterBottom variant='h6' color='textSecondary' component='h2'>{post.tags.map(tag => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant='body1' component='p'>{post.message}</Typography>
                    <Typography variant='h6'>Created by: {post.name}</Typography>
                    <Typography variant='body1'>{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{margin: '20px 0'}} />
                    <Typography variant='body1'><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{margin: '20px 0'}} />
                </div>
                <div>
                    <img src={post.selectedFile} />
                </div>
            </div>
        </Paper>
    )
}

export default PostDetails;