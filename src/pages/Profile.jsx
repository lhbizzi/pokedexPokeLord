import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Box, Chip, Container, Divider, Paper, Typography } from '@mui/material'
import PokeTable  from '../components/PokeTable'
import { useNavigate } from 'react-router-dom'

export const Profile = ({ pokemonData }) => {
    const { name, sprites, moves } = pokemonData || {};
    const navigate = useNavigate();

    useEffect(() => {
        if (!pokemonData) {
            navigate('/')
        }
    }, [])

    if (!pokemonData) return null
    return (
    <>    
        <Navbar hideSearch/>
        <Container maxWidth="md">
            <Paper elevation={3}>
                <Box display="flex" justifyContent="center" alignItems="center" p={5} flexDirection="column">
                    <Typography variant="h4">{name}</Typography>
                    <Box display="flex" m={5} width={'100%'} alignItems={'center'} justifyContent={'center'} marginBottom="15px" sx={{flexDirection: {
                        xs: 'column',
                        md: 'row'
                    }}}>
                        <Box component='img' src={sprites.front_default} width={'100%'} height={'100%'}/>
                        <Box component='img' src={sprites.back_default} width={'100%'} height={'100%'}/>
                        <PokeTable pokemonData={pokemonData}/>
                    </Box>
                    <Box width={'100%'} alignItems={'center'} justifyContent={'center'}>
                        <Divider>Variações</Divider>
                        <Box display='flex' justifyContent='space-between'>
                            <Box component='img' src={sprites.front_shiny} width={'30%'} height={'30%'}/>
                            <Box component='img' src={sprites.front_female} width={'30%'} height={'30%'}/>
                            <Box component='img' src={sprites.front_shiny_female} width={'30%'} height={'30%'}/>
                        </Box>
                        <Box display='flex' justifyContent='space-between'>
                            <Box component='img' src={sprites.back_shiny} width={'30%'} height={'30%'}/>
                            <Box component='img' src={sprites.back_female} width={'30%'} height={'30%'}/>
                            <Box component='img' src={sprites.back_shiny_female} width={'30%'} height={'30%'}/>
                        </Box>
                        <Divider>Habilidades</Divider>
                        <Box textAlign={'center'} marginTop='15px'>
                            {moves.map((moveData, key) => 
                                <Chip key={key} sx ={{ margin: '5px' }} label={moveData.move.name} />                        
                            )}
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    </>

    )
}

