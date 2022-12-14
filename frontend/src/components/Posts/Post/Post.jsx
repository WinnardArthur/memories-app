import React, { useState } from 'react';
import { Typography, Card, CardActions, CardContent, CardMedia, Button } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const Post = ({post, setCurrentId }) => {
    const [likes, setLikes] = useState(post?.likes);
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const userId = user?.result?.sub || user?.result?._id;
    const hasLiked = post?.likes.find((like) => like === userId);


    const handleLike = async () => {
        dispatch(likePost(post._id));

        if(hasLiked) {
            setLikes(post.likes.filter(id => id !== userId))
        } else {
            setLikes([...post.likes, userId])
        }

    }

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId)
            ? (
                <><ThumbUpAltIcon fontSize='small' />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
            ) : (
                <><ThumbUpAltOutlined fontSize='small'/>&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            )
        }

        return <><ThumbUpAltOutlined fontSize='small'/>&nbsp;Like</>
    }

    const openPost = () => {
        history.push(`/posts/${post._id}`)
    }

  return (
    <Card className={classes.card} raised elevation={6}>
        <div  className={classes.cardAction}>
            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} component={'img'}/>
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.sub || user?.result?._id) === post?.creator &&
                <div className={classes.overlay2}>
                    <Button style={{color: 'white'}} size='small' onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize='default' />
                    </Button>
                </div>
            }
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography onClick={openPost} variant='h5' className={classes.title} gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant='body2' component='p' color='textSecondary' gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?.sub || user?.result?._id) === post?.creator &&
                    <Button size='small' color='primary' onClick={() => {dispatch(deletePost(post._id))}}>
                        <DeleteIcon fontSize='small'/>
                        Delete 
                    </Button>
                }
            </CardActions>
        </div>
    </Card>
  )
}

export default Post