import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // "success" or "error"
  const signIn = useSignIn();
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
            token: data.data.token, // Adjust according to your response structure
            type: "Bearer",
          },
          userState: {
            name: data.data.name || "React User", // Adjust as needed
            uid: data.data.id || 123456, // Adjust as needed
          },
        })
      ) {
        setPopupMessage("Login successful!");
        setPopupType("success");
        setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
      }
    },
    onError: (error) => {
      setPopupMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
      setPopupType("error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ username, password });
  };

  useEffect(() => {
    if (mutation.isError) {
      setPopupMessage("An error occurred.");
      setPopupType("error");
    }
  }, [mutation.isError]);

  const closePopup = () => {
    setPopupMessage("");
    setPopupType("");
  };

  return (
    <div style={styles.container}>
      {popupMessage && (
        <div
          style={{
            ...styles.popup,
            backgroundColor: popupType === "success" ? "#d4edda" : "#f8d7da",
            color: popupType === "success" ? "#155724" : "#721c24",
          }}
        >
          {popupMessage}
          <button onClick={closePopup} style={styles.closeButton}>
            &times;
          </button>
        </div>
      )}

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
  popup: {
    position: "absolute",
    top: "220px",
    right: "20px",
    padding: "10px",
    borderRadius: "5px",
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
  },
  closeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
    marginLeft: "10px",
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
  ${styles.button} {
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
