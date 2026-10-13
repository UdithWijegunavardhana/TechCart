export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  discount: number | null;
  image: any;
};

export const dummyCartData: CartItem[] = [
  {
    id: '1',
    name: 'iPhone 14',
    price: 699.99,
    quantity: 1,
    image: {
      uri: 'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp',
    },
    discount: null,
  },
  {
    id: '2',
    name: 'iPhone 15',
    price: 1598.0,
    quantity: 2,
    image: {
      uri: 'https://cdn.dummyjson.com/product-images/smartphones/iphone-x/thumbnail.webp',
    },
    discount: 0.07,
  },
];
