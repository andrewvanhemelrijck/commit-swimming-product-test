import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

export default SwimEvents = ({ swimEvents }) => (
    <List>
      {swimEvents.map(
        (swimEvent) => (
          <ListItem key={swimEvent._id}>
            <ListItemText>{swimEvent.name}</ListItemText>
          </ListItem>
        )
      )}
    </List>
);
