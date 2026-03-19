"use client"  // ← COLOQUE SEMPRE AQUI, NA PRIMEIRA LINHA

import Sidebar from "@/components/Sidebar"
import { CartProvider } from "@/app/cart/page" // Import do Provider do carrinho

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        {/* Envolvendo tudo com CartProvider */}
        <CartProvider>
          <div style={{ display: "flex" }}>
            <Sidebar />

            <div style={{ flex: 1, padding: "30px" }}>
              {children}
            </div>
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
