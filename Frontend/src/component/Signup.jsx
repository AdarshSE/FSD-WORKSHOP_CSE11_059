import { useState } from "react";

function Signup({onSignup}) {

const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
});

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3002/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            })
        });

        const data = await response.json();

        alert(data.message);

    } catch (error) {
        alert("Server error!");
    }
};

return (
    <div className="signup-page">
        <div className="signup-container">

        <h1>Create Account</h1>
        <p>Sign up to continue</p>

        <form onSubmit={handleSubmit}>

            <label>Full Name</label>
            <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <label>Email</label>
            <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <label>Phone Number</label>
            <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
            />

            <label>Password</label>
            <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
            />

            <label>Confirm Password</label>
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />

            <button type="submit">Sign Up</button>

        </form>

        <p className="login">
            Already have an account? <a href="#">Login</a>
        </p>
        </div>

    </div>
);

}

export default Signup;