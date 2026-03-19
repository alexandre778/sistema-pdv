// src/app/api/vendas/route.ts
import { NextRequest, NextResponse } from "next/server"

// Tipo para o corpo da requisição
interface VendaBody {
  produtoId: number
  quantidade: number
}

export async function POST(req: NextRequest) {
  try {
    const body: VendaBody = await req.json()

    // Simula salvar no localStorage ou DB
    const vendas = JSON.parse(localStorage.getItem("vendas") || "[]") as Array<VendaBody>
    vendas.push(body)
    localStorage.setItem("vendas", JSON.stringify(vendas))

    return NextResponse.json({ message: "Venda registrada com sucesso" })
  } catch (error) {
    return NextResponse.json({ message: "Erro ao registrar venda", error }, { status: 500 })
  }
}
