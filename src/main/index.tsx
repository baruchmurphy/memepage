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
        Avatar,
        Menu
    } from '@material-ui/core';
import { Star } from '@material-ui/icons'
import { Link, useHistory } from "react-router-dom";
import  ChevronLeftIcon  from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import { MemeCard } from '../components/MemeCard';
import Skeleton from 'react-loading-skeleton';
import './style.css'

const drawerWidth = 240;

const useStyles = makeStyles ((theme: any) =>
    createStyles({
        appbar: {
            height: '3rem',
            textAlign: 'center',
            position: 'relative',
            marginBottom: '3rem',
            display: 'inline-flex',
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        wrapper: {
            font: '18px/24px proximanova,arial,tahoma,sans-serif',
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
            marginRight: theme.spacing(2),
            justifyContent: 'flex-start',
        },
        title: {
            flexGrow: 1,
        },
    })
);


const Home = () => {
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [memeData, setMemeData] = useState();

    const getMemeData = async() => {
        try {
            await axios.get(`https://api.imgflip.com/get_memes`)
            .then((response: any) => {
                setMemeData(response.data.data.memes)
            })
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
        // console.log(memeData)
    },[memeData])

    const drawerItems = [
        {
            name: 'Favorites',
            to: '/home/favorites'
        },
    ];

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderDrawerList = () => {
        return drawerItems.map(item => {
            return (
                <div onClick={() => setDrawerOpen(false)} key={item.name}>
                    <Link to={item.to} style={{ textDecoration: 'none' }}>
                        <ListItem button>
                            <ListItemText primary={item.name} />
                        </ListItem>
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
            <AppBar color='secondary' className={classes.appbar}>
                <Toolbar>
                    <IconButton 
                        edge="start" 
                        className={classes.menuButton} 
                        color="inherit" 
                        aria-label="menu"
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography color='primary' variant="h4" className={classes.title}>
                        UMeme
                    </Typography>
                </Toolbar>
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
                    <Divider />
                </Drawer>
            </AppBar>
            <Box width='100%' display='flex'>
                <Box marginRight='5rem' height='50rem' width='15rem' alignItems='center'>
                    <Typography variant='h5' color='primary'><Star className='star'/>Featured</Typography>
                    <Divider light={true} />
                    <Typography variant='h6' color='primary'>Favorites</Typography>
                </Box>
                <Box width='46.1rem' height='50rem' className='cardContainer' borderRadius='5px' >
                    {memeData && 
                        <MemeCard
                            memeData={memeData}
                        />
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default Home