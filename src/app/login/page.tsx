"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { FormEvent } from "react";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(""); 
    setLoading(true); 
  
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Invalid credentials");
        return; 
      }
  
      const data = await response.json();
      console.log("Login successful:", data);

      // Save token in localStorage if it's part of the response
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // If there's a redirect URL, navigate to it
      if (data.redirectUrl) {
        router.push(data.redirectUrl); // Redirect to the URL received from the backend (e.g., /dashboard)
      } else {
        router.push("/dashboard"); // Fallback if no redirectUrl is sent
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-box"]}>
        <h1 style={{ marginBottom: "20px" }}>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles["input-field"]}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles["input-field"]}
            required
          />
          {error && (
            <p className={styles["error-message"]}>{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={styles["login-button"]}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
