import React from 'react';
import {
  List,
  ListItemButton,
  Typography,
} from '@mui/material';

export default Swimmers = ({
  selectedSwimmer,
  setSelectedSwimmer,
  swimmers,
}) => (
  <>
    <Typography variant="h5">Swimmers</Typography>
    <List component="nav">
      {swimmers.map(
        (swimmer) => (
          <ListItemButton
            key={swimmer._id}
            onClick={() => setSelectedSwimmer(swimmer._id)}
            selected={swimmer._id === selectedSwimmer?._id}
          >
            {swimmer.name}
          </ListItemButton>
        )
      )}
    </List>
  </>
);
