import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export default SwimmerMeetEntries = ({ swimmers, swimEvents, swimmerMeetEntries }) => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            {swimEvents.map((swimEvent) => <TableCell key={swimEvent._id}><b>{swimEvent.name}</b></TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {swimmers.map((swimmer) => (
            <TableRow key={swimmer._id}>
              <TableCell><b>{swimmer.name}</b></TableCell>
              {swimEvents.map((swimEvent) => <TableCell key={swimEvent._id}>{swimEvent.name}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
);
