//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser:true}, (err, client) => {
    if (err){
        return console.log("Not able to connect to MongoDB server.") ;
    }
    console.log("Connected to MongoDB server.");

    const db = client.db('TodoApp');

    // db.collection("Todos").find({
    //     _id: new ObjectID('5c3e8268d0bda31b68e483ba')
    // }).toArray().then((docs) =>{
    //     console.log("Todos");
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log("Unable to fethc todos", err)
    // });

    db.collection("Users").find({name: "Brian Tabor"}).toArray().then((docs) =>{
        console.log(`Users`);
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log("Unable to fetch todos", err)
    });

    //client.close();
});
