"use client"

import { useState } from "react"

export default function Produtos(){

  const [nome,setNome] = useState("")
  const [preco,setPreco] = useState("")
  const [estoque,setEstoque] = useState("")
  const [codigo,setCodigo] = useState("")

  async function salvar(){

    await fetch("/api/produtos",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        nome,
        preco:parseFloat(preco),
        estoque:parseInt(estoque),
        codigoBarra:codigo
      })
    })

    alert("Produto cadastrado")
  }

  return(

    <div style={{padding:"40px"}}>

      <h1>Cadastro de Produtos</h1>

      <input placeholder="Nome"
      onChange={(e)=>setNome(e.target.value)} />

      <input placeholder="Preço"
      onChange={(e)=>setPreco(e.target.value)} />

      <input placeholder="Estoque"
      onChange={(e)=>setEstoque(e.target.value)} />

      <input placeholder="Código de barras"
      onChange={(e)=>setCodigo(e.target.value)} />

      <button onClick={salvar}>
        Salvar
      </button>

    </div>
  )
}