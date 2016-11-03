import {Meteor} from 'meteor/meteor';
import {Todo} from '../../both/collections/todo';

Meteor.methods({
    removeTodo({_id}){
        Todo.remove(_id);
    }
})