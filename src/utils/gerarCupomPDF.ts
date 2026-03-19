import jsPDF from "jspdf"

export interface ItemPDF {
  nome: string
  quantidade: number
  preco: number
}

export function gerarCupomPDF(itens: ItemPDF[]) {
  const doc = new jsPDF()
  doc.text("=== CUPOM ===", 10, 10)
  itens.forEach((item, index) => {
    doc.text(`${item.nome} x${item.quantidade} - R$ ${item.preco.toFixed(2)}`, 10, 20 + index * 10)
  })
  doc.save("cupom.pdf")
}
