//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser:true}, (err, client) => {
    if (err){
        return console.log("Not able to connect to MongoDB server.") ;
    }
    console.log("Connected to MongoDB server.");

    const db = client.db('TodoApp');

    // findOneAndUpdate
    // db.collection("Todos").findOneAndUpdate({
    //     _id : ObjectID("5c4fddc80b24ab354c700975"),
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((results) => {
    //     console.log(results);
    // });


    db.collection("Users").findOneAndUpdate({
        _id: ObjectID("5c3e7bf180a5da3068706df9")
    }, {
        $set: {
            name: "Cyle Tabor"
        },
        $inc: {
            age: 1
        }

    },{
        returnOriginal: false
    }).then((results) => {
        console.log(results);
    });





    //client.close();
});
