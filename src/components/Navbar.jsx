import { Link } from "react-router-dom";
import logo from "../assets/logo-removebg.png";

const Navbar = () => {
  return (
    <>
      <nav className="w-full flex justify-between items-center mt-2">
        <picture className="w-14 h-14 flex items-center justify-center rounded-full bg-zinc-800 border-[1px] border-gray-500">
          <img className="w-full" src={logo} alt="logo" />
        </picture>
        <Link to={"/"}>
          <button className=" text-gray-100 text-[1.1rem]  font-normal font-text rounded-full border-[2px] border-gray-100 shadow-lg shadow-gray-800 px-8 py-[3px] ">
            <span>Home</span>
          </button>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
