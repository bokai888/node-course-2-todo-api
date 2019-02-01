const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/modles/todo');
const {User} =  require('./../server/modles/user');

// let id = "5c52b9b294e67a45b49c30b911";
//
// if(!ObjectID.isValid(id)){
//     console.log("ID not valid")
// }

// Todo.find({
//    _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });
//
// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log("ID not found")
//     }
//     console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));

// User.findByID
let id = "6c5288e107d8df1ea8a6bf16";

User.findById(id).then((user) => {
    if(!user){
        return console.log("User Not Found");
    }
    console.log(`FOUND: ${user.email}`);
}).catch((e) => console.log(e));