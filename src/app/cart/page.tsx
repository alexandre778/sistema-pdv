"use client"

import { createContext, useState, useContext, ReactNode } from "react"

export interface Product {
  id: number
  nome: string
  preco: number
  categoria?: string
  imagem?: string
}

export interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {

  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const item = prev.find(p => p.id === product.id)

      if (item) {
        return prev.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(p => p.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, quantity } : p
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.preco * item.quantity,
    0
  )

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }

  return context
}

//////////////////////////////
// ✅ PÁGINA OBRIGATÓRIA
//////////////////////////////

export default function CartPage() {
  const { cartItems, cartTotal, removeFromCart } = useCart()

  return (
    <div style={{ padding: "20px" }}>
      <h1>Carrinho</h1>

      {cartItems.length === 0 ? (
        <p>Carrinho vazio</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.nome} - {item.quantity}x - R$ {(item.preco * item.quantity).toFixed(2)}
              <button onClick={() => removeFromCart(item.id)}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2>Total: R$ {cartTotal.toFixed(2)}</h2>
    </div>
  )
}
