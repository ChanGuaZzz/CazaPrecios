export interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  rating: number;
  store: string;
  reviews: number;
  link: string;
}

export interface ProductCardProps {
  product: Product;
  savedLinkProducts: string[] | Product[];
  setSavedLinkProducts: React.Dispatch<React.SetStateAction<string[]>> | React.Dispatch<React.SetStateAction<Product[]>>;
}

export interface session {
  id: number;
  username: string;
  email: string;
  createdAt: string; // ISO date string
}
