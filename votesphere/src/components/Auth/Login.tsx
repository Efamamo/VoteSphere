import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="mt-40">
      <h2 className="text-center text-5xl font-bold">Login</h2>
      <div className="shadow-lg rounded-lg md:w-3/4 lg:w-1/3 px-11 py-10 mt-14 mx-4 md:mx-auto">
        <form action="">
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-2 my-2 outline-none"
            type="text"
            placeholder="Username"
          />

          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-2 my-2 outline-none"
            type="password"
            placeholder="Password"
          />

          <button
            onClick={() => {
              navigate('/dashboard');
            }}
            className="font-medium bg-ctaBlue text-white w-full py-2 rounded-lg mt-4"
          >
            Login
          </button>
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
