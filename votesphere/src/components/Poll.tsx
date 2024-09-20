export default function Poll() {
  return (
    <div className="mt-20 mx-16">
      <h2 className="text-3xl font-bold text-center">Add Poll Information</h2>
      <div className="shadow-lg rounded-lg max-w-4xl mx-auto px-11 py-8 mt-14">
        <form action="">
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-1 mt-2 mb-8 outline-none"
            type="text"
            placeholder="Question"
          />
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-1 my-2 outline-none"
            type="text"
            placeholder="Choice 1"
          />
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-1 my-2 outline-none"
            type="text"
            placeholder="Choice 2"
          />
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-1 my-2 outline-none"
            type="text"
            placeholder="Choice 3"
          />
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-1 my-2 outline-none"
            type="text"
            placeholder="Choice 4"
          />
          <input
            className="border w-full rounded-md border-inputBORDER px-2 py-1 my-2 outline-none"
            type="text"
            placeholder="Choice 5"
          />

          <button className="font-medium bg-ctaBlue text-white px-28 py-1 block rounded-lg mt-4 mx-auto">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
