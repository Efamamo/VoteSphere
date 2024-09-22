import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const [credentialError, setCredentialError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const headers = {
      'Content-Type': 'application/json',
    };

    const body = {
      username,
      password,
    };

    try {
      const response = await axios.post(
        'http://localhost:9000/auth/signin',
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
      if (axios.isAxiosError(error)) {
        setCredentialError('Invalid Credential');
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }
  return (
    <div className="mt-20 md:mt-40">
      <h2 className="text-center text-5xl font-bold">Login</h2>
      <div className="shadow-lg rounded-lg md:w-3/4 lg:w-1/3 px-11 py-10 mt-14 mx-4 md:mx-auto">
        <form onSubmit={handleSubmit}>
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-2 my-2 outline-none"
            type="text"
            placeholder="Username"
            ref={usernameRef}
          />

          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-2 my-2 outline-none"
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
          {credentialError && (
            <p className="text-sm text-red-700">{credentialError}</p>
          )}

          {loading ? (
            <CircularProgress
              size={18}
              thickness={4}
              sx={{ color: 'white', padding: 0, margin: 0 }}
            />
          ) : (
            <button className="font-medium bg-ctaBlue text-white w-full py-2 rounded-lg mt-4">
              Login
            </button>
          )}
          <p className="text-center mt-4">
            Dont have an account?{' '}
            <Link className="text-ctaBlue" to="/signup">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
