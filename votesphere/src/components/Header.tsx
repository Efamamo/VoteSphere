import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo (1).png';
import setting from '../assets/profile (1).png';
import close from '../assets/close.png';
import logout from '../assets/logout.png';
import members from '../assets/icons8-member-50.png';
import { useState } from 'react';

interface HeaderProp {
  hideLogin?: boolean;
  inMember?: boolean;
  showDashboard?: boolean;
}
export default function Header(prop: HeaderProp) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHumburgerOpen, setIsHumburgerOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('groupID');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  }

  let logouturl = '/dashboard';
  if (!localStorage.getItem('accessToken')) {
    logouturl = '/';
  }
  return (
    <>
      <div
        onClick={() => {
          setIsHumburgerOpen(true);
        }}
        className="space-y-1 mt-2 ml-2 md:hidden"
      >
        <div className="w-8 h-1 bg-gray-800"></div>
        <div className="w-8 h-1 bg-gray-800"></div>
        <div className="w-8 h-1 bg-gray-800"></div>
      </div>
      {isHumburgerOpen && (
        <div
          className="w-72 h-screen z-20 bg-sidebar fixed left-0 bottom-0 pt-12"
          onClick={() => {
            setIsHumburgerOpen(false);
          }}
        >
          <img
            className="absolute top-4 right-4 w-8 cursor-pointer"
            src={close}
          />{' '}
          <Link to={logouturl}>
            <div className="flex items-center mx-auto justify-center w-full">
              <img className="w-12" src={logo} />
              <h2 className="text-2xl font-montserrat text-customBlue mt-1">
                VOTESPHERE
              </h2>
            </div>
          </Link>{' '}
          <div className="flex flex-col justify-center items-center mt-8 gap-1">
            {!localStorage.getItem('accessToken') && (
              <NavLink className="font-medium" to="/">
                HOME
              </NavLink>
            )}
            {!localStorage.getItem('accessToken') && (
              <NavLink className="font-medium" to="/about">
                ABOUT
              </NavLink>
            )}
            {!localStorage.getItem('accessToken') && (
              <NavLink className="font-medium" to="/login">
                LOGIN
              </NavLink>
            )}

            {localStorage.getItem('accessToken') && (
              <NavLink className="font-medium" to="/dashboard">
                DASHBOARD
              </NavLink>
            )}
            {localStorage.getItem('accessToken') &&
              localStorage.getItem('groupID') !== 'null' && (
                <NavLink className="font-medium" to="/members">
                  MEMBERS
                </NavLink>
              )}
            {localStorage.getItem('accessToken') && (
              <button onClick={handleLogout} className="font-medium">
                LOGOUT
              </button>
            )}
          </div>
        </div>
      )}

      <nav className="hidden md:flex justify-between mx-16 my-10 items-center">
        <Link to={logouturl}>
          <div className="flex items-center">
            <img className="w-12" src={logo} />
            <h2 className="text-2xl font-montserrat text-customBlue mt-1">
              VOTESPHERE
            </h2>
          </div>
        </Link>

        {!localStorage.getItem('accessToken') && (
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

        {localStorage.getItem('accessToken') && !prop.inMember && (
          <div className="flex items-center gap-12">
            {prop.showDashboard && (
              <NavLink className="font-medium" to="/dashboard">
                DASHBOARD
              </NavLink>
            )}

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
        {localStorage.getItem('accessToken') && prop.inMember && (
          <div className="flex items-center gap-12">
            <NavLink className="font-medium" to="/dashboard">
              DASHBOARD
            </NavLink>

            <button onClick={handleLogout} className="font-medium">
              LOGOUT
            </button>
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
            <h2 className="text-center text-2xl font-semibold mt-10">
              PROFILE
            </h2>
            {localStorage.getItem('groupID') != 'null' && (
              <Link to="/members">
                <div className="flex gap-4 justify-center mt-12 items-center">
                  <img className="w-6" src={members} alt="" />
                  <h3>MEMBERS</h3>
                </div>
              </Link>
            )}
            <Link to="/">
              <div className="flex gap-4 justify-center mt-4 items-center">
                <img className="w-6" src={logout} alt="" />
                <button onClick={handleLogout}>LOGOUT</button>
              </div>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
