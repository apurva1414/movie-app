import { BsPeople } from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FiDownload, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="group fixed top-16 left-0 z-[80] h-52 w-5">
      {/* Invisible Hover Region */}
      <div className="w-4 h-max bg-transparent">
      </div>
      <div className="flex md:hidden justify-center items-center">
        {/* add one arrow iocn in small scrren to give click effect on mobile hover and hide when side bar is visible */}
      </div>
      {/* Sidebar */}
      <aside className="fixed h-max top-20 left-0 flex flex-col items-center gap-8 p-4 sm:p-5 md:p-5 lg:p-7 bg-gradient-to-b from-[#130B29] via-[#5436A9] to-[#5E47A1] rounded-r-3xl text-[#BCA5FF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out">
        <Link
          to="#"
          className="text-xs sm:text-sm md:text-lg lg:text-2xl hover:text-white transition-colors duration-300"
        >
          <BsPeople />
        </Link>
        <Link
          to="#"
          className="text-xs sm:text-sm md:text-lg lg:text-2xl hover:text-white transition-colors duration-300"
        >
          <AiOutlineUnorderedList />
        </Link>
        <Link
          to="#"
          className="text-xs sm:text-sm md:text-lg lg:text-2xl hover:text-white transition-colors duration-300"
        >
          <FiDownload />
        </Link>
        <Link
          to="/favorites"
          className="text-xs sm:text-sm md:text-lg lg:text-2xl hover:text-white transition-colors duration-300"
        >
          <FiHeart />
        </Link>
      </aside>
    </div>
  );
};

export default Sidebar;
