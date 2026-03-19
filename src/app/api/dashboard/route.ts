import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const vendas = await prisma.venda.findMany()

    let total = 0

    vendas.forEach((v: any) => {
      total += v.total
    })

    return NextResponse.json({
      vendas,
      total
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar vendas" },
      { status: 500 }
    )
  }
}
