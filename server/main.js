import { Meteor } from 'meteor/meteor';
import { SwimmersCollection } from '/imports/api/swimmers';
import { SwimEventsCollection } from '/imports/api/swimEvents';
import '/imports/api/swimmerMeetEntries';

async function insertSwimmer({ name }) {
  await SwimmersCollection.insertAsync({ name, createdAt: new Date() });
}

async function insertSwimEvent({ name }) {
  await SwimEventsCollection.insertAsync({ name, createdAt: new Date() });
}

Meteor.startup(async () => {
  // If the Swimmers collection is empty, add some data.
  if (await SwimmersCollection.find().countAsync() === 0) {
    await insertSwimmer({
      name: 'Swimmer1',
    });

    await insertSwimmer({
      name: 'Swimmer2',
    });

    await insertSwimmer({
      name: 'Swimmer3',
    });

    await insertSwimmer({
      name: 'Swimmer4',
    });

    await insertSwimmer({
      name: 'Swimmer5',
    });
  }

  // If the SwimEvents collection is empty, add some data.
  if (await SwimEventsCollection.find().countAsync() === 0) {
    await insertSwimEvent({
      name: '100 Free',
    });

    await insertSwimEvent({
      name: '100 Fly',
    });

    await insertSwimEvent({
      name: '100 Breast',
    });

    await insertSwimEvent({
      name: '100 Back',
    });
  }
});
