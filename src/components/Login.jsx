// src/components/Login.jsx
import React, { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useSignIn();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post("http://localhost:5000/login", data);
    },
    mutationKey: "login",
    onSuccess: (data) => {
      if (
        signIn({
          auth: {
            token: data.data,
            type: "Bearer",
          },
          userState: {
            name: "React User",
            uid: 123456,
          },
        })
      ) {
        navigate("/");
      } else {
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({ username, password });
  };

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = location.state?.from?.pathname || "/";
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate, location]);

  return (
    <div style={styles.container}>
      {mutation.isError && <div>Error: {mutation.error.message}</div>}
      {mutation.isLoading && (
        <div className="absolute top-0 left-0">Loading</div>
      )}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    padding: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "1rem",
  },
  input: {
    marginBottom: "1rem",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  socialContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  googleButton: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#db4437",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "10px",
    width: "100%",
    maxWidth: "400px",
  },
  facebookButton: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#3b5998",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    maxWidth: "400px",
  },
};

// Make the layout responsive using media queries
const mediaQueries = `
@media (max-width: 600px) {
  ${styles.container} {
    padding: 10px;
  }
  ${styles.form} {
    padding: 15px;
  }
  ${styles.button}, ${styles.googleButton}, ${styles.facebookButton} {
    font-size: 14px;
    padding: 10px;
  }
}
`;

// Inject the media queries into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = mediaQueries;
document.head.appendChild(styleSheet);

export default Login;
