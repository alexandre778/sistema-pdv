"use client"

import Link from "next/link"

export default function Sidebar() {
  return (
    <div style={sidebar}>
      <h2>PDV</h2>

      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      {/* Caixa removido */}
      <Link href="/produtos">Produtos</Link>
      <Link href="/estoque">Estoque</Link>
      <Link href="/relatorios">Relatorios</Link>
    </div>
  )
}

const sidebar: React.CSSProperties = {
  width: "200px",
  background: "#111",
  color: "white",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  padding: "20px"
}