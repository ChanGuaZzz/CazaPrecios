import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import type { Product } from "../models/interfaces";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

function Comparator() {
  // Obtener parámetros de la URL desde la ruta (como /comparator/:id/:category)
  const params = useParams();

  // Obtener parámetros de consulta (como /comparator?product=xyz&store=abc)
  const [searchQuery, setSearchQuery] = useState<string>(params.id || "");
  const [productSearched, setProductSearched] = useState<string>("");
  const [productFounded, setProductFounded] = useState<any[]>([]);
  const [savedLinkProducts, setSavedLinkProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userId = 1; // Simulación de usuario, puedes cambiarlo según tu lógica

  const getSavedLinkProducts = async () => {
    axios
      .post("http://localhost:3000/saves", { userId, onlyLink:true }, { withCredentials: true })
      .then((response) => {
        console.log("Favorite products fetched successfully:", response.data);
        setSavedLinkProducts(response.data);
        // Aquí puedes actualizar el estado con los productos favoritos obtenidos
        // setFavoriteProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching favorite products:", error);
        setSavedLinkProducts(["https://example.com/product/1", "https://example.com/product/3"]); // Simulación de productos guardados
      });
  };

  useEffect(() => {
    // Obtener los productos guardados al cargar el componente
    getSavedLinkProducts();
  }, []);

  // Datos de ejemplo para productos
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
      id: 2,
      name: "Laptop UltraSlim Pro",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&w=400",
      price: "190€",
      rating: 4.5,
      store: "GigaTech",
      reviews: 189,
      link: "https://example.com/product/2",
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
    },
    {
      id: 4,
      name: "4K Smart TV 55-inch",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&w=400",
      price: "190€",
      rating: 4.6,
      store: "HomeElectro",
      reviews: 278,
      link: "https://example.com/product/4",
    },
  ];
  const handleSearch = async (searchQuery: string, e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    setProductFounded([]);
    setIsLoading(true);
    console.log("Search query:", searchQuery);
    if (!searchQuery.trim()) return;
    setProductSearched(searchQuery);

    axios
      .get(`https://server/products?search=${encodeURIComponent(searchQuery)}`)
      .then((response) => {
        console.log("Search results:", response.data);
        setProductFounded(response.data);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);

        setProductFounded(dummyProducts);
        console.log("Using dummy products due to error", dummyProducts);

        // Manejar el error de la búsqueda
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // Establecer la consulta de búsqueda desde los parámetros
    if (params.productString) {
      const productString = decodeURIComponent(params.productString);
      setSearchQuery(productString);
      handleSearch(productString);
    }
  }, [params]);

  return (
    <main className="comparator w-full flex flex-col items-center">
      <div className="my-10 flex flex-col items-center justify-center text-white w-full">
        <h1 className="mx-10 text-4xl text-center font-bold mb-3">
          Compare <span className="text-[#ad46ff]">Prices</span>
        </h1>
        <p className="text-center mx-5 text-gray-400">Found results for "{productSearched || searchQuery}"</p>
      </div>

      <form
        className="w-full mb-10 flex flex-col justify-center items-center"
        onSubmit={(e) => {
          handleSearch(searchQuery, e);
        }}
      >
        <div className="flex items-center shadow-xl border rounded-full border-gray-600 bg-[#1e2939] h-[50px] w-[90%] max-w-[800px] text-white">
          <FaSearch className="text-gray-400 text-xl ml-3" />
          <input
            type="text"
            placeholder="Refine your search..."
            className="bg-transparent w-[90%] h-full px-3 text-white outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="mx-2 bg-[#9810fa] flex items-center justify-center size-[30px] rounded-full">
            <FaSearch className="text-sm" />
          </button>
        </div>
      </form>

      <div className="products-container w-full flex flex-wrap justify-center gap-6 mb-10 px-4">
        {productFounded.length > 0 ? (
          productFounded.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              savedLinkProducts={savedLinkProducts}
              setSavedLinkProducts={setSavedLinkProducts}
            />
          ))
        ) : (
          <div className="text-gray-400 text-center py-10">
            {productSearched ? (isLoading?<Loading/>:"No products found. Try another search.") : "Search for products to compare prices"}
          </div>
        )}
      </div>
    </main>
  );
}

export default Comparator;
