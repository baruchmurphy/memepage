import react, { useState, useEffect } from 'react';
import axios from 'axios';
import {    
        AppBar, 
        Box, 
        Typography, 
        makeStyles, 
        Divider, 
        ListItem, 
        ListItemText, 
        Drawer, 
        IconButton, 
        List,
        createStyles,
        Toolbar,
        Button
    } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
import ChevronLeftIcon  from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import Skeleton from 'react-loading-skeleton';
import './style.css'
import Favorites from '../../Pages/favorites/Favorites';
import NotFound from '../../components/notfound';
import FeaturedMemes from '../../components/FeaturedMemes';
import { useAuth } from '../../contexts/AuthContext'

const drawerWidth = 240;

const useStyles = makeStyles ((theme: any) =>
    createStyles({
        wrapper: {
            font: '18px/24px proximanova,arial,tahoma,sans-serif',
        },
        appBar: {
            height: '3rem',
            marginBottom: '3rem',
            display: 'inline-flex'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        drawerPaper: {
            width: drawerWidth,
            backgroundColor: 'grey'
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
        }),
            marginLeft: -drawerWidth,
        },
        menuButton: {
            marginLeft: '.5rem',
            justifyContent: 'flex-start',
        },
        logOut: {
            margin: '5px',
            width: '8rem',
            height: '2.5rem'
        },
        toolbar: {
            border: '2px solid white',
            height: '2rem'
        },
        appBarBox: {
            display: 'inline-flex'
        }
    })
);


const Home = () => {
    const { profile, logout } = useAuth();
    const classes = useStyles();
    const history = useHistory();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [memeData, setMemeData] = useState();
    const [content, setContent] = useState<any>(null);

    const getMemeData = async() => {
        try {
            await axios.get(`https://api.imgflip.com/get_memes`)
            .then((response: any) => {
                setMemeData(response.data.data.memes)
            })
            setLoading(false)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        console.log('useEffect')
        if (!memeData) {
            getMemeData()
        }
        setLoading(false);
    },[memeData])

    useEffect(() => {
        if(memeData) {
            console.log(content)
            switch(history.location.pathname) {
                case '/home/favorites':
                    setContent(<Favorites />)
                    break;
                case '/home':
                    setContent(<FeaturedMemes memeData={memeData}/>)
                    break; 
                default: 
                    setContent(<NotFound/>)
                    setLoading(false)
            }
        }
    },[history.location.pathname, memeData])

    console.log('home =====>', profile)

    const drawerItems = [
        {
            name: 'Featured',
            to: '/home'
        },
        {
            name: 'Favorites',
            to: '/home/favorites'
        },
    ];

    // const handleClick = (event: any) => {
    //     setAnchorEl(event.currentTarget)
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const renderDrawerList = () => {
        return drawerItems.map(item => {
            return (
                <div onClick={() => setDrawerOpen(false)} key={item.name}>
                    <Link to={item.to} style={{ textUnderlinePosition:'from-font', color:'#ffcc00' }}>
                        <ListItem button>
                            <ListItemText color='#ffcc00' primary={item.name} />
                        </ListItem>
                        <Divider />
                    </Link>
                </div>
            );
        });
    };

    return(
        loading ?
        <Box>
            <Skeleton height="3rem" count={1}/>
            <Box display='flex' justifyContent='center'>
                <Skeleton height="30rem" width='22rem' count={1}/>
            </Box>
        </Box>
        :
        <Box className={classes.wrapper}>
            <AppBar color='secondary' position='static' className={classes.appBar}>
                <Box className={classes.appBarBox}>
                    <IconButton 
                        edge="start" 
                        className={classes.menuButton} 
                        color="inherit" 
                        aria-label="menu"
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box paddingTop='5px' display='flex' width='100%' height='3rem' justifyContent='center'>
                            <Typography color='primary' variant="h4">
                                UMeme
                            </Typography>
                    </Box>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={drawerOpen}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                    >
                        <Box className={classes.drawerHeader}>
                            <IconButton onClick={() => setDrawerOpen(false)} >
                                <ChevronLeftIcon />
                            </IconButton>
                        </Box>
                        <Divider />
                        <List>
                            {renderDrawerList()}
                        </List>
                    </Drawer>
                    <Button variant='contained' className={classes.logOut} color='primary' onClick={() => logout()} >Log Out</Button>
                </Box>
            </AppBar>
            <main>{content}</main>
        </Box>
    )
}

export default Home