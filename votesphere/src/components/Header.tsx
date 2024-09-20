import logo from '../assets/logo (1).png';
export default function Header() {
  return (
    <nav className="flex justify-between mx-16 my-10 items-center">
      <div className="flex items-center">
        <img className="w-12" src={logo} />
        <h2 className="text-2xl font-montserrat text-customBlue mt-2">
          VOTESPHERE
        </h2>
      </div>

      <div className="flex items-center gap-12">
        <a className="font-medium" href="">
          HOME
        </a>
        <a className="font-medium" href="">
          ABOUT
        </a>
        <a
          className="font-medium bg-ctaBlue text-white px-8 py-1 rounded-lg"
          href=""
        >
          LOGIN
        </a>
      </div>
    </nav>
  );
}
