import { createBrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Landing from './components/Landing/Landing';
import About from './components/About';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Poll from './components/Poll';

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
        <div className="absolute bottom-0 w-full">
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: '/login',
    element: (
      <>
        <Header hideLogin={true} />
        <Login />
        <div className="absolute bottom-0 w-full">
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
        <div className="absolute bottom-0 w-full">
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: '/add-poll',
    element: (
      <>
        <Header hideLogin={true} />
        <Poll />
        <div className="absolute bottom-0 w-full">
          <Footer />
        </div>
      </>
    ),
  },
];

const router = createBrowserRouter(routes);

export default router;
