import values from '../../assets/values.png';
export default function Value() {
  return (
    <div className="mt-32">
      <h2 className="text-3xl font-bold text-center">Our Values</h2>
      <div className="mt-8 flex justify-center gap-20">
        <div className="max-w-3xl">
          <h3 className="text-xl font-semibold">Collaboration</h3>
          <p className="mb-4">
            We believe in the power of working together. VoteSphere enables
            individuals to easily form groups, share ideas, and make collective
            decisions through seamless communication and collaboration.
          </p>
          <h3 className="text-xl font-semibold">Transparency</h3>
          <p className="mb-4">
            Ensuring trust in every poll is fundamental to us. We prioritize
            transparency, allowing users to view real-time results and
            guaranteeing that every vote is counted fairly and securely.
          </p>
          <h3 className="text-xl font-semibold">Innovation</h3>
          <p className="mb-4">
            We are committed to continuous improvement and innovation. By
            utilizing cutting-edge technology, we provide modern, efficient
            tools that simplify the poll management process for both
            administrators and participants.
          </p>
          <h3 className="text-xl font-semibold">Inclusivity</h3>
          <p className="mb-4">
            Everyone's voice matters. We design our platform to be accessible
            and easy to use, ensuring that people from diverse backgrounds and
            skill levels can participate in and contribute to group
            decision-making.
          </p>
        </div>
        <img className="w-96" src={values} />
      </div>
    </div>
  );
}
