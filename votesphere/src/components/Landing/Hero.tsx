import { Link } from 'react-router-dom';
import hero from '../../assets/hero1.png';

export default function Hero() {
  return (
    <div className="lg:flex gap-28 justify-end items-center">
      <img className="w-full" src={hero} />
      <div className="lg:w-1/2 flex gap-6 flex-col items-start">
        <h1 className="text-4xl font-bold mt-4">Your voice, your choice</h1>
        <p>
          VoteSphere is the ultimate platform for group-based poll management,
          empowering communities to create, manage, and vote on polls with ease.
          Whether it's for teams, friends, or larger groups, VoteSphere
          simplifies decision-making, ensuring every vote counts. Join now to
          experience fast, secure, and transparent poll creation and results —
          all in one place.
        </p>
        <Link
          className="font-medium bg-ctaBlue text-white px-14 py-2 rounded-lg"
          to="/signup"
        >
          GET STARTED
        </Link>
      </div>
    </div>
  );
}
