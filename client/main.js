import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import { Todo } from '../both/collections/todo'
import { Meteor } from 'meteor/meteor'
import { AutoForm } from 'meteor/aldeed:autoform'
import { Bert } from 'meteor/themeteorchef:bert'
import './main.html'
let currentData = new ReactiveVar()
Template.hello.onCreated(function helloOnCreated () {
  currentData = new ReactiveVar(this.data)
  this.loaded = new ReactiveVar(0)
  this.limit = new ReactiveVar(10)
  this.autorun(() => {
    this.subsrciption = Meteor.subscribe('todos', { selector: {}, limit: this.limit.get() })
  })
})
Template.hello.onRendered(function helloOnRendered () {
  this.autorun(() => {
    if (this.subsrciption.ready()) {
      this.loaded.set(this.limit.get())
    }
  })
})
Template.hello.helpers({
  type() {
    console.log(_.isEmpty(currentData.get()) ? 'insert' : 'update')
    return _.isEmpty(currentData.get()) ? 'insert' : 'update'
  },
  data() {
    return currentData.get()
  },
  todos() {
    let instance = Template.instance()
    return Todo.find({}, { limit: instance.loaded.get() })
  },
  hasMore() {
    let instance = Template.instance()
    return Todo.find({}, {limit: instance.loaded.get()}).count() >= instance.limit.get()
  },
  collection() {
    return Todo
  }
})

Template.hello.events({
  'click .loadMore': function (event, instance) {
    event.preventDefault()

    // get current value for limit, i.e. how many posts are currently displayed
    var limit = instance.limit.get()

    // increase limit by 5 and update it
    limit += 10
    instance.limit.set(limit)
  },
  'click .remove'(event, instance) {
    let data = this
    Todo.remove(this._id)
  },
  'click .update'(event, instance) {
    currentData.set(this)
  }
})

AutoForm.hooks({
  todo: {
    onSuccess(formType, result) {
      if (formType == 'update') {
        currentData.set({})
      }
    },
    onError(formType, error) {
      console.log(error.message)
    }
  }
})
