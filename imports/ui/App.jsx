import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { SwimmersCollection } from '../api/swimmers';
import { SwimEventsCollection } from '../api/swimEvents';
import { SwimmerMeetEntriesCollection } from '../api/swimmerMeetEntries';
import { Grid, Item } from '@mui/material';
import Swimmers from './Swimmers.jsx';
import SwimEvents from './SwimEvents.jsx';
import SwimmerMeetEntries from './SwimmerMeetEntries.jsx';

export default App = () => {
  const {
    swimmers,
    swimEvents,
    swimmerMeetEntries,
  } = useTracker(() => {
    return {
      swimmers: SwimmersCollection.find().fetch(),
      swimEvents: SwimEventsCollection.find().fetch(),
      swimmerMeetEntries: SwimmerMeetEntriesCollection.find().fetch(),
    }
  });
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <h2>Swimmers</h2>
        <Swimmers swimmers={swimmers} />
      </Grid>
      <Grid item xs={6}>
        <h2>Events</h2>
        <SwimEvents swimEvents={swimEvents} />
      </Grid>
      <Grid item xs={12}>
        <h2>Entry Report</h2>
        <SwimmerMeetEntries
          swimmers={swimmers}
          swimEvents={swimEvents}
          swimmerMeetEntries={swimmerMeetEntries}
        />
      </Grid>
    </Grid>
  );
};
