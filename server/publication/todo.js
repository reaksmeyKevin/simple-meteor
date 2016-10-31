import {Meteor} from 'meteor/meteor';
import {Todo} from '../../both/collections/todo';

Meteor.publish('todos', function({selector, limit}){
    Meteor._sleepForMs(200);
    if(selector){
        return Todo.find(selector, {limit: limit});
    }
    return this.ready();
});