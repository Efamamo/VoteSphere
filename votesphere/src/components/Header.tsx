import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo (1).png';

interface HeaderProp {
  hideLogin?: boolean;
}
export default function Header(prop: HeaderProp) {
  return (
    <nav className="flex justify-between mx-16 my-10 items-center">
      <Link to="/">
        <div className="flex items-center">
          <img className="w-12" src={logo} />
          <h2 className="text-2xl font-montserrat text-customBlue mt-1">
            VOTESPHERE
          </h2>
        </div>
      </Link>

      <div className="flex items-center gap-12">
        <NavLink className="font-medium" to="/">
          HOME
        </NavLink>
        <NavLink className="font-medium" to="/about">
          ABOUT
        </NavLink>
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
