import react from 'react'
import { Box, Button, Divider, makeStyles, Typography } from '@material-ui/core'

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


export const MemeCard = (props: any) => {
    const classes = useStyles();

    const {
        memeData,
    } = props

    console.log(memeData)

    return(
        <Box>
                {memeData.map((cur: any) => {
                    return( 
                        <Box className={classes.Card}>
                            <Box className={classes.imageContainer}>
                                <img src={cur.url} className={classes.Image} />
                            </Box>
                            <Divider />
                            <Box display='flex' justifyContent='center'>
                                <Typography variant='h4' color='secondary'>{cur.name}</Typography>
                            </Box>
                            <Box display='flex' justifyContent='center'>
                                <Button variant='contained' color='primary' >Favorite</Button>
                            </Box>
                        </Box>
                    )
                })}
        </Box>
    )
}