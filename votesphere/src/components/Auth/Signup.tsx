export default function Signup() {
  return (
    <div>
      <h2 className="text-center text-5xl">SignUp</h2>
      <div className="shadow-lg rounded-lg w-1/3 px-11 pt-2 pb-4 mt-20 mx-auto">
        <form action="">
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-1 my-2 outline-none"
            type="text"
            placeholder="Name"
          />
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-1 my-2 outline-none"
            type="email"
            placeholder="Email"
          />
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-1 my-2 outline-none"
            type="password"
            placeholder="Password"
          />

          <button className="font-medium bg-ctaBlue text-white px-14 py-2 rounded-lg mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
