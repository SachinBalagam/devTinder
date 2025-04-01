# DevTinder

DevTinder is a Node.js-based backend application designed to facilitate developer networking through a Tinder-like experience. This project follows a structured approach using Express.js, MongoDB, and authentication mechanisms.

## Project Setup

### 1. Initializing the Project

```sh
npm init -y
```

This command generates a `package.json` file containing metadata about the project and its dependencies.

### 2. Creating the `src` Folder

Organizing the code inside a `src` directory helps maintain a clean structure.

### 3. Installing Express.js

Express is required to set up the backend server:

```sh
npm i express
```

### 4. Understanding `node_modules`, `package-lock.json`, and Dependencies

- `node_modules/`: Contains all installed dependencies. It should **not** be pushed to GitHub.
- `package-lock.json`: Locks dependency versions for consistency across environments.
- `dependencies`: Listed in `package.json`, these specify the required packages for the project.

### 5. Versioning in `package.json`

- Example: `5.21.4`
  - `5` → **Major version** (Breaking changes, no backward compatibility)
  - `21` → **Minor version** (New features, backward-compatible)
  - `4` → **Patch version** (Bug fixes, backward-compatible)

### 6. Understanding Caret (`^`) and Tilde (`~`)

- `^5.21.4`: Updates to the latest `5.x.x` version.
- `~5.21.4`: Updates to the latest `5.21.x` version.

## Server Setup

### 1. Creating a Simple Server

```js
import express from "express";
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to DevTinder API!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

Run the server:

```sh
node app.js
```

### 2. Installing Nodemon

To automatically restart the server when changes are made:

```sh
npm i -g nodemon
```

Add scripts to `package.json`:

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

Run:

```sh
npm run dev
```

## Git and Version Control

### 1. Initializing Git Repository

```sh
git init
```

### 2. Ignoring `node_modules`

Create a `.gitignore` file and add:

```
node_modules/
.env
```

### 3. Setting Up a GitHub Repository

```sh
git remote add origin <repo_url>
git add .
git commit -m "Initial commit"
git push -u origin main
```

## Routing and Request Handlers

### 1. Basic Route Handling

```js
app.get("/user", (req, res) => {
  res.send("User route");
});
```

### 2. Route Matching Examples

```js
app.get("/ab?c", (req, res) => res.send("Matches 'ac' or 'abc'"));
app.get("/ab+c", (req, res) => res.send("Matches 'abc', 'abbc', etc."));
app.get("/ab*cd", (req, res) =>
  res.send("Matches anything between 'ab' and 'cd'")
);
```

### 3. Middleware and Error Handling

```js
app.use((req, res, next) => {
  console.log("Middleware executed");
  next();
});

app.use((err, req, res, next) => {
  res.status(500).send("Internal Server Error");
});
```

## Database Setup with MongoDB

### 1. Connecting to MongoDB

```js
import mongoose from "mongoose";
mongoose
  .connect("mongodb+srv://username:password@cluster.mongodb.net/devTinder")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));
```

### 2. Defining a Schema and Model

```js
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
export const UserModel = mongoose.model("User", userSchema);
```

### 3. Saving Data to Database

```js
app.post("/user", async (req, res) => {
  const user = new UserModel({ firstName: "John", lastName: "Doe" });
  await user.save();
  res.send("User created");
});
```

## Authentication & JWT

### 1. Installing Dependencies

```sh
npm i bcrypt jsonwebtoken cookie-parser
```

### 2. Encrypting Passwords

```js
import bcrypt from "bcrypt";
const hashPassword = await bcrypt.hash("mypassword", 10);
```

### 3. Generating JWT Token

```js
import jwt from "jsonwebtoken";
const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
```

### 4. Middleware for Authentication

```js
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Unauthorized");
  try {
    req.user = jwt.verify(token, "secretkey");
    next();
  } catch (err) {
    res.status(403).send("Invalid Token");
  }
};
```

## Express Router

### 1. Setting Up Routes

```js
import express from "express";
const router = express.Router();

router.get("/users", (req, res) => {
  res.send("List of users");
});

export default router;
```

### 2. Using Routers in `app.js`

```js
import userRoutes from "./routes/userRoutes.js";
app.use("/api", userRoutes);
```

## Mongoose Population

### 1. Defining Relationships

```js
const connectionSchema = new mongoose.Schema({
  fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  toUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
```

### 2. Query with Population

```js
const connections = await Connection.find().populate(
  "fromUserId toUserId",
  "firstName lastName"
);
```

## Conclusion

This README provides a structured overview of setting up a **DevTinder** backend using Node.js, Express.js, MongoDB, JWT authentication, and middleware. The project is now ready for further enhancements such as WebSockets for real-time matching and AI-powered recommendations. 🚀
