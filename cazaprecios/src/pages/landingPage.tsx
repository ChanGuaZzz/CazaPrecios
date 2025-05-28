import { useState } from "react";
import { FaSearch, FaShoppingCart, FaChartLine, FaTag } from "react-icons/fa";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import "animate.css";
import Menu from "../components/Menu";

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery,setSearchQuery] = useState<string>("");
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement search functionality here
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <nav className="text-white flex w-full items-center p-3 justify-between">
        <div className="flex items-center">
          <FaTag className="text-2xl m-2 text-[#ad46ff]" />
          <span className="text-2xl font-bold">CazaPrecios</span>
        </div>
        <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </nav>
      <main className="w-full flex flex-col items-center justify-center">
        <div className=" my-15 flex flex-col items-center justify-center text-white">
          <h1 className=" mx-20 text-4xl text-center font-bold mb-5">
            Find the Best Prices <span className="text-[#ad46ff]">Instantly</span>
          </h1>
          <p className="text-center mx-5 text-gray-400">
            Compare prices across multiple stores and save money on your purchases with our powerful price comparison tool
          </p>
        </div>
        <form className="formSearch w-full flex flex-col justify-center items-center" onSubmit={handleSearch}>
          <div className="flex items-center border rounded-full border-gray-600 bg-[#1e2939] h-[50px] w-[90%] text-white ">
            <FaSearch className="text-gray-400 text-xl ml-3" />
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent w-[90%] h-full px-3 text-white outline-none"
              required
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <button type="submit" className=" mx-2 bg-[#9810fa] flex items-center justify-center size-[30px] rounded-full">
              <FaSearch className="text-sm" />
            </button>
          </div>
        </form>

      </main>
    </div>
  );
}

export default LandingPage;
