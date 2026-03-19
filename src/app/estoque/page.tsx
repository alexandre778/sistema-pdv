
"use client"

import React, { useEffect, useState } from "react"

interface Produto {
  id: number
  nome: string
  preco: number
  imagem?: string
}

export default function EstoquePage() {
  const [produtos, setProdutos] = useState<Produto[]>([])

  useEffect(() => {
    const fetchData = () => {
      const data = JSON.parse(localStorage.getItem("produtos") || "[]") as Produto[]
      setProdutos(data)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h2>Estoque</h2>
      <ul>
        {produtos.map(produto => (
          <li key={produto.id}>
            {produto.nome} - R$ {produto.preco.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  )
}
