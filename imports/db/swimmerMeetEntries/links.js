import { Meteor } from 'meteor/meteor';
import { SwimmerMeetEntriesCollection } from '../../api/swimmerMeetEntries';

SwimmerMeetEntriesCollection.addLinks({
  'swimmer': {
    type: 'one',
    collection: Meteor.swimmers,
    field: 'swimmerID',
  }
})
