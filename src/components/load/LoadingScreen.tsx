import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Image from './cover6.jpg';
import { styled, Box } from "@material-ui/core";

const LoadingScreen = () => {
    const LoadingContainer = styled('div')(() => ({
        height: '100%',
        width:'100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
    }))

    return(
        <LoadingContainer>
            <Box>
                <Box paddingBottom="5rem">
                    <img alt='loading screen' src={Image} />
                </Box>
                <Box>
                    <CircularProgress />
                </Box>
            </Box>
        </LoadingContainer>
    )
}

export default LoadingScreen