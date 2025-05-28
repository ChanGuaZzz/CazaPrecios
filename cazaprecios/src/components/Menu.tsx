import { MdMenu, MdMenuOpen } from "react-icons/md";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Fix: Change function signature to use a props object instead of positional parameters
interface Menu {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

interface Route {
  name: string;
  path: string;
}

function Menu({ isMenuOpen, toggleMenu }: Menu) {
  // Estado para rastrear si el menú ha sido interactuado al menos una vez
  const [hasInteracted, setHasInteracted] = useState(false);

  const routes = useState<Route[]>([
    { name: "Home", path: "/" },
    { name: "Saves", path: "/saves " },
    { name: "Profile", path: "/profile" },
  ]);

  // Función para manejar el toggle del menú y marcar que ha habido interacción
  const handleToggleMenu = () => {
    toggleMenu();
    setHasInteracted(true);
  };

  return (
    <>
      <div className="MobileMenu md:hidden flex items-center pr-4">
        {isMenuOpen ? (
          <MdMenuOpen className="text-2xl" onClick={handleToggleMenu} />
        ) : (
          <MdMenu className="text-2xl" onClick={handleToggleMenu} />
        )}
        <div
          className={`bg-gray-900/90 backdrop-blur-[6px]  py-5 px-2 animate__faster animate__animated ${
            isMenuOpen ? "animate__fadeInRight" : hasInteracted ? "animate__fadeOutRight" : "hidden"
          } flex absolute inset-y-0 max-w-[400px] w-[70%] right-[0] `}
        >
          <ul className="flex flex-col w-full">
            {routes[0].map((route) => (
              <Link key={route.name} className="text-gray-300 text-center border-b-1 border-gray-600 py-1 w-full hover:text-[#c07cf8] cursor-pointer mb-2" to={route.path}>
                {route.name}
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div className="hidden md:flex items-center pr-4">
        <ul className="flex space-x-4 text-gray-300">
          {routes[0].map((route) => (
            <Link key={route.name} className="text-gray-300 hover:text-[#c07cf8] cursor-pointer mb-2" to={route.path}>
              {route.name}
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}
export default Menu;
