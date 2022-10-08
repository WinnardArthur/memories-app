import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',

        [theme.breakpoints.only('xs')]: {
            flexDirection: 'column',
            padding: '10px'
        },
        [theme.breakpoints.only('sm')]: {
            flexDirection: 'column',
            padding: '50px'
        }
    },
    img: {
        marginLeft: '10px',
        borderRadius: '50%',
        width: 40,
        height: 40,
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',

        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '100%',
        alignItems: 'center',

        [theme.breakpoints.down('sm')]: {
            justifyContent: 'space-between',
            marginTop: '20px' 
        }
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500]
    }
}))