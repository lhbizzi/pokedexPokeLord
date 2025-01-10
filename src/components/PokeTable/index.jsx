import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { typeHandler } from '../../utils';

export default function PokeTable(pokemonData) {
    const { height, weight, types } = pokemonData.pokemonData;
    return (
        <TableContainer component={Paper} sx={{ height: 'fit-content', boxShadow: 'none'}}>
            <Table aria-label="a dense table">
                <TableBody>
                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell align="left">Altura:</TableCell>
                        <TableCell align="left">{height/10} m</TableCell>
                    </TableRow>
                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell align="left">Peso:</TableCell>
                        <TableCell align="left">{weight/10} kg</TableCell>
                    </TableRow>
                    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell align="left">Tipo:</TableCell>
                        <TableCell align="left">{typeHandler(types)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
