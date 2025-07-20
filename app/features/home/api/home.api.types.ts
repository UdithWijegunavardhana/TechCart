export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface ProductReview {
  userId: number;
  comment: string;
  rating: number;
  createdAt: string;
}

export interface HomeProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  availabilityStatus: string;
  minimumOrderQuantity: number;
  dimensions: ProductDimensions;
  weight: number;
  warrantyInformation: string;
  returnPolicy: string;
  shippingInformation: string;
  sku: string;
  meta: ProductMeta;
  reviews: ProductReview[];
}

export interface HomeProductsResponse {
  products: HomeProduct[];
  total: number;
  skip: number;
  limit: number;
}
