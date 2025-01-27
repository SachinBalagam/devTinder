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
