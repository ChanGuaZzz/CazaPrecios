import { useState } from "react";
import { FaSearch, FaShoppingCart, FaChartLine, FaTag } from "react-icons/fa";
import "animate.css";

function LandingPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement search functionality here
  };

    const features = [
    {
      icon: <FaShoppingCart className="text-3xl" />,
      title: "Wide Selection",
      description: "Access a vast range of products from multiple online stores in one place. Save time by comparing options across different retailers without switching between tabs.",
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: "Price Tracking",
      description: "Track price changes over time and receive real-time notifications when prices drop. Set custom alerts for your favorite products and never miss out on a great deal again.",
    },
    {
      icon: <FaTag className="text-3xl" />,
      title: "Best Deals",
      description: "Discover the most competitive prices on the market with our advanced comparison technology. Save money on every purchase by easily identifying the best offers and exclusive discounts.",
    },
  ];
  return (
    <div className="">
      <main className="w-full flex flex-col items-center justify-center">
        <div className=" my-15 flex flex-col items-center justify-center text-white">
          <h1 className=" mx-10 text-5xl text-center font-bold mb-5">
            Find the Best Prices <span className="text-[#ad46ff]">Instantly</span>
          </h1>
          <p className="text-center mx-5 text-gray-400">
            Compare prices across multiple stores and save money on your purchases with our powerful price comparison tool
          </p>
        </div>
        <form className="formSearch w-full mb-17 flex flex-col justify-center items-center" onSubmit={handleSearch}>
          <div className="flex items-center shadow-xl border rounded-full border-gray-600 bg-[#1e2939] h-[50px] w-[90%] max-w-[800px] text-white ">
            <FaSearch className="text-gray-400 text-xl ml-3" />
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent w-[90%]  h-full px-3 text-white outline-none"
              required
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <button type="submit" className=" mx-2 bg-[#9810fa] flex items-center justify-center size-[30px] rounded-full">
              <FaSearch className="text-sm" />
            </button>
          </div>
        </form>

        <div className="features w-full flex mb-20 flex-wrap justify-center items-center ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-item overflow-auto flex flex-col items-center  p-5 backdrop-brightness-125  shadow-2xl rounded-lg m-5 w-[full] h-[300px]  max-w-[400px]"
            >
              <div className="icon bg-[#9810fa] m-5 rounded-full p-4 text-white ">{feature.icon}</div>
              <div className="text">
                <h2 className="text-xl text-white text-center font-bold">{feature.title}</h2>
                <p className="text-gray-400 text-center">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="footer w-full h-[100px] bg-black/10 flex flex-col items-center justify-center   text-white ">
          <h2 className=" font-bold ">© CazaPrecios</h2>
          <p className="text-gray-400 text-center text-xs ">
            Personal Project of <a href="www.linkedin.com/in/geyson-steven-gualdron-arjona-b22b99273/" className="text-[#ad46ff]">Geyson Gualdron</a>. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
