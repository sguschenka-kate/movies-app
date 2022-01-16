import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ButtonBase, IconButton, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table } from '@mui/material';
import { ShowMovieInfo } from '../ShowMovieInfo';
import * as TYPES from '../../store/actions';
import { get } from '../../api';

function MoviesTable({movies, deleteMovie}) {
  const [sortDirection, setSortDirection] = useState(null);
  const dispatch = useDispatch();

  async function sortByTitle(order) {
    setSortDirection(order);
    const r = await get('movies', {sort: 'title', order: order});
    console.log(r.data)
    dispatch({
      type: TYPES.SORT_MOVIES,
      payload: r
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">

        <TableHead>
          <TableRow>
            <TableCell align="left">id</TableCell>
            <TableCell align="center">
              {!sortDirection &&
                <ButtonBase onClick={()=>sortByTitle('ASC')}>
                  Title
                </ButtonBase>}
              {
                //стрелка вниз, от а до я
                sortDirection === 'ASC'
                  &&
                <ButtonBase type="icon" onClick={()=>sortByTitle('DESC')}>
                  Title
                  <ArrowDownwardIcon/>
                </ButtonBase>
              }
              {
                //стрелка вверх, от я до а
                sortDirection === 'DESC'
                  &&
                <ButtonBase type="icon" onClick={()=>sortByTitle('ASC')}>
                  Title
                  <ArrowUpwardIcon/>
                </ButtonBase>
              }
            </TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">Format</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {movies && movies.length > 0 && movies.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left" component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.year}</TableCell>
              <TableCell align="right">{row.format}</TableCell>
              <TableCell align="right">
                <ShowMovieInfo id={row.id} />

                <IconButton size="large" onClick={() => deleteMovie(row.id)}>
                  <DeleteForeverOutlinedIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}

export {
  MoviesTable
}