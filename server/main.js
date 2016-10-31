import { Meteor } from 'meteor/meteor';
import { Todo } from '../both/collections/todo';
Meteor.startup(() => {
  // code to run on server at startup
  if (Todo.find().count() <= 0) {
    for(let i =0; i < 100 ; i++){
      Todo.insert({title: `Todo ${i}`});
    }
  }
});
