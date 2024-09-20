import mission from '../../assets/mision.png';
export default function Mission() {
  return (
    <div className="flex mt-20 justify-center gap-14 items-center">
      <img className="rounded-lg w-96" src={mission} />
      <div className="max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Our Mission</h2>
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
