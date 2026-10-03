import express from "express";
import cors from "cors";

const app = express();

const port = 3002;

app.use(cors());
app.use(express.json());

const users = [];

app.post("/signup", (req, res) => {

    const { name, email, phone, password } = req.body;

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        return res.status(400).json({
            message: "Email already registered"
        });
    }

    users.push({
        name,
        email,
        phone,
        password
    });

    console.log("New user registered:", email);

    res.json({
        message: "Account created successfully!"
    });
});

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const user = users.find(
        user => user.email === email &&
                user.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    res.json({
        message: "Login successful!",
        user: {
            name: user.name,
            email: user.email
        }
    });
});



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});