import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import axios from 'axios';
export default function Signup() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [roleError, setRoleError] = useState('');

  const [emailError, setEmailError] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  function handleRole(e: any) {
    setRole(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setRoleError('');

    const headers = {
      'Content-Type': 'application/json',
    };

    const body = {
      username,
      password,
      email,
      role,
    };

    try {
      const response = await axios.post(
        'http://localhost:9000/auth/signup',
        body,
        {
          headers,
        }
      );
      setLoading(false);

      localStorage.setItem('username', response.data.username);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('groupID', response.data.groupID);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      navigate('/dashboard');
    } catch (error: any) {
      setLoading(false);

      if (axios.isAxiosError(error)) {
        const response = error.response?.data;
        const message = response?.message;

        // Check if the message is an array
        if (Array.isArray(message)) {
          for (let e of message) {
            if (e.toLowerCase().includes('username')) {
              setUsernameError(e);
            } else if (e.toLowerCase().includes('email')) {
              setEmailError(e);
            } else if (e.toLowerCase().includes('password')) {
              setPasswordError(e);
            } else if (e.toLowerCase().includes('role')) {
              setRoleError(e);
            }
          }
        } else if (typeof message === 'string') {
          // If message is a string
          if (message.toLowerCase().includes('username')) {
            setUsernameError(message);
          } else if (message.toLowerCase().includes('email')) {
            setEmailError(message);
          } else if (message.toLowerCase().includes('password')) {
            setPasswordError(message);
          }
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }

  return (
    <div className="mt-20 md:mt-40">
      <h2 className="text-center text-5xl font-bold">SignUp</h2>
      <div className="shadow-lg rounded-lg md:w-3/4 lg:w-1/3  px-11 py-10  mt-14 mx-4 md:mx-auto ">
        <form onSubmit={handleSubmit}>
          <input
            ref={usernameRef}
            className="border w-full rounded-md border-inputBORDER px-2 py-2 my-2 outline-none"
            type="text"
            placeholder="Username"
          />
          {usernameError && (
            <p className="text-sm text-red-700">{usernameError}</p>
          )}
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-2 my-2 outline-none"
            type="email"
            placeholder="Email"
            ref={emailRef}
          />
          {emailError && <p className="text-sm text-red-700">{emailError}</p>}

          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-2 my-2 outline-none"
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
          {passwordError && (
            <p className="text-sm text-red-700">{passwordError}</p>
          )}
          <div className="flex flex-col items-center mt-6">
            <h2 className="mb-2 text-lg font-semibold">Pick Your Role</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                  className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  onChange={handleRole}
                  type="radio"
                  name="role"
                  id="user"
                  value={'User'}
                />
                <label className="ml-2" htmlFor="user">
                  User
                </label>
              </div>
              <div className="flex items-center">
                <input
                  className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  onChange={handleRole}
                  type="radio"
                  name="role"
                  id="admin"
                  value={'Admin'}
                />
                <label className="ml-1" htmlFor="admin">
                  Admin
                </label>
              </div>
            </div>
          </div>
          {roleError && <p className="text-sm text-red-700">{roleError}</p>}

          <button className="font-medium bg-ctaBlue text-white w-full py-2 rounded-lg mt-4">
            {loading ? (
              <CircularProgress
                size={18}
                thickness={4}
                sx={{ color: 'white', padding: 0, margin: 0 }}
              />
            ) : (
              'Signup'
            )}
          </button>
          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link className="text-ctaBlue" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
