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
        const token = user?.token;

        const decodedeToken = decode(token);

        if(decodedToken.exp * 1000 < new Date().getTime()) logout();

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const logout = () => {
        dispatch({type: 'LOGOUT' })
        history.push('/')

        setUser(null);
    }

  return (
    <AppBar position='static' color='inherit' className={classes.appBar}>
        <div className={classes.brandContainer}>
            <Typography component={Link} to='/' variant='h2' align='center'>Stories</Typography>
            <img src={stories} alt='Stories' className={`${classes.img} w-10 h-10`}/>
        </div>
        <Toolbar>
            {user ? (
                <div>
                    <Avatar src={user.result.imageUrl} alt={user.result.name} />
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