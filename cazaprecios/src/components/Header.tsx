import { FaTag } from "react-icons/fa";
import Menu from "./Menu";
import { useState } from "react";

function Header() {
     const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
      const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
  return (
    <div className="w-full h-[80px] flex bg-black/30 items-center justify-center">
    <nav className="text-white flex w-full max-w-[1700px] items-center p-3 justify-between">
        <div className="flex items-center">
          <FaTag className="text-2xl m-2 text-[#ad46ff]" />
          <span className="text-2xl font-bold">CazaPrecios</span>
        </div>
        <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </nav></div>
  );
}
export default Header;