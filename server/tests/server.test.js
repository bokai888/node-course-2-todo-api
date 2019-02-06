const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../modles/todo');

const todos = [{
    _id: new ObjectID(),
    text: "first test todo"
},{
    _id: new ObjectID(),
    text: "Second test todo",
    completed:true,
    completedAt: 333
}];

beforeEach((done) => {
   Todo.remove({}).then(() => {
       return Todo.insertMany(todos);
   }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) =>{
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                   return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it("Should not create todo with invalid body data", (done) => {
        let text = '';

        request(app)
            .post('/todos')
            .send({text})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });

    });
});

describe('GET /todos', () => {
    it('Should get all todos', (done) =>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('Should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);

    });
    it('Should return 404 if todo not found', (done) => {
        let hexId = new ObjectID().toHexString();
       request(app)
           .get(`/todos/${hexId}`)
           .expect(404)
           .end(done);
    });
    it('Should return 404 for non-object ids', (done) => {
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    })
});

describe('DELETE /todos/:id', () => {
    it('Should delete todo doc', (done) => {
        let hexId = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId)
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.findById(hexId).then((todo) => {
                    expect(todo).toBeNull();
                    done();
                }).catch((e) => done(e));

            });
    });
    it('Should return 404 if todo not found', (done) => {
        let hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });
    it('Should return 404 for non-object ids', (done) => {
        request(app)
            .delete('/todos/1234')
            .expect(404)
            .end(done);
    })
});
describe('PATCH /todos/:id', () => {
    it("Should Update Todo Doc", (done) => {
        let hexId = todos[0]._id.toHexString();


        let updateText = {
            text: "test text",
            completed: true
        };

        request(app)
            .patch(`/todos/${hexId}`)
            .send(updateText)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(updateText.text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof(res.body.todo.completedAt)).toBe('number');
            })
            .end(done);
    });
    it("Should Clear compltedAT when todo is not completed", (done) => {
        let hexID2 = todos[1]._id.toHexString();

        let updateText2 = {
            text: "test text 2",
            completed: false
        };

        request(app)
            .patch(`/todos/${hexID2}`)
            .send(updateText2)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(updateText2.text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeNull();
            })
            .end(done);


    });

});