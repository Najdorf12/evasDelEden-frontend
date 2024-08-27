import { Link } from "react-router-dom";
import logo from "../assets/logo-removebg.png";

const Navbar = () => {
  return (
    <>
      <nav className="w-full flex justify-between items-center mt-3 xl:mt-3 2xl:mt-6 md:px-6 2xl:px-12 ">
        <picture className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-800 border-[1px] border-gray-500 2xl:w-16 2xl:h-16">
          <img className="w-full" src={logo} alt="logo" />
        </picture>
        <Link to={"/"}>
          <button className="text-white font-title pl-2 py-1  flex justify center items-center  text-[2.2rem] 2xl:text-[2.5rem] border-l-[3px] border-gray-600  hover:scale-105 hover:text-gray-600 duration-500 ">
            Home
          </button>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
