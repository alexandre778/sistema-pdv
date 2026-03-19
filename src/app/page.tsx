"use client"

import { useState } from "react"

// Tipagem do produto retornado da API
interface ProdutoAPI {
  id: number
  nome: string
  preco: number | string
}

// Tipagem do item do carrinho
interface ItemCarrinho {
  id: number
  nome: string
  preco: number
  qtd: number
}

// Função fictícia para impressão de cupom
async function imprimirCupom(carrinho: ItemCarrinho[], total: number, pagamento: string) {
  console.log("Imprimindo cupom...")
  console.log("Itens:", carrinho)
  console.log("Total:", total)
  console.log("Pagamento:", pagamento)
}

export default function Caixa() {
  const [codigo, setCodigo] = useState("")
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([])
  const [pagamento, setPagamento] = useState("Dinheiro")

  function calcularTotal(lista: ItemCarrinho[]) {
    return lista.reduce((total, p) => total + p.preco * p.qtd, 0)
  }

  async function adicionarProduto(codigoBarra: string) {
    if (!codigoBarra) return

    const res = await fetch(`/api/produtos?codigo=${codigoBarra}`)
    const produto: ProdutoAPI = await res.json()

    if (!produto || !produto.id) {
      alert("Produto não encontrado")
      return
    }

    setCarrinho(prev => {
      const novo = [...prev]
      const existe = novo.find(p => p.id === produto.id)
      if (existe) {
        existe.qtd += 1
      } else {
        novo.push({
          id: produto.id,
          nome: produto.nome,
          preco: Number(produto.preco),
          qtd: 1
        })
      }
      return novo
    })
    setCodigo("")
  }

  function buscarProduto(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      adicionarProduto(codigo)
    }
  }

  function remover(id: number) {
    setCarrinho(prev => prev.filter(p => p.id !== id))
  }

  function alterarQtd(id: number, valor: number) {
    setCarrinho(prev =>
      prev.map(p => {
        if (p.id === id) {
          p.qtd += valor
          if (p.qtd < 1) p.qtd = 1
        }
        return p
      })
    )
  }

  async function finalizarVenda() {
    if (carrinho.length === 0) {
      alert("Carrinho vazio")
      return
    }

    const total = calcularTotal(carrinho)

    const res = await fetch("/api/vendas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itens: carrinho, total, formaPagamento: pagamento })
    })

    if (!res.ok) {
      alert("Erro ao salvar venda")
      return
    }

    await imprimirCupom(carrinho, total, pagamento)

    alert("Venda finalizada!")
    setCarrinho([])
  }

  const total = calcularTotal(carrinho)

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>PDV - Caixa</h1>

      <input
        placeholder="Escaneie ou digite o código"
        value={codigo}
        onChange={e => setCodigo(e.target.value)}
        onKeyDown={buscarProduto}
        style={{ fontSize: "20px", padding: "10px", width: "300px", marginBottom: "20px" }}
      />

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#eee" }}>
            <th>Produto</th>
            <th>Preço</th>
            <th>Qtd</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {carrinho.map(p => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>R$ {p.preco.toFixed(2)}</td>
              <td>
                <button onClick={() => alterarQtd(p.id, -1)}>-</button>
                {" "}{p.qtd}{" "}
                <button onClick={() => alterarQtd(p.id, 1)}>+</button>
              </td>
              <td>R$ {(p.preco * p.qtd).toFixed(2)}</td>
              <td>
                <button onClick={() => remover(p.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: "20px", fontSize: "30px" }}>Total: R$ {total.toFixed(2)}</h2>

      <h3>Forma de pagamento</h3>
      <select value={pagamento} onChange={e => setPagamento(e.target.value)}>
        <option>Dinheiro</option>
        <option>Cartão</option>
        <option>PIX</option>
      </select>

      <br /><br />
      <button
        onClick={finalizarVenda}
        style={{ fontSize: "20px", padding: "15px", background: "green", color: "white", border: "none" }}
      >
        Finalizar Venda
      </button>
    </div>
  )
}
