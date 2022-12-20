import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

export default Swimmers = ({ swimmers }) => (
    <List>
      {swimmers.map(
        (swimmer) => (
          <ListItem key={swimmer._id}>
            <ListItemText>{swimmer.name}</ListItemText>
          </ListItem>
        )
      )}
    </List>
);
