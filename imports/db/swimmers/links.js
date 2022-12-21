import { SwimmersCollection } from '../../api/swimmers';
import { SwimmerMeetEntriesCollection } from '../../api/swimmerMeetEntries';

SwimmersCollection.addLinks({
  'events': {
    collection: SwimmerMeetEntriesCollection,
    inversedBy: 'swimmer',
  },
});
