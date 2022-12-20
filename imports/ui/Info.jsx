import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { SwimmersCollection } from '../api/swimmers';
import { SwimEventsCollection } from '../api/swimEvents';

export const Info = () => {
  const { swimmers, swimEvents } = useTracker(() => {
    return {
      swimmers: SwimmersCollection.find().fetch(),
      swimEvents: SwimEventsCollection.find().fetch(),
    }
  });

  return (
    <div>
      <ul>{swimmers.map(
        (swimmer) => (
          <div key={swimmer._id}>{swimmer.name}</div>
        )
      )}</ul>
      <ul>{swimEvents.map(
        (swimEvent) => (
          <div key={swimEvent._id}>{swimEvent.name}</div>
        )
      )}</ul>
    </div>
  );
};
