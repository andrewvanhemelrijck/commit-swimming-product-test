import { Mongo } from 'meteor/mongo';

export const SwimmerMeetEntriesCollection = new Mongo.Collection('swimmerMeetEntries');

SwimmerMeetEntriesCollection.allow({
  insert() { return true; },
  remove() { return true; },
});
