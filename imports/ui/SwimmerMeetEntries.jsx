import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { SwimmerMeetEntriesCollection } from '../api/swimmerMeetEntries';
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Check, AddCircleOutline } from '@mui/icons-material';

function mapMeetEntriesToSwimmerId(swimmers, swimmerMeetEntries) {
  const hashMap = {};

  // map meet entries by swimmer id
  swimmers.forEach((swimmer) => hashMap[swimmer._id] = {});

  // map each entry to swimmer id by entry id
  swimmerMeetEntries.forEach((swimmerMeetEntry) => {
    if (!hashMap[swimmerMeetEntry.swimmerId]) return;
    hashMap[swimmerMeetEntry.swimmerId][swimmerMeetEntry.eventId] = swimmerMeetEntry;
  });
  return hashMap;
}

export default SwimmerMeetEntries = ({ swimmers, swimEvents }) => {
  const swimmerMeetEntries = useTracker(() => SwimmerMeetEntriesCollection.find().fetch());

  // in production or a more complex app, this should not be calculated every render (useEffect or useMemo)
  const meetEntriesToswimmerIdHashMap = mapMeetEntriesToSwimmerId(swimmers, swimmerMeetEntries);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Entry Report</h2>
        <Button
          className="printHide"
          onClick={()=> window.print()}
          variant="outlined"
        >
          Print
        </Button>
      </div>
      <TableContainer>
        <Table size="small">
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
                {swimEvents.map((swimEvent) => (
                  <TableCell key={swimEvent._id}>
                    {
                      // if there is an entry for this event mapped to the user id show check, otherwise show add button
                      Object.keys(meetEntriesToswimmerIdHashMap[swimmer._id])?.includes(swimEvent._id)
                        ? (
                          <IconButton
                            onClick={() => SwimmerMeetEntriesCollection.remove(meetEntriesToswimmerIdHashMap[swimmer._id][swimEvent._id]._id)}
                          >
                            <Check />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() => {
                              SwimmerMeetEntriesCollection.insert({
                                swimmerId: swimmer._id,
                                eventId: swimEvent._id,
                                createdAt: new Date(),
                              })
                            }}
                          >
                            <AddCircleOutline />
                          </IconButton>
                        )
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
