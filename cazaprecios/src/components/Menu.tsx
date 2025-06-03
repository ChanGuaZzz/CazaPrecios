import { MdMenu, MdMenuOpen } from "react-icons/md";
import { useState, useEffect, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaX } from "react-icons/fa6";
import { BsArrowBarLeft, BsArrowRight } from "react-icons/bs";
import type { Product } from "../models/interfaces";
import axios from "axios";
import { GoHeartFill } from "react-icons/go";
import Loading from "./Loading";
import ProductCard from "./ProductCard";

// Fix: Change function signature to use a props object instead of positional parameters
interface Menu {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

interface Route {
  name: string;
  path?: string;
  function?: boolean;
}

function Menu({ isMenuOpen, toggleMenu }: Menu) {
  // Estado para rastrear si el menú ha sido interactuado al menos una vez
  const [hasInteracted, setHasInteracted] = useState(false);
  const location = useLocation();
  const [isSavesOpen, setIsSavesOpen] = useState(false);
  const [hasInteractedSaves, setHasInteractedSaves] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userId: number = 1; // Simulación de usuario, puedes cambiarlo según tu lógica
  const routes = useState<Route[]>([
    { name: "Home", path: "/" },
    { name: "Saves", function: true },
    { name: "Profile", path: "/profile" },
  ]);
  const dummyProducts: Product[] = [
    {
      id: 1,
      name: "Smartphone Premium X23",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&w=400",
      price: "190€",
      rating: 4.8,
      store: "TechStore",
      reviews: 235,
      link: "https://example.com/product/1",
    },
    {
      id: 3,
      name: "Wireless Noise-Cancelling Headphones",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&w=400",
      price: "190€",
      rating: 4.7,
      store: "AudioWorld",
      reviews: 412,
      link: "https://example.com/product/3",
    }
  ];

  const [savedProducts, setSavedProducts] = useState<Product[]>([]);

  const getSavedProducts = async () => {
    setSavedProducts([]);

    axios
      .post("http://localhost:3000/saves", { userId }, { withCredentials: true })
      .then((response) => {
        console.log("Favorite products fetched successfully:", response.data);
        // Aquí puedes actualizar el estado con los productos favoritos obtenidos
        // setFavoriteProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching favorite products:", error);
        setSavedProducts(dummyProducts); // Simulación de productos guardados
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Función para manejar el toggle del menú y marcar que ha habido interacción
  const handleToggleMenu = () => {
    toggleMenu();
    setHasInteracted(true);
  };

  const handleToggleSaves = () => {
    setIsSavesOpen(!isSavesOpen);
    console.log("Saves toggled");
    setHasInteractedSaves(true);
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

    if (isSavesOpen) {
      getSavedProducts();
    }

    if (isMenuOpen || isSavesOpen) {
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
  }, [isMenuOpen, isSavesOpen]);

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
              <Fragment key={route.name}>
                {route.function ? (
                  <>
                    <button
                      onClick={handleToggleSaves}
                      key={route.name}
                      className={`text-gray-300 py-3 w-full flex justify-between hover:text-[#c07cf8] cursor-pointer mb-2`}
                    >
                      <span className={`ml-5 px-1 relative `}>{route.name}</span>
                      <BsArrowRight className="text-xl text-gray-300 cursor-pointer" />
                    </button>
                  </>
                ) : (
                  <>
                    {route.path && (
                      <Link
                        key={route.name}
                        className={`text-gray-300 py-3 w-full flex justify-between hover:text-[#c07cf8] cursor-pointer mb-2`}
                        to={route.path}
                      >
                        <span
                          className={`ml-5 px-1 relative  ${
                            isActive(route.path) &&
                            'text-white after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:rounded-full after:h-0.5 after:bg-[#ad46ff]'
                          } `}
                        >
                          {route.name}
                        </span>
                        <BsArrowRight className="text-xl text-gray-300 cursor-pointer" />
                      </Link>
                    )}
                  </>
                )}
              </Fragment>
            ))}
          </ul>
        </div>
        {/* Overlay para detectar clics fuera del menú */}
      </div>

      <div className="flex absolute items-center pr-4">
        <div
          className={`bg-gray-900 flex-col py-5 px-5 animate__faster animate__animated ${
            isSavesOpen ? "animate__slideInRight" : hasInteractedSaves ? "animate__slideOutRight" : "hidden"
          } flex fixed inset-y-0 max-w-[400px] w-[70%] right-[0] z-30 `}
        >
          <div className="w-full flex justify-between border-b border-gray-700 mb-10">
            <span className=" ml-5 text-xl">Saves</span>
            <BsArrowBarLeft className="text-xl text-gray-300 cursor-pointer mb-4" onClick={handleToggleSaves} />
          </div>

          <ul className="flex flex-col overflow-auto items-center w-full scrollbar_dark">
            {savedProducts.length > 0 ? (
              savedProducts.map((product, index) => (
                <>
                <ProductCard
                  product={product}
                  key={product.id}
                  savedLinkProducts={savedProducts}
                  setSavedLinkProducts={setSavedProducts}
                />
                <div className={`w-full border-b ${index==savedProducts.length-1&&"hidden"} border-gray-700 my-2`}></div>
                </>
              ))
            ) : (
              <div className="text-gray-400 py-3 w-full text-center">{isLoading ? <Loading /> : "No saved products"} </div>
            )}
          </ul>
        </div>
      </div>

      <div className="hidden md:flex items-center pr-4">
        <ul className="flex space-x-4 text-gray-300">
          {routes[0].map((route) => (
            <Fragment key={route.name}>
              {route.function ? (
                <button
                  onClick={handleToggleSaves}
                  key={route.name}
                  className="text-gray-300 hover:text-[#c07cf8] cursor-pointer mb-2"
                >
                  {route.name}
                </button>
              ) : (
                <>
                  {route.path && (
                    <Link key={route.name} className="text-gray-300 hover:text-[#c07cf8] cursor-pointer mb-2" to={route.path}>
                      <span
                        className={`relative  ${
                          isActive(route.path) &&
                          'text-white after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:rounded-full after:h-0.5 after:bg-[#ad46ff]'
                        }`}
                      >
                        {route.name}
                      </span>
                    </Link>
                  )}
                </>
              )}
            </Fragment>
          ))}
        </ul>
      </div>
    </>
  );
}
export default Menu;
