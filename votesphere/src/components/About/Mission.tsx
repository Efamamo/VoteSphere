import mission from '../../assets/ourmission.png';
export default function Mission() {
  return (
    <div className="lg:flex mt-32 justify-center gap-16 items-center">
      <div className="lg:w-1/2 lg:flex justify-end">
        <img className="rounded-lg lg:w-2/3" src={mission} />
      </div>

      <div className="mt-4 lg:w-2/3 lg:pr-20">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p>
          At VoteSphere, our mission is to revolutionize the way people engage
          in group decision-making by providing an efficient, secure, and
          user-friendly platform for managing polls. We strive to empower
          communities, organizations, and teams with the tools they need to
          facilitate transparent and collaborative voting processes, fostering a
          culture of inclusivity and active participation.
        </p>
      </div>
    </div>
  );
}
