import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

// Define validation schema with Yup
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Register = () => {
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // "success" or "error"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post("http://localhost:5001/api/auth/register", { data });
    },
    onSuccess: () => {
      setPopupMessage("Registration successful!");
      setPopupType("success");
    },
    onError: () => {
      setPopupMessage("Registration failed. Please try again.");
      setPopupType("error");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

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

      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <h2 style={styles.heading}>Register</h2>

        <input
          {...register("firstName")}
          placeholder="First Name"
          style={styles.input}
        />
        <p style={styles.errorText}>{errors.firstName?.message}</p>

        <input
          {...register("lastName")}
          placeholder="Last Name"
          style={styles.input}
        />
        <p style={styles.errorText}>{errors.lastName?.message}</p>

        <input
          {...register("email")}
          placeholder="Email"
          style={styles.input}
        />
        <p style={styles.errorText}>{errors.email?.message}</p>

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          style={styles.input}
        />
        <p style={styles.errorText}>{errors.password?.message}</p>

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

// Define the styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
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
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  errorText: {
    color: "red",
    fontSize: "0.875rem",
    marginBottom: "1rem",
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

// Apply media queries for responsive design
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

export default Register;
