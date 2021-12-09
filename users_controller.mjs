import * as users from './users_model.mjs';
import express from 'express';
const app = express();

const PORT = 3000;

const PrintInterval = 10;
let retrieveCount = 0;
let retrievewithZeroParameters = 0;
let retrievewithOneParameter = 0;

app.use('/retrieve', (req, res,next) =>{
    retrieveCount += 1;
    if (req.query._id !== undefined || req.query.name !== undefined || req.query.age !== undefined || req.query.email !== undefined || req.query.phoneNumber !== undefined)
        retrievewithOneParameter +=1
    else retrievewithZeroParameters +=1 
    if (retrieveCount % 10 == 0){
        console.log(`Total retrieve request: ${retrieveCount}`)
        console.log(`Retrieve request with 0 query parameters: ${retrievewithZeroParameters}`)
        console.log(`Retrieve request with 1 query parameter: ${retrievewithOneParameter}`)
    }
    next()    
});

app.get("/create", (req, res)=>{
    console.log(req.query);
    users.createUser(req.query.name, req.query.age, req.query.email, req.query.phoneNumber)
        .then(user => {
            res.send(user);
        })
        .catch(error => {
            console.error(error);
            res.send({error: 'Request failed'});
        });
});

app.get("/retrieve", (req,res) => {
    console.log(req.query);
    const filter = {};
    if (req.query._id !== undefined)
        filter['_id'] = req.query._id;
    if (req.query.name !== undefined) 
        filter['name'] = req.query.name;
    if (req.query.age !== undefined) 
        filter['age'] = req.query.age;
    if (req.query.email !== undefined) 
        filter['email'] = req.query.email;
    if (req.query.phoneNumber !== undefined) 
        filter['phoneNumber'] = req.query.phoneNumber;      
    users.findUser(filter, '', 0)
        .then(users => {
            console.log(users)
            res.send(users);
        })
        .catch(errors =>{
            console.error(error);
            res.send({error: 'Request failed'});
        });
});

app.get("/update", (req,res) => {
    console.log(req.query);
    const filter = {};
    if (req.query._id !== undefined)
        filter['_id'] = req.query._id;
    if (req.query.name !== undefined) 
        filter['name'] = req.query.name;
    if (req.query.age !== undefined) 
        filter['age'] = req.query.age;
    if (req.query.email !== undefined) 
        filter['email'] = req.query.email;
    if (req.query.phoneNumber !== undefined) 
        filter['phoneNumber'] = req.query.phoneNumber; 
    users.replaceUser(req.query._id, req.query.name, req.query.age, req.query.email, req.query.phoneNumber)
    .then(updateCount => {
        res.send({updateCount: updateCount});
    })
    .catch(error => {
        console.error(error);
        res.send({error: 'Request failed'});
    });
});

app.get("/delete", (req, res) => {
    console.log(req.query)
    const filter = {};
    if (req.query._id !== undefined)
        filter['_id'] = req.query._id;
    if (req.query.name !== undefined) 
        filter['name'] = req.query.name;
    if (req.query.age !== undefined) 
        filter['age'] = req.query.age;
    if (req.query.email !== undefined) 
        filter['email'] = req.query.email;
    if (req.query.phoneNumber !== undefined) 
        filter['phoneNumber'] = req.query.phoneNumber; 
    users.deleteUser(filter)
        .then(deleteCount => {
            console.log(deleteCount);
            res.send({deleteCount: deleteCount});
        })
        .catch(error => {
            console.error(error);
            res.send({error: 'Request failed'});
        });
});


app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}...`);
});




