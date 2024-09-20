import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  return (
    <div className="mt-40">
      <h2 className="text-center text-5xl font-bold">SignUp</h2>
      <div className="shadow-lg rounded-lg w-1/3  px-11 py-10  mt-14 mx-auto">
        <form action="">
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-2 my-2 outline-none"
            type="text"
            placeholder="Username"
          />
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-2 my-2 outline-none"
            type="email"
            placeholder="Email"
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
            Signup
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
