const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/modles/todo');
const {User} =  require('./../server/modles/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.deleteOne({})

Todo.findByIdAndDelete("5c59044f281b8f58ec345f7d").then((todo) => {
    console.log(todo);
});
