'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// É uma boa prática definir a estrutura dos seus dados.
// Com base em page.tsx, um produto tem estas propriedades.
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  // Adicione outras propriedades se existirem
}

// Define o tipo para o valor do contexto
interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook customizado com uma verificação para garantir que seja usado dentro do provider
export function useCart() {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}
