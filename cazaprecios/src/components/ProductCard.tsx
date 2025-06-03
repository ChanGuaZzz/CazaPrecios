import { FaExternalLinkAlt, FaStar } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import type { Product, ProductCardProps } from "../models/interfaces";
import axios from "axios";

function ProductCard({ product, savedLinkProducts, setSavedLinkProducts }: ProductCardProps) {
  const userId = 1; // Simulación de usuario, puedes cambiarlo según tu lógica

  const handleSave = (product: Product) => {
    // Aquí puedes implementar la lógica para guardar el producto en favoritos
    console.log("Product saved or unsave:", product);

    // Check if savedLinkProducts is an array of strings
    if (savedLinkProducts.length === 0 || typeof savedLinkProducts[0] === 'string') {
      // We're working with string[] type
      const stringLinks = savedLinkProducts as string[];
      const stringSetState = setSavedLinkProducts as React.Dispatch<React.SetStateAction<string[]>>;
      
      const isFavorite = stringLinks.includes(product.link);
      if (isFavorite) {
        stringSetState(stringLinks.filter((link) => link !== product.link));
      } else {
        stringSetState([...stringLinks, product.link]);
      }
    } else {
      // We're working with Product[] type
      const productArray = savedLinkProducts as Product[];
      const productSetState = setSavedLinkProducts as React.Dispatch<React.SetStateAction<Product[]>>;
      
      const isFavorite = productArray.some(item => item.link === product.link);
      if (isFavorite) {
        productSetState(productArray.filter((item) => item.link !== product.link));
      } else {
        productSetState([...productArray, product]);
      }
    }

    axios
      .post("http://localhost:3000/handleSave", { userId, productLink: product.link }, { withCredentials: true })
      .then((response) => {
        console.log("Product saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error saving product:", error);
        // Simulación de guardado/actualización de favoritos del backend
      });
  };

  // Fix the condition in the button class as well
  const isFavorite = Array.isArray(savedLinkProducts) && 
    (typeof savedLinkProducts[0] === 'string' 
      ? (savedLinkProducts as string[]).includes(product.link)
      : (savedLinkProducts as Product[]).some(item => item.link === product.link));

  return (
    <div
      key={product.id}
      className="product-card w-full max-w-[300px] my-5 bg-[#1e2939] border border-gray-700 rounded-xl shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl"
    >
      <div className="relative h-[180px] rounded-t-xl overflow-hidden bg-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/300x180?text=No+Image";
          }}
        />
        <div className="absolute top-0 right-0 bg-[#9810fa] px-3 py-1 text-white font-bold rounded-bl-lg">{product.price}</div>
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
              isFavorite ? "text-red-600" : "text-white"
            }`}
          >
            <GoHeartFill />
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;