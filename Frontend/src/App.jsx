import { useState } from "react";

import Signup from "./Signup";
import Login from "./Login";
import ApiTester from "./ApiTester";

import "./Signup.css";

function App() {

    const [page, setPage] = useState("signup");

    if (page === "signup") {
        return (
            <Signup
                onSignup={() => setPage("login")}
            />
        );
    }

    if (page === "login") {
        return (
            <Login
                onLogin={() => setPage("api")}
            />
        );
    }

    return <ApiTester />;
}

export default App;