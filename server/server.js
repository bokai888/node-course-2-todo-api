let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
let {Todo} = require('./modles/todo');
let {User} = require('./modles/user');

let app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {

        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos/12321312
app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }else {
        Todo.findById(id).then((todo) => {
            if(!todo){
                res.status(404).send()
            }else {
                res.send({todo});
            }
        }).catch((e) => res.status(400).send())
    }

});

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }else{
            res.send({todo});
        }

    }).catch((e) => res.status(400).send());
});


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};