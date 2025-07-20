export interface HomeProduct {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
}

export interface HomeProductsResponse {
  products: HomeProduct[];
  total: number;
  skip: number;
  limit: number;
}
