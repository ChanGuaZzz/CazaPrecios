import { MdMenu, MdMenuOpen } from "react-icons/md";
import { useState, useEffect, use} from "react";
import { Link, useLocation } from "react-router-dom";
import { FaX } from "react-icons/fa6";
import { BsArrowRight } from "react-icons/bs";

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
  const location = useLocation();

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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Efecto para cerrar el menú al cambiar de ruta
  useEffect(() => {
    if (isMenuOpen) {
      toggleMenu();
    }
  }, [location.pathname]);
  //


 // Alternative approach using useEffect (place this inside your component)
useEffect(() => {
  const mainElement = document.getElementsByTagName("main")[0];
  
  if (isMenuOpen) {
    document.body.style.overflow = "hidden";
    if (mainElement) {
      mainElement.style.filter = "blur(5px)";
    }
  } else {
    document.body.style.overflow = "auto";
    if (mainElement) {
      mainElement.style.filter = "none";
    }
  }
  
  return () => {
    // Cleanup when component unmounts
    document.body.style.overflow = "auto";
    if (mainElement) {
      mainElement.style.filter = "none";
    }
  };
}, [isMenuOpen]);

  

  return (
    <>
      <div className="MobileMenu md:hidden flex items-center pr-4">
        {isMenuOpen ? (
          <MdMenuOpen className="text-2xl cursor-pointer" onClick={handleToggleMenu} />
        ) : (
          <MdMenu className="text-2xl cursor-pointer" onClick={handleToggleMenu} />
        )}
        <div
          className={`bg-gray-900 flex-col py-5 px-5 animate__faster animate__animated ${
            isMenuOpen ? "animate__slideInRight" : hasInteracted ? "animate__slideOutRight" : "hidden"
          } flex fixed inset-y-0 max-w-[400px] w-[70%] right-[0] z-30 `}
        >
          <div className="w-full flex justify-between border-b border-gray-700 mb-10">
            <span className=" ml-5 text-xl">Menu</span>
            <FaX className="text-xl text-gray-300 cursor-pointer mb-4" onClick={handleToggleMenu} />
          </div>
          <ul className="flex flex-col w-full">
            {routes[0].map((route) => (
              <Link key={route.name} className={`text-gray-300   py-3 w-full flex justify-between hover:text-[#c07cf8] cursor-pointer mb-2`} to={route.path}>
                <span className={`ml-5 px-1 relative  ${isActive(route.path)&& 'text-white after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:rounded-full after:h-0.5 after:bg-[#ad46ff]'} `}>{route.name}</span>
                <BsArrowRight className="text-xl text-gray-300 cursor-pointer" />
              </Link>
            ))}
          </ul>
        </div>
        {/* Overlay para detectar clics fuera del menú */}
        
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