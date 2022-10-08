import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux'; 
import { useHistory } from 'react-router-dom';
import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles'


const Form = ({ currentId, setCurrentId }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const post = useSelector((state) => currentId ? 
        state.posts.posts.find((p) => p._id === currentId) : null)
    const user = JSON.parse(localStorage.getItem('profile'))
    const [postData, setPostData] = useState({
        title: '', 
        message: '',
        selectedFile: '',
        tags: ''
    })

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
        } else {
            dispatch(createPost({...postData, name: user?.result?.name}, history));
        }
        clear();
    }

    if(!user?.result?.name) {
        return (
            <Paper>
                <Typography variant='h6' align='center'>
                    Please sign in to create your own memory
                </Typography>
            </Paper>
        )
    }

    const clear = () => {
        setCurrentId(null)
        setPostData({title: '', message: '', selectedFile: '', tags: ''})
    }

    return (
        <Paper elevation={6} className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6' align='center' className='py-4 '>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField 
                    name='title' 
                    variant='outlined' 
                    label='title' 
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({...postData, title: e.target.value})}       
                />
                <TextField 
                    name='message' 
                    variant='outlined' 
                    label='message' 
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({...postData, message: e.target.value})}       
                />
                <TextField 
                    name='tags' 
                    variant='outlined' 
                    label='tags' 
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}       
                />
                <div style={{padding: '5px 0', width: '94%'}}>
                    <FileBase 
                        type='file'
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                        className={classes.fileInput}
                    />
                    <Button variant='contained' className={classes.buttonSubmit} size='large' type='submit' fullWidth color='primary'>Submit</Button>
                    <Button variant='contained' size='small' onClick={clear} fullWidth color='secondary'>Clear</Button>
                </div>
            </form>
        </Paper>
    )
}

export default Form;