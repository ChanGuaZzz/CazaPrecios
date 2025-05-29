import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaSearch, FaStar } from "react-icons/fa";
import axios from "axios";
import type { Product } from "../models/interfaces";
import { GoHeartFill } from "react-icons/go";

function Comparator() {
  // Obtener parámetros de la URL desde la ruta (como /comparator/:id/:category)
  const params = useParams();

  // Obtener parámetros de consulta (como /comparator?product=xyz&store=abc)
  const [searchQuery, setSearchQuery] = useState<string>(params.id || "");
  const [productSearched, setProductSearched] = useState<string>("");
  const [productFounded, setProductFounded] = useState<any[]>([]);
  const [FavoriteLinkProducts, setFavoriteLinkProducts] = useState<any[]>([
    "https://example.com/product/1",
    "https://example.com/product/3",
  ]);

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

  const handleSave = (product: Product) => {
    // Aquí puedes implementar la lógica para guardar el producto en favoritos
    console.log("Product saved:", product);

    const isFavorite = FavoriteLinkProducts.includes(product.link);
    if (isFavorite) {
      setFavoriteLinkProducts(FavoriteLinkProducts.filter((link) => link !== product.link));
    } else {
      setFavoriteLinkProducts([...FavoriteLinkProducts, product.link]);
    }
  };
  return (
    <div className="comparator w-full flex flex-col items-center">
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
            <div
              key={product.id}
              className="product-card w-full max-w-[300px] bg-[#1e2939] border border-gray-700 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="relative h-[180px] overflow-hidden bg-gray-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/300x180?text=No+Image";
                  }}
                />
                <div className="absolute top-0 right-0 bg-[#9810fa] px-3 py-1 text-white font-bold rounded-bl-lg">
                  {product.price}
                </div>
                <div className="absolute bottom-0 left-0 bg-black/70 text-white py-1 px-3 rounded-tr-lg">{product.store}</div>
              </div>

              <div className="p-4">
                <h3 className="text-white font-semibold text-lg line-clamp-2 h-[56px]">{product.name}</h3>

                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-white">{product.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm ml-2">({product.reviews} reviews)</span>
                </div>

                <div className="flex items-center mt-4 justify-between">
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" bg-[#9810fa] hover:bg-[#ad46ff] h-[40px] text-white w-full py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <span>View Product</span>
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </a>
                  <button
                    onClick={() => {
                      handleSave(product);
                    }}
                    className={`ml-[10px] transition-transform hover:scale-95 active:scale-90 bg-purple-300 h-[40px] p-2 px-4 rounded-lg ${
                      FavoriteLinkProducts.includes(product.link) ? "text-red-600" : "text-white"
                    }`}
                  >
                    <GoHeartFill />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-center py-10">
            {productSearched ? "No products found. Try another search." : "Search for products to compare prices"}
          </div>
        )}
      </div>
    </div>
  );
}

export default Comparator;
