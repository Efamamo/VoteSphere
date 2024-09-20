import { Link } from 'react-router-dom';
import logo from '../assets/logo (1).png';

interface HeaderProp {
  hideLogin?: boolean;
}
export default function Header(prop: HeaderProp) {
  return (
    <nav className="flex justify-between mx-16 my-10 items-center">
      <div className="flex items-center">
        <img className="w-12" src={logo} />
        <h2 className="text-2xl font-montserrat text-customBlue mt-2">
          VOTESPHERE
        </h2>
      </div>

      <div className="flex items-center gap-12">
        <Link className="font-medium" to="/">
          HOME
        </Link>
        <Link className="font-medium" to="/about">
          ABOUT
        </Link>
        {!prop.hideLogin && (
          <Link
            className="font-medium bg-ctaBlue text-white px-8 py-1 rounded-lg"
            to="/login"
          >
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
}
