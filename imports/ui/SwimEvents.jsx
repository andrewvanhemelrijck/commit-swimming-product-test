import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { SwimmerMeetEntriesCollection } from '../api/swimmerMeetEntries';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

function mapSwimmerMeetEntriesToEventIds(swimmerMeetEntries) {
  const hashMap = {};
  swimmerMeetEntries.forEach(({ _id, eventId }) => {
    hashMap[eventId] = _id
  });
  return hashMap;
}

function sortEventsByEnteredStatus(swimEvents, enteredEventIds) {
  const entered = [];
  const available = [];
  swimEvents.forEach((swimEvent) => {
    if (enteredEventIds.includes(swimEvent._id)) entered.push(swimEvent);
    else available.push(swimEvent);
  });
  return {
    entered,
    available,
  };
}

const SwimEvent = ({ eventName, swimmerId, actionButtonIcon, onClick }) => (
  <ListItem
    dense
    secondaryAction={
      <IconButton
        edge="end"
        onClick={() => {
          if (!swimmerId) throw new Error('No swimmer selected');
          onClick();
        }}
        size="small"
      >
        {actionButtonIcon}
      </IconButton>
    }
  >
    <ListItemText>{eventName}</ListItemText>
  </ListItem>
);

export default SwimEvents = ({ swimEvents, selectedSwimmer }) => {
  const swimmerMeetEntries = useTracker(() => SwimmerMeetEntriesCollection.find({ swimmerId: selectedSwimmer?._id }).fetch());

  // in production or a more complex app, this should not be calculated every render (useEffect or useMemo)
  const swimmerMeetEntryToEventIdHashMap = mapSwimmerMeetEntriesToEventIds(swimmerMeetEntries);
  const { entered, available } = sortEventsByEnteredStatus(swimEvents, Object.keys(swimmerMeetEntryToEventIdHashMap), );

  return (
    <>
      <h2>Events</h2>
      {
        !selectedSwimmer
          ? <i>Select a swimmer</i>
          : (
            <>
              <h3 style={{ margin: 0 }}>{selectedSwimmer?.name || ' '}</h3>
              <List>
                <ListSubheader disableGutters>Entered</ListSubheader>
                {entered.map(
                  (swimEvent) => (
                    <SwimEvent
                      key={swimEvent._id}
                      eventName={swimEvent.name}
                      swimmerId={selectedSwimmer._id}
                      actionButtonIcon={<RemoveCircleOutline />}
                      onClick={() => SwimmerMeetEntriesCollection.remove(swimmerMeetEntryToEventIdHashMap[swimEvent._id])}
                    />
                  )
                )}
                <ListSubheader disableGutters>Available</ListSubheader>
                {available.map(
                  (swimEvent) => (
                    <SwimEvent
                      key={swimEvent._id}
                      eventName={swimEvent.name}
                      swimmerId={selectedSwimmer._id}
                      actionButtonIcon={<AddCircleOutline />}
                      onClick={() => {
                        SwimmerMeetEntriesCollection.insert({
                          swimmerId: selectedSwimmer._id,
                          eventId: swimEvent._id,
                          createdAt: new Date(),
                        })
                      }}
                    />
                  )
                )}
              </List>
            </>
          )
      }
    </>
  );
};
