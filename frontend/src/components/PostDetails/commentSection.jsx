import React, { useState, useRef } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';
import useStyles from './styles';

const CommentSection = ({ post }) => {
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post.comments);
    const [comment, setComment] = useState('');
    const commentRef = useRef();
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles()
    
    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`

        const newComments = await dispatch(commentPost(finalComment, post._id));

        setComments(newComments);
        setComment('')

        commentRef.current.scrollIntoView({ behavior: 'smooth' })
    }

  return (
    <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
            <Typography gutterBottom variant='h6'>Comments</Typography>
            {comments?.map((c, i) => (
                <Typography key={i} gutterBottom variant='subtitle1'>
                    <strong>{String(c).split(': ')[0]}</strong>
                    {String(c).split(':')[1]}
                </Typography>
            ))}
            <div ref={commentRef}/>
        </div>
        {user?.result?.name && (
            <div style={{width: '70%'}}>
                <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                <TextField 
                    fullWidth
                    rows={4}
                    variant='outlined'
                    label="Comment"
                    multiline
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <Button color='primary' style={{marginTop: '10px'}} fullWidth disabled={!comment} variant='contained' onClick={handleClick}>
                    Comment
                </Button>
            </div>
        )}
    </div>
  )
}

export default CommentSection