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
    image: '@assets/iphone14.png',
    discount: null,
  },
  {
    id: '2',
    name: 'iPhone 15',
    price: 1598.0,
    quantity: 2,
    image: '@assets/iphone15.png',
    discount: 0.07,
  },
];
