//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser:true}, (err, client) => {
    if (err){
        return console.log("Not able to connect to MongoDB server.") ;
    }
    console.log("Connected to MongoDB server.");

    const db = client.db('TodoApp');

    // deleteMany

    // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
    //     console.log(result);
    // });

    // deleteOne

    // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((results) => {
    //    console.log(results);
    // });

    //findOneAndDelete
    // db.collection("Todos").findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // delete Many Users
    // db.collection('Users').deleteMany({name: 'Kenny G'}).then((results) => {
    //     console.log(results);
    // });

    // findOneAndDelete
    db.collection("Users").findOneAndDelete({_id: ObjectID("5c5158260b24ab354c7021e8")}).then((results) => {
        console.log(results);
    });





    //client.close();
});
