import react from 'react'
import { Box, Divider, Typography } from '@material-ui/core'
import { Star } from '@material-ui/icons'
import { MemeCard } from '../memecard/MemeCard'
import { useAuth } from '../../contexts/AuthContext'

const FeaturedMemes = ({memeData}: {memeData: any}) => {
    const { profile } = useAuth()
    console.log(profile)
    
    return (
        <Box width='100%' display='flex' justifyContent='center'>
            <Box width='46.1rem' height='50rem' className='cardContainer' borderRadius='5px' >
                {memeData && 
                    <MemeCard
                        memeData={memeData}
                    />
                }
            </Box>
        </Box>
    )
}

export default FeaturedMemes