export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Hambúrguer Clássico',
    price: 25.5,
    image: 'https://placehold.co/600x400/png?text=Hamburguer',
  },
  {
    id: 2,
    name: 'Hambúrguer Duplo',
    price: 32.75,
    image: 'https://placehold.co/600x400/png?text=Hamburguer+Duplo',
  },
  {
    id: 3,
    name: 'Batata Frita',
    price: 12.0,
    image: 'https://placehold.co/600x400/png?text=Batata+Frita',
  },
  {
    id: 4,
    name: 'Refrigerante',
    price: 8.0,
    image: 'https://placehold.co/600x400/png?text=Refrigerante',
  },
];