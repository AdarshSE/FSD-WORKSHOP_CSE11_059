import React, { useState } from "react";
import "./app.css";

const API_Tester = () => {
  const [method, setMethod] = useState("GET");

  const [url, setUrl] = useState(
    "http://localhost:3002/"
  );

  const [body, setBody] = useState("");

  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const [responseTime, setResponseTime] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Theme
  const [darkMode, setDarkMode] = useState(true);


  // =========================
  // SEND REQUEST
  // =========================

  const sendRequest = async () => {
    if (!url.trim()) {
      setError("Please enter an API URL.");
      return;
    }

    setLoading(true);
    setError("");
    setResponse(null);
    setStatus(null);
    setResponseTime(null);

    const startTime = performance.now();

    try {
      const options = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Add body for POST and PUT
      if (method !== "GET" && method !== "DELETE") {

        if (body.trim() !== "") {
          try {
            JSON.parse(body);
          } catch {
            setError("Invalid JSON in Request Body.");
            setLoading(false);
            return;
          }

          options.body = body;
        }
      }

      const res = await fetch(url, options);

      const endTime = performance.now();

      setResponseTime(
        Math.round(endTime - startTime)
      );

      setStatus(res.status);

      const contentType =
        res.headers.get("content-type");

      let data;

      if (
        contentType &&
        contentType.includes("application/json")
      ) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      setResponse(data);

    } catch (err) {

      setError(
        "Unable to connect to the backend. Make sure your Express server is running on port 3002."
      );

    } finally {
      setLoading(false);
    }
  };


  // =========================
  // ENTER KEY
  // =========================

  const handleUrlKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendRequest();
    }
  };


  // =========================
  // QUICK ENDPOINT
  // =========================

  const selectEndpoint = (
    selectedMethod,
    selectedUrl,
    selectedBody = ""
  ) => {

    setMethod(selectedMethod);
    setUrl(selectedUrl);
    setBody(selectedBody);

    setResponse(null);
    setStatus(null);
    setResponseTime(null);
    setError("");
  };


  // =========================
  // FORMAT RESPONSE
  // =========================

  const formatResponse = () => {

    if (typeof response === "string") {
      return response;
    }

    return JSON.stringify(
      response,
      null,
      2
    );
  };


  // =========================
  // STATUS COLOR
  // =========================

  const getStatusClass = () => {

    if (!status) return "";

    if (status >= 200 && status < 300) {
      return "success";
    }

    if (status >= 400 && status < 500) {
      return "warning";
    }

    if (status >= 500) {
      return "danger";
    }

    return "";
  };


  return (

    <div
      className={
        darkMode
          ? "api-page dark-theme"
          : "api-page light-theme"
      }
    >

      {/* ================= HEADER ================= */}

      <header className="api-header">

        <div className="header-content">

          <div className="brand">

            <span className="brand-icon">
              ⚡
            </span>

            API TESTER

          </div>


          <h1>
            Express REST API
            <br />

            <span>
              Testing Dashboard
            </span>
          </h1>


          <p>
            Test your Express APIs directly
            from your React frontend.
          </p>

        </div>


        <div className="header-actions">

          {/* Server */}

          <div className="server-status">

            <span className="status-dot"></span>

            <span>
              Backend
            </span>

            <strong>
              localhost:3002
            </strong>

          </div>


          {/* Theme Toggle */}

          <button
            className="theme-toggle"
            onClick={() =>
              setDarkMode(!darkMode)
            }
            title={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >

            {darkMode ? "☀️" : "🌙"}

            <span>
              {darkMode
                ? "Light"
                : "Dark"}
            </span>

          </button>

        </div>

      </header>


      {/* ================= MAIN CARD ================= */}

      <main className="api-card">


        {/* REQUEST */}

        <section className="request-section">

          <label>
            REQUEST URL
          </label>


          <div className="request-bar">


            {/* METHOD */}

            <select
              value={method}
              onChange={(e) =>
                setMethod(e.target.value)
              }
              className={`method ${method.toLowerCase()}`}
            >

              <option value="GET">
                GET
              </option>

              <option value="POST">
                POST
              </option>

              <option value="PUT">
                PUT
              </option>

              <option value="DELETE">
                DELETE
              </option>

            </select>


            {/* URL */}

            <input
              type="text"
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
              onKeyDown={handleUrlKeyDown}
              placeholder="http://localhost:3002/users"
              aria-label="API URL"
            />


            {/* SEND */}

            <button
              className="send-button"
              onClick={sendRequest}
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="button-loader"></span>
                  Sending...
                </>
              ) : (
                <>
                  Send Request
                  <span className="send-arrow">
                    →
                  </span>
                </>
              )}

            </button>

          </div>


          <div className="enter-hint">
            Press <kbd>Enter ↵</kbd> to send
          </div>

        </section>


        {/* ================= BODY ================= */}

        <section className="body-section">

          <div className="section-title">

            <span>
              Request Body
            </span>

            <span className="json-label">
              JSON
            </span>

          </div>


          <textarea
            value={body}
            onChange={(e) =>
              setBody(e.target.value)
            }
            disabled={
              method === "GET" ||
              method === "DELETE"
            }
            placeholder={
              method === "GET" ||
              method === "DELETE"
                ? "No request body required"
                : `{
  "name": "Rahul Kumar",
  "email": "rahul@gmail.com"
}`
            }
          />

        </section>


        {/* ================= RESPONSE ================= */}

        <section className="response-section">

          <div className="response-header">

            <div className="section-title">
              Response
            </div>


            <div className="response-meta">

              {status && (

                <span
                  className={`status-badge ${getStatusClass()}`}
                >
                  {status}
                </span>

              )}


              {responseTime !== null && (

                <span className="time-badge">
                  {responseTime} ms
                </span>

              )}

            </div>

          </div>


          <div className="response-box">


            {/* LOADING */}

            {loading && (

              <div className="empty-response">

                <div className="loader"></div>

                <p>
                  Sending request...
                </p>

              </div>

            )}


            {/* ERROR */}

            {!loading &&
              error && (

                <div className="error-response">

                  <span>
                    ⚠
                  </span>

                  <p>
                    {error}
                  </p>

                </div>

              )}


            {/* EMPTY */}

            {!loading &&
              !error &&
              response === null && (

                <div className="empty-response">

                  <div className="empty-icon">
                    ⌁
                  </div>

                  <p>
                    Your API response
                    will appear here
                  </p>

                  <span>
                    Enter an endpoint and
                    press Enter or click
                    Send Request
                  </span>

                </div>

              )}


            {/* RESPONSE */}

            {!loading &&
              !error &&
              response !== null && (

                <pre>
                  {formatResponse()}
                </pre>

              )}

          </div>

        </section>

      </main>


      {/* ================= QUICK ENDPOINTS ================= */}

      <section className="quick-section">

        <div className="quick-heading">

          <div>

            <h2>
              Quick Endpoints
            </h2>

            <p>
              Click an endpoint to load it
            </p>

          </div>

        </div>


        <div className="endpoint-grid">


          {/* GET / */}

          <button
            onClick={() =>
              selectEndpoint(
                "GET",
                "http://localhost:3002/"
              )
            }
          >

            <span className="endpoint-method get">
              GET
            </span>

            <span>
              /
            </span>

          </button>


          {/* GET USERS */}

          <button
            onClick={() =>
              selectEndpoint(
                "GET",
                "http://localhost:3002/users"
              )
            }
          >

            <span className="endpoint-method get">
              GET
            </span>

            <span>
              /users
            </span>

          </button>


          {/* GET USER */}

          <button
            onClick={() =>
              selectEndpoint(
                "GET",
                "http://localhost:3002/userByid/101"
              )
            }
          >

            <span className="endpoint-method get">
              GET
            </span>

            <span>
              /userByid/:id
            </span>

          </button>


          {/* CREATE */}

          <button
            onClick={() =>
              selectEndpoint(
                "POST",
                "http://localhost:3002/create",
                `{
  "name": "Rahul Kumar",
  "email": "rahul@gmail.com"
}`
              )
            }
          >

            <span className="endpoint-method post">
              POST
            </span>

            <span>
              /create
            </span>

          </button>


          {/* EDIT */}

          <button
            onClick={() =>
              selectEndpoint(
                "PUT",
                "http://localhost:3002/edit/101",
                `{
  "name": "Akshay Kumar",
  "email": "akshay@gmail.com"
}`
              )
            }
          >

            <span className="endpoint-method put">
              PUT
            </span>

            <span>
              /edit/:id
            </span>

          </button>


          {/* DELETE */}

          <button
            onClick={() =>
              selectEndpoint(
                "DELETE",
                "http://localhost:3002/delete/101"
              )
            }
          >

            <span className="endpoint-method delete">
              DELETE
            </span>

            <span>
              /delete/:id
            </span>

          </button>


          {/* LOGIN */}

          <button
            onClick={() =>
              selectEndpoint(
                "POST",
                "http://localhost:3002/login",
                `{
  "email": "ak68@gmail.com"
}`
              )
            }
          >

            <span className="endpoint-method post">
              POST
            </span>

            <span>
              /login
            </span>

          </button>

        </div>

      </section>


      <footer>
        API Tester • React + Express
      </footer>

    </div>
  );
};

export default API_Tester;