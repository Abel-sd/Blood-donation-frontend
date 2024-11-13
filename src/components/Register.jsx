// src/components/Register.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// Define validation schema with Yup
const schema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/auth/register', data);
      console.log('Registration successful', response.data);
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration error', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <h2 style={styles.heading}>Register</h2>
        
        <input
          {...register('username')}
          placeholder="Username"
          style={styles.input}
        />
        <p style={styles.errorText}>{errors.username?.message}</p>

        <input
          {...register('email')}
          placeholder="Email"
          style={styles.input}
        />
        <p style={styles.errorText}>{errors.email?.message}</p>

        <input
          type="password"
          {...register('password')}
          placeholder="Password"
          style={styles.input}
        />
        <p style={styles.errorText}>{errors.password?.message}</p>

        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

// Define the styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '1rem',
  },
  input: {
    marginBottom: '1rem',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#218838',
  },
  errorText: {
    color: 'red',
    fontSize: '0.875rem',
    marginBottom: '1rem',
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
