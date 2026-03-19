export interface ItemCupom {
  nome: string
  quantidade: number
  preco: number
}

export function imprimirCupom(itens: ItemCupom[], total: number, pagamento: string) {
  let texto = "=== CUPOM ===\n"
  itens.forEach(item => {
    texto += `${item.nome} x${item.quantidade} - R$ ${item.preco.toFixed(2)}\n`
  })
  texto += `Total: R$ ${total.toFixed(2)}\nForma de pagamento: ${pagamento}`
  console.log(texto)
}
