import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

function createData(
  name,
  day,
  time,
) {
  return { name, day, time };
}

const rows = [
  createData('Bible Study', ["WED"], "19:00"),
];

const basicCircle = {
  display: "inline-block",
  height: "26px",
  width: "26px",
  borderRadius: "50px",
  border: "1px solid #ab1ab1",
  padding: "3px 7px",
  marginRight: "3px",
}

export default function ClassesTable() {
  const theme = useTheme()
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
      <Table sx={{ borderRadius: 0, background: theme.palette.grey[200] }} aria-label="simple table">
        <TableHead sx={{background: theme.palette.grey[300]}}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Day(s)</TableCell>
            <TableCell align="right">Time</TableCell>
            {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell> */}
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                <div style={basicCircle}>S</div>
                <div style={basicCircle}>M</div>
                <div style={basicCircle}>T</div>
                <div style={basicCircle}>W</div>
                <div style={basicCircle}>T</div>
                <div style={basicCircle}>F</div>
                <div style={basicCircle}>S</div>

              </TableCell>
              <TableCell align="right">2:00 pm</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}