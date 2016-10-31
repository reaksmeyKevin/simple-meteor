import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Todo } from '../both/collections/todo'
import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  this.loaded = new ReactiveVar(0);
  this.limit = new ReactiveVar(10);
  this.autorun(() => {
    this.subsrciption = Meteor.subscribe('todos', { selector: {}, limit: this.limit.get() });
  });
});
Template.hello.onRendered(function helloOnRendered() {
  this.autorun(() => {
    if (this.subsrciption.ready()) {
      this.loaded.set(this.limit.get());
    }
  })
});
Template.hello.helpers({
  todos() {
    let instance = Template.instance();
    return Todo.find({}, { limit: instance.loaded.get() });
  },
  hasMore() {
    let instance = Template.instance();
    return Todo.find({}, {limit: instance.loaded.get()}).count() >= instance.limit.get();
  }
});

Template.hello.events({
 'click .loadMore': function (event, instance) {
    event.preventDefault();

    // get current value for limit, i.e. how many posts are currently displayed
    var limit = instance.limit.get();

    // increase limit by 5 and update it
    limit += 10;
    instance.limit.set(limit);
  }
});
