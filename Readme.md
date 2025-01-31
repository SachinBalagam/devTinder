#DevTinder

1. Inistialising the Project
   npm init
2. Created a src folder

3. Creating a Server to listen, for that we need express js
   npm i express

4. why node_modules, package-lock.json, and .bin in node_modules???
   what are dependencies in package.json

5. why version always in three digits like 5.21.4
   5(major version).21(minor version).4(patch)
   5 = Major version (No backward compatability, code changes may require)
   21 = Minor version (Backward compatability, new features added, no code changes required)
   4 = Patch (bug fix, backward compatability, no code change required)

6. what is the use or caret before version like ^5.21.4??
   Automatically updates to the 5.x.x new version

7. what is the use or tilda before version like ~5.21.4?
   Automatically updates to the 5.21.x new version

8. what are request handlers

9. Installing nodemon to automatically restart the server when code changes are made
   npm i -g nodemon

10. Adding the scripts in package.json to make life easier
    scripts:{
    "dev": "nodemon app.js"
    "start":"node app.js
    }
    To run : npm run start/npm start (or) npm run dev

S02 E04

1. Initialize the git repository
2. we can re-install all the node_modules within the project using "npm install"
   this command install all the modules which are described in the package-lock.json or package.json file.so if we have package-lock.json or package.json file we can re install all the modules.
3. however package-lock.json takes the precendence

4. we should not push the node_modules to the git hub because anyways we can install all modules with npm install command.

5. so to ignore node-modules we should create a .gitignore file and write the path of node-modules so that git wont track those files or folders which we are given in the .gitignore file.

6. create a remote repository in github and push all the code to that remote repository

## Routing and Request Handlers

app.use("/", (req, res) => {
res.send("Hi from server /");
});

Here after this code what ever you give for app.use(), it wont trigger because it executes line by line and in the first line itself "/" is there so what ever the response sends from this function it show that only.

To execute post,put,patch,delete we need POSTMAN application.Dowload it and create a workspace there
and also create collections in it.

app.use() -> Matches all the HTTP Methods
app.get() -> Matches only HTTP GET Method

some path patterns

1. /ab?c -> here is b is optional
2. /ab+c -> here b can be used n number of times like /abbbbbbbbbbc
3. /ab\*(star)cd => here after 'ab' you can place any thing and at last you need to give 'cd' like /abSACHINcd

we can do multiple things here like /a(bc)?d
Here now 'bc' is optional

We can also write regex in that path like '/a/'
It will work if in the given path atleast one 'a' present like /cab or /race or /pmal

1. /.\*fly$/ -> starts with anything any ends with fly

S02 E05 Middlewares and Error Handlers

1. what will happens if we dont send any response if someone called a method like,

app.get('/', (req,res)=>{

})

what will we get response here...

2. what will we get response for below

app.get(
"/user",
(req, res) => {
console.log(req.query);
res.send({ firstName: req.query });
},
(req, res) => {
console.log("2nd Response");
res.send("2nd Response");
}
);

2. We can add multiple route handlers in single request like
   app.get('/', [rh1, rh2, rh3],rh4,rh5)
   rh -> route handlers

3. we need to use next() in the function to execute the route handlers like

app.get(
"/user",
[
(req, res, next) => {
console.log("1st Response ");
// res.send({ firstName: "1st Response" });
next();
},
(req, res, next) => {
console.log("2nd Response");
next();
},
],
(req, res, next) => {
console.log("3rd Response");
next();
},
(req, res) => {
console.log("4th Response");
res.send("4th Response");
}
);

what is diff between app.use() and app.all()

app.use('/', (err,req,res,next)=>{})

## S02 E06 Database Schemas, Models and Mangoose

1. what is cluster? Types of cluster
2. what is atlas
3. what is mongodb compass
4. what is mongoose

mongoose.connect() is used to connect to the cluster.

The mongoose.connect() method indeed returns a Promise, which represents the eventual completion (or failure) of the asynchronous database connection operation. To handle this promise, you can either use .then()/.catch() or the modern async/await syntax.

"mongodb+srv://username:password@namastenode.rs16p.mongodb.net/"
Add your username and password in place os those strings
The above path is to connect to the cluster

if you want to connect to the particular database you can add it to the end of that string
mongodb+srv://username:password@namastenode.rs16p.mongodb.net/devTinder

First we need to connect to the cluster/database then we need to listen to the port 7777. we need to write a program in that way

## Creating Schemas and models using mongoose

import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
firstName:{
type:String
},
firstName:{
type:String
}
})

export const UserModel = mongoose.model("User", userSchema);
1.Here model names should starts with capital letters

## creating Usermodel instance with the actual details and saving to database

app.post('/user', async (req,res)=>{
const userObj = {
firstName:"sachin",
lastName:"balagam"
}
const user = new UserModel(userObj);
await user.save(); -> here it saves the data
})

## flow of mongodb

cluster -> server -> database -> collection -> document

find()
findOne()
findById()
