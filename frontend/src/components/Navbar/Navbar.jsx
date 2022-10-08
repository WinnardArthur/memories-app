import React from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import stories from '../../images/Screenshot_2022.08.28_18.06.11.764.png';
import useStyles from './Styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles(); 
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))) 

    useEffect(() => {
        if(user) {
            const token = user?.token;
    
            const decodedToken = decode(token);
    
            if(decodedToken.exp * 1000 < new Date().getTime()) return logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const logout = () => {
        dispatch({type: 'LOGOUT' })
        history.push('/')

        setUser(null);
    }

  return (
    <AppBar position='sticky' color='inherit' className={classes.appBar}>
        <div className={classes.brandContainer}>
            <Typography component={Link} to='/' variant='h3' align='center' style={{textDecoration: 'none'}}>Stories</Typography>
            <img src={stories} alt='Stories' className={`${classes.img}`}/>
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar src={user.result.picture} alt={user.result.name} className={classes.purple}>{user?.result.name.charAt(0).toUpperCase()}</Avatar>
                    <Typography variant='h6'>{user.result.name}</Typography>
                    <Button variant='contained' color='secondary' onClick={logout}>Logout</Button>
                </div>
            ) : (
                <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar