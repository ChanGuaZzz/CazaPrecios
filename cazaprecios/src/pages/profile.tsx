import { useState } from "react";
import { FaUser, FaBookmark, FaEdit, FaSignOutAlt } from "react-icons/fa";

function Profile() {
  // Mock user data - replace with actual user data from your authentication system
  const [userData, setUserData] = useState({
    username: "JohnDoe",
    email: "john.doe@example.com",
    savedItems: 24,
    memberSince: "May 2025"
  });

  const userStats = [
    {
      icon: <FaBookmark className="text-3xl" />,
      title: "Saved Products",
      value: userData.savedItems,
      description: "Products you're tracking for price drops"
    },
    {
      icon: <FaUser className="text-3xl" />,
      title: "Member Since",
      value: userData.memberSince,
      description: "Thanks for being part of our community!"
    }
  ];

  return (
    <div className="bg-[#121926] min-h-screen text-white">
      <main className="w-full flex flex-col items-center justify-center py-10">
        <div className="my-10 flex flex-col items-center justify-center">
          <div className="relative mb-5">
            <div className="bg-[#9810fa] rounded-full p-6">
              <FaUser className="text-4xl" />
            </div>
            <button className="absolute bottom-0 right-0 bg-[#ad46ff] p-2 rounded-full">
              <FaEdit className="text-sm" />
            </button>
          </div>
          
          <h1 className="text-4xl font-bold mb-2">{userData.username}</h1>
          <p className="text-gray-400 mb-6">{userData.email}</p>
          
          <div className="flex space-x-4 mb-10">
            <button className="bg-[#9810fa] hover:bg-[#ad46ff] transition-colors px-6 py-2 rounded-full flex items-center">
              <FaEdit className="mr-2" /> Edit Profile
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 transition-colors px-6 py-2 rounded-full flex items-center">
              <FaSignOutAlt className="mr-2" /> Sign Out
            </button>
          </div>
        </div>

        <div className="stats-container w-full flex flex-wrap justify-center items-stretch gap-6 max-w-4xl">
          {userStats.map((stat, index) => (
            <div
              key={index}
              className="stat-item flex flex-col items-center p-8 backdrop-brightness-125 shadow-2xl rounded-lg w-[full] max-w-[350px]"
            >
              <div className="icon bg-[#9810fa] mb-5 rounded-full p-4 text-white">{stat.icon}</div>
              <div className="text flex flex-col items-center">
                <h2 className="text-xl text-white text-center font-bold">{stat.title}</h2>
                <p className="text-3xl font-bold text-[#ad46ff] my-3">{stat.value}</p>
                <p className="text-gray-400 text-center">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="saved-items mt-12 w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Saved Items</h2>
          
          {userData.savedItems > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* This would be mapped from actual saved items data */}
              <div className="bg-[#1e2939] rounded-lg p-4 shadow-lg">
                <p className="text-gray-400 text-sm">No items to display</p>
              </div>
            </div>
          ) : (
            <div className="text-center p-10 bg-[#1e2939] rounded-lg">
              <p className="text-gray-400">You haven't saved any items yet.</p>
              <p className="text-[#ad46ff] mt-2">Start searching to track prices!</p>
            </div>
          )}
        </div>

        <div className="footer w-full h-[100px] bg-black/10 flex flex-col items-center justify-center mt-16 text-white">
          <h2 className="font-bold">© CazaPrecios</h2>
          <p className="text-gray-400 text-center text-xs">
            Personal Project of <a href="https://www.linkedin.com/in/geyson-steven-gualdron-arjona-b22b99273/" className="text-[#ad46ff]">Geyson Gualdron</a>. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Profile;