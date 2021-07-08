import react, { useState, useEffect } from 'react'
import { 
        Box, 
        Button, 
        Divider, 
        makeStyles, 
        Typography 
    } from '@material-ui/core'
import { useAuth } from '../../contexts/AuthContext'

const useStyles = makeStyles ({
    Card: {
        display: 'block',
        justifyContent: 'center',
        height: '27.5rem',
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
})


const MemeCard = (props: any) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const { profile, updateFavorites } = useAuth();

    useEffect(() => {
        if(profile) {
            console.log(profile)
            setLoading(false)
        }
    }, [profile])

    const {
        memeData,
    } = props

    return(
        <Box>
            {memeData.map((cur: any, idx: number) => {
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
                            <Button 
                            onClick={() => 
                                updateFavorites({url:cur.url, name:cur.name})} 
                                variant='contained' color='primary'
                            >
                                Favorite
                            </Button>
                        </Box>
                    </Box>
                )
            })}
        </Box>
    )
}

export default MemeCard