import { createBrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Landing from './components/Landing/Landing';
import About from './components/About/About';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Poll from './components/Poll';
import Members from './components/Members/Members';
import Dashboard from './components/Dashboard/Dashboard';

const routes = [
  {
    path: '/',
    element: (
      <>
        <Header />
        <Landing />
        <Footer />
      </>
    ),
  },
  {
    path: '/about',
    element: (
      <>
        <Header />
        <About />
        <Footer />
      </>
    ),
  },
  {
    path: '/login',
    element: (
      <>
        <Header hideLogin={true} />
        <Login />
        <div className="fixed bottom-0 w-full">
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: '/signup',
    element: (
      <>
        <Header hideLogin={true} />
        <Signup />
        <div className="fixed bottom-0 w-full">
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <>
        <Header hideLogin={true} loggedIn={true} />
        <Dashboard />
        <div className="fixed bottom-0 w-full">
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: '/add-poll',
    element: (
      <>
        <Header hideLogin={true} loggedIn={true} />
        <Poll />
        <div className="fixed bottom-0 w-full">
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: '/members',
    element: (
      <>
        <Header loggedIn={true} inMember={true} />
        <Members />
        <div className="fixed bottom-0 w-full">
          <Footer />
        </div>
      </>
    ),
  },
];

const router = createBrowserRouter(routes);

export default router;
