import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo (1).png';
import setting from '../assets/profile (1).png';
import close from '../assets/close.png';
import logout from '../assets/logout.png';
import members from '../assets/members.jpeg';
import { useState } from 'react';

interface HeaderProp {
  hideLogin?: boolean;
  inMember?: boolean;
  loggedIn?: boolean;
}
export default function Header(prop: HeaderProp) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

      {!prop.loggedIn && (
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
      )}

      {prop.loggedIn && !prop.inMember && (
        <div className="flex items-center gap-12">
          <NavLink className="font-medium" to="/dashboard">
            DASHBOARD
          </NavLink>
          <NavLink className="font-medium" to="/about">
            ABOUT
          </NavLink>
          <button
            onClick={() => {
              setIsSidebarOpen(true);
            }}
            className="font-medium"
          >
            <img className="w-10" src={setting} alt="" />
          </button>
        </div>
      )}
      {prop.loggedIn && prop.inMember && (
        <div className="flex items-center gap-12">
          <NavLink className="font-medium" to="/dashboard">
            DASHBOARD
          </NavLink>
          <NavLink className="font-medium" to="/about">
            ABOUT
          </NavLink>
          <NavLink className="font-medium" to="/">
            LOGOUT
          </NavLink>
        </div>
      )}
      {isSidebarOpen && (
        <div
          className="w-72 h-screen z-20 bg-sidebar fixed right-0 bottom-0 pt-12"
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        >
          <img
            className="absolute top-4 right-4 w-8 cursor-pointer"
            src={close}
          />{' '}
          <h2></h2>
          <Link to="/members">
            <div className="flex gap-2 justify-center mt-12 items-center">
              <img className="w-8" src={members} alt="" />
              <h3>MEMBERS</h3>
            </div>
          </Link>
          <Link to="/">
            <div className="flex gap-2 justify-center mt-4 items-center">
              <img className="w-6" src={logout} alt="" />
              <h3>LOGOUT</h3>
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
}
