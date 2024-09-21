import us from '../../assets/us.png';
export default function Us() {
  return (
    <div className="mt-40 flex flex-col lg:flex-row justify-center items-center gap-12">
      <div className="order-2 lg:w-1/2 lg:order-1">
        <h2 className="text-3xl font-bold mb-4">Why Us</h2>
        <p className="mb-3">
          <span className="font-semibold">Effortless Collaboration</span>: With
          intuitive group and poll management, VoteSphere makes it easy for
          users to create polls, invite members, and cast votes — all in just a
          few clicks.
        </p>
        <p className="mb-3">
          <span className="font-semibold">Secure and Transparent Voting</span>:
          We prioritize the security and integrity of every vote. Our system
          ensures that results are clear and trustworthy, promoting transparency
          in decision-making.
        </p>
        <p className="mb-3">
          <span className="font-semibold">Tailored for Groups</span>: Whether
          you're a small team or a large community, VoteSphere is designed to
          adapt to your needs. Manage multiple polls, track progress, and see
          real-time results — all within one platform.
        </p>
        <p className="mb-3">
          <span className="font-semibold">Reliable Support</span>: We're
          committed to providing top-notch customer service and continuous
          updates, ensuring that your voting experience is always smooth and
          reliable.
        </p>
        <p>
          With VoteSphere, you get a platform built for simplicity, security,
          and collaboration.
        </p>
      </div>
      <img className="order-1 lg:max-w-md lg:order-2" src={us} alt="" />
    </div>
  );
}
