import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import useStyles from './Styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from'./Icon'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const initialState = {
    firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
}

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        handleShowPassword(false);
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        console.log('res', res)

        try {
            dispatch({type: 'AUTH', data: { result, token }})
            history.push('/')
        } catch (error) {
            console.log('error', error)
        }
    }

    const googleFailure = (error) => {
        console.log(error)
        console.log('Google Sign In was unsuccessful. Try Again Later')        
    }

  return (
    <Container component='main' maxWidth='xs'>
        <Paper className='{classes.paper}' elevation={3}>
            <Avatar className='{classes.avatar}'>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={''} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    { isSignup && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                            </>
                        )}
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email'/>
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                    { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' handleShowPassword={handleShowPassword}/>}
                </Grid>
                <GoogleLogin 
                    clientId='859020375720-o7fp4h6ro0sl0l7m1odvo4l0shaet80r.apps.googleusercontent.com'
                    render={(renderProps) => (
                        <Button color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>Google Sign In</Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy='single_host_origin'
                />
                <Button type='submit' fullWidth variant='contained' color='primary'>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <Grid container justify='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth