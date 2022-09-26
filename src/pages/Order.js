import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import './order.css'
import { MOBILE_WIDTH, ORDERBOOK_LEVELS } from '../utils/constants';

const rows = [
  // createData(1, 305, 3.7),
  // createData(2, 452, 25.0),
  // createData(3, 262, 16.0)
];

const headCells = [
  {
    id: 1,
    numeric: true,
    disablePadding: true,
    label: 'Price',
  },
  {
    id: 2,
    numeric: true,
    disablePadding: false,
    label: 'Size',
  },
  {
    id: 3,
    numeric: true,
    disablePadding: false,
    label: 'Total',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy } = props;
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          {props.title}
        </Typography>
      )}
    </Toolbar>
  );
};

function Order({ title, data }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar title={title} />
        <TableContainer>
          <div id='table-wrapper' className={title =='Bids'?  'bids': 'asks'}>
            <div id='table-scroll' >
              <Table
                sx={{ minWidth: 750, height: 300 }}
                aria-labelledby='tableTitle'
                stickyHeader
              >
                <EnhancedTableHead />
                <TableBody>
                  {data.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                        <TableCell align='center'>{row.price}</TableCell>
                        <TableCell align='center'>{row.size}</TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          padding='none'
                          align='center'
                        >
                          {row.total}
                        </TableCell>
                      </TableRow>

                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default Order;
