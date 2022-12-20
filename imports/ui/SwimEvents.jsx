import React from 'react';
import { SwimmerMeetEntriesCollection } from '../api/swimmerMeetEntries';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default SwimEvents = ({ swimEvents, selectedSwimmer }) => {
  if (!selectedSwimmer) return <i>Select a swimmer</i>;
  return (
    <div>
      <h3>{selectedSwimmer?.name || ' '}</h3>
      <List>
        <ListSubheader disableGutters>Entered</ListSubheader>
        <ListSubheader disableGutters>Available</ListSubheader>
        {swimEvents.map(
          (swimEvent) => (
            <ListItem
              key={swimEvent._id}
              dense
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => console.log(selectedSwimmer?._id, swimEvent._id)}
                  size="small"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              }
            >
              <ListItemText>{swimEvent.name}</ListItemText>
            </ListItem>
          )
        )}
      </List>
    </div>
  );
};
