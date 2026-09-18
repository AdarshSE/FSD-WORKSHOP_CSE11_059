import express from "express";
//import dotenv from "dotenv";
import cors from "cors";
//dotenv.config();
const port = 3002;
const app = express();
app.use(express.json());
app.use(cors());
const userData = [
  {
    id: 101,
    name: "ak",
    email: "ak68@gmail.com",
  },
  {
    id: 102,
    name: "bk",
    email: "bk68@gmail.com",
  }
];

  // Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Express Server" });
});

app.get("/users", (req, res) => {
  res.status(200).json({ message: "Users fetched successfully", users: userData });
});

app.get("/userByid/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = userData.find((u) => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ message: "User fetched successfully", user });
});

app.post("/create", (req, res) => {
    const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }
  const newUser = { id: userData.length ? userData[userData.length-1].id + 1 : 201, name : name, email: email };
  userData.push(newUser);
  res.status(201).json({ message: "User created successfully", user: newUser });
});

app.put("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = userData.find((u) => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });
  
  Object.assign(user, req.body);
  res.status(200).json({ message: "User updated successfully", user });
});

app.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = userData.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  userData.splice(index, 1);
  res.status(200).json({ message: "User deleted successfully" });
});

app.post("/login", (req, res) => {
  const { email } = req.body;
  const user = userData.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful", user });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});