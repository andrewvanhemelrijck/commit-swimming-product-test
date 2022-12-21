import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { SwimmersCollection } from '../api/swimmers';
import { SwimEventsCollection } from '../api/swimEvents';
import { SwimmerMeetEntriesCollection } from '../api/swimmerMeetEntries';
import { Grid } from '@mui/material';
import Swimmers from './Swimmers.jsx';
import SwimEvents from './SwimEvents.jsx';
import SwimmerMeetEntries from './SwimmerMeetEntries.jsx';

function findSelectedSwimmer(selectedSwimmerID, swimmersList) {
  return swimmersList.find(({ _id }) => _id === selectedSwimmerID);
}

export default App = () => {
  // get swimmer and event data from meteor
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

  /*
   * Keep track of the current selected swimmer. If this app were in production, or
   * if it were to become more complex it would be necessary to update this
   * everytime swimmers data changes.
   * i.e. (useEffect(() => {}, [swimmers]))
   */
  const [selectedSwimmer, setSelectedSwimmer] = useState();
  
  return (
    <div style={{ flexGrow: 1, margin: 'auto', maxWidth: '1280px' }}>
      <Grid container spacing={{ xs: 6, sm: 8 }}>
        <Grid
          className="printHide"
          item
          sx={{
            minHeight: {xs: 'auto', sm: '24.25em'}
          }}
          xs={12}
          sm={6}
        >
          <Swimmers
            selectedSwimmer={selectedSwimmer}
            setSelectedSwimmer={(id) => setSelectedSwimmer(findSelectedSwimmer(id, swimmers))}
            swimmers={swimmers}
          />
        </Grid>
        <Grid
          className="printHide"
          item
          sx={{
            minHeight: {xs: 'auto', sm: '24.25em'}
          }}
          xs={12}
          sm={6}
        >
          <SwimEvents swimEvents={swimEvents} selectedSwimmer={selectedSwimmer} />
        </Grid>
        <Grid item xs={12}>
          <SwimmerMeetEntries
            swimmers={swimmers}
            swimEvents={swimEvents}
            swimmerMeetEntries={swimmerMeetEntries}
          />
        </Grid>
      </Grid>
    </div>
  );
};
