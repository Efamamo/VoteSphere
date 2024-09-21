import contact from '../../assets/contact.png';
export default function Contact() {
  return (
    <div className="mt-40 mb-20 lg:flex items-center justify-center gap-20">
      <img className="lg:max-w-lg" src={contact} alt="" />
      <div className="shadow-lg rounded-lg lg:w-1/3 px-2 md:px-11 pt-2 pb-4">
        <form action="">
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-2 my-2 outline-none"
            type="text"
            placeholder="Name"
          />
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-2 my-2 outline-none"
            type="email"
            placeholder="Email"
          />
          <textarea
            placeholder="Message"
            className="w-full h-32 p-2 border border-inputBorder rounded-md resize-none outline-none"
          ></textarea>

          <button className="font-medium bg-ctaBlue text-white px-14 py-2 rounded-lg mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
