import React, { useState } from 'react';
import { Typography, Card, CardActions, CardContent, CardMedia, Button } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useHistory, Link } from 'react-router-dom';

const Post = ({post, setCurrentId }) => {
    const [likes, setLikes] = useState(post?.likes);
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));


    const userId = user?.result?.googleId || user?.result?._id;
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
    <Card raised elevation={6}>
        <Link onClick={openPost}>
            <CardMedia image={post.selectedFile} title={post.title} component={'img'}/>
            <div>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId || user?.result?._id) === post?.creator &&
                <div>
                    <Button style={{color: 'white'}} size='small' onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize='default' />
                    </Button>
                </div>
            }
            <div>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <CardContent>
                <Typography variant='h5' gutterBottom>{post.title}</Typography>
                <Typography variant='body2' component='p' color='textSecondary' gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions>
                <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?.googleId || user?.result?._id) === post?.creator &&
                    <Button size='small' color='primary' onClick={() => {dispatch(deletePost(post._id))}}>
                        <DeleteIcon fontSize='small'/>
                        Delete 
                    </Button>
                }
            </CardActions>
        </Link>
    </Card>
  )
}

export default Post