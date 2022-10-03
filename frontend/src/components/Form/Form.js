import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux'; 
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? 
        state.posts.find((p) => p._id === currentId) : null)
    
    const [postData, setPostData] = useState({
        creator: '', 
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
            dispatch(updatePost(currentId, postData))
        } else {
            dispatch(createPost(postData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null)
        setPostData({creator: '', title: '', message: '', selectedFile: '', tags: ''})
    }

    return (
        <Paper>
            <form autoComplete='off' noValidate onSubmit={handleSubmit}>
                <Typography variant='h6' align='center' className='py-4 '>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField 
                    name='creator' 
                    variant='outlined' 
                    label='Creator' 
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({...postData, creator: e.target.value})}  
                />
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
                <div>
                    <FileBase 
                        type='file'
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                    <Button variant='contained' size='large' type='submit' fullWidth color='primary'>Submit</Button>
                    <Button variant='contained' size='small' onClick={clear} fullWidth color='secondary'>Clear</Button>
                </div>
            </form>
        </Paper>
    )
}

export default Form;