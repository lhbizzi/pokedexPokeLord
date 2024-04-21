import React from 'react'
import Skeleton from '@mui/material/Skeleton'
import { Container } from '@mui/material'

export const Skeletons = () => {
  return (
    <Container maxWidth="xxl" >
        <Skeleton variant="rounded" width='100%' height={150} sx={{ marginBottom: '10px' }}/>
        <Skeleton variant="rounded" width='100%' height={150} sx={{ marginBottom: '10px' }}/>
        <Skeleton variant="rounded" width='100%' height={150} sx={{ marginBottom: '10px' }}/>
        <Skeleton variant="rounded" width='100%' height={150} sx={{ marginBottom: '10px' }}/>
        <Skeleton variant="rounded" width='100%' height={150} sx={{ marginBottom: '10px' }}/>
    </Container>
  )
}

