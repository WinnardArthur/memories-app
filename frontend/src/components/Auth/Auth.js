import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import useStyles from './Styles';
import decode from 'jwt-decode';

const initialState = {
    firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
}

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();

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
        const token = res?.credential;
        const result = decode(res.credential);

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
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
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
                
                <Button type='submit' className={classes.submit} fullWidth variant='contained' color='primary'>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                {!isSignup && 
                    <div style={{display: 'flex', justifyContent: 'flex-end', margin: '1rem 0 1.2rem'}}>
                        <GoogleLogin 
                            onSuccess={googleSuccess}
                            onError={googleFailure}
                            useOneTap
                            size='medium'
                            />
                    </div>
                }
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