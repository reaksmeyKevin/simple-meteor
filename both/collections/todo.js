export const Todo = new Mongo.Collection('todo');

Todo.schema = new SimpleSchema({
    title: {
        type: String
    },
    des: {
        type: String,
        label: 'Description'
    }
});
Todo.attachSchema(Todo.schema);