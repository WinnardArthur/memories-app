import React from 'react';
import { Typography, Card, CardActions, CardContent, CardMedia, Button } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({post, setCurrentId }) => {
    const dispatch = useDispatch();
  return (
    <Card>
        <CardMedia image={post.selectedFile} title={post.title} component={'img'}/>
        <div>
            <Typography variant='h6'>{post.name}</Typography>
            <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div>
            <Button 
                style={{color: 'white'}} 
                size='small' 
                onClick={() => setCurrentId(post._id)}
            >
                <MoreHorizIcon fontSize='default' />
            </Button>
        </div>
        <div>
            <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <CardContent>
            <Typography variant='h5' gutterBottom>{post.title}</Typography>
            <Typography variant='body2' component='p' color='textSecondary' gutterBottom>{post.message}</Typography>
        </CardContent>
        <CardActions>
            <Button size='small' color='primary' onClick={() => {dispatch(likePost(post._id))}}>
                <ThumbUpAltIcon fontSize='small'/>
                &nbsp;Like&nbsp;
                {post.likeCount}
            </Button>
            <Button size='small' color='primary' onClick={() => {dispatch(deletePost(post._id))}}>
                <DeleteIcon fontSize='small'/>
                Delete 
            </Button>
        </CardActions>
    </Card>
  )
}

export default Post