import react, {useEffect, useState} from 'react';
import { Box, Divider, Typography, makeStyles } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';
import { useAuth } from '../../contexts/AuthContext';

const useStyles = makeStyles ({
    Card: {
        display: 'block',
        justifyContent: 'center',
        height: '24rem',
        width: '40rem',
        borderRadius: '5px',
        boxShadow: '2px rgba(0, 0, 0, .2)',
        backgroundColor: 'darkgrey',
        marginBottom: '3rem'
    },
    Image: {
        height: '20rem'
    },
    imageContainer: {
        borderRadius:'5px',
        display: 'flex',
        justifyContent: 'center',
        width: '40rem',
        height: '20rem',
        backgroundColor: 'black',
    }
});

export type Favorite = {
    name: string, 
    url: string
}

const Favorites = () => {
    const classes = useStyles();
    const { profile } = useAuth();
    const [loading, setLoading] = useState(true)
    const [favorites, setFavorites] = useState<Favorite[] | []>([]);

    useEffect(() => {
        if(profile) {
            setFavorites(profile.favorites)
            setLoading(false)
        }
    },[profile])

    return(
        loading ?
        <Box>
            <Skeleton height="3rem" count={1}/>
            <Box display='flex' justifyContent='center'>
                <Skeleton height="30rem" width='22rem' count={1}/>
            </Box>
        </Box>
        :
        <Box width='100%' display='flex' justifyContent='center'>
            <Box className='cardContainer' width='46.1rem' height='50rem'>
                {favorites.map((cur: any, idx: number) => {
                    return( 
                        <Box className={classes.Card} key={idx}>
                            <Box className={classes.imageContainer}>
                                <img alt='meme cards' src={cur.url} className={classes.Image} />
                            </Box>
                            <Divider />
                            <Box display='flex' justifyContent='center'>
                                <Typography variant='h4' color='secondary'>{cur.name}</Typography>
                            </Box>
                            <Box display='flex' justifyContent='center'>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}

export default Favorites